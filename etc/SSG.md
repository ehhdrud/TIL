## LAMP Stack, MEAN Stack, JAM Stack

웹페이지를 구축할 때 함께 쓰는 기술이 과거에는 Linux 운영체제, Apache 웹 서버, MySQL 데이터 베이스 관리 시스템, PHP/Python같은 프로그래밍 언어의 앞 글자들을 딴 LAMP Stack과 MongoDB, Express.js, Angular.js, Node.js 등의 자바스크립트 프레임워크를 이용한 MEAN Stack이 주를 이뤘다.

그 이후에 나온 JAM Stack은 JavaScript, API, Markup의 앞 글자를 딴 용어로 클라이언트 요청은 자바스크립트로 관리하고, DB나 서버 관련 기능은 API를 처리하고, Static Site Generator 등으로 마크업을 미리 만들어낸다는 개념을 담고 있다. 잼스택을 이용할 경우 백엔드 기술은 API로 분리하게 되는데 이 과정에서 DB나 서버로 발생하는 보안 취약점을 개선할 수 있다.

![jamstack](/img/jamstack.png)

## SSG(Static Site Generator)

Jam Stack의 생태계가 커지면서 정적 사이트 생성기인 SSG가 함께 성장한다. 이는 정적 페이지 기반 웹사이트를 만들어주는 도구로서, 콘텐츠와 파일을 읽고 이를 html로 변환해주는 기술이다. 정적 사이트는 주로 회사 소개 글이나 블로그 글 처럼 내용이 변하지 않는(DB를 사용하지 않는) 웹사이트고, 동적 사이트는 소셜 네트워크 댓글 창이나 쇼핑 검색 결과처럼 사용자마다 다르게 보이는 웹사이트이다.

![staticweb_and_dynamicweb](/img/staticweb_and_dynamicweb.png)
