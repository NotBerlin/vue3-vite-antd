<template>
  <div id="RotationChart">
    <div class="RotationChart-img-cover">
      <img src="" alt="" srcset="" />
    </div>
    <div class="center-carousel">
      <el-carousel
        initial-index="0"
        :interval="5000"
        arrow="always"
        indicator-position="none"
        @change="switchCarousel"
      >
        <el-carousel-item v-for="item in rotationChartList" :key="item">
          <img :src="item.url" alt="" srcset="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script setup>
import {
  defineProps,
  reactive,
  defineEmits,
  useAttrs,
  useSlots,
  ref,
  onMounted,
} from "vue";

const props = defineProps({
  gaussianBlur: {
    type: Boolean,
    default: false,
  },
});

const rotationChartList = reactive([]);

function setRotationChartListFn() {
  const rotationChartListConst = import.meta.globEager(
    "../../../../assets/images/rotation-chart*.jpeg"
  );
  Object.keys(rotationChartListConst).forEach((element) => {
    rotationChartList.push({
      url: rotationChartListConst[element].default,
    });
  });
}

function switchCarousel() {
  // const imgList = document.getElementsByClassName("el-carousel__item");
  // let currentImg = null;
  // const backgroundImgDom = document.getElementsByClassName(
  //   "RotationChart-img-cover"
  // )[0].firstChild;
  // for (let i = 0; i < imgList.length; i++) {
  //   if (imgList[i].style.transform === "translateX(0px) scale(1)") {
  //     currentImg = rotationChartList[i];
  //     console.log(currentImg);
  //     backgroundImgDom.setAttribute("src", currentImg.url);
  //   }
  // }
}

onMounted(() => {
  setRotationChartListFn();
  switchCarousel();
});
</script>
<style scoped>
#RotationChart {
  position: relative;
  height: 300px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__item > img {
  width: 100%;
}

.el-carousel__item > img[gaussianBlur="true"] {
  filter: blur(20px);
}

.center-carousel {
  height: 100%;
  width: 60%;
  position: absolute;
  top: 0;
  left: 20%;
}

.center-carousel img {
  height: 100% !important;
}

.RotationChart-img-cover {
  height: 100%;
  width: 100%;
}

.RotationChart-img-cover > img {
  height: 100%;
  width: 100%;
  filter: blur(20px);
  overflow: hidden;
}
</style>