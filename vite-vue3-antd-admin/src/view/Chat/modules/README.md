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

// 测试使用账号
```js
{
  userID: '123456',
  userSig: 'eJwtzNsKgkAUheF3mVtD9hz2KEIXSoREJ7C6T2aUrVmeCCF690y9XN*C-8Mu*8R925YFTLjAVtMmY589ZTQxF1KhXp7OlPe6JsMCrgBQeoqL*bFDTa0dHREFAMzaU-U3LUEB*ohLhfIx3BehjHfxcC5PR9P4h8pxmlRsIn1V*tG*slu*TcMi44nXrdn3B7alMB4_'
}

{
  SDKAppID: 1400537412,
  userSig: 'eJw1zF0LgjAUxvHvsttCjptnkdBtBHVjilR3kts6jHLMl6zou2dal8-vgf*LZbs06JRnMeMBsPm4qVS3hjSN3NbK-4*6tIVzVLI4jABQLKKQT4-qHXk1OCJyAJi0oevXpIAIpFzir0Jm6GYPs34mW5ue70ff5Vbwvt2fVHHY6EaLBK295J1OKjOrVuz9AT1VMqM_'
}
```

### VideoPopup
```js
// 使用trtcCalling的时候，配合使用eventEmitter
// 接受参数
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
// 组件事件
defineEmits(['join', 'leave'])
// 事件调用emit
function acceptSuccess (e) {
  emit('update:show', true)
  emit('join', {
    type: 'accept',
    msg: '接受视频邀请',
    data: {}
  })
}

function leave () {
  emit('update:show', false)
  emit('leave', {
    type: 'leave',
    msg: '离开视频房间',
    data: {}
  })
}

function reject () {
  state.show = false;
}
```