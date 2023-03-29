<template>
  <div class='index'>
    <div class="header">
      <el-button type="primary" @click="show">展示</el-button>
      <el-button type="success" @click="hide">隐藏</el-button>
    </div>
    <div id="canvas"></div>
  </div>
</template>

<script lang='ts' setup>
import Konva from 'konva';
import { onMounted } from 'vue';

let stage: Konva.Stage | null = null

const layer: Konva.Layer = new Konva.Layer()


onMounted(() => {
  init()
})

const init = () => {
  const el = document.getElementById("canvas")
  if (!el) {
    return
  }
  const { clientWidth, clientHeight } = el
  stage = new Konva.Stage({
    container: 'canvas',
    width: clientWidth,
    height: clientHeight,
  })

  stage.add(layer)
  // 矩形
  const width = 400
  const height = 200
  const x = clientWidth / 2 - width / 2
  const y = clientHeight / 2 - height / 2
  const rect = new Konva.Rect({
    id: "testId",
    name: "testName",
    x: x,
    y: y,
    width: width,
    height: height,
    fill: "#ff8800",
    stroke: 'black',
    strokeWidth: 1,
    opacity: 0.5 // 0~1
  })
  layer.add(rect)

  const container = stage.container()
  const step = 10
  container.tabIndex = 1
  container.focus()
  container.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      rect.x(rect.x() - step)
    } else if (e.key === "ArrowDown") {
      rect.y(rect.y() + step)
    } else if (e.key === "ArrowRight") {
      rect.x(rect.x() + step)
    } else if (e.key === "ArrowUp") {
      rect.y(rect.y() - step)
    } else {
      return
    }
    e.preventDefault()
  })
}

const show = () => {
  if (!stage) {
    return
  }
  // const shapes = stage.findOne("#testId")
  // const shapes = stage.findOne(".testName")
  const shapes = stage.findOne("Rect")
  shapes.show()
}
const hide = () => {
  if (!stage) {
    return
  }
  const shapes = stage.findOne("Rect")
  shapes.hide()
}
</script>

<style lang='scss' scoped>
.index {
  padding: 20px;

  .header {
    height: 50px;
  }

  #canvas {
    background-color: #eee;
    border: 1px solid #666;
    height: calc(100vh - 92px);
  }
}
</style>