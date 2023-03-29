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

  const tooltip = new Konva.Label({
    x: clientWidth / 2,
    y: clientHeight / 2 - 300,
    draggable: true,
  })

  const tag = new Konva.Tag({
    fill: "#ff8800",
    pointerDirection: 'down',
    stroke: "black",
    strokeWidth: 1,
    pointerWidth: 10,
    pointerHeight: 10,
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOpacity: 0.5,
  })

  const tagText = new Konva.Text({
    text: "Hello World!",
    fontSize: 18,
    padding: 15,
    fill: "#fff"
  })

  tooltip.add(tag)
  tooltip.add(tagText)
  layer.add(tooltip)

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