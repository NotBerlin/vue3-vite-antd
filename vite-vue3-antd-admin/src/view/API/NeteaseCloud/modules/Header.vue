<template>
  <div id='netease-cloud-header'>
    <div class="img-cover">
      <img src="../../../../assets/images/wangyiyunyinyue.png" alt="">
    </div>
    网易云音乐
    <div class="seat" style="height: 100%; width: 20px;"></div>
    <div 
      :class="current === index ? 'select-item active' : 'select-item'" 
      v-for="(item, index) in selectList" 
      :key="index" 
      :id="item.path"
      @click="change(index)"
    >{{item.name}}</div>
    <div class="float-bottom">
      <div class="float-bottom-cover">
        <div 
          :class="selectCurrentIndex === selectIndex ? 'select-current-item select-current-item-active' : 'select-current-item'" 
          v-for="(selectCurrent, selectIndex) in selectCurrentMenu" 
          :key="selectCurrent.label"
          @click="dududud(selectIndex)"
        >{{selectCurrent.label}}</div>
      </div>
    </div>
    <div class="float-circle"></div>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots, ref, onMounted } from 'vue'

const selectList = [
  {
    name: '发现音乐',
    path: 'found'
  },
  // {
  //   name: '我的音乐',
  //   path: 'mine'
  // }
]

const selectCurrentMenu = [
  {
    label: '推荐'
  },
  {
    label: '排行榜'
  },
  {
    label: '歌单'
  },
  {
    label: '主播电台'
  },
  {
    label: '歌手'
  },
  {
    label: '新碟上架'
  },
]

let current = ref(0)
let selectCurrentIndex = ref(0)

function moveCircle () {
  const circle = document.getElementsByClassName('float-circle')[0]
  const currentPath = selectList[current.value].path
  const currentDom = document.getElementById(currentPath)
  const currentInnerTextLength = currentDom.innerText.length * 16 + 40
  const coverDom = document.getElementsByClassName('float-bottom-cover')[0]
  const selectFirstDom = document.getElementsByClassName('select-current-item')[0]
  const selectFirstDomLength = selectFirstDom.innerText.length * 12 + 24
  if (currentDom) {
    circle.style.left = parseInt(currentDom.offsetLeft) - 6 + parseInt(currentInnerTextLength / 2) + 'px'
    coverDom.style.left = parseInt(currentDom.offsetLeft) + parseInt(currentInnerTextLength / 2) - (selectFirstDomLength / 2) + 'px'
  }
}

function change(index) {
  current.value = index
  moveCircle()
}

function dududud(index) {
  selectCurrentIndex.value = index
}

onMounted(() => {
  moveCircle()
})
</script>
<style scoped>
#netease-cloud-header {
  height: 50px;
  background: #242424;
  border-bottom: 1px solid #000;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: white;
}

.img-cover > img {
  height: 40px;
}

.img-cover {
  height: 40px;
  width: 40px;
  margin-right: 5px;
  margin-left: 30px;
}

.select-item {
  height: 100%;
  font-size: 16px;
  line-height: 50px;
  padding: 0 20px;
  cursor: pointer;
}

.active {
  background: #000;
}

.float-bottom {
  z-index: 2;
  height: 30px;
  width: 100%;
  background: #c20c0c;
  position: absolute;
  top: 51px;
  border-bottom: 1px solid #a40011;
}

.float-circle {
  border-top: 8px solid transparent;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid #c20c0c;
  position: absolute;
  top: 35px;
  z-index: 2;
}

.float-bottom-cover {
  position: absolute;
  display: flex;
  font-size: 12px;
  align-items: center;
  height: 100%;
}

.select-current-item {
  margin-left: 25px;
  padding: 2px 12px;
  border-radius: 12px;
  cursor: pointer;
}

.select-current-item:hover {
  background: #9B0909;
}

.select-current-item:first-child {
  margin: 0;
}

.select-current-item-active {
  background: #9B0909;
}
</style>