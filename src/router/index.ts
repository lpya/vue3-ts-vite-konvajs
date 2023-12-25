import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
  }, {
    path: '/1-rect',
    name: '1-rect',
    component: () => import('@/views/1-rect.vue'),
  },
  {
    path: '/2-circle',
    name: '2-circle',
    component: () => import('@/views/2-circle.vue'),
  }, {
    path: '/3-ellipse',
    name: '3-ellipse',
    component: () => import('@/views/3-ellipse.vue'),
  }, {
    path: '/4-wedge',
    name: '4-wedge',
    component: () => import('@/views/4-wedge.vue'),
  }, {
    path: '/5-line',
    name: '5-line',
    component: () => import('@/views/5-line.vue'),
  }, {
    path: '/6-text',
    name: '6-text',
    component: () => import('@/views/6-text.vue'),
  }, {
    path: '/7-star',
    name: '7-star',
    component: () => import('@/views/7-star.vue'),
  }, {
    path: '/8-ring',
    name: '8-ring',
    component: () => import('@/views/8-ring.vue'),
  }, {
    path: '/9-arc',
    name: '9-arc',
    component: () => import('@/views/9-arc.vue'),
  }, {
    path: '/10-label',
    name: '10-label',
    component: () => import('@/views/10-label.vue'),
  }, {
    path: '/11-regularPolygon',
    name: '11-regularPolygon',
    component: () => import('@/views/11-regularPolygon.vue'),
  }, {
    path: '/12-arrow',
    name: '12-arrow',
    component: () => import('@/views/12-arrow.vue'),
  }, {
    path: '/13-image',
    name: '13-image',
    component: () => import('@/views/13-image.vue'),
  }, {
    path: '/14-animation',
    name: '14-animation',
    component: () => import('@/views/14-animation.vue'),
  }, {
    path: '/15-showHide',
    name: '15-showHide',
    component: () => import('@/views/15-showHide.vue'),
  }, {
    path: '/16-keyEvents',
    name: '16-keyEvents',
    component: () => import('@/views/16-keyEvents.vue'),
  }, {
    path: '/17-group',
    name: '17-group',
    component: () => import('@/views/17-group.vue'),
  }, {
    path: '/18-transformer',
    name: '18-transformer',
    component: () => import('@/views/18-transformer.vue'),
  }, {
    path: '/19-wheel',
    name: '19-wheel',
    component: () => import('@/views/19-wheel.vue'),
  },
  {
    path: '/20-preview',
    name: '20-preview',
    component: () => import('@/views/20-preview.vue'),
  },
  {
    path: '/21-hoverEvents',
    name: '21-hoverEvents',
    component: () => import('@/views/21-hoverEvents.vue'),
  },
  {
    path: '/22-closedLine',
    name: '22-closedLine',
    component: () => import('@/views/22-closedLine.vue'),
  },
  {
    path: '/advanced',
    name: 'advanced',
    component: () => import('@/views/advanced/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
