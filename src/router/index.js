import Vue from 'vue'
import Router from 'vue-router'

// 组件引用
import Login from '../pages/login/Login.vue'
import ChangePassword from '../pages/changePassword/ChangePassword.vue'
import Main from '../pages/main/Main.vue'
import AllVisaInfo from '../pages/allVisaInfo/AllVisaInfo.vue'

import TaskWriteInfo from '../pages/taskWriteInfor/TaskWriteInfo.vue'
import MaterialDetail from '../pages/materialDetail/MaterialDetail.vue'
import Setting from '../pages/setting/Setting.vue'
import ResourcePrint from '../pages/resourcePrint/ResourcePrint.vue'
import SendPerson from '../pages/sendPerson/SendPerson.vue'
import DataStatistic from '../pages/dataStatistic/DataStatistic.vue'

import Goevus from '../pages/goEvus/Goevus.vue'

import ResourcePrint_NZL from '../pages/resourcePrint/ResourcePrint_NZL.vue'



Vue.use(Router)
export default new Router({
    routes: [{
        path: '/',
        redirect: 'login'
    }, {
        path: '/login',
        component: Login
    }, {
        path: "/main",
        component: Main,
        children: [{
            path: "/visaInfo/:id",
            component: AllVisaInfo
        }, {
            path: "/taskWriteInfor/:id",
            component: TaskWriteInfo
        }, {
            path: '/materialDetail',
            component: MaterialDetail
        }, {
            path: '/setting',
            component: Setting
        }, {
            path: '/resourcePrint',
            component: ResourcePrint
        }, {
            path: '/sendPerson',
            component: SendPerson
        }, {
            path: '/statistics',
            component: DataStatistic
        }, {
            path: '/changePassword',
            component: ChangePassword
        }, {
            path: '/Goevus',
            component: Goevus
        }, {
            path: '/resourcePrint_NZL',
            component: ResourcePrint_NZL
        }]
    }]
})