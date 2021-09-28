import TIM from 'tim-js-sdk/tim-js-friendship.js';
import TIMUploadPlugin from 'tim-upload-plugin';
import eventEmitter from '../../../plugin/bus'

export default class TimFriendClient {
  constructor(options) {
    this.timFriendClient = null;
    this.userID = ''
    this.userSig = ''
    this.createClient(options.SDKAppID);
  }
  createClient (SDKAppID) {
    this.timFriendClient = TIM.create({ SDKAppID })
    this.timFriendClient.setLogLevel(0);
    this.handleListnerEvent()
    this.handleErrorEvent()
    this.handleUploadEvent()
  }
  loginClient (options) {
    let promise = this.timFriendClient.login({ userID: options.userID, userSig: options.userSig });
    promise.then(function (imResponse) {
      console.log(imResponse.data); // 登录成功
      if (imResponse.data.repeatLogin === true) {
        // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
        console.log(imResponse.data.errorInfo);
      }
    }).catch(function (imError) {
      console.warn('login error:', imError); // 登录失败的相关信息
    });
  }
  logoutClient () {
    let promise = this.timFriendClient.logout();
    promise.then(function (imResponse) {
      console.log(imResponse.data); // 登出成功
    }).catch(function (imError) {
      console.warn('logout error:', imError);
    });
  }
  destoryClient () {
    this.timFriendClient.destroy();
  }
  createTextMessage (options) {
    // 发送文本消息，Web 端与小程序端相同
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message = this.timFriendClient.createTextMessage({
      to: options.to,
      conversationType: TIM.TYPES.CONV_C2C,
      // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
      // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload: {
        text: options.text
      },
      // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
      // cloudCustomData: 'your cloud custom data'
    });
    // 2. 发送消息
    let promise = tim.sendMessage(message);
    promise.then(function (imResponse) {
      // 发送成功
      console.log(imResponse);
    }).catch(function (imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
    });
  }
  handleUploadEvent () {
    // 注册腾讯云即时通信 IM 上传插件，即时通信 IM SDK 发送图片、语音、视频、文件等消息需要使用上传插件，将文件上传到腾讯云对象存储
    this.timFriendClient.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
  }
  handleErrorEvent () { }
  handleListnerEvent () {
    // 监听事件，如：
    this.timFriendClient.on(TIM.EVENT.SDK_READY, function (event) {
      // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
      // event.name - TIM.EVENT.SDK_READY
    });

    this.timFriendClient.on(TIM.EVENT.MESSAGE_RECEIVED, function (event) {
      // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
      // event.name - TIM.EVENT.MESSAGE_RECEIVED
      // event.data - 存储 Message 对象的数组 - [Message]
    });

    this.timFriendClient.on(TIM.EVENT.MESSAGE_MODIFIED, function (event) {
      // 收到消息被第三方回调修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容（v2.12.1起支持）
      // event.name - TIM.EVENT.MESSAGE_MODIFIED
      // event.data - 存储被第三方回调修改过的 Message 对象的数组 - [Message]
    });

    this.timFriendClient.on(TIM.EVENT.MESSAGE_REVOKED, function (event) {
      // 收到消息被撤回的通知。使用前需要将SDK版本升级至v2.4.0或更高版本
      // event.name - TIM.EVENT.MESSAGE_REVOKED
      // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
    });

    this.timFriendClient.on(TIM.EVENT.MESSAGE_READ_BY_PEER, function (event) {
      // SDK 收到对端已读消息的通知，即已读回执。使用前需要将SDK版本升级至v2.7.0或更高版本。仅支持单聊会话
      // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
      // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
    });

    this.timFriendClient.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event) {
      // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
      // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
      // event.data - 存储 Conversation 对象的数组 - [Conversation]
    });

    this.timFriendClient.on(TIM.EVENT.GROUP_LIST_UPDATED, function (event) {
      // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
      // event.name - TIM.EVENT.GROUP_LIST_UPDATED
      // event.data - 存储 Group 对象的数组 - [Group]
    });

    this.timFriendClient.on(TIM.EVENT.PROFILE_UPDATED, function (event) {
      // 收到自己或好友的资料变更通知
      // event.name - TIM.EVENT.PROFILE_UPDATED
      // event.data - 存储 Profile 对象的数组 - [Profile]
    });

    this.timFriendClient.on(TIM.EVENT.BLACKLIST_UPDATED, function (event) {
      // 收到黑名单列表更新通知
      // event.name - TIM.EVENT.BLACKLIST_UPDATED
      // event.data - 存储 userID 的数组 - [userID]
    });

    this.timFriendClient.on(TIM.EVENT.ERROR, function (event) {
      // 收到 SDK 发生错误通知，可以获取错误码和错误信息
      // event.name - TIM.EVENT.ERROR
      // event.data.code - 错误码
      // event.data.message - 错误信息
    });

    this.timFriendClient.on(TIM.EVENT.SDK_NOT_READY, function (event) {
      // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
      // event.name - TIM.EVENT.SDK_NOT_READY
    });

    this.timFriendClient.on(TIM.EVENT.KICKED_OUT, function (event) {
      // 收到被踢下线通知
      // event.name - TIM.EVENT.KICKED_OUT
      // event.data.type - 被踢下线的原因，例如 :
      //   - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
      //   - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
      //   - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢（v2.4.0起支持）。
    });

    this.timFriendClient.on(TIM.EVENT.NET_STATE_CHANGE, function (event) {
      // 网络状态发生改变（v2.5.0 起支持）
      // event.name - TIM.EVENT.NET_STATE_CHANGE
      // event.data.state 当前网络状态，枚举值及说明如下：
      //   - TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
      //   - TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
      //   - TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
    });

    this.timFriendClient.on(TIM.EVENT.FRIEND_LIST_UPDATED, function (event) {
      // 收到好友列表更新通知（v2.13.0起支持）
      // event.name - TIM.EVENT.FRIEND_LIST_UPDATED
      // event.data - 存储 Friend 对象的数组 - [Friend]
    });

    this.timFriendClient.on(TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED, function (event) {
      // 收到好友申请列表更新通知（v2.13.0起支持）
      // event.name - TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED
      // friendApplicationList - 好友申请列表 - [FriendApplication]
      // unreadCount - 好友申请的未读数
      // const { friendApplicationList, unreadCount } = event.data;
      // 发送给我的好友申请（即别人申请加我为好友）
      // const applicationSentToMe = friendApplicationList.filter((friendApplication) => friendApplication.type === TIM.TYPES.SNS_APPLICATION_SENT_TO_ME);
      // 我发送出去的好友申请（即我申请加别人为好友）
      // const applicationSentByMe = friendApplicationList.filter((friendApplication) => friendApplication.type === TIM.TYPES.SNS_APPLICATION_SENT_BY_ME);
    });

    this.timFriendClient.on(TIM.EVENT.FRIEND_GROUP_LIST_UPDATED, function (event) {
      // 收到好友分组列表更新通知（v2.13.0起支持）
      // event.name - TIM.EVENT.FRIEND_GROUP_LIST_UPDATED
      // event.data - 存储 FriendGroup 对象的数组 - [FriendGroup]
    });
  }
}