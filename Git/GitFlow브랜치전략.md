# GltFlow 브렌치 전략

1. main  
   : 출시될 수 있는 브렌치
2. develop  
   : 다음 출시 버전을 개발하는 브랜치
3. feature  
   : 기능을 개발하는 브랜치 (여기서 세부 기능을 개발하고 완성되면 develop에 merge)
4. release  
   : 다음 출시 버전을 준비하는 브랜치 (바로 main에 merge하기 전에 버그 수정, 작은 수정 사항 등을 이 브랜치에서 처리. 처리 후 main, develop에 merge)
5. hotfix  
   : 출시 버전에서 발생한 버그를 수정 하는 브랜치 (수정 후 main, develop에 merge)
