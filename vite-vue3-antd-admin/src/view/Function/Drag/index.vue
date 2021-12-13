<template>
  <div id='drag' ref="box1">
    <div id="drag-box" ref="box" draggable="false"></div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
export default defineComponent({
  name: 'Drag',
  setup () {
    const box = ref(null)
    const box1 = ref(null)

    function moveImg () {
      console.log("开始移动签章");
      var dragging = false;
      var boxX, boxY, mouseX, mouseY, offsetX, offsetY;
      var box = document.getElementById("drag-box");
      var box1 = document.getElementById("drag");
      box.onmousedown = down;
      document.onmousemove = move;
      document.onmouseup = up;

      function down (e) {
        dragging = true;
        boxX = box.offsetLeft;
        boxY = box.offsetTop;
        mouseX = parseInt(getMouseXY(e).x);
        mouseY = parseInt(getMouseXY(e).y);
        offsetX = mouseX - boxX;
        offsetY = mouseY - boxY;
      }

      function move (e) {
        if (dragging) {
          var x = getMouseXY(e).x - offsetX;
          var y = getMouseXY(e).y - offsetY;
          console.log("移动");
          console.log(x, y);
          var width = box1.clientWidth - box.offsetWidth;
          var height = box1.clientHeight - box.offsetHeight;
          x = Math.min(Math.max(0, x), width);
          y = Math.min(Math.max(0, y), height);
          box.style.left = x + "px";
          box.style.top = y + "px";
        }
      }

      // 释放鼠标的函数
      function up (e) {
        if (dragging == false) return;
        var x = getMouseXY(e).x - offsetX;
        var y = getMouseXY(e).y - offsetY;
        console.log("释放鼠标");
        dragging = false;
      }

      // 函数用于获取鼠标的位置
      function getMouseXY (e) {
        var x = 0,
          y = 0;
        e = e || window.event;
        if (e.pageX) {
          x = e.pageX;
          y = e.pageY;
        } else {
          x = e.clientX + document.body.scrollLeft - document.body.clientLeft;
          y = e.clientY + document.body.scrollTop - document.body.clientTop;
        }
        return {
          x: x,
          y: y,
        };
      }
    }

    onMounted(() => {
      // box.value.style.left = "0px";
      // box.value.style.top = "0px";
      setTimeout(function () {
        moveImg();
      }, 10);
    })
  }
})
</script>
<style>
#drag {
  position: relative;
}

#drag-box {
  position: absolute;
  height: 50px;
  width: 80px;
  background: black;
}
</style>