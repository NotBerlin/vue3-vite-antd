import { onMounted, reactive, onBeforeUnmount } from "vue";
import { defineComponent } from "@vue/runtime-core";
import classes from './Group.module.css'

export default defineComponent({
  setup () {
    let _move = false, _x = 520, _y = 0;
    let dragDom = null;

    function mouseDown (event) {
      _move = true
      _x = event.pageX;
      _y = event.pageY;
    }

    function mouseMove (event) {
      if (_move) {
        console.log('event.pageX: ', event.pageX, '_x: ', _x, '_move: ', _move)
        if (event.pageX >= 520 || event.pageX <= 395) { } else {
          dragDom.style.width = event.pageX - 220 + 'px';
        }
      }
    }

    function mouseUp (event) {
      _move = false
    }

    onMounted(() => {
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

    return () => {
      <div id="drag-line" className={classes['drag-line']} onMousedown={mouseDown} onMousemove={mouseMove} onMouseup={mouseUp}></div>
    }
  }
})