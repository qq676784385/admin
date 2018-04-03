// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
// import hotcss from 'hotcss'
// import '../../../node_modules/swiper/dist/js/swiper.min.js'
// import Swiper from 'swiper'
// import vuex from 'vuex'
import vueTap from 'v-tap'
import layer from 'vue-layer'
import './pages/js/calender.js'
import VueCropper from 'vue-cropper-simple'

import $ from 'jquery'
//import './pages/js/mobiscroll.custom-2.17.0.min.js'
import './pages/js/mobiscroll.2.13.2.js'
import './pages/js/jquery.jqprint-0.3.js'


Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue)

Vue.use(VueResource)

Vue.use(vueTap)
Vue.use(layer)

Vue.use(VueCropper)

//vuex
Vue.use(Vuex)
const vuex_store = new Vuex.Store({
  state: {
    app: {
      hasSecondLevel: false,
      // openLevel: false,
      host: "http://dev.ivisa.ydynasty.com/uztest/",
      // host: "http://dev.ivisa.ydynasty.com/devtest/",
      token: "",
      ivisaId: "",
      modelId: "", //路由id
      meterialDetail: '',
      groupId: "", //材料详情 第几个模块,
      ivisaIdGroup: [], //批量分配任务存放的visaId
      isIvisa: "",
      nikeName: "",
      isLeader: "", //登录账号type
      showDropdown: false,
      area: "",
      httpTime: 20000
    },
    visa: {
      detailInfo: "",
      groupId: "",
      groupName: "",
      fileInfo: "", //预览证件信息
      fileId: "",
      fileImgPath: "",
      rejectMeterial: "",
      taskOrMassage: "", //信息录入--false  任务分配--true
      approveResult: "",
      preViewInfo: "", // 上传证件后要对比的信息
      uploadInfo: "", //上传时 接口需要的参数
      progressType: "", //设置进度 1--证件信息 2---材料信息
      VisaFileId: "",
      delectPassport: "", //删除证件的护照号
      certificateInfo: "",
      upList: "", // 储存已经上传的图片信息
      pdfFile: "",
      pdfTag: "",
      country: "",
      previewInfo: null, //预览证件信息接口返回值
      templateInfo: null, //预览模板信息
    },
    previewImg: { //裁剪图片
      rotateNum: "", //角度
      cutImgInfo: "", //裁剪后返回的数据
      saveImgInfo: "", //保存之后返回的数据
      uploadFiles: "", //上传过的数据
      showImgIndex: "", //预览时图片切换 的index
      zdyImgInfo:"",//自定义模板字段保存的所有接口信息 Data
    },
    tip: {
      tip: false,
      type: 1,
      title: '',
      content: '内容提示',
      FileType: '',
      FileTipArr: '',
    }
  },
  mutations: {
    showRootObj(state) {},
    selebook_firstHiden(state) {},
    selebook_firstShow(state) {}
  }
})

window.daoruId = 0

/* eslint-disable no-new */
var ivisaVue = new Vue({
  el: '#app',
  store: vuex_store,
  router,
  template: '<App/>',
  components: {
    App
  },
  data: {
    eventHub: new Vue()
  },
  methods: {
    goRouter(obj) {
      this.$router.push({
        path: obj.router
      })
    },
    get(key) {
      return window.localStorage.getItem(key);
    },
    set(key, val) {
      window.localStorage.setItem(key, val);
    },
    remove(key) {
      window.localStorage.removeItem(key);
    },
    addClass(el, className) {
      el.className = el.className + " " + className
    },
    verifyDay(val) {
      val = val.split("-").join("")
      var now = new Date()
      var month = null
      if ((now.getMonth() + 1) < 10) {
        month = "0" + (now.getMonth() + 1)
      } else {
        month = now.getMonth() + 1
      }
      var nowdate = now.getFullYear() + "" + month + "" + now.getDate()
      return Number(val) - Number(nowdate)
    },
    verifyDay1(dateStr, dateStr2) {
      var num = -1
      var s1 = dateStr; //'2012-05-12';
      s1 = new Date(s1.replace(/-/g, "/"));
      var s2 = dateStr2; //'2012-05-12';
      s2 = new Date(s2.replace(/-/g, "/"));
      var days = s1.getTime() - s2.getTime();
      var time = parseInt(days / (1000 * 60 * 60 * 24));
      num = time + 0
      return num
    },
    hasClass(obj, cls) {
      var obj_class = obj.className, //获取 class 内容.
        obj_class_lst = obj_class.split(/\s+/); //通过split空字符将cls转换成数组.
      var x = 0;
      for (x in obj_class_lst) {
        if (obj_class_lst[x] == cls) { //循环数组, 判断是否包含cls
          return true;
        }
      }
      return false;
    },
    showTip(obj) {
      var tiptype = obj.tiptype
      if (tiptype == 1) {
        var filetype = obj.fileType
        for (var i = 0; i < this.$store.state.tip.FileTipArr.length; i++) {
          if (filetype == this.$store.state.tip.FileTipArr[i].FileType) {

            this.$store.state.tip.content = this.$store.state.tip.FileTipArr[i].Content
            // alert(tiptype+" "+filetype+"  "+ this.$store.state.tip.FileTipArr[i].Content)
            this.$root.eventHub.$emit('SHOW_TIP', {
              tiptype: tiptype,
              // messageArr: messagenumArr
            });
            break;
          }
        }
      } else {
        this.$root.eventHub.$emit('SHOW_TIP', {
          tiptype: tiptype,
          // messageArr: messagenumArr
        });
      }
    },
    showTip1(_arr) {
      this.$store.state.tip.content = _arr
      this.showTip({
        tiptype: 2
      })
    },
    removeClass(obj, cls) {
      var removed
      var obj_class = ' ' + obj.className + ' '; //获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
      obj_class = obj_class.replace(/(\s+)/gi, ' '), //将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
        removed = obj_class.replace(' ' + cls + ' ', ' '); //在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
      removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //去掉首尾空格. ex) 'bcd ' -> 'bcd'
      obj.className = removed; //替换原来的 class.
    },
  }
})
