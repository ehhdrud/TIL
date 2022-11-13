# Gatsby 블로그 만들기

1.  Gatsby Install

    `npm install gatsby-cli`

    `npx gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog`
    ➡Gatsby Starter Blog 폴더 생성

2.  Develop

    `cd gatsby-starter-blog/`

    `npm start`
    ➡localhost:8000 접속 시 블로그 확인 가능

3.  Custom

    1.  gatsby-config.js, package.json, README.md, content\blog내 파일들을 목적에 맞게 수정
    2.  한글 폰트 설치하기

        1.  `npm install fontsource-noto-sans-kr`
        2.  `import "fontsource-noto-sans-kr";`
            : 설치한 패키지는 `gastby-browser.js`의 상단에 import 한다. 적어도 `style.css`보다는 위쪽에 `import`해야 `font-family`에 사용할 수 있다)
            `import "fontsource-noto-sans-kr" import "fontsource-noto-sans-kr/700.css"`
        3.  그 후, `style.css`에서 사용하고 싶은 곳에 `font-family`를 설정한다.

            `body { font-family: "Noto Sans KR"; font-size: var(--fontSize-1); color: var(--color-text); }`

    ➡localhost:8000 에서 Custom 상황 확인 가능

4.  Create Gatsby Blog Repository

    1. `${my github id}.github.io`라는이름으로 Repository 생성
    2. `rm -rf .git`
       `git init`
       `git add .`
       `git commit -m "Init blog project"`
       `git remote add origin https://github.com/${Github_ID}/${Git_Repository_Name}.git`
       `git push -u origin main`

    ➡설정한 블로그 주소에서 해당 Repository의 README.md 확인 가능

5.  Deploy

    1. 배포를 위한 “gh-pages” 브랜치 만들기
       : ‘main’에 배포 시 파일들이 변경되므로 따로 브랜치를 만들어서 관리
    2. ‘main’ 브랜치로 돌아가서 package.json의 script란에`"deploy": "gatsby build && gh-pages -d public -b gh-pages` 추가
    3. `npm run deploy`
       : main은 develop, gh-pages는 deploy 용도로 사용 가능
    4. **_Repository > Settings > Pages_**에서 소스 브랜치로 ‘gh-pages’ 선택

    ➡설정한 블로그 주소에서 자신의 블로그 확인 가능

6.  Auto Deploy

    1. **_Setting > Developer setting > Personal access token_** 에서 ‘repo’ 부분을 체크하고 토큰 생성
    2. **_Repository > Settings > Secrets > New repository secret_**에서 ‘Name’에 ACEESS_TOKEN, ‘Value’에 위에서 생성한 토큰 값을 입력 후 저장
    3. VS Code에서 .github/workflows/main.yml 파일 생성 후 저장

    ```
    name: Auto Deploy Project When Push Main Branch
    on:
      push:
        branches:
          - main
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout
          uses: actions/checkout@v1
        - name: Deploy
          uses: enriikke/gatsby-gh-pages-action@v2
          with:
            access-token: ${{ secrets.ACCESS_TOKEN }}
            deploy-branch: gh-pages
    ```

    ➡앞으로 push할 때마다 자동으로 배포
