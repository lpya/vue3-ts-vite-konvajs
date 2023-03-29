<template>
  <div class='index'>
    <div id="canvas"></div>
  </div>
</template>

<script lang='ts' setup>
import Konva from 'konva';
import { onMounted } from 'vue';

onMounted(() => {
  init()
})

const init = () => {
  const el = document.getElementById("canvas")
  if (!el) {
    return
  }

  const { clientWidth, clientHeight } = el
  const stage = new Konva.Stage({
    container: 'canvas',
    width: clientWidth,
    height: clientHeight,
  })

  const layer = new Konva.Layer()
  stage.add(layer)
  // 圆
  const circle = new Konva.Circle({
    x: clientWidth / 2,
    y: clientHeight / 2,
    radius: 100,
    fill: "#ff8800",
    stroke: "#000000",
    strokeWidth: 1,
    draggable: true
  })
  layer.add(circle)

}
</script>

<style lang='scss' scoped>
.index {
  padding: 20px;

  #canvas {
    background-color: #eee;
    border: 1px solid #666;
    height: calc(100vh - 42px);
  }
}
</style>