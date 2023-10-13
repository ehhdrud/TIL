# vercel 배포 에러

## vercel 배포 시 Module not found ERROR

1. git에서 대소문자를 구분 하지 않아서, 수정한 폴더/파일명이 있다면 수정사항이 깃에는 반영되지 않음
2. vercel은 git과 달리 대소문자를 구분하기 때문에 경로 문제 발생
3. 프로젝트 터미널에서 `git config --global core.ignorecase false`를 입력하여 깃에서 대소문자를 구분하도록 설정

## vercel 배포 후 Unexpected token '<' ERROR

**원인: Webpack이 `<DOCTYPE>`으로 시작하는 html을 읽어오지 못하여 발생**

-   package.json에 `"homepage": "."`로 경로 설정
-   cra 기준 index.html의 `<head>`에 `<base href='/' />` 설정

위 두 방법 중 한 개 혹은 모두 설정해보기!
