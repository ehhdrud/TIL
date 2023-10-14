아래와 같이 Timer 컴포넌트를 정의하고, 여러 개의 Timer 컴포넌트를 생성했다.

```js
// ... 코드 생략
const timerRefs = useRef < any > {};
const [createRestTimeInput, setCreateRestTimeInput] = useState < boolean > false;
const [restTime, setRestTime] = useState < number > 0;

const Log = () => {
    const handleEditRestTime = (e: any, workoutIndex: number) => {
        if (e.key === 'Enter') {
            // ... 코드 생략
            timerRefs.current.editTimer(restTime);

            setCreateRestTimeInput(false);
            setRestTime(0);
        }
    };

    return (
        <div>
            {workoutData?.map((item, index) => (
                <div>
                    <input
                        className="rest-time-input"
                        type="text"
                        placeholder="seconds..."
                        autoFocus
                        onChange={(e) => setRestTime(Number(e.target.value))}
                        onKeyDown={(e) => handleEditRestTime(e, index, String(Object.keys(item)))}
                    />
                    <Timer restTime={Object.values(item)[0].restTime} ref={timerRef} />
                </div>
            ))}
        </div>
    );
};
```

나는 위 코드에서 input에서 일어나는 onChange, onKeyDown 이벤트는 모두 인접 요소에 있는 Timer에 처리될 줄 알았지만 아니었다. 여러개의 요소가 생성되었을 때, 항상 마지막 Timer에만 작용되었다.

그래서 아래와 같이 Ref를 통해 Timer 컴포넌트를 식별해주었다.

```js
// ... 코드 생략
const timerRefs = useRef < any > {};
const [createRestTimeInput, setCreateRestTimeInput] = useState < boolean > false;
const [restTime, setRestTime] = useState < number > 0;

const Log = () => {
    const handleEditRestTime = (e: any, workoutIndex: number, workoutName: string) => {
        if (e.key === 'Enter') {
            // ... 코드 생략
            timerRefs.current[workoutName].editTimer(restTime); // 📌변경 부분

            setCreateRestTimeInput(false);
            setRestTime(0);
        }
    };

    return (
        <div>
            {workoutData?.map((item, index) => (
                <div>
                    <input
                        className="rest-time-input"
                        type="text"
                        placeholder="seconds..."
                        autoFocus
                        onChange={(e) => setRestTime(Number(e.target.value))}
                        onKeyDown={(e) => handleEditRestTime(e, index, String(Object.keys(item)))}
                    />
                    <Timer
                        restTime={Object.values(item)[0].restTime}
                        // 📌변경 부분
                        ref={(timerRef) => {
                            if (timerRef) {
                                timerRefs.current[String(Object.keys(item))] = timerRef;
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    );
};
```

위와 같이 Ref를 컴포넌트의 특정 키와 연결한다면 Ref를 객체 내에서 동적으로 관리할 수 있고 쉽게 구별할 수 있다.
