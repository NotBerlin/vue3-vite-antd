<template>
  <div id="tim-page" class="tim-page">
    <div id="conversation-message-list" class="conversation-message-list" v-if="isChat">
      <MessageItem v-for="(element, index) in messageInfo.messageList" :key="index" :options="element" :userID="userID" />
      <div id="conversation-message-list-bottom"></div>
    </div>
    <div class="chat-input-box" v-if="isChat">
      <div class="chat-action-bar">
        <div class="action-bar-cover" v-for="(item, index) in actionBar" :key="item.icon + index">
          <img :src="'/src/assets/images/' + item.icon" alt="" srcset="">
        </div>
      </div>
      <div class="input-box">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea" :autosize="true" @keydown.enter="onSubmit">
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  onMounted,
  toRefs,
  watch,
  defineComponent,
  nextTick,
  onBeforeUnmount
} from "vue";
import eventEmitter from "../../../plugin/bus";
import MessageItem from "../../../components/MessageItem/MessageItem"
import { scrollView } from "../../../utils/util"

export default defineComponent({
  props: {
    timClinet: {
      type: Object,
      default: () => { }
    },
    login: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MessageItem
  },
  setup (props) {
    let state = reactive({
      messageInfo: {
        messageList: [],
        nextReqMessageID: null,
        isCompleted: false
      },
      textarea: '',
      isChat: false
    })

    const actionBar = [
      {
        icon: 'image.png',
        props: 'image',
        id: 1,
        name: ''
      },
      {
        icon: 'camera.png',
        props: 'camera',
        id: 2,
        name: ''
      },
      {
        icon: 'lan-network.png',
        props: 'lan-network',
        id: 2,
        name: ''
      },
    ]

    watch(state.messageInfo, (val) => {
    })

    const messageInfo = {
      messageList: [],
      nextReqMessageID: null,
      isCompleted: false
    }

    function onSubmit () {
      debugger
      console.log(state.textarea)
      props.timClinet.createTextMessage({ text: state.textarea })
    }

    function changeConversationID () {
      console.log(props.timClinet.conversationID)
      state.messageInfo = messageInfo
      props.timClinet.getMessageList()
    }

    function listenerTimConversation ({ detail }) {
      console.log('Tim-listenerTimConversationList:', detail)
      if (detail.type == 'getMessageList' && detail.code == 0) {
        state.isChat = true
        state.messageInfo.messageList = detail.data.messageList
        state.messageInfo.nextReqMessageID = detail.data.nextReqMessageID
        state.messageInfo.isCompleted = detail.data.isCompleted
        nextTick(() => {
          scrollView('conversation-message-list-bottom', false)
        })
      }
    }

    function listenerTimSendMessage ({ detail }) {
      if (detail.code == 0) {
        switch (detail.type) {
          case "createTextMessage":
            state.messageInfo.messageList.push(detail.data.data.message)
            state.textarea = ''
            nextTick(() => {
              scrollView('conversation-message-list-bottom', false)
            })
        }
      }
    }

    onMounted(() => {
      eventEmitter.on('Change-Conversation-ID', changeConversationID)
      eventEmitter.on('Conversation', listenerTimConversation)
      eventEmitter.on('Send-Message', listenerTimSendMessage)
    })

    onBeforeUnmount(() => {
      eventEmitter.off('Change-Conversation-ID', changeConversationID)
      eventEmitter.off('Conversation', listenerTimConversation)
      eventEmitter.off('Send-Message', listenerTimSendMessage)
    })

    return { ...toRefs(state), actionBar, userID: props.timClinet.userID, onSubmit }
  }
})
</script>


<style scoped>
.tim-page {
  flex: 1;
  height: 100%;
  background: seashell;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-left: 2px solid #eee;
}

.chat-input-box {
  height: 160px;
  width: 100%;
  border-top: 2px solid #eee;
  background: white;
  display: flex;
  flex-direction: column;
}

.chat-action-bar {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
}

.action-bar-cover {
  height: 100%;
  margin: 0 8px;
  line-height: 40px;
}

.action-bar-cover > img {
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.input-box {
  flex: 1;
  padding: 0 8px 10px;
}

:deep(.input-box > .el-textarea) {
  height: 100%;
  width: 100%;
}

:deep(.el-textarea > .el-textarea__inner) {
  height: 100% !important;
  width: 100%;
  border: none;
}

.conversation-message-list {
  background: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow-y: auto;
}
</style>