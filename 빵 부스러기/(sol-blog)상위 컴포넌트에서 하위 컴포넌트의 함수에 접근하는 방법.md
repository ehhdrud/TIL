상위 컴포넌트에서 하위 컴포넌트의 함수를 실행할 일이 종종 발생한다. 이를 위해 `useRef` 이외에 `forwardRef`, `useImperativeHandle`가 필요하다.

### 상위 컴포넌트

상위 컴포넌트에서 `useRef()`를 이용해 자식 컴포넌트의 DOM에 접근

```js
import { useRef } from 'react';

...

<Timer
    restTime={Object.values(item)[0].restTime}
    ref={(timerRef) => {
        if (timerRef) {
            timerRefs.current[String(Object.keys(item))] = timerRef;
        }
    }}
/>
```

### 하위 컴포넌트

자식 컴포넌트는 `forwardRef()`를 이용해 감싸고, 자식 컴포넌트에 `useImperativeHandle`을 이용해 상위 컴포넌트에 노출될 인스턴스를 객체안에 정의한다. 이 때 첫번째 인자는 ref이다.

> **"Component definition is missing display name react/display-name" 에러가 발생할 경우**
>
> > 해당 컴포넌트의 displayName을 설정
> > `ComponentName.displayName = "ComponentName";`

그렇다면 자식 컴포넌트의 코드는 아래와 같이 작성할 수 있다.

```js
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
