아래와 같이 Timer 컴포넌트를 정의하고, 여러 개의 Timer 컴포넌트를 생성했다.

```js
// ... 코드 생략
const timerRefs = useRef<{ [key: string]: TimerComponentType | null }>({});
const [createRestTimeInput, setCreateRestTimeInput] = useState<boolean>(false);
const [restTime, setRestTime] = useState<number>(0);

const Log = () => {
    const handleEditRestTime = (e: React.KeyboardEvent<HTMLInputElement>, workoutIndex: number, workoutName: string) => {
        if (e.key === 'Enter') {
            // ... 코드 생략
            timerRefs.current[workoutName]?.editTimer(restTime); // 📌변경 부분

            setCreateRestTimeInput(false);
            setRestTime(0);
        }
    };

    return (
        <div>
            {workoutData?.map((item, index) => (
                <div key={index}>
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

Array.map 메서드를 통해서 여러 컴포넌트를 생성한 후 각 컴포넌트에게 참조 객체를 설정할 때 생성된 여러개의 컴포넌트를 식별하지 않았고, 그 결과 Ref.current를 통해 컴포넌트에 접근하려고 할 때 마지막으로 생성된 컴포넌트만을 참조하였다.

그래서 아래와 같이 Ref 속성을 설정할 때, 여러개의 Timer 컴포넌트를 식별해주었다.

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
                        // timerRef는 Timer 컴포넌트의 인스턴스
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

위와 같이 참조할 컴포넌트가 생성될 때 마다 key값으로 구분하여 참조 객체에 저장하면, 각 컴포넌트를 구분할 수 있다.
