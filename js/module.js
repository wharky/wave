import {Wave} from './wave.js';

/*
    모듈에 대하여
    https://ko.javascript.info/modules-intro
*/
export class module{
    /* 생성자 */
    constructor(colorCode, speed){
        this.color =  colorCode;
        this.speed = speed;
        console.log(this.speed);
        /* canvas 엘리먼트 생성 */
        /* canvas는 getContext()를 이용해 그리기 함수를 사용할 수 있음. */
        this.canvas = document.createElement('canvas');
        
        /* 2d 렌더링 결과물을 얻기 위해 2d옵션을 줌.
            https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Basic_usage
        */
        this.ctx = this.canvas.getContext('2d');

        /* 현재 문서 body에 canvas를 append함. */
        document.body.appendChild(this.canvas);

         /* 사이즈가 변할 때 대응하기 위한 이벤트 리스너 
             추가 : once, passive, capture 등에 대한 설명
            http://sculove.github.io/blog/2016/12/29/addEventListener-passive/
            https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/
         */
        window.addEventListener('resize', this.resize.bind(this), {
            once: false,
            passive: false,
            capture: false,
        });

        /* 파도 객체 생성 */
        this.wave = new Wave();

        /* resize 함수 실행 */
        this.resize();

        /* requestAnimationFrame는 canvas, svg등 움직이는 애니메이션 구현에 이용함.
            setInterval과 비슷하게 매 초 간격으로 프레임을 렌더링해줌.
            https://blog.eunsatio.io/develop/JavaScript-window.requestAnimationFrame-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC
            https://css-tricks.com/using-requestanimationframe/
        */
        requestAnimationFrame(this.animate.bind(this));
    }

    /* 사이즈 변했을 때 실행 될 콜백 함수 */
    resize(){

        /* 레티나 디스플레이에서 올바른 화면을 보여주기 위해 설정 */
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        /* 캔버스의 크기를 스테이지의 2배로 잡음 */
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;

        /* 캔버스에서 1개의 픽셀이 2개씩 차지하도록 함 */
        this.ctx.scale(2, 2);

        /* 웨이브에도 리사이즈가 적용 되도록 설정 */
        this.wave.resize(this.stageWidth, this.stageHeight);
    }

    /* 애니메이션 관련 루틴 정의 */
    animate(t) {

        /* 지정된 사각 영역을 rgba(0, 0, 0, 0)의 색상으로 만듦 */
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        /* 애니메이션이 실행되면 웨이브가 그려지도록 설정 */
        this.wave.draw(this.ctx, this.color, this.speed);

        /* this를 바인드한 채로 애니메이션 프레임 요청 */
        requestAnimationFrame(this.animate.bind(this));
  }

}

