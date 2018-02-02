import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/login')
const Home = () => import('@/pages/home')
const Admin = () => import('@/admin')
const Notice = () => import('@/pages/notice')
const NoticeEdit = () => import('@/pages/notice-edit')
const Accident = () => import('@/pages/accident')
const AccidentEdit = () => import('@/pages/accident-edit')
const Customer = () => import('@/pages/customer')
const CustomerEdit = () => import('@/pages/customer-edit')
const Safecheck = () => import('@/pages/safecheck')
const SafecheckEdit = () => import('@/pages/safecheck-edit')
const Goods = () => import('@/pages/goods')
const GoodsEdit = () => import('@/pages/goods-edit')
const GoodsType = () => import('@/pages/goods-type')
const GoodsTypeEdit = () => import('@/pages/goods-type-edit')
const DeviceEdit = () => import('@/pages/device-edit')
const MaintenanceEdit = () => import('@/pages/maintenance-edit')
const CompanyEdit = () => import('@/pages/company-edit')
const Order = () => import('@/pages/order')
const OrderEdit = () => import('@/pages/order-edit')
const Meeting = () => import('@/pages/meeting')
const MeetingEdit = () => import('@/pages/meeting-edit')
const Person = () => import('@/pages/person')
const PersonEdit = () => import('@/pages/person-edit')
const CarTeam = () => import('@/pages/car-team')
const CarTeamEdit = () => import('@/pages/car-team-edit')
const Doorcheck = () => import('@/pages/doorcheck')
const DoorcheckEdit = () => import('@/pages/doorcheck-edit')
const Illegal = () => import('@/pages/illegal')
const IllegalEdit = () => import('@/pages/illegal-edit')
const Danger = () => import('@/pages/danger')
const DangerEdit = () => import(/* webpackChunkName: 'chenlin' */'@/pages/danger-edit')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '',
          name: 'Admin',
          component: Notice
        },{
          path: '/notice',
          name: 'Notice',
          component: Notice
        }, {
          path: '/notice-edit',
          name: 'NoticeEdit',
          component: NoticeEdit
        }, {
          path: '/accident',
          name: 'Accident',
          component: Accident
        }, {
          path: '/accident-edit',
          name: 'AccidentEdit',
          component: AccidentEdit
        }, {
          path: '/customer',
          name: 'Customer',
          component: Customer
        }, {
          path: '/customer-edit',
          name: 'CustomerEdit',
          component: CustomerEdit
        }, {
          path: '/safecheck',
          name: 'Safecheck',
          component: Safecheck
        }, {
          path: '/safecheck-edit',
          name: 'SafecheckEdit',
          component: SafecheckEdit
        }, {
          path: '/goods',
          name: 'Goods',
          component: Goods
        }, {
          path: '/goods-edit',
          name: 'GoodsEdit',
          component: GoodsEdit
        }, {
          path: '/goods-type',
          name: 'GoodsType',
          component: GoodsType
        }, {
          path: '/goods-type-edit',
          name: 'GoodsTypeEdit',
          component: GoodsTypeEdit
        }, {
          path: '/device',
          name: 'DeviceEdit',
          component: DeviceEdit
        }, {
          path: '/maintenance-edit',
          name: 'MaintenanceEdit',
          component: MaintenanceEdit
        }, {
          path: '/company',
          name: 'CompanyEdit',
          component: CompanyEdit
        }, {
          path: '/order',
          name: 'Order',
          component: Order
        }, {
          path: '/order-edit',
          name: 'OrderEdit',
          component: OrderEdit
        }, {
          path: '/meeting',
          name: 'Meeting',
          component: Meeting
        }, {
          path: '/meeting-edit',
          name: 'MeetingEdit',
          component: MeetingEdit
        }, {
          path: '/person',
          name: 'Person',
          component: Person
        }, {
          path: '/person-edit',
          name: 'PersonEdit',
          component: PersonEdit
        }, {
          path: '/car-team',
          name: 'CarTeam',
          component: CarTeam
        }, {
          path: '/car-team-edit',
          name: 'CarTeamEdit',
          component: CarTeamEdit
        }, {
          path: '/doorcheck',
          name: 'Doorcheck',
          component: Doorcheck
        }, {
          path: '/doorcheck-edit',
          name: 'DoorcheckEdit',
          component: DoorcheckEdit
        }, {
          path: '/illegal',
          name: 'Illegal',
          component: Illegal
        }, {
          path: '/illegal-edit',
          name: 'IllegalEdit',
          component: IllegalEdit
        }, {
          path: '/danger',
          name: 'Danger',
          component: Danger
        }, {
          path: '/danger-edit',
          name: 'DangerEdit',
          component: DangerEdit
        }
      ]
    }
  ]
})
