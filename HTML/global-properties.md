# 전역 속성

## 1. `id` 속성

요소에 문서 전체에서 유일한 고유 식별자를 정의한다.

문서 전체에서 단 하나만 정의할 수 있다.

속성값의 첫글자는 영문으로 시작하고 값에 공백이 들어가선 안된다. `-`, `_`, `.`를 제외한 특수문자는 사용하지 않는 것이 권장된다.

## 2. `class` 속성

`id`와 마찬가지로, 식별자 역할을 하는 속성이다. 여러 개의 요소가 같은 클래스를 가질 수 있고 하나의 요소가 여러 개의 클래스를 가질 수도 있다.

하나의 요소가 여러개의 클래스를 가질 때, 문자열 안의 각 클래스는 `spacing`으로 구분한다.

## 3. `style` 속성

요소에 적용할 CSS 스타일 선언을 정의한다.

문서 전체에 적용하는 `<style>`과 마찬가지로 권장되지 않는다. 테스트 용도로 사용하기에 적합하다.

## 4. `title` 속성

출력 요소에 마우스를 올릴 경우 요소와 관련된 추가 정보를 제공하는 텍스트를 나타낸다.

부모 요소와 자식 요소에 모두 `title`이 적용되어 있는 경우, 자식 요소에 마우스를 올렸을 경우 자식 요소에 적용된 `title`의 텍스트가 출력된다.

줄바꿈을 인식하며 이를 이용해 여러 줄 표현이 가능하다.

## 5. `lang` 속성

텍스트가 사용하는 언어를 정의한다.

속성값의 키워드로 `en`, `ko` 등이 있다.

제대로 정의를 해주어야 스크린 리더 등을 사용할 때 웹 접근성을 높여 더 원활하게 작동한다.

`<html>`에 속성을 정의하여 문서 전체에 적용하고 일부 다른 언어가 있다면 해당 요소에 부분적으로 적용하도록 한다.

## 6. `data-*` 속성

요소 내의 정보를 최종 사용자에게는 보여지지 않게 하고 싶지만 자바스크립트(또는 CSS)가 이 정보를 읽을 수 있게 하기 위한 사용자 정의 속성이다.

HTML5의 특정 요소와 관련이 있지만 확정된 의미를 갖지 않는 데이터에 대한 확장 가능성을 염두해두고 디자인되었다.

## 7. `draggable` 속성

드래그 가능 여부를 나타내는 열거형 특성이다.

요소마다 기본값이 다르기 때문에 `true` 혹은 `false`를 명시해주는 것이 권장된다.

## 8. `hidden` 속성

브라우저는 해당 속성이 적용된 요소를 렌더링하지 않는다.

개발자 도구를 통해 해당 요소를 확인할 수 있기 때문에 보안 목적으로 사용하지는 않는다.
