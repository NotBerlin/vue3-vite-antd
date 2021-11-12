<template>
  <teleport to="body">
    <div id="audio-component" v-show="visible">
      <div class="audio-component-head">
        <!-- <div class="drag-left">
          <img src="../../../assets/images/drag.png" alt="">
        </div> -->
        <div class="zhan-wei" @click="hide"></div>
        <div class="drag-right" @mousedown="move">
          <img src="../../../assets/images/drag.png" alt="">
        </div>
      </div>
      <div style="height: calc(100% - 40px)">
        <div class="music-list">
          <music-item v-for="(item, index) in musicList" :key="item.playUrl" :options="item" :index="index" :currentPlay="currentPlay" @playHere="playHere" :disabled="checkoutDisabled" />
        </div>
        <div class="control-btn-group">
          <div class="btn play-btn-icon" @click="switchMode">
            <img v-show="mode == 'iteration'" src="../../../assets/images/iteration-play.png" alt="" srcset="">
            <img v-show="mode == 'random'" src="../../../assets/images/random-play.png" alt="" srcset="">
          </div>
          <div @click="prePlay" class="btn play-btn">
            上一首
          </div>
          <div @click="play" v-show="!playing" class="btn play-btn">
            <img src="../../../assets/images/play-icon.png" alt="" srcset="">
          </div>
          <div @click="pause" v-show="playing" class="btn play-btn">
            <img src="../../../assets/images/pause-icon.png" alt="" srcset="">
          </div>
          <div @click="nextPlay" class="btn play-btn">
            下一首
          </div>
          <div class="btn play-btn-icon" @click="setUp">
            <img src="../../../assets/images/set-up.png" alt="" srcset="">
          </div>
        </div>
      </div>
      <audio-controller :src="playUrl" :autoplay="true" class="audio-component" ref="audioComponent" @play-f="playFinally" @pause-f="pauseFinally" @play-end="playEnd" />
    </div>
  </teleport>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  watch,
  defineComponent,
  onBeforeUnmount,
  toRefs,
  nextTick,
  onActivated,
  onDeactivated,
  inject
} from "vue";
import AudioController from "./modules/AudioController.vue"
import MusicItem from "./modules/MusicItem.vue"
import musicList from "../Migu/modules/musicList"

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AudioController,
    MusicItem
  },
  setup (props, context) {
    let audioController = inject('audioController')

    let state = reactive({
      checkoutDisabled: false,
      musicList: [],
      playUrl: '',
      playing: false,
      currentPlay: '',
      mode: 'iteration'
    })

    watch(() => state.playing, (val) => {
      audioController.setPlaying(val)
    })

    const audioComponent = ref(null)

    let nextMusic = ''
    let preMusic = []

    function getRndInteger (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function getNextPlay () {
      let currentMusicIndex = 0
      state.musicList.forEach((element, index) => {
        if (element.playUrl == state.currentPlay) {
          currentMusicIndex = index
        }
      })
      switch (state.mode) {
        case 'iteration':
          nextMusic = state.musicList[currentMusicIndex + 1].playUrl;
          break;
        case 'random':
          let temp = getRndInteger(0, state.musicList.length)
          if (temp == currentMusicIndex) {
            temp = temp + 1
          }
          nextMusic = state.musicList[temp].playUrl;
          break;
        default:
          nextMusic = state.musicList[currentMusicIndex + 1].playUrl;
          break;
      }
    }

    function play () {
      if (state.playUrl == '') {
        state.playUrl = state.musicList[0].playUrl
        state.currentPlay = state.musicList[0].playUrl
      } else {
        state.currentPlay = state.playUrl
      }
      if (preMusic[preMusic.length - 1] != state.playUrl) {
        preMusic.push(state.playUrl)
      }
      nextTick(() => {
        audioComponent.value.play()
        getNextPlay()
      })
    }

    function pause () {
      audioComponent.value.pause()
    }

    function playHere (event) {
      if (event.code == 0) {
        state.checkoutDisabled = true
        state.playUrl = event.data.playUrl
        play()
      }
    }

    function playFinally (event) {
      if (event.code == 0) {
        state.playing = true
        state.checkoutDisabled = false
      }
    }

    function pauseFinally (event) {
      if (event.code == 0) {
        state.playing = false
        state.checkoutDisabled = false
      }
    }

    function playEnd (event) {
      if (event.code == 0) {
        state.playing = false
        state.playUrl = nextMusic
        play()
      }
    }

    function prePlay () {
      if (preMusic.length == 0) return false
      state.playing = false
      preMusic.pop()
      state.playUrl = preMusic.pop()
      play()
    }

    function nextPlay () {
      state.playing = false
      state.playUrl = nextMusic
      play()
    }

    function hide () {
      context.emit('update:visible', false)
    }

    function move (e) {
      let odiv = document.getElementById('audio-component');        //获取目标元素

      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //移动当前元素
        odiv.style.left = left + 'px';
        odiv.style.top = top + 'px';
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }

    function initPosition () {
      let odiv = document.getElementById('audio-component');
      let hdiv = document.getElementById('home')
      odiv.style.left = hdiv.clientWidth - 232 + 'px';
      odiv.style.top = '0px';
    }

    function switchMode () {
      switch (state.mode) {
        case 'iteration':
          state.mode = 'random';
          break;
        case 'random':
          state.mode = 'iteration';
          break;
        default:
          state.mode = 'iteration';
          break;
      }
    }

    function setUp () { }

    onActivated(() => {
    })

    onDeactivated(() => {
    })

    onMounted(() => {
      state.musicList = musicList.all
    })

    onBeforeUnmount(() => {
    })

    return {
      ...toRefs(state),
      play,
      pause,
      playHere,
      audioComponent,
      playFinally,
      pauseFinally,
      playEnd,
      prePlay,
      nextPlay,
      hide,
      move,
      initPosition,
      switchMode,
      setUp
    }
  }
})
</script>


<style scoped>
#audio-component {
  top: 0;
  right: 0;
  height: 300px;
  width: 230px;
  background: #e91e6340;
  position: absolute;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #e91e6310;
}

.btn {
  cursor: pointer;
}

.audio-component {
  position: absolute;
}

.music-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}

.control-btn-group {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 99%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #59595930;
  box-shadow: 2px 2px 2px #59595940;
}

.play-btn-icon,
.play-btn {
  font-size: 13px;
  height: 30px;
  width: 50px;
  position: relative;
  line-height: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn-icon > img {
  height: 12px;
}

.play-btn > img {
  height: 30px;
}

.audio-component-head {
  height: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #59595920;
  position: relative;
}

.zhan-wei {
  width: 50px;
  height: 3px;
  border-bottom: 1px solid #59595960;
  cursor: pointer;
  position: relative;
}

.zhan-wei::before {
  content: "";
  position: absolute;
  height: 1px;
  width: 40px;
  background: #59595960;
  top: 5px;
  left: 5px;
}

.drag-left {
  height: 100%;
  position: absolute;
  left: 5px;
  display: flex;
  align-items: center;
}

.drag-left > img {
  height: 80%;
}

.drag-right {
  height: 100%;
  position: absolute;
  right: 5px;
  display: flex;
  align-items: center;
  cursor: all-scroll;
}

.drag-right > img {
  height: 80%;
}
</style>