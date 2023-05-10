# Git

## 연동

1. `git init`
2. `git remote add origin @레파지토리주소@`
3. `git pull origin main`

## 브런치 이름 변경

`git branch -m master main`

## 커밋

1. `git add .`
2. `git commit -m "@커밋이름@"`
3. `git push -u origin main` (안될 때는 `git push origin +main`)

## 커밋 되돌리기

`git reset --hard @번호6개@`
