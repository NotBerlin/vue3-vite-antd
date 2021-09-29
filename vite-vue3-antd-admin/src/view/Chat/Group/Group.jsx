import { defineComponent } from "@vue/runtime-core";
import { onMounted, reactive, onBeforeUnmount, watch } from "vue";
import eventEmitter from '../../../plugin/bus'
import { formatTime } from '../../../utils/util'
import classes from './Group.module.css'
import { ElMessage } from 'element-plus'
// import DragLine from "../../../components/DragLine/DragLine"

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
  setup (props, context) {
    const state = reactive({
      groupList: [],
      friendList: [],
      searchText: ''
    })

    const imageList = [
      "/src/assets/images/portrait.jpeg"
    ]

    // watch(state.searchText, (val) => {
    //   debugger
    // })

    // fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
    function debounce (fn, delay) {
      // 定时器
      let timer = null

      // 将debounce处理结果当作函数返回
      return function () {
        // 保留调用时的this上下文
        let context = this
        // 保留调用时传入的参数
        let args = arguments

        // 每次事件被触发时，都去清除之前的旧定时器
        if (timer) {
          clearTimeout(timer)
        }
        // 设立新定时器
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
      }
    }

    let _move = false, _x = 520, _y = 0;
    let dragDom = null;

    function mouseDown (event) {
      _move = true
      _x = event.pageX;
      _y = event.pageY;
    }

    function mouseMove (event) {
      if (_move) {
        // ElMessage({ type: 'warning', message: '功能尚未完善' })
        console.log('event.pageX: ', event.pageX, '_x: ', _x, '_move: ', _move)
        if (event.pageX >= 520 || event.pageX <= 395) { } else {
          // dragDom.style.width = event.pageX - 220 + 'px';
        }
      }
    }

    function mouseUp (event) {
      _move = false
    }

    function listenerTimRelationshipChain ({ detail }) {
      console.log('%c listenerTimRelationshipChain:', 'color: red, font-size: 24px', detail)
      state.friendList = detail.data
      if (detail.code == 0 && detail.type == 'addFriend' && detail.data == '好友请求已同意') {
        listenerTimAddFriend()
      }
      // props.timClinet.addFriend({ to: '123456', remark: '宝贝', groupName: '宝贝鱼塘', wording: '我爱你' })
    }

    function listenerTimGroupList ({ detail }) {
      console.log(detail)
    }

    function listenerTimAddFriend ({ detail }) {
      props.timClinet.getFriendList()
    }

    function changeConversation (element) {
      props.timClinet.changeConversationID(element)
    }

    onMounted(async () => {
      // dragDom = document.getElementById('group-component')
      // dragDom.style.width = '300px'
      // window.addEventListener('mouseup', e => {
      //   _move = false
      // });
      eventEmitter.on('Relationship-Chain', listenerTimRelationshipChain)
      eventEmitter.on('Group', listenerTimGroupList)
      props.timClinet.getFriendList()
      props.timClinet.getGroupList()
    })

    onBeforeUnmount(() => {
      // window.removeEventListener('mouseup', e => {
      //   _move = false
      // });
    })

    return () => (
      <div id='group-component' className={classes['group-component']}>
        {/* <DragLine /> */}
        <div className={classes['title']}>
          <div className={classes['title-info']}>
            <img src={imageList[0]}></img>
            <div className={classes['title-info-detail']}>
              <div className={classes['title-info-detail-name']}>陈陈陈</div>
              <div className={classes['title-info-detail-state']}><custom-icon name="online" />在线<custom-icon name="next" /></div>
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <custom-icon name="add" style={{ position: 'absolute', right: '10px', cursor: 'pointer', top: '-7px' }} />
            </div>
          </div>
          <div className={classes['title-search']}>
            {/* 新版 vue-cli4 中，已经默认集成了 JSX 语法对 v-model 的支持 */}
            {/* <el-input placeholder="请输入内容" v-model={state.searchText}></el-input> */}
            {/* 原始input事件参数相对复杂，每次键入的值在value.data，input元素的值在value.target.value */}
            <input className={classes['search-frame']} placeholder="搜索" value={state.searchText} onInput={(value) => {
              state.searchText = value.target.value
            }} />
          </div>
        </div>
        <div className="zhanwei" style={{ height: '82px', width: '100%', 'flex-shrink': 0 }}></div>
        {
          state.groupList.map(element => {
            return (
              <div className={classes['group-item']}></div>
            )
          })
        }
        {
          state.friendList.map(element => {
            return (
              <div className={classes['friend-item']} onClick={changeConversation(element)}>
                <img src={imageList[0]}></img>
                <div className={classes['friend-item-content']}>
                  <div className={classes['friend-item-content-name']}>{element.remark}</div>
                  <div className={classes['friend-item-content-text']}></div>
                </div>
                <div className={classes['friend-item-right']}>
                  <div className={classes['friend-item-right-time']}>{element.profile.lastUpdatedTime == 0 ? formatTime(element.addTime) : formatTime(element.profile.lastUpdatedTime)}</div>
                </div>
              </div>
            )
          })
        }
        {/* <div id="drag-line" className={classes['drag-line']} onMousedown={mouseDown} onMousemove={mouseMove} onMouseup={mouseUp}></div> */}
      </div>
    )
  }
})