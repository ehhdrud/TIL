> **에러 로그**
>
> React Hook useEffect has missing dependencies: ... Either include them or remove the dependency array react-hooks/exhaustive-deps

## 해결 방법

**1. 주석을 통해 경고를 무시 (근본적인 해결 방법 X)**

```js
useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
        getAccountAndNetwork();
        window.ethereum.on('accountsChanged', getAccountAndNetwork);
        window.ethereum.on('networkChanged', getAccountAndNetwork);
    } else {
        console.log('MetaMask가 설치되어 있지 않습니다.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [getAccountAndNetwork]);
```

**2. 해당 함수, 변수를 의존성 배열에 넣어주기**

```js
useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
        getAccountAndNetwork();
        window.ethereum.on('accountsChanged', getAccountAndNetwork);
        window.ethereum.on('networkChanged', getAccountAndNetwork);
    } else {
        console.log('MetaMask가 설치되어 있지 않습니다.');
    }
}, [getAccountAndNetwork]);
```

**3. 해당 함수, 변수를 useEffect Hook에서 정의하기**

```js
useEffect(() => {
    const getAccountAndNetwork = () => {};

    if (typeof window.ethereum !== 'undefined') {
        getAccountAndNetwork();
        window.ethereum.on('accountsChanged', getAccountAndNetwork);
        window.ethereum.on('networkChanged', getAccountAndNetwork);
    } else {
        console.log('MetaMask가 설치되어 있지 않습니다.');
    }
}, []);
```

### 추가 에러 로그

2번 방법을 실행했을 경우, 아래와 같은 추가 오류 발생.

> **에러 로그**
>
> The '...' function makes the dependencies of useEffect Hook (at line 90) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of '...' in its own useCallback() Hook react-hooks/exhaustive-deps

의존성 배열의 함수로 인해 매 렌더링마다 useEffect의 종속성을 변화시킨다는 내용이다. JavaScript는 '참조 동등성'을 기반으로 작동하기 때문에, 매 렌더링마다 새롭게 생성되는 함수가 항상 다르다고 받아들여 useEffect를 실행하는 것이다. 이를 해결하기 위해 `useCallback` hook을 사용한다. `useCallback`의 의존성 배열에는 사용하는 변수를 넣어주어야 한다.

그래서 아래와 같이 getAccountAndNetwork 함수를 다시 작성하였다.

```js
const getAccountAndNetwork = useCallback(async () => {
    try {
        // Ethereum Provider API에서 eth_requestAccounts를 통해 계정 정보를 반환받음
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        console.log('Accounts:', accounts);
        // 현재 로그인된 계정(index=0)을 상태에 저장
        setWalletAddress(accounts[0]);
        console.log('Wallet Address: ', walletAddress);

        const addressShortcut = accounts[0].slice(0, 6) + '...' + accounts[0].slice(-4);
        setShortenedAddress(addressShortcut);
        // 현재 연결된 Ethereum 네트워크의 식별자를 가져와서 networkId 변수에 저장
        const networkId = window.ethereum.networkVersion;
        // 홈페이지에서 사용할 네트워크 이름을 식별자 별로 저장
        const networkNames = {
            1: 'Ethereum Mainnet',
            137: 'Polygon Mainnet',
        };
        // 해당 network를 사용 중이라면 해당 네트워크의 이름을 띄움
        const name = networkNames[networkId] || 'Unregistered network';
        setNetworkName(name);
        console.log('Current network name: ', name);
    } catch (error) {
        // 에러가 뜨면 계정, 네트워크 이름 초기화
        setWalletAddress('');
        setNetworkName('');
        console.log('메타마스크에서 네트워크 연결이 필요합니다. ');
    }
}, [walletAddress]);
```
