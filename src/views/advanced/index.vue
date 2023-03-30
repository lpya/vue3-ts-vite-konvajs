<template>
  <div class="advanced">
    <div class="header">
      <div class="action-left">
        <el-button type="warning" @click="back">返回</el-button>
      </div>
      <div class="action-right">
        <el-button type="success" @click="jumpGithub">项目地址</el-button>
        <el-button type="primary" @click="downLoadFile">导出png</el-button>
        <el-button type="danger" @click="clearShapes">清空</el-button>
      </div>
    </div>
    <div class="container">
      <div class="shapes">
        <div class="shapes-title">基本图形</div>
        <div class="shapes-content">
          <div v-for="(item, key) in componentShapeList" :key="key" class="shapes-item" draggable="true"
            @mousedown="handleClick(item.type)">
            <i class="iconfont" :class="item.icon"></i>
            <label>{{ item.name }}</label>
          </div>
        </div>
      </div>
      <div id="canvas"></div>
      <div class="attrs">
        <div class="attrs-content">
          <div class="attrs-title">属性</div>
          <div class="attrs-item">
            <div class="label">标题</div>
            <div class="input">
              <el-input v-model="shapeAttrs.title" style="width: 150px;" @change="changeShapeAttrs"></el-input>
            </div>
          </div>
          <div class="attrs-item">
            <div class="label">宽</div>
            <div class="input">
              <el-input-number v-model="shapeAttrs.width" :controls="false" @change="changeShapeAttrs"> </el-input-number>
            </div>
          </div>
          <div class="attrs-item">
            <div class="label">高</div>
            <div class="input">
              <el-input-number v-model="shapeAttrs.height" :controls="false" @change="changeShapeAttrs"></el-input-number>
            </div>
          </div>
          <div class="attrs-item">
            <div class="label">X</div>
            <div class="input">
              <el-input-number v-model="shapeAttrs.x" :controls="false" @change="changeShapeAttrs"></el-input-number>
            </div>
          </div>
          <div class="attrs-item">
            <div class="label">Y</div>
            <div class="input">
              <el-input-number v-model="shapeAttrs.y" :controls="false" @change="changeShapeAttrs"></el-input-number>
            </div>
          </div>
          <div class="attrs-title">外形</div>
          <div class="attrs-item">
            <div class="label">不透明度</div>
            <div class="input">
              <el-slider v-model="shapeAttrs.opacity" size="small" :min="0" :max="1" :step="0.01" style="width:120px"
                @change="changeShapeAttrs"></el-slider>
              <span class="color">{{ getOpacity(shapeAttrs.opacity) }}%</span>
            </div>
          </div>
          <div class="attrs-item">
            <div class="label">填充</div>
            <div class="input">
              <el-color-picker v-model="shapeAttrs.fill" @change="changeShapeAttrs"></el-color-picker>
              <span class="color">{{ shapeAttrs.fill }}</span>
            </div>
          </div>
          <div class="attrs-item">
            <div class="label">边框</div>
            <div class="input">
              <el-color-picker v-model="shapeAttrs.stroke" @change="changeShapeAttrs"></el-color-picker>
              <span class="color">{{ shapeAttrs.stroke }}</span>
            </div>
          </div>
          <div class="attrs-item">
            <div class="label">边框宽度</div>
            <div class="input">
              <el-input-number v-model="shapeAttrs.strokeWidth" :controls="false"
                @change="changeShapeAttrs"></el-input-number>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="contextMenuVis" class="contextMenu">
      <div v-for="(item, key) in menuList" :key="key" class="contextmenu-item"
        :class="item.disabled ? 'disabled' : 'default'" @click="menuClick(item.type)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { KonvaJS } from "./utils/konva";
import { reactive, toRefs, onMounted } from "vue";

import { IComponentShapeType } from "./@types";
import Konva from "konva";
import { componentShapeType, componentShapeList } from "./utils/consts";
import { useRouter } from "vue-router";
const state = reactive({
  konva: new KonvaJS("canvas"),
  type: "" as IComponentShapeType,
  shapeAttrs: {} as Konva.NodeConfig,
  menuList: [
    { name: "上移图形", type: "moveUp", disabled: false },
    { name: "下移图形", type: "moveDown", disabled: false },
    { name: "删除", type: "destroy", disabled: false },
  ],
  contextMenuVis: false
})
const router = useRouter()
onMounted(() => {
  init()
  document.oncontextmenu = function () {
    return false
  }
})
const init = () => {
  state.konva.init()
  listenerStageEvents()
  window.onresize = () => {
    state.konva.onresize()
  }
}

const listenerStageEvents = () => {
  const { stage } = state.konva
  if (!stage) {
    return
  }
  const container = stage.container()
  getShapeAttrs(stage.findOne(".board"))
  stage.on("click tap", (e) => {
    const dom = e.target
    const domAttrs = dom.getAttrs()
    if (e.evt.button === 2) {
      if (domAttrs.type !== componentShapeType.RECT &&
        domAttrs.type !== componentShapeType.PARALLELOGRAM &&
        domAttrs.type !== componentShapeType.RHOMBUS) {
        return
      }
      getShapeAttrs(dom)
      closeContextMenu()
      if (!state.contextMenuVis) {
        showContextMenu()
        let menuDom = document.querySelector(".contextMenu") as HTMLElement
        if (!menuDom) {
          return
        }
        if (dom.getAbsoluteZIndex() === 5) {
          state.menuList[1].disabled = true
        } else {
          state.menuList[1].disabled = false
        }
        menuDom.style.left = `${e.evt.clientX + 10}px`
        menuDom.style.top = `${e.evt.clientY + 1}px`
      }
    }
  })
  stage.on("mousedown", (e) => {
    const dom = e.target
    const domAttrs = dom.getAttrs()
    if (e.evt.button === 1) {
      stage.draggable(true)
    }
    if (e.evt.button === 0) {
      closeContextMenu()
      if (domAttrs.type === componentShapeType.CANVAS) {
        getShapeAttrs(stage.findOne(".board"))
        state.konva.tr.nodes([])
        return
      }
      if (!domAttrs.create) {
        return
      }
      getShapeAttrs(dom)
      if (domAttrs.type === componentShapeType.BOARD) {
        state.konva.tr.nodes([])
        return
      }
      state.konva.tr.nodes([dom])
    }
  })
  stage.on("mouseup", (e) => {
    if (e.evt.button === 1) {
      stage.draggable(false)
    }
  })
  container.addEventListener("dragover", (e) => {
    e.preventDefault()
  })
  container.addEventListener("drop", (e) => {
    e.preventDefault()
    if (state.type === '') {
      return
    }
    stage.setPointersPositions(e)
    const shape = state.konva.drawShapes(state.type, stage.getRelativePointerPosition())
    if (!shape) {
      return
    }
    listenerShapeEvents(shape)
  })
}

const listenerShapeEvents = (shape: Konva.Node) => {
  shape.on("dragmove", (e) => {
    getShapeAttrs(e.target)
  })
  shape.on("transform", (e) => {
    getShapeAttrs(e.target)
  })
}

const handleClick = (type: IComponentShapeType) => {
  state.type = type
}

const getShapeAttrs = (shape: Konva.Node) => {
  const { id, title, opacity, fill, stroke, strokeWidth, width, height, x, y, scaleX, scaleY, type, radius } = shape.getAttrs()
  let attrs = { id, title, opacity, fill, stroke, strokeWidth, width, height, x, y, scaleX, scaleY, type, radius }
  if (type === componentShapeType.RHOMBUS) {
    attrs.width = Math.round(radius * scaleX) * 2
    attrs.height = Math.round(radius * scaleY) * 2
  } else {
    attrs.width = Math.round(width * scaleX)
    attrs.height = Math.round(height * scaleY)
  }
  attrs.x = Math.round(x)
  attrs.y = Math.round(y)
  state.shapeAttrs = attrs
}
const getOpacity = (opacity: number | undefined) => {
  if (!opacity) {
    return 100
  }
  return Math.round(opacity * 100)
}
const changeShapeAttrs = () => {
  const { stage } = state.konva
  if (!stage) {
    return
  }
  const shape = stage.findOne(`#${state.shapeAttrs.id}`)
  if (!shape) {
    return
  }
  let { id, title, opacity, fill, stroke, strokeWidth, width, height, x, y, scaleX, scaleY, type, radius } = state.shapeAttrs
  if (!width) {
    return
  }
  if (!height) {
    return
  }
  if (!scaleX) {
    return
  }
  if (!scaleY) {
    return
  }
  if (type === componentShapeType.RHOMBUS) {
    scaleX = width / radius * 0.5
    scaleY = height / radius * 0.5
    shape.setAttrs({ id, title, opacity, fill, stroke, strokeWidth, x, y, scaleX, scaleY, type, radius })
  } else {
    width = Math.round(width / scaleX)
    height = Math.round(height / scaleY)
    shape.setAttrs({ id, title, opacity, fill, stroke, strokeWidth, width, height, x, y, scaleX, scaleY, type })

  }
}
const showContextMenu = () => {
  state.contextMenuVis = true
}
const closeContextMenu = () => {
  state.contextMenuVis = false
}

const menuClick = (type: string) => {
  const { shapeAttrs, konva } = state
  const shape = konva.stage?.findOne(`#${shapeAttrs.id}`)
  if (!shape) {
    return
  }
  if (type === "moveUp") {
    shape.moveUp()
  } else if (type === "moveDown") {
    if (shape.getAbsoluteZIndex() === 5) {
      return
    }
    shape.moveDown()
  } else if (type === "destroy") {
    shape.destroy()
  }
  konva.tr.nodes([])
  closeContextMenu()
}


const downLoadFile = () => {
  const url = state.konva.group.toDataURL()
  let link = document.createElement("a")
  link.download = "canvas.png"
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
const clearShapes = () => {
  let list = state.konva.group.find("Shape")
  for (let i = 0; i < list.length; i++) {
    const shape = list[i]
    const shapeAttrs = shape.getAttrs()
    if (shapeAttrs.type !== componentShapeType.BOARD) {
      shape.destroy()
    }
  }
}
const back = () => {
  router.push("/")
}
const jumpGithub = () => {
  window.location.href = "https://github.com/lpya/vue3-ts-vite-konvajs"
}
const { shapeAttrs, menuList, contextMenuVis } = toRefs(state)
</script>

<style lang="scss">
@import "./scss/index.scss";
</style>