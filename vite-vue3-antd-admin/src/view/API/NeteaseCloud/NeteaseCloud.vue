<template>
  <div id="neteaseCloud">
    <Header />
    <RotationChart class="gaussian-blur" :gaussian-blur="true" />
  </div>
</template>
<script setup>
import {
  defineProps,
  reactive,
  defineEmits,
  useAttrs,
  useSlots,
  onMounted,
} from "vue";
import Header from "./modules/Header.vue";
import RotationChart from "./modules/RotationChart.vue";
import useInstance from "../../../mixins/instance";

const { $bus, $route, $router, $store, $_http, $_API } = useInstance();

onMounted(async() => {
  const query = {
    type: 'song',
    id: "28012031",
  };
  const res = await $_http.get($_API.API_NETEASE_CLOUD_SEARCH, { query });
  debugger
});
</script>
<style>
.gaussian-blur {
  margin-top: 31px;
}
</style>