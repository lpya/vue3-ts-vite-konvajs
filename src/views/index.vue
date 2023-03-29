
<template>
  <div class="index">
    <ul>
      <li v-for="(item, key) in linkList" :key="key" class="111">
        <router-link :to="item.path">
          {{ key + 1 }}、{{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
  
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

const state = reactive({
  linkList: [
    {
      title: '矩形【rect】',
      path: '/1-rect'
    }, {
      title: '圆【circle】',
      path: '/2-circle'
    },
    {
      title: '椭圆【ellipse】',
      path: '/3-ellipse'
    },
    {
      title: '楔形【wedge】',
      path: '/4-wedge'
    },
    {
      title: '线【line】',
      path: '/5-line'
    },
    {
      title: '文本【text】',
      path: '/6-text'
    },
    {
      title: '星星【star】',
      path: '/7-star'
    },
    {
      title: '环形【ring】',
      path: '/8-ring'
    },
    {
      title: '弧形【arc】',
      path: '/9-arc'
    },
    {
      title: '标签【label】',
      path: '/10-label'
    },
    {
      title: '多边形【regularPolygon】',
      path: '/11-regularPolygon'
    },
    {
      title: '箭头【arrow】',
      path: '/12-arrow'
    },
    {
      title: '图片【image】',
      path: '/13-image'
    },
    {
      title: '动画【animation】',
      path: '/14-animation'
    },
    {
      title: '展示隐藏【show Hide】',
      path: '/15-showHide'
    },
    {
      title: '键盘事件【keyEvents】',
      path: '/16-keyEvents'
    },
    {
      title: '组【group】',
      path: '/17-group'
    },
    {
      title: '变压器、框选【transformer】',
      path: '/18-transformer'
    },
    {
      title: '画布滚动缩放【wheel】',
      path: '/19-wheel'
    },
    {
      title: '窗口预览【preview】',
      path: '/20-preview'
    }, {
      title: '项目实战',
      path: '/advanced'
    },
  ]
})
const { linkList } = toRefs(state)
</script>
  
<style lang="scss">
.index {
  ul {
    li {
      padding: 8px 20px;

      a {
        text-decoration: none;
      }
    }
  }
}
</style>
  