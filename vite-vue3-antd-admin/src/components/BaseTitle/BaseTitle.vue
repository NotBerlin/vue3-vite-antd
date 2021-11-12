<template>
  <div id="base-title">
    <div class="title">
      <div class="left-title">
        <div class="left-title-icon"></div>{{title}}
      </div>
      <div class="right-edit">
        <slot name="right-edit"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  name: 'base-title',
  props: {
    title: {
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
#base-title {
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  padding: 24px 0 12px 0;
}

.title {
  width: 100%;
  display: flex;
}

.left-title {
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.left-title-icon {
  height: 24px;
  width: 4px;
  background: linear-gradient(rgba(30, 121, 233, 1), rgba(30, 179, 233, 1));
  margin-right: 10px;
}

.right-edit {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin-right: 20px;
}
</style>