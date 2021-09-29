<template>
  <div id="icon-custom">
    <div v-if="name == 'online'" class="online"></div>
    <div v-if="name == 'next'" class="next"></div>
    <div v-if="name == 'add'" class="add"></div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  name: 'custom-icon',
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    color: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    return {}
  }
})
</script>

<style scoped>
#icon-custom {
  display: inline-block;
}

.online {
  height: 12px;
  width: 12px;
  background: #76ff03;
  border-radius: 100%;
  transform: scale(0.7);
}

.next {
  height: 12px;
  width: 12px;
  position: relative;
}

.next::before {
  content: "";
  position: absolute;
  height: 5px;
  width: 1px;
  background: gray;
  transform: rotate(-53deg);
  right: 4px;
  top: 2px;
}

.next::after {
  content: "";
  position: absolute;
  height: 5px;
  width: 1px;
  background: gray;
  transform: rotate(-127deg);
  right: 4px;
  bottom: 2px;
}

.add {
  height: 12px;
  width: 12px;
  position: relative;
}

.add::before {
  content: "";
  position: absolute;
  height: 12px;
  width: 1px;
  left: 5px;
  top: 0;
  background: gray;
}

.add::after {
  content: "";
  position: absolute;
  height: 12px;
  width: 1px;
  transform: rotate(90deg);
  left: 5px;
  top: 0;
  background: gray;
}

.add:hover {
  animation: revolution 1s;
}

@keyframes revolution {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
}

@-moz-keyframes revolution /* Firefox */ {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
}

@-webkit-keyframes revolution /* Safari 和 Chrome */ {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
}

@-o-keyframes revolution /* Opera */ {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
}
</style>