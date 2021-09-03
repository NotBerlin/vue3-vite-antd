<template>
  <div id='map'>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots, onMounted } from 'vue'

const state = reactive({
  count: 0,
  markerMap: {}
})

var map = null

function addMarket (point) {
  var tag = new BMap.Point(point.longitude, point.latitude);
  var marker = new BMap.Marker(tag);        // 创建标注   
  state.markerMap.first = marker
  setListener(marker)
  map.addOverlay(marker);
}

function setCenter (point) {
  var tag = new BMap.Point(point.longitude, point.latitude)
  map.centerAndZoom(tag, 15)
  map.enableScrollWheelZoom(true)
}

function setMarkerOptions (point) {
  var tag = new BMap.Point(point.longitude, point.latitude)
  var myIcon = new BMap.Icon("markers.png", new BMap.Size(23, 25), {
    // 指定定位位置。  
    // 当标注显示在地图上时，其所指向的地理位置距离图标左上   
    // 角各偏移10像素和25像素。您可以看到在本例中该位置即是  
    // 图标中央下端的尖角位置。   
    anchor: new BMap.Size(10, 25),
    // 设置图片偏移。  
    // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您  
    // 需要指定大图的偏移位置，此做法与css sprites技术类似。   
    imageOffset: new BMap.Size(0, 0 - 25)   // 设置图片偏移   
  });
  // 创建标注对象并添加到地图  
  var marker = new BMap.Marker(tag, { icon: myIcon });
  map.addOverlay(marker);
}

function setController () {
  var scaleCtrl = new BMap.ScaleControl();  // 添加比例尺控件
  map.addControl(scaleCtrl);
  var zoomCtrl = new BMap.ZoomControl();  // 添加缩放控件
  map.addControl(zoomCtrl);
  var cityCtrl = new BMap.CityListControl();  // 添加城市列表控件
  map.addControl(cityCtrl);
}

function setListener (marker) {
  marker.addEventListener("click", function () {
    alert("您点击了标注");
  });
}

onMounted(() => {
  map = new BMap.Map('map')

  setCenter({
    longitude: 104.37,
    latitude: 30.32
  })

  addMarket({
    longitude: 104.37,
    latitude: 30.32
  })

  setMarkerOptions({
    longitude: 104.37,
    latitude: 30.32
  })
})
</script>
<style>
#map {
}
</style>