# 임베디드 콘텐츠

## 1. `<img>`

속성값을 이용해 이미지를 나타낸다.

### 1.1. 이미지 속성

#### 1.1.1. `src` 속성

포함하고자 하는 이미지 경로를 지정하는 필수 속성이다. 절대 경로나 상대 경로 모두 가능하다.

#### 1.1.2.`alt` 속성

대체 텍스트를 지정하는 필수 속성이다. 스크린 리더는 `alt` 속성값을 읽어 사용자에게 이미지를 설명한다. 속성값이 비워져있더라도 필수적으로 기입해야한다.

#### 1.1.3. `title` 속성

은 사진에 마우스를 올려놨을 때 보여지는 텍스트를 지정한다.

#### 1.1.4. `width`, `height` 속성

`width` 속성으로 가로 길이를, `height` 속성으로 세로 길이를 정의할 수 있다. 둘 중 하나만 조작한다면 나머지도 자동 변환된다.

### 1.2. 웹에서 사용하는 이미지 유형

HTML 표준은 지원해야 하는 이미지 형식을 명시하고 있지 않으므로, 각각의 웹 브라우저마다 지원하는 이미지 형식을 알아둘 필요가 있다.

- **JPEG**(.jpg, .jpeg···): 정지된 이미지에 적합하다. 압축률(용량)에 있어 이점이 있다.
- **PNG**(.png): 정지된 이미지에 적합하다. 화질 그리고 투명도 적용에 이점이 있다.
- **GIF**(.gif): 움직이는 이미지에 적합하다. 지원되는 색상 범위가 작다는 단점이 있다.
- **WEBP**(.webp): 구글에서 만든 이미지 포멧으로, 압축률, 화질 모두 우수하지만 지원 브라우저가 제한적이다.
- **SVG**(.svg): 위 유형(격자로 이루어진 레스터 이미지)과는 다르게 직선으로 이루어진 벡터 이미지이다. 아이콘이나 그래프같은 UI 요소를 나타내기에 적합하다.

### 1.3. 반응형 이미지

반응형 이미지란 사용자의 viewport에 따라서 변경되는 이미지이다.

#### 1.3.1. `srcset` 속성

반응형 이미지를 정의한다.

쉼표로 구분하는 한 개 이상의 문자열 목록을 가진다.

각각의 문자열의 구성요소는 이미지의 URL을 필수적으로 가지고, 너비 서술자(양의 정수와 바로 뒤의 `w`문자), 픽셀 밀도 서술자(양의 실수와 바로 뒤의 `x`문자)를 선택적으로 가진다.

```html
<img
  src="imeges/"
  srcset="imeges/small.png 300w, imeges/medium.png 450w, imeges/large.png 600w"
  alt="responsive imege"
/>
```

#### 1.3.2. `sizes`속성

viewport가 커짐에 따라 이미지가 확대되는 것을 방지하기 위해 이미지를 의도한 값으로 고정한다.

크기를 나타내는 쉼표로 구분하는 한 개 이상의 문자열 목록을 가진다.

```html
<img
  src="imeges/"
  srcset="imeges/small.png 300w, imeges/medium.png 450w, imeges/large.png 600w"
  sizes="(min-width: 600px) 600px, (min-width:450px) 450px, 300px"
  alt="responsive imege"
/>
```

## 2. `<video>`

이미지와 마찬가지로 `src`속성을 통해 절대경로나 상대경로를 입력해 비디오를 나타낸다. `width`,`height`속성도 동일하게 사용할 수 있다.

`src` 대신 자식 요소로 `<source>`를 사용해도 된다. `<source src="">`형태로 사용하고, 닫는 태그는 없다.

한 개 이상의 비디오 소스를 지정할 수 있다. 첫 번째 소스가 지원 가능한 형식이라면 그대로 나타내고, 지원 불가능하다면 다음 소스를 탐색한다.

### 2.1. 그 외 비디오 속성

#### 2.1.1. `controls` 속성

비디오를 조작할 수 있는 컨트롤러를 제공한다.

#### 2.1.2. `autoplay` 속성

비디오를 자동 재생시킨다. 다만 비디오가 소리를 가지고 있다면 브라우저에서 자동 재생을 제한할 수도 있다.

#### 2.1.3. `muted` 속성

비디오의 소리를 없앤다. 자동 재생을 사용하고자 할 때 유용하다.

#### 2.1.4. `loop` 속성

비디오를 반복 재생시킨다.

#### 2.1.5. `poster` 속성

재생하기 전 출력되는 화면을 설정한다. 이 속성이 없다면 비디오의 첫 번째 프레임을 출력한다.

```html
<video
  src="/videos/sample_video.mp4"
  controls
  autoplay
  muted
  loop
  poster="/imeges/small.png"
>
  Sorry, your browser doesn't support embedded videos.
  <!--해당 형식을 지원하지 않는 브라우저일 때 출력되는 문구-->
</video>
```

## 3. `<audio>`

`src` 대신 자식 요소로 `<source>`를 사용해도 된다. `<source src="">`형태로 사용하고, 닫는 태그는 없다.

한 개 이상의 오디오 소스를 지정할 수 있다. 첫 번째 소스가 지원 가능한 형식이라면 그대로 나타내고, 지원 불가능하다면 다음 소스를 탐색한다.

`constrols`, `autoplay`, `muted`, `loop` 등, `<video>`에서 사용하는 속성들을 사용할 수 있다. `autoplay` 속성은 비디오와 마찬가지로 소리가 없을 경우에만 동작한다.

```html
<audio src="/audios/sample_audio.mp3" controls autoplay muted loop>
  Sorry, your browser doesn't support embedded audios.
</audio>
```

## 4. `<canvas>`

그래픽 캔버스 요소로, 그래픽과 애니메이션을 그릴 수 있다.

HTML으로는 가로, 세로 길이 정도만 마크업을 할 수 있고 세부적인 마크업은 자바스크립트를 이용해야 한다.

## 5. `<iframe>`

인라인 프레임 요소로, 창 안에 다른 HTML 문서를 삽입할 수 있다.

문서를 가져오기 위해 API KEY 등이 필요하다.