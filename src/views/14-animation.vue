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

  Konva.Image.fromURL("/images/address.png", (image: Konva.Image) => {
    image.setAttrs({
      x: clientWidth / 2 - 25,
      y: clientHeight / 2 - 25,
      height: 50,
      width: 50,
      scaleY: 1,
      scaleX: 1,
    })

    layer.add(image)
    const amplitude = 10
    const period = 1000
    const y = image.y() - 10
    const animation = new Konva.Animation((frame) => {
      if (!frame) {
        return
      }
      image.y(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + y)
    }, layer)
    animation.start()
  })

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