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
  // 线、曲线、闭合
  const line = new Konva.Line({
    x: 400,
    points: [100, 100, 200, 300, 500, 400, 800, 500],//[x1,y1,x2,y2...]
    stroke: "red",
    strokeWidth: 2,
    // closed: true,
    draggable: true,
    fill: "red",
    tension: 0.5// 值越大，拉伸越大
  })
  layer.add(line)

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