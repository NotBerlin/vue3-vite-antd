<template>
  <div id="audio-controller">
    <audio :src="src" :autoplay="autoplay" id="cll-audio"></audio>
  </div>
</template>

<script>
import {
  reactive,
  onMounted,
  watch,
  defineComponent,
  onBeforeUnmount,
} from "vue";

export default defineComponent({
  props: {
    src: {
      type: String,
      default: "",
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: String,
      default: "",
    },
  },
  components: {},
  setup(props, context) {
    let state = reactive({});

    let audio = null;

    watch(state, (val) => {});

    function endPlay() {
      context.emit("play-end", {
        code: 0,
        msg: "播放完成",
        data: {},
      });
    }

    function play() {
      if (props.src != "") {
        audio
          .play()
          .then((res) => {})
          .catch((err) => {})
          .finally((f) => {
            context.emit("play-f", {
              code: 0,
              msg: "播放点击操作结束",
              data: {},
            });
          });
      }
    }

    function pause() {
      if (props.src != "") {
        audio.pause();
        context.emit("pause-f", {
          code: 0,
          msg: "暂停点击操作结束",
          data: {},
        });
      }
    }

    onMounted(() => {
      audio = document.getElementById("cll-audio");
      audio.addEventListener("ended", endPlay, false);
    });

    onBeforeUnmount(() => {
      audio.removeEventListener("ended", endPlay, false);
    });

    return {
      play,
      pause,
    };
  },
});
</script>


<style scoped>
</style>