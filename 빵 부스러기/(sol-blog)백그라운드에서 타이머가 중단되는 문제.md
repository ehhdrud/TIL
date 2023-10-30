운동 기록 일지 앱의 쉬는 시간 타이머를 구현하기 위해 아래와 같이 Timer 컴포넌트를 작성하였다.

```js
// Next.js v13
'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import '@/styles/timer.css';

const Timer = forwardRef((props: { restTime: number }, ref: any) => {
    const { restTime } = props;
    const [seconds, setSeconds] = useState(restTime);
    const [isCounting, setIsCounting] = useState(false);
    const [timeoutAlert, setTimeoutAlert] = useState(false);

    const editTimer = (newRestTime: number) => {
        setSeconds(newRestTime);
    };

    const startTimer = () => {
        if (seconds > 0) {
            setIsCounting(true);
        }
    };

    const toggleTimer = () => {
        if (isCounting) {
            setIsCounting(false);
            setSeconds(restTime);
        } else {
            if (seconds > 0) {
                setIsCounting(true);
            }
        }
    };

    const showTimeoutAlert = () => {
        setTimeoutAlert(true);
        setTimeout(() => {
            setTimeoutAlert(false);
        }, 3000);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined = undefined;

        if (isCounting) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        if (isCounting && seconds === 0) {
            showTimeoutAlert();
            setIsCounting(false);
            setSeconds(restTime);
        }

        return () => clearInterval(interval);
    }, [isCounting, seconds, restTime]);

    useImperativeHandle(ref, () => ({
        editTimer,
        startTimer,
    }));

    return (
        <div className="timer-feild">
            {restTime !== 0 ? (
                <p className="timer-on" onClick={() => toggleTimer()}>
                    {seconds} seconds
                </p>
            ) : (
                <p className="timer-off">No rest-time setting</p>
            )}
            {timeoutAlert && (
                <div className="timoeout-alert-container">
                    <div
                        className="timeout-alert-overlay"
                        onClick={() => {
                            setTimeoutAlert(false);
                        }}
                    />

                    <div className="timeout-alert">Time out !</div>
                </div>
            )}
        </div>
    );
});

Timer.displayName = 'Timer';

export default Timer;
```

타이머의 시간을 설정하고, 타이머를 시작/중단하는 함수들을 통해 타이머가 잘 동작하는 것을 확인할 수 있다.

그러나 백그라운드 환경에서는 타이미가 아예 중단되거나 타이머가 조금 느리게 동작하는 등의 문제가 발생하였다.

타이머의 기능 개선을 위해 타이머 동작을 Web Worker에서 실행하는 것으로 변경하였다.

## Web Worker란?

main thread와 분리된 background thread에서 독립적으로 코드를 실행하는 기술로, 다중 스레드 프로그래밍을 지원하기 위해 사용된다.

timer의 count-down 로직을 백그라운드에서 실행시킨다면 충분히 가능해보였다.

### Web Worker를 적용하면서 겪은 문제

#### 1. worker 파일에 접근할 수 없는 문제

`let worker = new Worker('./worker.js')` 형태로 worker에 접근하면 동작하지 않았다. Webpack을 사용하는 번들링 환경에서는 상대 경로가 제대로 해석되지 않을 수 있으므로 상대 경로 대신 절대 경로를 사용하여 웹 워커 스크립트 파일을 참조해야한다.

그러므로 `let worker = new Worker(new URL('./worker.js', import.meta.url))` 형태로 작성해주어야 한다.

#### 2. worker가 간헐적으로 동작하지 않는 문제

onMessege, terminate 등 메서드를 사용할 때, 같은 로직인데도 불구하고 어떤 상황에서는 동작하고, 어떤 상황에서는 동작을 안하는 아이러니한 상황을 마주했다. 문제 상황을 정확히 파악하려고 애썼지만 실패하였고 어쨌든 worker가 정상 동작하지 않는다는 것을 깨달았다.

Next.js에서 worker를 사용하는 것에 제약이 있나 싶어서 next.config를 건드려봤지만 뻘짓이었고, useRef Hook을 통해 해결하였다.

`let worker = new Worker(new URL('./worker.js', import.meta.url))`, 이 방법으로 worker를 생성하면 컴포넌트가 업데이트될 때마다 새로운 worker가 생성된다. 그러므로 useRef로 worker 생성자를 감싸서 컴포넌트의 렌더링과 관계 없이 한 번만 생성하도록 한다. 코드를 `let worker = useRef(new Worker(new URL('./worker.js', import.meta.url)))`로 변경하니 worker가 잘 동작하였다.

#### 3. 브라우저가 멈추가나 원하지 않는 Refresh

코드는 정상적으로 동작하였지만, 사용 도중 브라우저가 멈추거나 원하지 않는 Refresh가 발생하는 문제가 발생하였다.

이는 메모리 문제('out of memery' error)로, 해결하기 위해 생성된 컴포넌트가 worker를 항상 생성하는 것을 방지해야한다. 만약 생성된 컴포넌트가 여러개이고 각 컴포넌트에서 worker가 항상 생성된다면 메모리 문제가 발생하게 된다. 나는 타이머를 시작할 때 worker를 생성하고 타이머를 중단하면 worker를 제거하는 로직을 사용하였다.

---

완성된 최종 코드는 다음과 같다.

```js
// timer.tsx
'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import '@/styles/timer.css';

const Timer = forwardRef((props: { restTime: number }, ref: any) => {
    let worker = (useRef < Worker) | (null > null);

    const { restTime } = props;
    const [seconds, setSeconds] = useState(restTime);
    const [isCounting, setIsCounting] = (useState < boolean) | (null > null);
    const [timeoutAlert, setTimeoutAlert] = useState(false);

    const editTimer = (newRestTime: number) => {
        setSeconds(newRestTime);
    };

    const isCountingOn = () => {
        setIsCounting(true);
    };

    const toggleTimer = () => {
        if (!isCounting) {
            if (seconds > 0) {
                setIsCounting(true);
            }
        } else {
            setIsCounting(false);
            setSeconds(restTime);
        }
    };

    const startTimer = () => {
        if (!worker.current) {
            worker.current = new Worker(new URL('./worker.js', import.meta.url));
        }
        worker.current.postMessage({ type: 'startTimer', value: seconds, state: isCounting });
        console.log('start:', worker, worker.current);
    };

    const stopTimer = () => {
        if (worker.current) {
            worker.current.postMessage({ type: 'stopTimer', value: restTime, state: isCounting });
            worker.current.terminate();
            worker.current = null;
            console.log('stop:', worker, worker.current);
        }
    };

    useEffect(() => {
        if (isCounting === true) {
            startTimer();
        } else if (isCounting === false) {
            stopTimer();
            setIsCounting(null);
        }
    }, [isCounting]);

    const showTimeoutAlert = () => {
        setTimeoutAlert(true);
        setTimeout(() => {
            setTimeoutAlert(false);
        }, 3000);

        setIsCounting(null);
        setSeconds(restTime);

        if (worker.current) {
            worker.current.terminate();
            worker.current = null;
        }
    };

    if (worker.current) {
        worker.current.onmessage = (e: any) => {
            if (isCounting) {
                if (e.data.type === 'updateSeconds') {
                    setSeconds(e.data.value);
                } else if (e.data.type === 'timeout') {
                    showTimeoutAlert();
                }
            }
        };
    }

    useImperativeHandle(ref, () => ({
        editTimer,
        startTimer,
        isCountingOn,
    }));

    return (
        <div className="timer-feild">
            {restTime !== 0 ? (
                <p className="timer-on" onClick={() => toggleTimer()}>
                    {seconds} seconds
                </p>
            ) : (
                <p className="timer-off">No rest-time setting</p>
            )}
            {timeoutAlert && (
                <div className="timoeout-alert-container">
                    <div
                        className="timeout-alert-overlay"
                        onClick={() => {
                            setTimeoutAlert(false);
                        }}
                    />
                    <div className="timeout-alert">Time out !</div>
                </div>
            )}
        </div>
    );
});

Timer.displayName = 'Timer';

export default Timer;
```

```js
// worker.js
let currentSeconds = 0;
let currentState = false;
let interval;

self.onmessage = (e) => {
    if (e.data.type === 'startTimer') {
        if (interval) {
            clearInterval(interval);
        }
        currentSeconds = e.data.value;
        interval = setInterval(() => {
            if (currentSeconds > 0) {
                currentSeconds--;
                self.postMessage({
                    type: 'updateSeconds',
                    value: currentSeconds,
                });
            } else if (currentSeconds === 0) {
                self.postMessage({ type: 'timeout' });
                clearInterval(interval);
            }
        }, 1000);
    } else if (e.data.type === 'stopTimer') {
        clearInterval(interval);
    }
};
```

> 🔎 그러나 브라우저가 백그라운드에 있을 때 안드로이드 환경에서는 잘 동작하였지만 IOS 환경에서는 동작하지 않았다. 아이폰은 브라우저가 백엔드에 있을 때 메모리 누수 방지를 위한 리소스에 대한 제한이 더 엄격하기 때문이다. 해당 부분은 추후 리펙토링 예정!
