# AsyncStorage

-   모바일 앱을 다시 실행시켰을 때 데이터가 유지되지 않는 문제 발생

-   웹 애플리케이션에서는 Web Storage에 저장하여 이를 해결할 수 있지만 모바일 앱은 Web Storage의 개념이 존재하지 않음

-   AsyncStorage 라이브러리를 사용하여 이를 해결!

## 사용 예시

> **라이브러리 설치**
>
> `npm i @react-native-async-storage/async-storage`

```js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('Error storing value: ', error);
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.log('Error retrieving value: ', error);
    }
};
```
