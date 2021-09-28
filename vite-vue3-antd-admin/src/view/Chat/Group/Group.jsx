import { defineComponent } from "@vue/runtime-core";
import { onMounted, reactive, onBeforeUnmount } from "vue";
import { getGroupList } from "./modules/groupEvent.js"
import eventEmitter from '../../../plugin/bus'
import classes from './Group.module.css'
import { ElMessage } from 'element-plus'
// import DragLine from "../../../components/DragLine/DragLine"

export default defineComponent({
  props: {
    tim: {
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
      groupList: []
    })

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
        ElMessage({ type: 'warning', message: '功能尚未完善' })
        console.log('event.pageX: ', event.pageX, '_x: ', _x, '_move: ', _move)
        if (event.pageX >= 520 || event.pageX <= 395) { } else {
          // dragDom.style.width = event.pageX - 220 + 'px';
        }
      }
    }

    function mouseUp (event) {
      _move = false
    }

    onMounted(async () => {
      try {
        let groupListRes = await getGroupList.apply(props.tim)
        if (groupListRes.code == 0) {
          state.groupList = groupListRes.data.groupList
        } else {
          ElMessage({ type: 'warning', message: '获取群组数据失败' })
        }
      } catch (error) {
        console.log(error)
      }
      dragDom = document.getElementById('group-component')
      dragDom.style.width = '300px'
      window.addEventListener('mouseup', e => {
        _move = false
      });
    })

    onBeforeUnmount(() => {
      window.removeEventListener('mouseup', e => {
        _move = false
      });
    })

    return () => (
      <div id='group-component' className={classes['group-component']}>
        {/* <DragLine /> */}
        <div id="drag-line" className={classes['drag-line']} onMousedown={mouseDown} onMousemove={mouseMove} onMouseup={mouseUp}></div>
      </div>
    )
  }
})