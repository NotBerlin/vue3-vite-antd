import TRTCCalling from 'trtc-calling-js';
import eventEmitter from '../../../plugin/bus'

export default class TrtcClient {
  constructor(options) {
    this.trtcCalling = null;
    this.tim = null;
    this.userID = ''
    this.userSig = ''
    this.remoteUserID = ''
    this.isStartLocalView = false
    this.isStartRemoteView = false
    this.createClient(options.SDKAppID);
  }
  createClient (SDKAppID) {
    let options = {
      SDKAppID // 接入时需要将0替换为您的云通信应用的 SDKAppID
    };
    this.trtcCalling = new TRTCCalling(options);
    this.tim = this.trtcCalling._timClient._tim
    this.trtcCalling.setLogLevel(0);
    this.handleEventTRTCCALLINGClient()
    this.handleEventTIMClient()
    return this.trtcCalling;
  }
  loginClient (options) {
    this.userID = options.userID
    this.userSig = options.userSig
    let promise = this.trtcCalling.login({ userID: options.userID, userSig: options.userSig });
    promise.then(() => {
      //success
      console.log('TRTCCALLING 登录成功')
      eventEmitter.emit('login-success')
    }).catch(error => {
      console.warn('login error:', error)
    });
  }
  logoutClient () {
    let promise = this.trtcCalling.logout();
    promise.then(() => {
      //success
      console.log('TRTCCALLING 登出成功')
    }).catch(error => {
      console.warn('logout error:', error)
    });
  }
  callClient (options) {
    this.remoteUserID = options.userID
    let promise = this.trtcCalling.call({ userID: options.userID, type: 2, timeout: 0 });
    promise.then((res) => {
      //success
      console.log('拨打了' + options.userID + '电话')
      eventEmitter.emit('call-success')
      // this.openCameraClient.apply(this)
      // this.startLocalViewClient.apply(this)
    }).catch(error => {
      console.warn('call error:', error)
    });
  }
  groupCallClient (options) {
    let promise = this.trtcCalling.groupCall({ userIDList: options.userIDList, type: 1, groupID: '群组 ID' });
    promise.then(() => {
      //success
      console.log('拨打了' + options.userIDList + '群组电话')
    }).catch(error => {
      console.warn('groupCall error:', error)
    });
  }
  acceptClient ({ inviteID, sponsor, inviteData }) {
    let promise = this.trtcCalling.accept({ inviteID: inviteID, roomID: inviteData.roomID, callType: inviteData.callType });
    promise.then(() => {
      eventEmitter.emit('accept-success')
      // this.openCameraClient.apply(this)
      this.startLocalViewClient.apply(this)
    }).catch(error => {
      console.warn('accept error:', error);
    });
  }
  hangupClient () {
    console.log('取消电话/挂断电话')
    this.trtcCalling.hangup();
  }
  startRemoteViewClient () {
    let promise = this.trtcCalling.startRemoteView({ userID: this.remoteUserID, videoViewDomID: 'remote_video' });
    promise.then(() => {
      //success
      console.log('打开远程视频成功')
    }).catch(error => {
      console.warn('startRemoteView error:', error)
    });
  }
  stopRemoteViewClient () {
    this.trtcCalling.stopRemoteView({ userID: this.remoteUserID, videoViewDomID: 'remote_video' });
  }
  startLocalViewClient () {
    let promise = this.trtcCalling.startLocalView({ userID: this.userID, videoViewDomID: 'local_video' });
    promise.then(() => {
      //success
      console.log('打开本地视频成功')
    }).catch(error => {
      console.warn('startLocalView error:', error)
    });
  }
  stopLocalViewClient () {
    this.trtcCalling.stopLocalView({ userID: this.userID, videoViewDomID: 'local_video' });
  }
  openCameraClient () {
    this.trtcCalling.openCamera();
  }
  closeCameraClient () {
    this.trtcCalling.closeCamera();
  }
  setMicMuteClient (isMute) {
    this.trtcCalling.setMicMute(true) // 开启麦克风
  }
  onErrorClient () { }
  onInvitedClient ({ inviteID, sponsor, inviteData }) {
    this.remoteUserID = sponsor
    this.acceptClient({ inviteID, sponsor, inviteData })
  }
  onUserEnterClient () {
    this.startLocalViewClient()
    this.startRemoteViewClient()
  }
  onUserLeaveClient () {
    eventEmitter.emit('leave')
    this.stopLocalViewClient()
    this.stopRemoteViewClient()
  }
  onRejectClient () {
    eventEmitter.emit('reject')
  }
  onInviteeLineBusyClient () { }
  onCallingCancelClient () { }
  onKickedOutClient () { }
  onCallingTimeoutClient () { }
  onNoRespClient () { }
  onCallingEndClient () { }
  onUserVideoAvailableClient () { }
  onUserAudioAvailableClient () { }
  handleEventTRTCCALLINGClient () {
    // sdk内部发生了错误
    this.trtcCalling.on(TRTCCalling.EVENT.ERROR, this.onErrorClient)
    // 被邀请进行通话
    this.trtcCalling.on(TRTCCalling.EVENT.INVITED, this.onInvitedClient, this)
    // 远端用户同意进入通话
    this.trtcCalling.on(TRTCCalling.EVENT.USER_ENTER, this.onUserEnterClient, this)
    // 远端用户离开通话
    this.trtcCalling.on(TRTCCalling.EVENT.USER_LEAVE, this.onUserLeaveClient, this)
    // 被邀请方拒绝通话
    this.trtcCalling.on(TRTCCalling.EVENT.REJECT, this.onRejectClient, this)
    // 被邀请方忙线
    this.trtcCalling.on(TRTCCalling.EVENT.LINE_BUSY, this.onInviteeLineBusyClient)
    // 邀请方取消了通话邀请，作为被邀请方会收到
    this.trtcCalling.on(TRTCCalling.EVENT.CALLING_CANCEL, this.onCallingCancelClient)
    // 因为多实例登录或者多终端登录被被踢出im系统
    this.trtcCalling.on(TRTCCalling.EVENT.KICKED_OUT, this.onKickedOutClient)
    // 超时
    this.trtcCalling.on(TRTCCalling.EVENT.CALLING_TIMEOUT, this.onCallingTimeoutClient)
    // 邀请后对端无应答
    this.trtcCalling.on(TRTCCalling.EVENT.NO_RESP, this.onNoRespClient)
    // 本次通话结束了
    this.trtcCalling.on(TRTCCalling.EVENT.CALLING_END, this.onCallingEndClient)
    // 远端用户开启/关闭了摄像头
    this.trtcCalling.on(TRTCCalling.EVENT.USER_VIDEO_AVAILABLE, this.onUserVideoAvailableClient)
    // 远端用户开启/关闭了麦克风
    this.trtcCalling.on(TRTCCalling.EVENT.USER_AUDIO_AVAILABLE, this.onUserAudioAvailableClient)
  }
  handleEventTIMClient () { }
}