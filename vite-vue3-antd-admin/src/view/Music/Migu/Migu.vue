<template>
  <div id="mi-gu">
    <div style="height: calc(100% - 80px)">
      <div class="music-list">
        <music-item v-for="(item, index) in musicList" :key="item.playUrl" :options="item" :index="index" :currentPlay="currentPlay" @playHere="playHere" :disabled="checkoutDisabled" />
      </div>
      <div class="control-btn-group">
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
      </div>
    </div>
    <audio-controller :src="playUrl" :autoplay="true" class="audio-component" ref="audioComponent" @play-f="playFinally" @pause-f="pauseFinally" @play-end="playEnd" />
    <!-- <audio-component :visible="audioVisible" @update:visible="audioVisible = $event" /> -->
  </div>
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
  onDeactivated
} from "vue";
import AudioController from "../modules/AudioController.vue"
// import AudioComponent from "../AudioComponent/index.vue"
import MusicItem from "../modules/MusicItem.vue"
import musicList from "./modules/musicList"

export default defineComponent({
  props: {
  },
  components: {
    AudioController,
    MusicItem,
    // AudioComponent
  },
  setup (props) {
    let state = reactive({
      checkoutDisabled: false,
      musicList: [],
      playUrl: '',
      playing: false,
      currentPlay: '',
      mode: 'iteration',
      audioVisible: false,
    })

    watch(state, (val) => {
    })

    const audioComponent = ref(null)

    let nextMusic = ''
    let preMusic = []

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
        default:
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

    onActivated(() => {
      // state.audioVisible = false
    })

    onDeactivated(() => {
      // state.audioVisible = true
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
      nextPlay
    }
  }
})
</script>


<style scoped>
#mi-gu {
  position: relative;
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
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn {
  font-size: 14px;
  height: 50px;
  width: 50px;
  position: relative;
  line-height: 50px;
  text-align: center;
}

.play-btn > img {
  height: 50px;
}
</style>