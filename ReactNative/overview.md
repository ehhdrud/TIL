# React Native

-   JavaScript와 React를 사용하여 모바일 애플리케이션을 개발하는데 사용되는 오픈 소스 프레임워크로, 하나의 코드 베이스로 iOS 및 Android 플랫폼에 대한 네이티브 앱을 개발할 수 있다.

-   React의 핵심 컨셉트인 Components, JSX, props, state를 사용한다.

> **React와 React Native의 주요 차이점**
>
> 1. React는 화면 출력 시 ReactDom을 사용하지만, React Native는 AppRegistry를 사용한다.
> 2. React Native는 HTML 문법을 사용하지 않고, Components를 사용한다.
> 3. React Native는 기존의 CSS를 지원하지 않는다. 대신 JS 파일 안에서 StyelSheet라는 것을 사용한다.

## React Native의 Core Components

-   `<View>`, `<ViewGroup>`, `<UIView>` = `스크롤 기능이 없는 <div>`

-   `<Text>`, `<TextView>`, `<UITextView>` = `<p>`

-   `<Img>`, `<ImageView>`, `<UIImageView>` = `<img>`

-   `<TextInput>`, `<EditText>`, `<UITextField>` = `<input type="text">`

-   `<Scroll>`, `<ScrollView>`, `<UIScrollView>` = `스크롤 기능이 있는 <div>`

### TextInput

-   텍스트를 입력하는 입력란을 만든다.

-   `OnTextChange`, `OnSubmitEditing` 등의 속성을 통해 입력 텍스트가 변경될 때, 혹은 입력 텍스트가 제출될 때의 동작을 정의할 수 있다.

### ScrollView

-   다양한 Components와 Views를 담을 수 있는 스크롤 컨테이너를 만든다.

-   내부 요소는 heterogeneous한 특징을 가지므로, 다른 형태의 데이터도 가능하다.

-   `horizontal` 속성을 통해 수평 스크롤을 만들 수 있다.

-   화면에 보이지 않는 요소도 미리 렌더링한다.

-   iOS에서는 한 요소만 담아두고 내용을 확대해서 보는 방식으로 활용 가능

### ListView

-   데이터 리스트를 나타내는 컴포넌트로, `<FlatList>`와 `<SectionList>`가 있다.

-   내부 요소는 homoogeneous한 특징을 가지므로, 같은 형태의 데이터여야 한다.

-   `horizontal` 속성을 통해 수평 스크롤을 만들 수 있다.

-   화면에 보이지 않는 요소는 렌더링하지 않는다.

#### `<FlatList>`

-   선형 데이터 리스트를 나타내는 컴포넌트이다.

-   `data`와 `renderItem`이라는 props를 요구한다.

#### `<SectionList>`

-   섹션별로 그룹화된 리스트를 나타내는 컴포넌트이다.

-   `sections`와 `renderItem`이라는 props를 요구한다. `sections`에는 `title`과 `data` key가 포함되어야 한다. (data는 이름 변경하면 안되고 title은 다른 이름 사용 가능!)
