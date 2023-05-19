**Q**:

```js
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/gallery.css";
import { useHoveredIndex } from "../../HoveredIndexContext.js";

const arts = [
  {
    path: require("../../images/arts/image-V1VI-1.png"),
    artist: "V1VI",
    genre: "Collage Art",
  },
  {
    path: require("../../images/arts/image-P0LA-1.png"),
    artist: "P0LA",
    genre: "Pop Art",
  },
  {
    path: require("../../images/arts/image-R0RO-1.png"),
    artist: "R0RO",
    genre: "Pattern Fabric Art",
  },
  {
    path: require("../../images/arts/image-T0RI-1.png"),
    artist: "T0RI",
    genre: "Anime Art",
  },
  {
    path: require("../../images/arts/image-CHR1S-1.png"),
    artist: "CHR1S",
    genre: "Cubism",
  },
  {
    path: require("../../images/arts/image-ZER1-1.png"),
    artist: "ZER1",
    genre: "Pixel Art",
  },
  {
    path: require("../../images/arts/image-J1N-1.png"),
    artist: "J1N",
    genre: "Abstractism",
  },
  {
    path: require("../../images/arts/image-MIRR0R-1.png"),
    artist: "MIRR0R",
    genre: "Watercolor",
  },
  {
    path: require("../../images/arts/image-Paul0-1.png"),
    artist: "Paul0",
    genre: "Expressionism",
  },
  {
    path: require("../../images/arts/image-R1N-1.png"),
    artist: "R1N",
    genre: "Cyberpunk",
  },
];

export default function Gallery() {
  const { hoveredIndex, setHoveredIndex } = useHoveredIndex();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="gallery-container">
      {arts.map((art, index) => (
        <Link
          className="link"
          key={index}
          to={`/artist/${art.artist}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`art-card ${hoveredIndex === index ? "hovered" : ""}`}
          >
            <img
              className="art-img"
              src={art.path}
              alt={`${art.artist}'s artwork`}
            />
            <div className="art-desc">
              <div className="artist">{art.artist}</div>
              <div className="genre">{art.genre}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

```css
.gallery-container {
  width: max-content;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.gallery-container .link {
  width: max-content;
  text-decoration: none;
  color: black;
}

.art-card {
  width: max-content;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #333;
  border: 1px solid #444;
}

.art-card.hovered {
  border: 1px solid #666;
  box-shadow: 0px 0px 50px 1px rgb(0, 0, 0);
}

.art-card .art-img {
  width: 300px;
  height: 300px;
}

.art-card .art-desc {
  width: 297px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 3px;
}

.art-card .artist {
  margin-top: 0px;
  margin-bottom: 5px;
  text-align: left;
  font-size: 18px;
  color: rgba(255, 248, 220, 1);
  font-family: Helvetica;
  font-weight: bold;
}

.art-card .genre {
  text-align: left;
  font-size: 12px;
  color: rgba(255, 248, 220, 1);
  font-family: Helvetica;
}
```

이렇게 정의했는데, 1번 요소는 2번 요소보다 뒤에 있고, 2번 요소는 3번 요소보다 뒤에 있어. 이러한 현상은 10번 요소까지 반복돼. 이런 현상은 그림자가 다음 요소에 의해 가려지게 만들어서, 특정 방향의 그림자가 출력되지 않도록 만들어. 나는 이런 설정을 한적이 없는데 왜 이렇게 됐지? 원인을 파악해주고, 문제를 해결해줘.

**A**:
알겠습니다. 문제를 파악하고 해결하기 위해 조금 더 자세히 살펴보겠습니다.

주어진 코드를 보면, .gallery-container 클래스에 display: grid 속성이 적용되어 있고, .art-card 클래스에는 display: flex 속성이 적용되어 있습니다. 이는 그리드 레이아웃 내에서 각각의 아트 카드를 배치하는 방식입니다. 그러나 그리드 레이아웃에서 요소들은 순서대로 쌓이는 것이 아니라, 그리드의 구조에 따라 배치됩니다. 그래서 1번 요소가 2번 요소 뒤에, 2번 요소가 3번 요소 뒤에 등의 순서로 배치될 수 있습니다.

이런 경우, 1번 요소에 오른쪽 그림자가 다음 요소에 가려져 보이지 않게 되는 문제가 발생할 수 있습니다. 이 문제를 해결하기 위해서는 아트 카드 요소들을 그리드 구조에 맞춰 배치하는 동시에, 오른쪽 그림자가 다음 요소에 가려지지 않도록 z-index를 조절해야 합니다.

다음은 수정된 코드입니다:

```css
.gallery-container {
width: max-content;
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(2, 1fr);
}

.art-card {
position: relative; /_ 1. 포지션을 상대적으로 설정 _/
width: max-content;
overflow: hidden;
display: flex;
flex-direction: column;
background-color: #333;
border: 1px solid #444;
z-index: 1; /_ 2. 아트 카드가 다른 요소 위에 표시되도록 설정 _/
}

.art-card.hovered {
border: 1px solid #666;
box-shadow: 0px 0px 50px 1px rgb(0, 0, 0);
z-index: 2; /_ 3. hover 상태일 때 다른 요소 위에 표시되도록 설정 _/
}
```
