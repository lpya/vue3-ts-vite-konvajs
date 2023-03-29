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
  // 文本
  const text = new Konva.Text({
    x: 0,
    y: clientHeight / 2,
    text: "Hello World!",
    fontSize: 40,
    fill: "black"
  })
  text.x(clientWidth / 2 - text.width() / 2)
  layer.add(text)

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