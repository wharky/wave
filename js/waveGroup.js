import {module} from './module.js';

window.onload = () => {
    // 컬러 코드, 속도
    // 여러 개 겹쳐서 보이게 하려면, 각 각 모듈 객체를 생성하는 것이 아니라
    // Wave 배열 객체를 사용해야 하는 듯 하다.
     new module("#70db8c", 0.09);
}