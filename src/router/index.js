import Vue from 'vue'
import Router from 'vue-router'
import Notice from '@/pages/notice'
import NoticeEdit from '@/pages/notice-edit'
import Accident from '@/pages/accident'
import AccidentEdit from '@/pages/accident-edit'
import Customer from '@/pages/customer'
import CustomerEdit from '@/pages/customer-edit'
import Safecheck from '@/pages/safecheck'
import SafecheckEdit from '@/pages/safecheck-edit'
import Goods from '@/pages/goods'
import GoodsEdit from '@/pages/goods-edit'
import GoodsType from '@/pages/goods-type'
import GoodsTypeEdit from '@/pages/goods-type-edit'
import DeviceEdit from '@/pages/device-edit'
import MaintenanceEdit from '@/pages/maintenance-edit'
import CompanyEdit from '@/pages/company-edit'
import Order from '@/pages/order'
import OrderEdit from '@/pages/order-edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Customer
    }, {
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
    }
  ]
})
