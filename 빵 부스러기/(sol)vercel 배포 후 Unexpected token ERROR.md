# vercel 배포 후 Unexpected token '<' ERROR

-   Webpack이 `<DOCTYPE>`으로 시작하는 html을 읽어오지 못하여 발생

1. package.json에 `"homepage": "."`로 경로 설정
2. cra 기준 index.html의 `<head>`에 `<base href='/' />` 설정

위 두 방법 중 한 개 혹은 모두 설정해보기!
