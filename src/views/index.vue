
<template>
  <div class="index">
    <div class="header">
      <div class="action-left"> </div>
      <div class="action-right">
        <el-button type="primary" @click="jumpHome">主页</el-button>
        <el-button type="success" @click="jumpGithub">项目地址</el-button>
      </div>
    </div>
    <div class="content">
      <el-row class="list" :gutter="20">
        <el-col v-for="(item, key) in linkList" :key="key" :span="6" class="list-item">
          <router-link :to="item.path" class="card">
            <!-- githubpage不支持动态导入路径 -->
            <!-- <div class="cover" :style="{ background: `url(${getAssetsFile(item.coverUrl)})`, backgroundSize: '100% 100%' }"></div> -->
            <div class="cover"></div>
            <div class="title">{{ item.title }}</div>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div class="footer"></div>
  </div>
</template>

  
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

const state = reactive({
  linkList: [
    {
      title: '项目实战',
      path: '/advanced',
      coverUrl: '../assets/images/00.png',
    },
    {
      title: '矩形【rect】',
      path: '/1-rect',
      coverUrl: '../assets/images/01.png',
    },
    {
      title: '圆【circle】',
      path: '/2-circle',
      coverUrl: '../assets/images/02.png',
    },
    {
      title: '椭圆【ellipse】',
      path: '/3-ellipse',
      coverUrl: '../assets/images/03.png',
    },
    {
      title: '楔形【wedge】',
      path: '/4-wedge',
      coverUrl: '../assets/images/04.png',
    },
    {
      title: '线【line】',
      path: '/5-line',
      coverUrl: '../assets/images/05.png',
    },
    {
      title: '文本【text】',
      path: '/6-text',
      coverUrl: '../assets/images/06.png',
    },
    {
      title: '星星【star】',
      path: '/7-star',
      coverUrl: '../assets/images/07.png',
    },
    {
      title: '环形【ring】',
      path: '/8-ring',
      coverUrl: '../assets/images/08.png',
    },
    {
      title: '弧形【arc】',
      path: '/9-arc',
      coverUrl: '../assets/images/09.png',
    },
    {
      title: '标签【label】',
      path: '/10-label',
      coverUrl: '../assets/images/10.png',
    },
    {
      title: '多边形【regularPolygon】',
      path: '/11-regularPolygon',
      coverUrl: '../assets/images/11.png',
    },
    {
      title: '箭头【arrow】',
      path: '/12-arrow',
      coverUrl: '../assets/images/12.png',
    },
    {
      title: '图片【image】',
      path: '/13-image',
      coverUrl: '../assets/images/13.png',
    },
    {
      title: '动画【animation】',
      path: '/14-animation',
      coverUrl: '../assets/images/14.png',
    },
    {
      title: '展示隐藏【show Hide】',
      path: '/15-showHide',
      coverUrl: '../assets/images/15.png',
    },
    {
      title: '键盘事件【keyEvents】',
      path: '/16-keyEvents',
      coverUrl: '../assets/images/16.png',
    },
    {
      title: '组【group】',
      path: '/17-group',
      coverUrl: '../assets/images/17.png',
    },
    {
      title: '变压器、框选【transformer】',
      path: '/18-transformer',
      coverUrl: '../assets/images/18.png',
    },
    {
      title: '画布滚动缩放【wheel】',
      path: '/19-wheel',
      coverUrl: '../assets/images/19.png',
    },
    {
      title: '窗口预览【preview】',
      path: '/20-preview',
      coverUrl: '../assets/images/20.png',
    },
    {
      title: '图形悬浮高亮【mouseenter】',
      path: '/21-hoverEvents',
      coverUrl: '../assets/images/21.png',
    },
    {
      title: '鼠标点击设置多边形【line】',
      path: '/22-closedLine',
      coverUrl: '../assets/images/21.png',
    },
  ]
})
const { linkList } = toRefs(state)

const jumpHome = () => {
  window.location.href = 'https://www.lpya.cn'
}

const jumpGithub = () => {
  window.location.href = 'https://github.com/lpya/vue3-ts-vite-konvajs'
}

const getAssetsFile = (url: string) => {
  const imgUrl = new URL(url, import.meta.url).href
  return imgUrl
}
</script>
  
<style lang="scss" scoped>
.index {
  height: 100vh;
  background: #202835;
  color: #919bb0;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 20px;
    background: #323e52;
    border-bottom: 1px solid #202835;
  }

  .content {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 70px);

    .list {
      padding: 20px;
      margin-top: 20px;

      .card {
        display: block;
        border-radius: 5px;
        padding: 15px;
        background: #323e52;
        margin-bottom: 20px;
        text-decoration: none;
        color: #919bb0;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.01);

          .title {
            color: #c5cfe3;
          }
        }

        .cover {
          padding-bottom: 60%;
          border-radius: 5px;
        }

        .title {
          margin-top: 10px;
          text-align: center;
          font-size: 18px;
        }
      }

    }

  }

}

@for $i from 1 through 23 {
  .list-item:nth-child(#{$i}) {
    .cover {
      background: url("@/assets/images/#{$i - 1}.png");
      background-size: 100% 100%;
    }
  }
}
</style>
