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
  // 矩形
  const width = 400
  const height = 200
  const x = clientWidth / 2 - width / 2
  const y = clientHeight / 2 - height / 2
  const rect = new Konva.Rect({
    x: x,
    y: y,
    width: width,
    height: height,
    fill: "#ff8800",
    stroke: 'black',
    strokeWidth: 1
  })
  layer.add(rect)

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