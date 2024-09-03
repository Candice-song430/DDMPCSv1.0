import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/data-exploration/index'
  },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
/*  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },
*/
  {
    path: '/data-exploration',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/data-exploration/index'),
        name: 'Data-Exploration',
        meta: {
          title: 'Data Exploration',
          icon: 'chart'
        }
      },
      {
        path: 'data-analysis',
        component: () => import('@/views/data-exploration/data-analysis'),
        name: 'Data-Analysis',
        meta: {
          title: 'Data Analysis'
        },
				hidden: true
      },
    ]
  },
	{
	  path: '/data-reduction',
	  component: Layout,
	  name: 'Data-Reduction',
	  meta: {
	    title: 'Data Reduction',
	    icon: 'dashboard'
	  },
	  children: [
	    {
	      path: 'index',
	      component: () => import('@/views/data-reduction/index'),
	      name: 'Data-Reduction-Algorithm',
	      meta: { title: 'Data Reduction Algorithms' }
	    },
			{
			  path: 'data-reduction-result',
			  component: () => import('@/views/data-reduction/reduction-result'),
			  name: 'Data-Reduction-Result',
			  meta: { title: 'Results of Data Reduction' },
				hidden: true
			},
	    {
	      path: 'data-preprocessing',
	      component: () => import('@/views/data-reduction/data-preprocessing'),
	      name: 'Data-Preprocessing',
	      meta: { title: 'Data preprocessing' }
	    },
	  ]
	},
	{
	  path: '/rule-extraction',
	  component: Layout,
	  meta: {
	    title: 'Rule Extraction',
	    icon: 'tab'
	  },
	  children: [
	    {
	      path: 'rule-extraction-algorithm',
	      component: () => import('@/views/rule-extraction/index'),
	      name: 'Rule-Extraction-Algorithm',
	      meta: { title: 'Rule Extraction Algorithm' }
	    },
			{
			  path: 'rule-extraction-result',
			  component: () => import('@/views/rule-extraction/extraction-result'),
			  name: 'Rule-Extraction-Result',
			  meta: { title: 'Results of Rule Extraction' },
				hidden: true
			},
	  ]
	},
	{
	  path: '/decision-tree',
	  component: Layout,
	  meta: {
	    title: 'Decision Tree Analysis',
	    icon: 'excel'
	  },
	  children: [
	    {
	      path: 'index',
	      component: () => import('@/views/decision-tree/index'),
	      name: 'Decision-Tree-Algorithm',
	      meta: { title: 'Decision Tree Algorithm' }
	    },
			{
			  path: 'decision-tree-result',
			  component: () => import('@/views/decision-tree/decision-result'),
			  name: 'Decision-Tree-Result',
			  meta: { title: 'Results of Decision Tree' },
				hidden: true
			},
	  ]
	},
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
