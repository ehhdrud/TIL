# vercel 배포 시 Module not found ERROR

1. 깃에서 대소문자를 구분 하지 않아서, 수정한 폴더/파일명이 있다면 수정사항이 깃에는 반영되지 않음 -> vercel은 대소문자를 구분하기 때문에 경로 문제 발생

2. 프로젝트 터미널에서 `git config --global core.ignorecase false`를 입력하여 깃에서 대소문자를 구분하도록 설정
