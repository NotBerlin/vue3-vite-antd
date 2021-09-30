/*
 * @Author: dlAm 
 * @Date: 2021-09-29 10:00:58 
 * @Last Modified by: dlAm
 * @Last Modified time: 2021-09-30 15:58:32
 * @Power:  封装tim实例
 * @Description:  
 */
import TIM from 'tim-js-sdk/tim-js-friendship.js';
import TIMUploadPlugin from 'tim-upload-plugin';
import eventEmitter from '../../../plugin/bus'

export default class TimFriendClient {
  constructor(options) {
    this.timFriendClient = null;
    this.userID = ''
    this.userSig = ''
    this.coversationID = ''
    this.to = ''
    this.createClient(options.SDKAppID);
  }
  /*
    * @Author: dlAm
    * @Date: 2021-09-29 10:00:58
    * @Last Modified by:   dlAm
    * @Last Modified time: 2021-09-29 10:00:58
    * @Power:  tim创建登录，生命周期函数
    * @Description:
    */
  createClient (SDKAppID) {
    this.timFriendClient = TIM.create({ SDKAppID })
    this.timFriendClient.setLogLevel(0);
    this.handleListnerEvent()
    this.handleErrorEvent()
    this.handleUploadEvent()
  }
  loginClient (options) {
    this.userID = options.userID
    this.userSig = options.userSig
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
  /*
    * @Author: dlAm
    * @Date: 2021-09-29 10:00:58
    * @Last Modified by:   dlAm
    * @Last Modified time: 2021-09-29 10:00:58
    * @Power:  tim发送消息
    * @Description:
    */
  createTextMessage (options) {
    // 发送文本消息，Web 端与小程序端相同
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message = this.timFriendClient.createTextMessage({
      to: this.to,
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
    let promise = this.timFriendClient.sendMessage(message);
    promise.then(function (imResponse) {
      // 发送成功
      console.log(imResponse);
      eventEmitter.emit('Send-Message', { data: imResponse, code: 0, type: 'createTextMessage' })
    }).catch(function (imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
      eventEmitter.emit('Send-Message', { data: imError, code: 1, type: 'createTextMessage' })
    });
  }
  createTextAtMessage (options) {
    // 发送文本消息，Web 端与小程序端相同
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message = this.timFriendClient.createTextAtMessage({
      to: 'group1',
      conversationType: TIM.TYPES.CONV_GROUP,
      // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
      // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload: {
        text: '@denny @lucy @所有人 今晚聚餐，收到的请回复1',
        atUserList: ['denny', 'lucy', TIM.TYPES.MSG_AT_ALL] // 'denny' 'lucy' 都是 userID，而非昵称
      },
      // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
      // cloudCustomData: 'your cloud custom data'
    });
    // 2. 发送消息
    let promise = this.timFriendClient.sendMessage(message);
    promise.then(function (imResponse) {
      // 发送成功
      console.log(imResponse);
    }).catch(function (imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
    });
  }
  createImageMessage (options) {
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message = this.timFriendClient.createImageMessage({
      to: 'user1',
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        file: file
      },
      onProgress: function (event) { console.log('file uploading:', event) }
    });

    // 2. 发送消息
    let promise = this.timFriendClient.sendMessage(message);
    promise.then(function (imResponse) {
      // 发送成功
      console.log(imResponse);
    }).catch(function (imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
    });
  }
  createAudioMessage () {
    return {
      code: 1,
      message: 'web端暂不支持该功能'
    }
  }
  createVideoMessage () {
    // web 端发送视频消息示例（v2.6.0起支持）：
    // 1. 获取视频：传入 DOM 节点
    // 2. 创建消息实例
    const message = this.timFriendClient.createVideoMessage({
      to: 'user1',
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        file: document.getElementById('videoPicker') // 或者用event.target
      },
      onProgress: function (event) { console.log('file uploading:', event) }
    });
    // 3. 发送消息
    let promise = this.timFriendClient.sendMessage(message);
    promise.then(function (imResponse) {
      // 发送成功
      console.log(imResponse);
    }).catch(function (imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
    });
  }
  /*
    * @Author: dlAm
    * @Date: 2021-09-29 10:00:58
    * @Last Modified by:   dlAm
    * @Last Modified time: 2021-09-29 10:00:58
    * @Power:  tim会话
    * @Description:
    */
  getMessageList (nextReqMessageID) {
    // 下拉查看更多消息
    let params = { conversationID: this.conversationID, count: 15 }
    if (nextReqMessageID) params.nextReqMessageID = nextReqMessageID
    let promise = this.timFriendClient.getMessageList(params);
    promise.then(function (imResponse) {
      const messageList = imResponse.data.messageList; // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      const data = {
        messageList,
        nextReqMessageID,
        isCompleted
      }
      eventEmitter.emit('Conversation', { data, code: 0, type: 'getMessageList' })
    }).catch(function (imError) {
      console.warn('getMessageList error:', imError); // 获取会话列表失败的相关信息
      eventEmitter.emit('Conversation', { data: imError, code: 1, type: 'getMessageList' })
    });
  }
  getConversationList () {
    // 拉取会话列表
    let promise = this.timFriendClient.getConversationList();
    promise.then(function (imResponse) {
      const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
      eventEmitter.emit('Conversation', { data: conversationList, code: 0, type: 'getConversationList' })
    }).catch(function (imError) {
      console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
      eventEmitter.emit('Conversation', { data: imError, code: 1, type: 'getConversationList' })
    });
  }
  /*
    * @Author: dlAm
    * @Date: 2021-09-29 10:00:58
    * @Last Modified by:   dlAm
    * @Last Modified time: 2021-09-29 10:00:58
    * @Power:  tim关系链
    * @Description:
    */
  getFriendList () {
    let promise = this.timFriendClient.getFriendList();
    promise.then(function (imResponse) {
      if (!imResponse.data) {
        eventEmitter.emit('Relationship-Chain', { data: [], code: 0, type: 'getFriendList' })
        return true
      }
      const friendList = imResponse.data; // 好友列表
      eventEmitter.emit('Relationship-Chain', { data: friendList, code: 0, type: 'getFriendList' })
    }).catch(function (imError) {
      console.warn('getFriendList error:', imError); // 获取好友列表失败的相关信息
      eventEmitter.emit('Relationship-Chain', { data: imError, code: 1, type: 'getFriendList' })
    });
  }
  addFriend (options) {
    // 添加好友
    let promise = this.timFriendClient.addFriend({
      to: options.to,
      source: 'AddSource_Type_Web',
      remark: options.remark,
      groupName: options.groupName,
      wording: options.wording,
      type: TIM.TYPES.SNS_ADD_TYPE_BOTH,
    });
    promise.then(function (imResponse) {
      // 添加好友的请求发送成功
      const { code } = imResponse.data;
      if (code === 30539) {
        eventEmitter.emit('Relationship-Chain', { data: '等待好友请求同意', code: 0, type: 'addFriend' })
        // 30539 说明 user1 设置了【需要经过自己确认对方才能添加自己为好友】，此时 SDK 会触发 TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED 事件
      } else if (code === 0) {
        eventEmitter.emit('Relationship-Chain', { data: '好友请求已同意', code: 0, type: 'addFriend' })
        // 0 说明 user1 设置了【允许任何人添加自己为好友】，此时 SDK 会触发 TIM.EVENT.FRIEND_LIST_UPDATED 事件
      }
    }).catch(function (imError) {
      console.warn('addFriend error:', imError); // 添加好友失败的相关信息
      eventEmitter.emit('Relationship-Chain', { data: imError, code: 1, type: 'addFriend' })
    });
  }
  getFriendProfile () {
    let promise = this.timFriendClient.getFriendProfile({
      userIDList: ['user0', 'user1']
    });
    promise.then(function (imResponse) {
      const { friendList, failureUserIDList } = imResponse.data;
      friendList.forEach((friend) => {
        // Friend 对象
      });
      // 失败的 userIDList
      failureUserIDList.forEach((item) => {
        const { userID, code, message } = item;
      });
    }).catch(function (imError) {
      console.warn('getFriendProfile error:', imError); // 获取失败
    });
  }
  getFriendApplicationList () {
    let promise = this.timFriendClient.getFriendApplicationList();
    promise.then(function (imResponse) {
      // friendApplicationList - 好友申请列表 - [FriendApplication]
      // unreadCount - 好友申请的未读数
      // const { friendApplicationList, unreadCount } = imResponse.data;
    }).catch(function (imError) {
      console.warn('getFriendApplicationList error:', imError); // 获取好友申请列表失败的相关信息
    });
  }
  acceptFriendApplication () {
    let promise = this.timFriendClient.acceptFriendApplication({
      userID: 'user1',
      remark: '客服小亮',
      type: TIM.TYPES.SNS_APPLICATION_AGREE_AND_ADD
    });
    promise.then(function (imResponse) {
      // 同意好友成功后，SDK 会触发 TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED 事件
    }).catch(function (imError) {
      console.warn('acceptFriendApplication error:', imError);
    });
  }
  getFriendGroupList () {
    let promise = this.timFriendClient.getFriendGroupList();
    promise.then(function (imResponse) {
      const friendGroupList = imResponse.data; // 好友分组列表
      eventEmitter.emit('Relationship-Chain', { data: friendGroupList, code: 0, type: 'getFriendGroupList' })
    }).catch(function (imError) {
      console.warn('getFriendGroupList error:', imError); // 获取好友分组列表失败的相关信息
      eventEmitter.emit('Relationship-Chain', { data: imError, code: 1, type: 'getFriendGroupList' })
    });
  }
  addToFriendGroup () {
    let promise = this.timFriendClient.addToFriendGroup({
      name: '我的好友分组1',
      userIDList: ['user1', 'user2'],
    });
    promise.then(function (imResponse) {
      const { friendGroup, failureUserIDList } = imResponse.data;
      // friendGroup - 好友分组实例
      // failureUserIDList - 失败的 userID 列表
      // 添加成功后，SDK 会触发 TIM.EVENT.FRIEND_GROUP_LIST_UPDATED 事件
    }).catch(function (imError) {
      console.warn('addToFriendGroup error:', imError); // 获取失败
    });
  }
  /*
    * @Author: dlAm
    * @Date: 2021-09-29 10:00:58
    * @Last Modified by:   dlAm
    * @Last Modified time: 2021-09-29 10:00:58
    * @Power:  tim群组
    * @Description:
    */
  getGroupList () {
    // 若默认拉取的字段不满足需求，可以参考下述代码，拉取额外的资料字段。
    let promise = this.timFriendClient.getGroupList({
      groupProfileFilter: [TIM.TYPES.GRP_PROFILE_OWNER_ID],
    });
    promise.then(function (imResponse) {
      if (!imResponse.data) {
        eventEmitter.emit('Group', { data: [], code: 0, type: 'getGroupList' })
        return true
      }
      console.log(imResponse.data.groupList); // 群组列表
      eventEmitter.emit('Group', { data: imResponse.data.groupList, code: 0, type: 'getGroupList' })
    }).catch(function (imError) {
      console.warn('getGroupList error:', imError); // 获取群组列表失败的相关信息
      eventEmitter.emit('Group', { data: imError, code: 1, type: 'getGroupList' })
    });
  }
  createGroup () {
    // 创建好友工作群
    let promise = this.timFriendClient.createGroup({
      type: TIM.TYPES.GRP_WORK,
      name: 'WebSDK',
      memberList: [{
        userID: 'user1',
        // 群成员维度的自定义字段，默认情况是没有的，需要开通，详情请参阅自定义字段
        memberCustomField: [{ key: 'group_member_test', value: 'test' }]
      }, {
        userID: 'user2'
      }] // 如果填写了 memberList，则必须填写 userID
    });
    promise.then(function (imResponse) { // 创建成功
      console.log(imResponse.data.group); // 创建的群的资料
      // 创建群时指定了成员列表，但是成员中存在超过了“单个用户可加入群组数”限制的情况
      // 一个用户 userX 最多允许加入 N 个群，如果已经加入了 N 个群，此时创建群再指定 userX 为群成员，则 userX 不能正常加群
      // SDK 将 userX 的信息放入 overLimitUserIDList，供接入侧处理
      console.log(imResponse.data.overLimitUserIDList); // 超过了“单个用户可加入群组数”限制的用户列表，v2.10.2起支持
    }).catch(function (imError) {
      console.warn('createGroup error:', imError); // 创建群组失败的相关信息
    });
  }
  dismissGroup () {
    let promise = this.timFriendClient.dismissGroup('group1');
    promise.then(function (imResponse) { // 解散成功
      console.log(imResponse.data.groupID); // 被解散的群组 ID
    }).catch(function (imError) {
      console.warn('dismissGroup error:', imError); // 解散群组失败的相关信息
    });
  }
  joinGroup () {
    let promise = this.timFriendClient.joinGroup({ groupID: 'group1', type: TIM.TYPES.GRP_AVCHATROOM });
    promise.then(function (imResponse) {
      switch (imResponse.data.status) {
        case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
          break;
        case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
          console.log(imResponse.data.group); // 加入的群组资料
          break;
        case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
          break;
        default:
          break;
      }
    }).catch(function (imError) {
      console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
    });
  }
  handleGroupApplication () {
    let promise = this.timFriendClient.handleGroupApplication({
      handleAction: 'Agree',
      handleMessage: '欢迎欢迎',
      message: message // 申请加群群系统通知的消息实例
    });
    promise.then(function (imResponse) {
      console.log(imResponse.data.group); // 群组资料
    }).catch(function (imError) {
      console.warn('handleGroupApplication error:', imError); // 错误信息
    });
  }
  /*
    * @Author: dlAm
    * @Date: 2021-09-29 10:00:58
    * @Last Modified by:   dlAm
    * @Last Modified time: 2021-09-29 10:00:58
    * @Power:  tim状态维护
    * @Description:自定义事件
    */
  changeConversationID (options) {
    this.conversationID = options.conversationID
    this.to = options.userProfile.userID
    eventEmitter.emit('Change-Conversation-ID', this.coversationID)
  }
  /*
    * @Author: dlAm
    * @Date: 2021-09-29 10:00:58
    * @Last Modified by:   dlAm
    * @Last Modified time: 2021-09-29 10:00:58
    * @Power:  tim监听消息
    * @Description:
    */
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
      eventEmitter.emit('TIM_EVENT_SDK_READY')
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