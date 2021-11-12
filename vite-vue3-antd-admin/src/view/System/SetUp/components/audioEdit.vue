<template>
  <div id='audio-edit'>
    <base-title title="音乐播放器">
      <template v-slot:right-edit>
        <!-- <div>123</div>
        <div>123</div>
        <div>123</div> -->
      </template>
    </base-title>
    <el-form ref="form" :model="form" label-width="120px" class="form-class">
      <el-form-item label="背景颜色">
        <el-color-picker v-model="background" show-alpha @change="changeBackground"/>
      </el-form-item>
      <el-form-item label="列表颜色">
        <el-color-picker v-model="listColor" show-alpha @change="changeListColor"/>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, inject } from 'vue'
export default defineComponent({
  setup (props, context) {
    let audioController = inject('audioController')

    let state = reactive({
    })

    const background = ref('rgba(233, 30, 99, 0.25)')
    const listColor = ref('rgba(0, 0, 0, 1)')

    function changeBackground (e) {
      audioController.audioStyle.background = e
    }

    function changeListColor (e) {
      audioController.audioStyle.listColor = e
    }

    return { changeBackground, changeListColor, background, listColor }
  }
})
</script>
<style>
.form-class {
  margin-top: 20px;
}
</style>