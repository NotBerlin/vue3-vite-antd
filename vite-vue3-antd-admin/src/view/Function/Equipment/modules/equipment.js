import typeTransform from './../../../../utils/typeTransform'
import download from './../../../../utils/download'

var mediaVideo = null, mediaAduio = null
var { dataBase64toBlob, dataBlobtoURL, dataBase64toFile } = typeTransform, { downloadFile } = download

function openAudio () {
  // 参数
  // let constraints = {audio: true, video: true}; // 请求不带任何参数的音频和视频
  // 请求音频
  let constraintsVideo = { audio: true };
  let mediaStream = navigator.mediaDevices.getUserMedia(constraintsVideo);
  mediaStream.then((stream) => {
    mediaAduio = stream
    stopAudio()
    // console.info('打开成功!')
    // let audioContext = new AudioContext();
    // // 创建一个新的音视频对象
    // let destination = audioContext.createMediaStreamDestination();
    // // 创建音视频源
    // let mediaStreamSource = audioContext.createMediaStreamSource(stream);
    // // 将音视频源 链接 到新音视频对象 中
    // mediaStreamSource.connect(destination);
    // // 媒体录制接口
    // let mediaRecorder = new MediaRecorder(destination.stream, { audioBitsPerSecond: 16000 });
    // let chunks = [];
    // // 有可用数据流时触发，e.data即需要的音视频数据
    // mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    // // 间视频录制结束时触发
    // mediaRecorder.onstop = () => {
    //   // 通过Blob数据块, 合成完整的Blob块数据
    //   let blob = new Blob(chunks, { 'type': 'audio/mpeg' });
    //   // 通过Blob合建对象URL本地地址
    //   let url = URL.createObjectURL(blob);
    //   // 绑定到 audio 元素上
    //   this.$refs.recordPlayer.src = url;
    // };
    // // 將 mediaRecorder 对象扔到全局this中, 用于其他方法调用
    // this.$mediaRecorder = mediaRecorder;
    // // 录制开始
    // mediaRecorder.start();
  }, () => {
    console.log('打开失败!');
  });
}

function openVideo (playConfig = {
  width: 400,
  height: 400,
  play: false,
  videoID: '',
  audio: false
}) {
  // 视频
  // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
  // 使用getUserMedia，因为它会覆盖现有的属性。
  // 这里，如果缺少getUserMedia属性，就添加它。
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      // 首先获取现存的getUserMedia(如果存在)
      var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      // 有些浏览器不支持，会返回错误信息
      // 保持接口一致
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }
      //否则，使用Promise将调用包装到旧的navigator.getUserMedia
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }
  if (playConfig.audio == undefined || typeof playConfig.audio != 'boolean') {
    alert('playConfig.audio is undefined!!')
    return false
  }
  if (!playConfig.width || playConfig.width == 0 || typeof playConfig.width != 'number') {
    alert('playConfig.width is undefined!!')
    return false
  }
  if (!playConfig.height || playConfig.width == 0 || typeof playConfig.height != 'number') {
    alert('playConfig.height is undefined!!')
    return false
  }
  var constraints = {
    audio: playConfig.audio,
    video: {
      width: playConfig.width,
      height: playConfig.height
    }
  }
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      mediaVideo = stream
      if (playConfig.play) {
        if (!playConfig.videoID || playConfig.videoID == '' || typeof playConfig.videoID != 'string') {
          alert('videoID is undefined!!')
          return false
        }
        var videoCover = document.getElementById(playConfig.videoID);
        let flag = false, list = videoCover.children, video
        if (videoCover.childElementCount != 0) {
          for (const key in list) {
            if (list[key].tagName == 'VIDEO') {
              flag = true
              video = list[key]
            }
          }
        }
        if (videoCover.childElementCount == 0 || !flag) {
          video = document.createElement('video');
          videoCover.appendChild(video);
        }
        // 旧的浏览器可能没有srcObject
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          //避免在新的浏览器中使用它，因为它正在被弃用。
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function (e) {
          video.play();
        };
        return true
      }
      stopVideo()

    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
}


function stopVideo () {
  mediaVideo.getTracks().forEach(item => {
    if (item.kind == 'video') {
      item.stop()
    }
  })
}

function stopAudio () {
  mediaVideo.getTracks().forEach(item => {
    if (item.kind == 'audio') {
      item.stop()
    }
  })
}

function photograph (photographConfig = {
  download: true,
  name: '我的帅照',
  show: false,
  imageID: ''
}) {
  var canvas = document.createElement('canvas')
  canvas.setAttribute('width', '400px')
  canvas.setAttribute('height', '400px')
  canvas.style.display = 'none'
  var context = canvas.getContext("2d")
  var date = new Date().getTime();

  var video = document.querySelector('video');
  if (!video) {
    alert('没有可以拍照的视频')
    return false
  }
  // 点击，canvas画图
  context.drawImage(video, 0, 0, 400, 400);
  // 获取图片base64链接
  var image = canvas.toDataURL('image/png');
  
  try {
    if (photographConfig.download) {
      let blob = dataBase64toBlob(image)
      let url = dataBlobtoURL(blob)
      downloadFile(url, photographConfig.name)
    }
  } catch (error) {
    alert('下载图片失败，请重试')
  }
  try {
    if (photographConfig.show) {
      if (!photographConfig.imageID || photographConfig.imageID == '' || typeof photographConfig.imageID != 'string') {
        alert('photographConfig.imageID is undefined!!')
        return false
      }
      var imageCover = document.getElementById(photographConfig.imageID);
      let flag = false, list = imageCover.children, imageDom
      if (imageCover.childElementCount != 0) {
        for (const key in list) {
          if (list[key].tagName == 'IMG') {
            flag = true
            imageDom = list[key]
          }
        }
      }
      if (imageCover.childElementCount == 0 || !flag) {
        // 定义一个img
        var img = new Image();
        //设置属性和src
        img.src = image;
        imageCover.appendChild(img);
      } else {
        imageDom.src = image;
      }
    }
  } catch (error) {
    alert('展示图片失败，请重试')
  }
};

export default {
  openAudio,
  openVideo,
  stopAudio,
  stopVideo,
  photograph
}