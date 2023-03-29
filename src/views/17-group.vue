<template>
  <div class='index'>
    <div class="header">
      <el-button type="warning" @click="moveToTop">置顶</el-button>
      <el-button type="danger" @click="moveToBottom">置底</el-button>
      <el-button type="info" @click="moveUp">上移一层</el-button>
      <el-button type="success" @click="moveDown">下移一层</el-button>
    </div>
    <div id="canvas"></div>
  </div>
</template>

<script lang='ts' setup>
import Konva from 'konva';
import { onMounted } from 'vue';

let stage: Konva.Stage | null = null

const layer: Konva.Layer = new Konva.Layer()

const group: Konva.Group = new Konva.Group()

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
  group.setAttrs({
    x: clientWidth / 2,
    y: clientHeight / 2,
    draggable: true,
  })
  const colors = ["#ff8800", "#ff0000", "#ff00ff", "#00ffff"]
  for (let i = 0; i < 4; i++) {
    const rect = new Konva.Rect({
      id: `rect${i}`,
      name: "testName",
      x: i * 20,
      y: i * 20,
      width: 100,
      height: 50,
      fill: colors[i],
      stroke: 'black',
      strokeWidth: 1,
      draggable: true
    })
    group.add(rect)
  }
  layer.add(group)
}

const moveToTop = () => {
  if (!stage) {
    return
  }
  const shapes = stage.findOne("#rect0")
  shapes.moveToTop()
}

const moveToBottom = () => {
  if (!stage) {
    return
  }
  const shapes = stage.findOne("#rect0")
  shapes.moveToBottom()
}

const moveDown = () => {
  if (!stage) {
    return
  }
  const shapes = stage.findOne("#rect0")
  shapes.moveDown()
}
const moveUp = () => {
  if (!stage) {
    return
  }
  const shapes = stage.findOne("#rect0")
  shapes.moveUp()
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