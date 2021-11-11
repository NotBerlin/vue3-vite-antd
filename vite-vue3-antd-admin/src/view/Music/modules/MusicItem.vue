<template>
  <div id="musci-item" :class="[currentPlay == options.playUrl ? 'current-play' : '']">
    <div class="img-cover">
      <img src="../../../assets/images/music-active.png" alt="" srcset="" class="current-active" v-show="currentPlay == options.playUrl">
    </div>
    <div class="serial-number">{{index < 10 ? '0' + index : index}}</div>
    <div @click="playHere" :class="[disabled ? 'disabled-item music-name' : 'music-name']">{{options.musicName}}</div>
    <div class="music-songer">{{options.musicSonger}}</div>
  </div>
</template>

<script>
import {
  reactive,
  onMounted,
  watch,
  defineComponent,
  onBeforeUnmount
} from "vue";

export default defineComponent({
  props: {
    index: String || Number,
    options: {
      type: Object,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    currentPlay: {
      type: String,
      default: ''
    }
  },
  // 从事件调用emit可以不用声明，此处声明方便在html中使用$emit直接调用
  // emits: ['playHere'],
  components: {
  },
  setup (props, context) {
    let state = reactive({
    })

    function playHere (event) {
      if (props.disabled) return false
      context.emit('playHere', {
        code: 0,
        msg: '播放这首',
        data: props.options
      })
    }

    watch(state, (val) => {
    })

    onMounted(() => {
    })

    onBeforeUnmount(() => {
    })

    return {
      playHere
    }
  }
})
</script>


<style scoped>
#musci-item {
  display: flex;
  align-items: center;
}

.music-name {
  cursor: pointer;
  flex: 1;
}

.disabled-item {
  cursor: none !important;
  pointer-events: none;
}

.serial-number {
  margin-left: 10px;
  width: 50px;
}

.music-songer {
  margin-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 15%;
}

.current-play {
  color: #e91e63;
}

.img-cover {
  height: 100%;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.current-active {
  margin-left: 5px;
  height: 16px;
  -webkit-animation: spin 1s linear 1s 5 alternate;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>