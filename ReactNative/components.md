## React Native의 Core Components

-   `<View>`, `<ViewGroup>`, `<UIView>` = `스크롤 기능이 없는 <div>`

-   `<Text>`, `<TextView>`, `<UITextView>` = `<p>`

-   `<Img>`, `<ImageView>`, `<UIImageView>` = `<img>`

-   `<TextInput>`, `<EditText>`, `<UITextField>` = `<input type="text">`

-   `<Scroll>`, `<ScrollView>`, `<UIScrollView>` = `스크롤 기능이 있는 <div>`

### `<TextInput>`

-   텍스트를 입력하는 입력란을 만든다.

-   `OnTextChange`, `OnSubmitEditing` 등의 속성을 통해 입력 텍스트가 변경될 때, 혹은 입력 텍스트가 제출될 때의 동작을 정의할 수 있다.

### `<ScrollView>`

-   다양한 Components와 Views를 담을 수 있는 스크롤 컨테이너를 만든다.

-   내부 요소는 heterogeneous한 특징을 가지므로, 다른 형태의 데이터도 가능하다.

-   `horizontal` 속성을 통해 수평 스크롤을 만들 수 있다.

-   화면에 보이지 않는 요소도 미리 렌더링한다.

-   iOS에서는 한 요소만 담아두고 내용을 확대해서 보는 방식으로 활용 가능

### `ListView`

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

## 그 외 컴포넌트

### `<StatusBar>`

-   style 속성을 통해 화면 상단의 상태 표시줄의 스타일을 설정하는 컴포넌트이다.

### `<SafeAreaView>`

-   iOS 11 이상이 설치된 아이폰에서 둥근 테두리나 카메라 노치를 고려하여 뷰를 렌더링하는 컴포넌트이다.

### `<TouchableOpacity>`

-   리액트 네이티브에서 Button 컴포넌트를 대체하는 컴포넌트이다. Button 컴포넌트는 안드로이드와 ios에서 다르게 보이기 때문에 관리하는데에 어려움이 있다.
-   onPress 속성을 통해 터치 이벤트에 대한 이벤트 핸들러를 등록한다.
