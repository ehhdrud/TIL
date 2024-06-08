# Git

## 연동

1. `git init`
2. `git branch -M main`
3. `git add .`
4. `git commit -m "first commit"`
5. `git remote add origin https://github.com/ehhdrud/~.git`
6. `git push -u origin main`

## `git pull` 안될 때

- `git branch --set-upstream-to=origin/main main`

## 커밋 되돌리기

- `git reset --hard "번호"`

## 커밋 합치기

1. `git rebase -i HEAD~n`로 편집기 열기
2. 편집기 최상단에 위치한 커밋 pick, 나머지 아래 커밋 s로 설정 > esc + :wq > esq + :wq
3. `git commit --amend -m "새 커밋 메시지"`
4. `git push -f origin main `
