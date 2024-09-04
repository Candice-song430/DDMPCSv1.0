import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1

 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/databases/sources',
    children: [{
      path: 'databases',
      name: 'Databases',
      redirect: '/databases/sources',
      meta: { title: 'HOME', icon: 'dashboard' },
      component: () => import('@/views/databases/index'),
      children: [
      {
        path: 'sources',
        name: 'Sources',
        component: () => import('@/views/databases/views/sources/index'),
        meta: { title: 'Local Resources', icon: 'dashboard' }
      },
      // {
      //   path: 'tools',
      //   name: 'Tools',
      //   component: () => import('@/views/databases/views/tools/index'),
      //   meta: { title: '工具库', icon: 'el-icon-s-cooperation' }
      // },

      ]
    },


  
  ]
  },

  {
    path: '/viewstore',
    name: 'viewStore',
    meta: { title: 'View Data-table', icon: 'dashboard' },
    component: () => import('@/views/viewstore/index'),
  },

  {
    path: '/modelmarket',
    name: 'modelMarket',
    meta: { title: 'Model Market', icon: 'dashboard' },
    component: () => import('@/views/modelmarket/index'),
  },



  


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  // mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  mode: 'hash',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
