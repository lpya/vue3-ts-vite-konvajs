<template>
  <div class='editorText'>
    <div id="canvas"></div>
  </div>
</template>

<script lang='ts' setup>
import Konva from 'konva';
import { onMounted,ref,onBeforeUnmount } from 'vue';

let textareaDom:HTMLTextAreaElement

onMounted(() => {
  init()
})
onBeforeUnmount(()=>{  
  if (textareaDom.parentNode){
    textareaDom.parentNode.removeChild(textareaDom)
  }
})
const init = () => {
  const el = document.getElementById("canvas")
  if (!el) {
    return
  }
  const { clientWidth, clientHeight } = el 
  var stage = new Konva.Stage({
    container: 'canvas',      
    width: clientWidth,
    height: clientHeight,
  });
  
  var layer = new Konva.Layer();
  stage.add(layer);
  /**
   * 准备：
   * 1、新建两个矩形
   * 2、每个矩形都新增属于自己的描点【边上那些圆圈】
   * 3、通过描点来确定连线的起点和终点位置
   * 4、悬浮矩形，显示描点
   * 操作：
   * 
   * 1、悬浮到矩形上，显示描点
   * 2、鼠标点击描点并按住时，新增【line】，线的坐标起点是点击的描点，终点是当前鼠标坐标
   * 3、移动鼠标，移到到另外一个矩形的描点上时，记录终点坐标
   * 4、这时就可以获取到线的关系【两个描点的domID，例：aRectPoint,bRectPoint】
   * 5、监听矩形移动，然后获取【aRectPoint,bRectPoint】的坐标，重新绘制线
   */
  var rect1 = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: 'red',
    draggable: true,
  });
  layer.add(rect1);
  
  var rect2 = new Konva.Rect({
    x: 300,
    y: 150,
    width: 100,
    height: 100,
    fill: 'blue',
    draggable: true,
  });
  layer.add(rect2);
  
  function drawLineBetweenRects() {
    let lineDom = stage.findOne("#lineDom") 
    if(!lineDom){
      var line = new Konva.Line({
        id:"lineDom",
        points: [rect1.x() + rect1.width() / 2, rect1.y() + rect1.height() / 2,
          rect2.x() + rect2.width() / 2, rect2.y() + rect2.height() / 2],
        stroke: 'black',
        strokeWidth: 2,
        draggable: false,  
      });
      layer.add(line);
    }else{
      lineDom.setAttrs({points:[rect1.x() + rect1.width() / 2, rect1.y() + rect1.height() / 2,
        rect2.x() + rect2.width() / 2, rect2.y() + rect2.height() / 2]})
    }
 
    layer.batchDraw();  
  }
  
  drawLineBetweenRects();
  
  rect1.on('dragmove', function () {
    drawLineBetweenRects(); 
  });
 
  rect2.on('dragmove', function () {
    drawLineBetweenRects(); 
  });
  
  window.addEventListener('resize', function () {
    stage.width(window.innerWidth);
    stage.height(window.innerHeight);
  });
  
}
</script>

<style lang='scss' scoped>
.editorText {
  padding: 20px;

  #canvas {
    background-color: #eee;
    border: 1px solid #666;
    height: calc(100vh - 42px);
  }
}
</style>