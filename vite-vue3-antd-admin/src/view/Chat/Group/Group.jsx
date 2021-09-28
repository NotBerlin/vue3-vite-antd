import { defineComponent } from "@vue/runtime-core";
import { defineProps, onMounted } from "vue";
import { getGroupList } from "./modules/groupEvent.js"

export default defineComponent({
  props: {
    tim: {
      type: Object,
      default: () => { }
    },
    login: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    onMounted(() => {
      getGroupList.apply(props.tim)
    })
    return () => (
      <div id='group-component'></div>
    )
  }
})