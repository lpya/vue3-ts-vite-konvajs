<template>
  <div class='index'>
    <div class="header">按住【ctrl】键的同时，单击鼠标【左键】选点生成线，双击【左键】【线】生成多边形</div>
    <div id="canvas"></div>
  </div>
</template>

<script lang='ts' setup>
import Konva from 'konva';
import { onMounted, ref } from 'vue';

onMounted(() => {
  init()
  keyDown()
})

const tr: Konva.Transformer = new Konva.Transformer()
const layer = new Konva.Layer()
const isCtrl = ref<boolean>(false)
const pointsArr = ref<number[]>([])
const uuid = ref<string>("")

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

  stage.add(layer)

  const poly = new Konva.Line({
    id: getUUID(),
    points: [23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93],
    fill: '#00D2FF',
    stroke: 'red',
    strokeWidth: 2,
    closed: true,
    draggable: true,
  });
  tr.nodes([poly])
  layer.add(poly)
  layer.add(tr)


  stage.on("click", (e) => {
    if (e.evt.button === 0 && isCtrl.value) {
      const { x, y } = stage.getRelativePointerPosition()
      if (uuid.value === "") {
        uuid.value = getUUID()
        const line = new Konva.Line({
          id: uuid.value,
          points: [x, y],
          fill: '#00D2FF',
          stroke: 'red',
          strokeWidth: 2,
          closed: false,
          draggable: true,
        });
        layer.add(line)
        pointsArr.value.push(x)
        pointsArr.value.push(y)
        line.on("dblclick", (lineEvt) => {
          if (uuid.value !== "" && isCtrl.value) {
            lineEvt.target.setAttrs({
              closed: true
            })
            isCtrl.value = false
            uuid.value = ""
            pointsArr.value = []
          }
        })
      } else {
        const lineDom = findShape(stage, uuid.value)
        pointsArr.value.push(x)
        pointsArr.value.push(y)
        lineDom.setAttrs({ points: pointsArr.value })
      }
      return
    }
    const dom = e.target
    if (dom.getType() === "Shape") {
      tr.nodes([dom])
    } else {
      tr.nodes([])
    }
  })
}

const findShape = (stage: Konva.Stage, id: string) => {
  return stage.findOne(`#${id}`)
}

const keyDown = () => {
  document.onkeydown = (e) => {
    if (e.key === "Control") {
      isCtrl.value = true
    }
  }
  document.onkeyup = (e) => {
    if (e.key === "Control") {
      isCtrl.value = false
      uuid.value = ""
      pointsArr.value = []
    }
  }
}

const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
</script>

<style lang='scss' scoped>
.index {
  padding: 20px;

  #canvas {
    background-color: #eee;
    border: 1px solid #666;
    height: calc(100vh - 62px);
  }
}
</style>