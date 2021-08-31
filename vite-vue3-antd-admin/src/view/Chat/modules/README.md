## trtccalling 引入
// 为了减小 trtc-calling-js.js 的体积，避免和接入侧已使用的 trtc-js-sdk 和 tim-js-sdk 以及 tsignaling 发生版本冲突
// trtc-js-sdk 和 tim-js-sdk 以及 tsignaling 不再被打包到 trtc-calling-js.js，在使用前您需要手动安装依赖。
```js
npm i trtc-js-sdk --save
npm i tim-js-sdk --save
npm i tsignaling --save
npm i trtc-calling-js --save
```
// 如果您通过 script 方式使用 trtc-calling-js，需要按顺序先手动引入 trtc.js
<script src="./trtc.js"></script>

// 接着手动引入 tim-js.js
<script src="./tim-js.js"></script>

// 然后手动引入 tsignaling.js
<script src="./tsignaling.js"></script>

// 最后再手动引入 trtc-calling-js.js
<script src="./trtc-calling-js.js"></script>

## 创建
```js
let options = {
  SDKAppID: 0 // 接入时需要将0替换为您的云通信应用的 SDKAppID
};
let trtcCalling = new TRTCCalling(options);
```