import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  request
} from '../network/axios'
const Login = () => import('../views/login/Login')
const Home = () => import('../views/home/Home')
const Users = () => import('../views/childrenItem/users/Users')
const DashBoard = () => import('../views/childrenItem/dashBoard/DashBoard')
const Info = () => import('../views/childrenItem/info/Info')
const Province = () => import('../views/childrenItem/province/Province')
const City = () => import('../views/childrenItem/city/City')
const AddInfo = () => import('../views/childrenItem/info/childern/addInfo')
const EditInfo = () => import('../views/childrenItem/info/childern/editInfo')
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/dashboard',
    children: [{
        path: '/dashboard',
        component: DashBoard
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/info',
        component: Info
      },
      {
        path: '/province',
        component: Province
      },
      {
        path: '/city',
        component: City
      },
      {
        path: '/addinfo',
        component: AddInfo
      },
      {
        path: '/editInfo',
        component: EditInfo
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  base: '/manage/',
})

router.beforeEach((to, from, next) => {
  request({
    url: '?service=User.getUserData'
  }).then(({
    data
  }) => {
    // console.log(data)
    if (data.meta.status === 401) {
      return next('/login')
    }
  })

  if (to.path === '/login') return next()
  const getToken = sessionStorage.getItem('token')
  if (!getToken) return next('/login')

  next()
})

export default router