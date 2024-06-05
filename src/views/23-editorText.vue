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
  const stage = new Konva.Stage({
    container: 'canvas',
    width: clientWidth,
    height: clientHeight,
  })
  const layer = new Konva.Layer()
  stage.add(layer)

  const textNode = new Konva.Text({
    text: '文本编辑【双击编辑】【按Enter确认】',
    x: clientWidth/2-200,
    y: clientHeight/2-10,
    fontSize: 20,
    draggable: true,
    width: 400,
  });

  layer.add(textNode);

  const tr = new Konva.Transformer({ 
    enabledAnchors: ['middle-left', 'middle-right'], 
    boundBoxFunc: function (oldBox, newBox) {
      newBox.width = Math.max(30, newBox.width);
      return newBox;
    },
  });
  tr.nodes([textNode])


  textNode.on('transform', function () { 
    textNode.setAttrs({
      width: textNode.width() * textNode.scaleX(),
      scaleX: 1,
    });
  });
  layer.add(tr);

  textNode.on('dblclick dbltap', () => {
    textNode.hide();
    tr.hide();
    const textPosition = textNode.absolutePosition();
    const areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };
    //编辑文本样式
    const textarea = document.createElement('textarea');
    textareaDom = textarea
    document.body.appendChild(textarea);
    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
    textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
    textarea.style.fontSize = textNode.fontSize() + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textNode.lineHeight().toString();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    const rotation = textNode.rotation();
    let transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }
    textarea.style.transform = transform;
    textarea.style.height = 'auto'; 
    textarea.style.height = textarea.scrollHeight + 3 + 'px';
    textarea.focus();
    //移除编辑输入框
    function removeTextarea() {
      if (textarea.parentNode){
        textarea.parentNode.removeChild(textarea);
      }
     
      textNode.show();
      tr.show();
      tr.forceUpdate(); 
    } 
    function setTextareaWidth(newWidth:number) {
      textarea.style.width = newWidth + 'px';
    }

    textarea.addEventListener('keydown', function (evt) { 
      if (evt.key === "Enter") {
        textNode.text(textarea.value);
        removeTextarea();
      } 
      if (evt.key === "Backspace") {
        removeTextarea();
      }
    });

    textarea.addEventListener('keydown', function () {
      let scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + textNode.fontSize() + 'px';
    }); 
  })
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