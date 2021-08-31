import TRTCCalling from 'trtc-calling-js';

export default class TrtcClient {
  constructor(options) {
    this.trtcCalling = null;
    this.userID = ''
    this.userSig = ''
    this.remoteUserID = ''
    this.createClient(options.SDKAppID);
  }
  createClient (SDKAppID) {
    let options = {
      SDKAppID // 接入时需要将0替换为您的云通信应用的 SDKAppID
    };
    this.trtcCalling = new TRTCCalling(options);
    this.trtcCalling.setLogLevel(0);
    this.handleEvent()
    return this.trtcCalling;
  }
  login (options) {
    this.userID = options.userID
    this.userSig = options.userSig
    let promise = this.trtcCalling.login({ userID: options.userID, userSig: options.userSig });
    promise.then(() => {
      //success
      console.log('TRTCCALLING 登录成功')
    }).catch(error => {
      console.warn('login error:', error)
    });
  }
  logout () {
    let promise = this.trtcCalling.logout();
    promise.then(() => {
      //success
      console.log('TRTCCALLING 登出成功')
    }).catch(error => {
      console.warn('logout error:', error)
    });
  }
  call (options) {
    this.remoteUserID = options.userID
    let promise = this.trtcCalling.call({ userID: options.userID, type: 1, timeout: 0 });
    promise.then(() => {
      //success
      console.log('拨打了' + options.userID + '电话')
    }).catch(error => {
      console.warn('call error:', error)
    });
  }
  groupCall (options) {
    let promise = this.trtcCalling.groupCall({ userIDList: options.userIDList, type: 1, groupID: '群组 ID' });
    promise.then(() => {
      //success
      console.log('拨打了' + options.userIDList + '群组电话')
    }).catch(error => {
      console.warn('groupCall error:', error)
    });
  }
  hangup () {
    console.log('取消电话/挂断电话')
    this.trtcCalling.hangup();
  }
  startRemoteView () {
    let promise = this.trtcCalling.startRemoteView({ userID: this.remoteUserID, videoViewDomID: 'remote_video' });
    promise.then(() => {
      //success
      console.log('打开远程视频成功')
    }).catch(error => {
      console.warn('startRemoteView error:', error)
    });
  }
  stopRemoteView () {
    this.trtcCalling.stopRemoteView({ userID: this.remoteUserID, videoViewDomID: 'remote_video' });
  }
  startLocalView () {
    let promise = this.trtcCalling.startLocalView({ userID: this.userID, videoViewDomID: 'local_video' });
    promise.then(() => {
      //success
      console.log('打开本地视频成功')
    }).catch(error => {
      console.warn('startLocalView error:', error)
    });
  }
  stopLocalView () {
    this.trtcCalling.stopLocalView({ userID: this.userID, videoViewDomID: 'local_video' });
  }
  openCamera () {
    this.trtcCalling.openCamera();
  }
  closeCamera () {
    this.trtcCalling.closeCamera();
  }
  setMicMute (isMute) {
    this.trtcCalling.setMicMute(true) // 开启麦克风
  }
  onError () { }
  onInvited () { }
  onUserEnter () { }
  onUserLeave () { }
  onReject () { }
  onInviteeLineBusy () { }
  onCallingCancel () { }
  onKickedOut () { }
  onCallingTimeout () { }
  onNoResp () { }
  onCallingEnd () { }
  onUserVideoAvailable () { }
  onUserAudioAvailable () { }
  handleEvent () {
    // sdk内部发生了错误
    this.trtcCalling.on(TRTCCalling.EVENT.ERROR, this.onError)
    // 被邀请进行通话
    this.trtcCalling.on(TRTCCalling.EVENT.INVITED, this.onInvited)
    // 远端用户同意进入通话
    this.trtcCalling.on(TRTCCalling.EVENT.USER_ENTER, this.onUserEnter)
    // 远端用户离开通话
    this.trtcCalling.on(TRTCCalling.EVENT.USER_LEAVE, this.onUserLeave)
    // 被邀请方拒绝通话
    this.trtcCalling.on(TRTCCalling.EVENT.REJECT, this.onReject)
    // 被邀请方忙线
    this.trtcCalling.on(TRTCCalling.EVENT.LINE_BUSY, this.onInviteeLineBusy)
    // 邀请方取消了通话邀请，作为被邀请方会收到
    this.trtcCalling.on(TRTCCalling.EVENT.CALLING_CANCEL, this.onCallingCancel)
    // 因为多实例登录或者多终端登录被被踢出im系统
    this.trtcCalling.on(TRTCCalling.EVENT.KICKED_OUT, this.onKickedOut)
    // 超时
    this.trtcCalling.on(TRTCCalling.EVENT.CALLING_TIMEOUT, this.onCallingTimeout)
    // 邀请后对端无应答
    this.trtcCalling.on(TRTCCalling.EVENT.NO_RESP, this.onNoResp)
    // 本次通话结束了
    this.trtcCalling.on(TRTCCalling.EVENT.CALLING_END, this.onCallingEnd)
    // 远端用户开启/关闭了摄像头
    this.trtcCalling.on(TRTCCalling.EVENT.USER_VIDEO_AVAILABLE, this.onUserVideoAvailable)
    // 远端用户开启/关闭了麦克风
    this.trtcCalling.on(TRTCCalling.EVENT.USER_AUDIO_AVAILABLE, this.onUserAudioAvailable)
  }
}