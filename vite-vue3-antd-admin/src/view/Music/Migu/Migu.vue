<template>
  <div id="mi-gu">
    <div>
      <div class="music-list">
        <music-item v-for="(item, index) in musicList" :key="item.playUrl + index" :options="item" :index="index" :currentPlay="currentPlay" @playHere="playHere" :disabled="checkoutDisabled" />
      </div>
      <div class="control-btn-group">
        <div @click="play" v-show="!playing" class="btn play-btn">
          <img src="../../../assets/images/play-icon.png" alt="" srcset="">
        </div>
        <div @click="pause" v-show="playing" class="btn play-btn">
          <img src="../../../assets/images/pause-icon.png" alt="" srcset="">
        </div>
      </div>
    </div>
    <audio-controller :src="playUrl" :autoplay="true" class="audio-component" ref="audioComponent" @play-f="playFinally" @pause-f="pauseFinally" />
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
  nextTick
} from "vue";
import AudioController from "../modules/AudioController.vue"
import MusicItem from "../modules/MusicItem.vue"
import musicList from "./modules/musicList"

export default defineComponent({
  props: {
  },
  components: {
    AudioController,
    MusicItem
  },
  setup (props) {
    let state = reactive({
      checkoutDisabled: false,
      musicList: [],
      playUrl: '',
      playing: false,
      currentPlay: '',
    })

    watch(state, (val) => {
    })

    const audioComponent = ref(null)

    function setCurrentPlay () { }

    function play () {
      if (state.playUrl == '') {
        state.playUrl = state.musicList[0].playUrl
        state.currentPlay = state.musicList[0].playUrl
      } else {
        state.currentPlay = state.playUrl
      }
      nextTick(() => {
        audioComponent.value.play()
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
      pauseFinally
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
  justify-content: center;
  height: calc(100% - 80px);
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