캐러셀의 모바일 동작에서 사용자 환경을 개선하기 위해 아래와 같이 스와이프 동작을 추가하였다.

```js
let startX;
let startY;
let endX;
let endY;

carouselRefCurrent.addEventListener('touchstart', handleTouchStart, false);
carouselRefCurrent.addEventListener('touchmove', handleTouchMove, false);
carouselRefCurrent.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;

    if (event.touches.length >= 2) {
        startX = NaN;
        startY = NaN;
    }
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;

    const distanceX = endX - startX;
    const distanceY = endY - startY;
}

function handleTouchEnd() {
    const distanceX = endX - startX;
    const distanceY = endY - startY;

    newSetCarousel.setCurrentState({
        className: 'carousel-controls-previous',
    });

    newSetCarousel.setCurrentState({
        className: 'carousel-controls-next',
    });

    startX = NaN;
    startY = NaN;
    endX = NaN;
    endY = NaN;
}
```

스와이프는 잘 동작하였지만, 화면의 높이가 100vh가 넘을 경우 스와이프 동작 시 스크롤이 같이 움직여서 동작이 매끄럽지 않았다.

handleTouchMove와 handleTouchEnd에 아래와 같이 조건문을 추가하여 미세한 터치 이벤트에는 스크롤이 동작하지 않도록 방지함으로써 스와이프 동작을 개선하였다.

```js
function handleTouchMove(event) {
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;

    const distanceX = endX - startX;
    const distanceY = endY - startY;

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
        event.preventDefault();
    }
}

function handleTouchEnd() {
    const distanceX = endX - startX;
    const distanceY = endY - startY;

    if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 50) {
        newSetCarousel.setCurrentState({
            className: 'carousel-controls-previous',
        });
    } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < -50) {
        newSetCarousel.setCurrentState({
            className: 'carousel-controls-next',
        });
    }

    startX = NaN;
    startY = NaN;
    endX = NaN;
    endY = NaN;
}
```

우선 `event.preventDefault`를 통해 기본 동작인 스크롤을 방지하고 추가로 좌우 움직임(distanceX)이 50이상, -50이하일 경우에만 스와이프 기능이 동작하도록 한다. 이렇게 하면 스와이프 시 스크롤이 움직이지 않아 더 개선된 사용자 환경 제공이 가능하다.
