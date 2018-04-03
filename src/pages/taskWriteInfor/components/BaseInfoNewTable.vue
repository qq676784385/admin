<template lang="html">
  <div class="applyTableInfo">
    <!-- <div id="tianbiao_wrapper">
      <div id="tianbiao_scroller"> -->
        <div class="page1">
        </div>
      <!-- </div> -->
    <!-- </div> -->

    <div class="column1">
      <div class="btn" @click='saveData'>
        保存
      </div>
    </div>
    <div class="page" v-if='showTip'>
        <div class="tipcolumn1">
          <div class="column21">
            <span class="title">温馨提示</span>
            <span class="content">您还有信息没有填写完整，点击“确认”保存信息并离开当前页面，点击“取消”继续填写。</span>
          </div>
          <div class="btn">
            <div class="cancel" v-tap="{methods:cancelBtn}">
               取消
            </div>
            <div class="submit" v-tap='{methods:quedingBtn}'>
               确认
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import '../../js/mobiscroll.2.13.2.js'
export default {
  data() {
    return {
      showTip: false,
      area1: [],
      area2: [],
      level: 0,
      dd: -1,
      dataObj: [],
      arr: [],
      geolocation: [
        ["China", "中国"],
        ["Angola", "安哥拉"],
        ["Afghanistan", "阿富汗"],
        ["Albania", "阿尔巴尼亚"],
        ["Algeria", "阿尔及利亚"],
        ["Andorra", "安道尔共和国"],
        ["Anguilla", "安圭拉岛"],
        ["Barbuda Antigua", "安提瓜和巴布达"],
        ["Argentina", "阿根廷"],
        ["Armenia", "亚美尼亚"],
        ["Australia", "澳大利亚"],
        ["Austria", "奥地利"],
        ["Azerbaijan", "阿塞拜疆"],
        ["Bahamas", "巴哈马"],
        ["Bahrain", "巴林"],
        ["Bangladesh", "孟加拉国"],
        ["Barbados", "巴巴多斯"],
        ["Belarus", "白俄罗斯"],
        ["Belgium", "比利时"],
        ["Belize", "伯利兹"],
        ["Benin", "贝宁"],
        ["Bermuda Is.", "百慕大群岛"],
        ["Bolivia", "玻利维亚"],
        ["Botswana", "博茨瓦纳"],
        ["Brazil", "巴西"],
        ["Brunei", "文莱"],
        ["Bulgaria", "保加利亚"],
        ["Burkina-faso", "布基纳法索"],
        ["Burma", "缅甸"],
        ["Burundi", "布隆迪"],
        ["Cameroon", "喀麦隆"],
        ["Canada", "加拿大"],
        ["Central African Republic", "中非共和国"],
        ["Chad", "乍得"],
        ["Chile", "智利"],
        ["Colombia", "哥伦比亚"],
        ["Congo", "刚果"],
        ["Cook Is.", "库克群岛"],
        ["Costa Rica", "哥斯达黎加"],
        ["Cuba", "古巴"],
        ["Cyprus", "塞浦路斯"],
        ["Czech Republic", "捷克"],
        ["Denmark", "丹麦"],
        ["Djibouti", "吉布提"],
        ["Dominica Rep.", "多米尼加共和国"],
        ["Ecuador", "厄瓜多尔"],
        ["Egypt", "埃及"],
        ["EI Salvador", "萨尔瓦多"],
        ["Estonia", "爱沙尼亚"],
        ["Ethiopia", "埃塞俄比亚"],
        ["Fiji", "斐济"],
        ["Finland", "芬兰"],
        ["France", "法国"],
        ["French Guiana", "法属圭亚那"],
        ["Gabon", "加蓬"],
        ["Gambia", "冈比亚"],
        ["Georgia", "格鲁吉亚"],
        ["Germany", "德国"],
        ["Ghana", "加纳"],
        ["Gibraltar", "直布罗陀"],
        ["Greece", "希腊"],
        ["Grenada", "格林纳达"],
        ["Guam", "关岛"],
        ["Guatemala", "危地马拉"],
        ["Guinea", "几内亚"],
        ["Guyana", "圭亚那"],
        ["Haiti", "海地"],
        ["Honduras", "洪都拉斯"],
        ["Hungary", "匈牙利"],
        ["Iceland", "冰岛"],
        ["India", "印度"],
        ["Indonesia", "印度尼西亚"],
        ["Iran", "伊朗"],
        ["Iraq", "伊拉克"],
        ["Ireland", "爱尔兰"],
        ["Israel", "以色列"],
        ["Italy", "意大利"],
        ["Jamaica", "牙买加"],
        ["Japan", "日本"],
        ["Jordan", "约旦"],
        ["Kampuchea (Cambodia )", "柬埔寨"],
        ["Kazakstan", "哈萨克斯坦"],
        ["Kenya", "肯尼亚"],
        ["Korea", "韩国"],
        ["Kuwait", "科威特"],
        ["Kyrgyzstan", "吉尔吉斯坦"],
        ["Laos", "老挝"],
        ["Latvia", "拉脱维亚"],
        ["Lebanon", "黎巴嫩"],
        ["Lesotho", "莱索托"],
        ["Liberia", "利比里亚"],
        ["Libya", "利比亚"],
        ["Liechtenstein", "列支敦士登"],
        ["Lithuania", "立陶宛"],
        ["Luxembourg", "卢森堡"],
        ["Madagascar", "马达加斯加"],
        ["Malawi", "马拉维"],
        ["Malaysia", "马来西亚"],
        ["Maldives", "马尔代夫"],
        ["Mali", "马里"],
        ["Malta", "马耳他"],
        ["Mauritius", "毛里求斯"],
        ["Mexico", "墨西哥"],
        ["Moldova", "摩尔多瓦"],
        ["Monaco", "摩纳哥"],
        ["Mongolia", "蒙古"],
        ["Montserrat Is.", "蒙特塞拉特岛"],
        ["Morocco", "摩洛哥"],
        ["Mozambique", "莫桑比克"],
        ["Namibia", "纳米比亚"],
        ["Nauru", "瑙鲁"],
        ["Nepal", "尼泊尔"],
        ["Netherlands", "荷兰"],
        ["New Zealand", "新西兰"],
        ["Nicaragua", "尼加拉瓜"],
        ["Niger", "尼日尔"],
        ["Nigeria", "尼日利亚"],
        ["North Korea", "朝鲜"],
        ["Norway", "挪威"],
        ["Oman", "阿曼"],
        ["Pakistan", "巴基斯坦"],
        ["Panama", "巴拿马"],
        ["Papua New Cuinea", "巴布亚新几内亚"],
        ["Paraguay", "巴拉圭"],
        ["Peru", "秘鲁"],
        ["Philippines", "菲律宾"],
        ["Poland", "波兰"],
        ["French Polynesia", "法属玻利尼西亚"],
        ["Portugal", "葡萄牙"],
        ["Puerto Rico", "波多黎各"],
        ["Qatar", "卡塔尔"],
        ["Romania", "罗马尼亚"],
        ["Russia", "俄罗斯"],
        ["Saint Lueia", "圣卢西亚"],
        ["Saint Vincent", "圣文森特岛"],
        ["San Marino", "圣马力诺"],
        ["Sao Tome and Principe", "圣多美和普林西比"],
        ["Saudi Arabia", "沙特阿拉伯"],
        ["Senegal", "塞内加尔"],
        ["Seychelles", "塞舌尔"],
        ["Sierra Leone", "塞拉利昂"],
        ["Singapore", "新加坡"],
        ["Slovakia", "斯洛伐克"],
        ["Slovenia", "斯洛文尼亚"],
        ["Solomon Is.", "所罗门群岛"],
        ["Somali", "索马里"],
        ["South Africa", "南非"],
        ["Spain", "西班牙"],
        ["Sri Lanka", "斯里兰卡"],
        ["Sudan", "苏丹"],
        ["Suriname", "苏里南"],
        ["Swaziland", "斯威士兰"],
        ["Sweden", "瑞典"],
        ["Switzerland", "瑞士"],
        ["Syria", "叙利亚"],
        ["Tajikstan", "塔吉克斯坦"],
        ["Tanzania", "坦桑尼亚"],
        ["Thailand", "泰国"],
        ["Togo", "多哥"],
        ["Tonga", "汤加"],
        ["Trinidad and Tobago", "特立尼达和多巴哥"],
        ["Tunisia", "突尼斯"],
        ["Turkey", "土耳其"],
        ["Turkmenistan", "土库曼斯坦"],
        ["Uganda", "乌干达"],
        ["Ukraine", "乌克兰"],
        ["United Arab Emirates", "阿拉伯联合酋长国"],
        ["United Kiongdom", "英国"],
        ["United States of America", "美国"],
        ["Uruguay", "乌拉圭"],
        ["Uzbekistan", "乌兹别克斯坦"],
        ["Venezuela", "委内瑞拉"],
        ["Vietnam", "越南"],
        ["Yemen", "也门"],
        ["Yugoslavia", "南斯拉夫"],
        ["Zimbabwe", "津巴布韦"],
        ["Zaire", "扎伊尔"],
        ["Zambia", "赞比亚"]
      ],
    }
  },
  created: function() {
    this.$store.state.app.ivisaId = this.$root.get('IvisaId')
    this.$store.state.app.token = this.$root.get('AppToken')
    //省市
    this.getJson()
  },
  methods: {
    getJson() {
      this.$http.get("./static/area.json").then(
        function(res) {
          this.area = res.data.data
          this.$store.state.app.area = res.data.data
          this.$root.set("area",this.$store.state.app.area)
        })
    },
    click1(element, type) {
      var event;
      if (document.createEventObject) {
        event = document.createEventObject();
        return element.fireEvent('on' + type, event);
      } else {
        event = document.createEvent('HTMLEvents');
        event.eventName = type;
        event.initEvent(type, true, true);
        return !element.dispatchEvent(event);
      }
    },
    getarea1(str) {
      this.area1 = []
      if (str == '中国') {
        this.area1 = [""]
        for (var i = 0; i < tthis.$store.state.app.area.length; i++) {
          this.area1.push(this.$store.state.app.area[i].province)
        }
      }
      return this.area1
    },
    getarea2(str) {
      // 市
      this.area2 = []
      this.area = this.$store.state.app.area
      if (this.area) {
        for (var i = 0; i < this.area.length; i++) {
          if (this.area[i].province.Value == str) {
            this.area2 = this.area[i].city
            break;
          }
        }
      }
      return this.area2
    },
    getGroupListInfo() {
      this.$http.get(this.$store.state.app.host + 'api/Wechat/NeedGroupInfo', {
        params: {
          userVisaId: this.$store.state.info.UserVisaId,
          groupId: this.$store.state.info.GroupID
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          //console.log(res.data.Result.ShowTagInfo);
          var el = document.getElementsByClassName('page1')[0]
          var that = this
          this.createDom(el, res.data.Result.ShowTagInfo, this.level)

        },
        function(err) {
        })
    },
    createDom(parentEl, objArr, level) {
      for (var i = 0; i < objArr.length; i++) {
        this.dom(parentEl, objArr[i], level)
      }
    },
    clickdom(e, option, options) {
      //
      if (options != null) {

        var index = 0
        for (var i = 0; i < options.length; i++) {
          if (e.currentTarget.getElementsByClassName('value')[0].innerHTML == options[i].Value) {
            index = i;
            break;
          }
        }
        var seleEl = e.currentTarget.getElementsByClassName('select')[0]
        if (this.$store.state.app.mobileType == 'Android') {
          // seleEl[index].selected = true
        }
      }

      //// console.log(index, 'l');
      //// console.log(e.currentTarget.getElementsByClassName('select')[0]);
      //// console.log(seleEl,'===');
      //// console.log(e.currentTarget.getElementsByClassName('select')[0].childNodes.length);
      //// console.log(e.currentTarget.getElementsByClassName('select')[0]);
      if (e.currentTarget.getElementsByClassName('select')[0] != undefined) {
        if (e.currentTarget.getElementsByClassName('select')[0].childNodes.length == 0) {
          return
        } else {

          if (option) {
            var el = e.currentTarget.getElementsByClassName('select')[0]
            el.focus()
            el.click()
          } else {
            var el = e.currentTarget.getElementsByClassName('value')[0]

            el.focus()
            el.click()
          }
        }
      } else {
        if (option) {
          var el = e.currentTarget.getElementsByClassName('select')[0]
          el.focus()
          el.click()
        } else {

          var el = e.currentTarget.getElementsByClassName('value')[0]
          // //console.log(el);
          el.focus()
          el.click()
        }
      }


    },
    specialDom(parentEl, obj, level, icon, click) {
      if (this.$root.hasClass(icon, 'rotate')) {
        console.log(111);
        if (this.$root.hasClass(icon, 'rotate')) {
          this.$root.removeClass(icon, 'rotate');
        }
        var Div_childer = parentEl.getElementsByClassName('Div_childer')[0]
        Div_childer.style.display = 'none';

      } else {
        console.log(11);
        this.$root.addClass(icon, 'rotate');
        if (click) {
          var Div_childer = parentEl.getElementsByClassName('Div_childer')[0]
          Div_childer.style.display = 'block';
        } else {
          var arr = []
          for (var i = 0; i < obj.length; i++) {
            for (var j = 0; j < obj[i].length; j++) {
              arr.push(obj[i][j])
            }
          }
          var Div_childer = parentEl.getElementsByClassName('Div_childer')[0]
          this.createDom(Div_childer, arr, ++level)
        }
      }
    },
    dom(el, obj, level) {
      var that = this
      var Div_info = document.createElement('div');
      this.$root.addClass(Div_info, 'info');
      Div_info.id = obj.Tag
      Div_info.setAttribute('FieldId', obj.FieldId)
      if (obj.DependFieldTag != null) {
        Div_info.setAttribute('DependFieldTag', obj.DependFieldTag)
      }
      if (level > 0) {
        this.$root.addClass(Div_info, 'suojin');
      }
      Div_info.innerHTML = '';
      var Div_downline = document.createElement('div');
      this.$root.addClass(Div_downline, 'downline');
      // Div_downline.onclick=this.clickdom()
      Div_downline.innerHTML = '';
      var Div_key = document.createElement('div');
      this.$root.addClass(Div_key, 'key');
      Div_key.innerHTML = obj.title;



      var Div_value
      if (obj.FieldType == 0) { //无
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
      }
      if (obj.FieldType == 1) { //日期 年月日
        Div_value = document.createElement('div');
        // Div_value.type = 'data'
        this.$root.addClass(Div_value, 'value');
        var div_input = document.createElement('input');
        div_input.type = 'date'
        this.$root.addClass(div_input, 'datainput');
      }
      if (obj.FieldType == 6) { //日期  年月
        Div_value = document.createElement('div');
        // Div_value.type = 'data'
        this.$root.addClass(Div_value, 'value');
        var div_input = document.createElement('input');
        div_input.type = 'month'
        this.$root.addClass(div_input, 'datainput');
      }
      if (obj.FieldType == 2) { //国家
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
      }
      if (obj.FieldType == 3) { //省市
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
      }
      if (obj.FieldType == 4) { //二级市
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
      }
      if (obj.FieldType == 5) { //数字
        Div_value = document.createElement('input');
        Div_value.type = 'number'
        this.$root.addClass(Div_value, 'value');
      }
      //// console.log(Div_value.type, obj.Value);

      if (obj.Value == null || obj.Value == '') {
        if (obj.DefaultValue != null) {
          Div_value.innerHTML = String(obj.DefaultValue).split('|')[0];
        } else {

          Div_value.innerHTML = obj.Value;
        }
      } else {
        Div_value.innerHTML = obj.Value;
      }
      if (Div_value.type == 'number') {
        Div_value.value = obj.Value;
      }
      ///
      ///???///
      var Div_i = document.createElement('i');
      this.$root.addClass(Div_i, 'icon icon-you you');
      var Div_triangle = document.createElement('div');
      this.$root.addClass(Div_triangle, 'triangle');
      Div_triangle.innerHTML = '';
      var Div_select = document.createElement('select');
      Div_select.setAttribute('onchange', 'this.blur()')
      // Div_select.addEventListener('change', function() {
      //
      // }
      // var myEvent = 'blur'
      // if(this.$store.state.app.mobileType == 'Android'){
      //   myEvent = 'change'
      // }
      // el.addEventListener(myEvent, function() {
      //
      if (this.$store.state.app.mobileType == 'Android') {
        Div_select.addEventListener('click', function() {
          // //console.log(444,obj.Tag);
          that.optionBlur(event, Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options, false)
          // alert(1)
        }, false)
      }

      Div_select.addEventListener('blur', function() {
        // //console.log(444,obj.Tag);
        that.optionBlur(event, Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options, false)
        // alert(1)
      }, false)
      this.$root.addClass(Div_select, 'select');
      Div_select.innerHTML = '';
      Div_downline.appendChild(Div_key)
      Div_downline.appendChild(Div_value)
      if (obj.Options != null) {
        Div_downline.appendChild(Div_triangle)
        Div_downline.appendChild(Div_select)
        this.optionDom(Div_select, obj.Options)
      } else {
        if (obj.FieldType == 2 || obj.FieldType == 3 || obj.FieldType == 4) {

          Div_downline.appendChild(Div_triangle)
          Div_downline.appendChild(Div_select)
          // if(obj.FieldType == 2){
          //  // console.log(obj.Tag);
          // }
          if (obj.FieldType == 2) {
            this.inputDom(Div_select, this.geolocation)

          }
          console.log(obj.DependFieldTag);
          console.log(document.getElementById(obj.DependFieldTag));
          if (obj.FieldType == 3) {
            console.log(obj.DependFieldTag);
            console.log(document.getElementById(obj.DependFieldTag));
            var contryvalue = document.getElementById(obj.DependFieldTag).getElementsByClassName('value')[0].innerHTML;
            // var cityvaluedom = document.getElementById(obj.Tag).getElementsByClassName('value')[0];
            // var citySanjiao = document.getElementById(obj.Tag).getElementsByClassName('triangle')[0]
            // var cityselect = document.getElementById(obj.Tag).getElementsByClassName('select')[0]
            if (contryvalue != '中国') {
              Div_triangle.style.opacity = 0;
              Div_value.contenteditable = true;
              Div_select.style.display = 'none';

            } else {
              Div_triangle.style.opacity = 1;
              Div_value.contentEditable = false;
              Div_select.style.display = 'inline-block';
              // Div_select.innerHTML = ''
              // Div_value.innerHTML = ''
              //// console.log(contryvalue);
              that.inputDom2(Div_select, that.getarea1(contryvalue))
            }
            // Div_value.addEventListener('click',function() {
            //  // console.log(111);
            // })
            var contrySelect = document.getElementById(obj.DependFieldTag).getElementsByClassName('select')[0];
            var that = this
            contrySelect.addEventListener('blur', function() {
              var contryvalue = document.getElementById(obj.DependFieldTag).getElementsByClassName('value')[0].innerHTML;
              if (Div_select.childNodes.length > 0) {
                Div_select.innerHTML = ''
                Div_value.innerHTML = ''
              }
              // that.click1(Div_select,'change')
              var cityvaluedom = document.getElementById(obj.Tag).getElementsByClassName('value')[0];
              var citySanjiao = document.getElementById(obj.Tag).getElementsByClassName('triangle')[0]
              var cityselect = document.getElementById(obj.Tag).getElementsByClassName('select')[0]
              if (contryvalue != '中国') {
                citySanjiao.style.opacity = 0;
                cityvaluedom.contentEditable = true;
                cityselect.style.display = 'none';
              } else {
                citySanjiao.style.opacity = 1;
                cityvaluedom.contentEditable = false;
                cityselect.style.display = 'inline-block';

              }

              Div_select.innerHTML = ''
              Div_value.innerHTML = ''

              //// console.log(contryvalue);
              that.inputDom2(Div_select, that.getarea1(contryvalue))
            })
          }
          if (obj.FieldType == 4) {

            var contryvalue = document.getElementById(document.getElementById(obj.DependFieldTag).getAttribute('DependFieldTag')).getElementsByClassName('value')[0].innerHTML;
            // var cityvaluedom = document.getElementById(obj.Tag).getElementsByClassName('value')[0];
            // var citySanjiao = document.getElementById(obj.Tag).getElementsByClassName('triangle')[0]
            // var cityselect = document.getElementById(obj.Tag).getElementsByClassName('select')[0]
            if (contryvalue != '中国') {
              Div_triangle.style.opacity = 0;
              Div_value.contentEditable = true;
              Div_select.style.display = 'none';
            } else {
              Div_triangle.style.opacity = 1;
              Div_value.contentEditable = false;
              Div_select.style.display = 'inline-block';
            }
            var cityvalue = document.getElementById(obj.DependFieldTag).getElementsByClassName('value')[0].innerHTML;
            that.inputDom2(Div_select, that.getarea2(cityvalue))

            var citySelect = document.getElementById(obj.DependFieldTag).getElementsByClassName('select')[0];
            var contrySelect = document.getElementById(document.getElementById(obj.DependFieldTag).getAttribute('DependFieldTag')).getElementsByClassName('select')[0];
            var that = this
            contrySelect.addEventListener('blur', function() {
              if (Div_select.childNodes.length > 0) {
                Div_select.innerHTML = ''
                Div_value.innerHTML = ''
              }
              var contryvalue = document.getElementById(document.getElementById(obj.DependFieldTag).getAttribute('DependFieldTag')).getElementsByClassName('value')[0].innerHTML;
              var cityvaluedom = document.getElementById(obj.Tag).getElementsByClassName('value')[0];
              var citySanjiao = document.getElementById(obj.Tag).getElementsByClassName('triangle')[0]
              var cityselect = document.getElementById(obj.Tag).getElementsByClassName('select')[0]
              if (contryvalue != '中国') {
                citySanjiao.style.opacity = 0;
                cityvaluedom.contentEditable = true;
                cityselect.style.display = 'none';
              } else {
                citySanjiao.style.opacity = 1;
                cityvaluedom.contentEditable = false;
                cityselect.style.display = 'inline-block';
              }
              Div_select.innerHTML = ''
              Div_value.innerHTML = ''
            })
            citySelect.addEventListener('blur', function() {
              var cityvalue = document.getElementById(obj.DependFieldTag).getElementsByClassName('value')[0].innerHTML;
              if (Div_select.childNodes.length > 0) {
                Div_select.innerHTML = ''
                Div_value.innerHTML = ''
              }
              that.inputDom2(Div_select, that.getarea2(cityvalue))
            })
          }
        } else if (obj.FieldType == 1 || obj.FieldType == 6) {
          Div_downline.appendChild(Div_triangle)
          Div_downline.appendChild(div_input)
        } else {
          Div_value.contentEditable = true;
          if (obj.VerifyType == 2 || obj.VerifyType == 4) {
            Div_value.addEventListener('blur', function(event) {
              //// console.log('表单失去焦点');
              // if(obj.VerifyType>0){
              that.VerifyTypeFun(Div_key, Div_value, obj.VerifyType)
              // }
              //// console.log(event.currentTarget.parentNode.parentNode);
            }, false)
          }



          // if(obj.VerifyType==1 || obj.VerifyType==3){
          //  // console.log('-----');
          //   div_input.addEventListener('change', function(event) {
          //     //// console.log('表单失去焦点');
          //     // if(obj.VerifyType>0){
          //       that.VerifyTypeFun(Div_key,Div_value,obj.VerifyType)
          //     // }
          //     //// console.log(event.currentTarget.parentNode.parentNode);
          //   }, false)
          // }
        }
      }
      Div_info.appendChild(Div_downline)
      el.appendChild(Div_info)
      if (obj.Tag.indexOf('GP') > -1) {
        this.$root.addClass(Div_info, 'gray');
        Div_downline.appendChild(Div_i)
        Div_value.contentEditable = false

        var Div_childer = document.createElement('div');
        this.$root.addClass(Div_childer, 'Div_childer');
        Div_info.appendChild(Div_childer);

        Div_downline.addEventListener("click", function() {
          that.specialDom(Div_info, obj.Children, level, Div_i, true)
        }, false);
        // this.optionBlur(event, Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options,true)
        // var t = setTimeout(function () {
        // //console.log(obj.Children,'uuuuuuuuuuuuuu');
        that.specialDom(Div_info, obj.Children, level, Div_i, false)
        for (var i = 0; i < obj.Children.length; i++) {
          for (var j = 0; j < obj.Children[i].length; j++) {
            //// console.log(obj.Children);
            //// console.log(obj.Children[i][j].title, obj.Children[i][j].Value, 'fff', i, j);
            // if (obj.Children[i][j].Value == null || obj.Children[i][j].Value == '') {} else {
            // that.specialDom(Div_info, obj.Children, level, Div_i)
            // break;
            // }
          }
        }
        // }, 100);
      } else if (obj.FieldType == 2 || obj.FieldType == 3 || obj.FieldType == 4) {
        Div_downline.addEventListener("click", function() {
          if (!obj.Disabled) {

            that.clickdom(event, true, [])
          } else {
            //特殊处理身份证 提示
            if (obj.Tag == 'JB000603' || obj.Tag == 'JB000607' || obj.Tag == 'JB000604' || obj.Tag == 'JB000605') {
              that.$root.showTip1(['请到"证件上传 - 身份证"处修改。'])
              // window.scrollTo(0, 0)
            }
          }
        }, false);
      } else if (obj.FieldType == 1 || obj.FieldType == 6) {
        if (!obj.Disabled) {//可以编辑的日期 再加日历功能
          if (this.$store.state.app.mobileType == 'Android') {

            if (obj.FieldType == 1) {
              $(Div_downline).mobiscroll().date({
                theme: 'material',
                display: 'bottom',
                height: 80,
                // width:100,
                // defaultValue: new Date(2017, 0, 1),//不写为当前日期
                // startYear:1949,//其实时间
                endYear: new Date().getFullYear() + 20,
                dateFormat: "yyyy-mm-dd",
                dateOrder: "yyyymmdd",
                onSelect: function(event, inst) {
                  console.log(event, inst);
                  var ele = Div_downline.getElementsByClassName('value')[0]
                  var elkey = Div_downline.getElementsByClassName('key')[0]
                  ele.innerHTML = event
                  if (obj.VerifyType == 1 || obj.VerifyType == 3 || obj.VerifyType == 6 || obj.VerifyType == 7 || obj.VerifyType == 8) {
                    that.VerifyTypeFun(elkey, ele, obj.VerifyType)
                  }
                }
              });
            }
            if (obj.FieldType == 6) {
              $(Div_downline).mobiscroll().date({
                theme: 'material',
                display: 'bottom',
                height: 80,
                // width:200,
                // defaultValue: new Date(2017, 0, 1),//不写为当前日期
                // startYear:1949,//其实时间
                endYear: new Date().getFullYear() + 20,
                dateFormat: "yyyy-mm",
                dateOrder: "yyyymm",
                onSelect: function(event, inst) {
                  console.log(event, inst);
                  var ele = Div_downline.getElementsByClassName('value')[0]
                  var elkey = Div_downline.getElementsByClassName('key')[0]
                  ele.innerHTML = event
                  if (obj.VerifyType == 1 || obj.VerifyType == 3 || obj.VerifyType == 6 || obj.VerifyType == 7 || obj.VerifyType == 8) {
                    that.VerifyTypeFun(elkey, ele, obj.VerifyType)
                  }
                }
              });
            }
          }
        }
        Div_downline.addEventListener("click", function(e) {
          if (!obj.Disabled) {

            // that.clickDatedom(event, obj.VerifyType)
          } else {
            //特殊处理身份证 提示
            if (obj.Tag == 'JB000603' || obj.Tag == 'JB000607' || obj.Tag == 'JB000604' || obj.Tag == 'JB000605') {
              that.$root.showTip1(['请到"证件上传 - 身份证"处修改。'])
              // window.scrollTo(0, 0)
            }
          }
        }, false);
      } else {
        Div_downline.addEventListener("click", function() {
          if (!obj.Disabled) {

            that.clickdom(event, obj.Options != null, obj.Options)
          } else {
            //特殊处理身份证 提示
            if (obj.Tag == 'JB000603' || obj.Tag == 'JB000607' || obj.Tag == 'JB000604' || obj.Tag == 'JB000605') {
              that.$root.showTip1(['请到"证件上传 - 身份证"处修改。'])
              // window.scrollTo(0, 0)
            }
          }
        }, false);
        this.optionBlur(event, Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options, true)
      }
      if (this.$store.state.app.mobileType == 'Android') {
        if (!obj.Disabled) {
          Div_select.style.width = Div_downline.offsetWidth + 'px'
          Div_select.style.height = Div_downline.offsetHeight + 'px'
        }
      }
      if (obj.Disabled) {
        Div_select.style.display = 'none'
        Div_triangle.style.opacity = 0
        Div_value.contentEditable = 'false'
        if (!this.$root.hasClass(Div_value, 'huise')) {
          this.$root.addClass(Div_value, 'huise')
        }
      }
    },
    VerifyTypeFun(domKey, domValue, type) {
      // yanzheng
    },
    postData(save) {
      this.$http.post(this.$store.state.app.host + 'api/Manage/SaveFilledGroupInfo', {
            UserVisaID: this.$store.state.app.ivisaId,
            GroupId: this.$store.state.visa.groupId,
            TagInfo: this.userVisaInfo.ShowTagInfo
          }, { headers: { Authorization: this.$store.state.app.token } })
      .then(
        function(res) {
          // alert(res.data.Code)
          if (res.data.Code == 0) {
            if (res.data.Result == 1) {
              this.$router.push({
                path: '/countries/applyTable'
              })
            } else {
              if (save) {
                this.$router.push({
                  path: '/countries/applyTable'
                })
              } else {
                this.arr = []
                var el = document.getElementsByClassName('page1')[0];
                console.log('.pppppp');
                this.makeData(el, this.arr, true) //result 为0 判断有空没填写 ，makeData第三项为true 检测为空项。
                console.log('HHHHHHHHHHHH');
                if (this.showTip) {
                  var t = setTimeout(function() {
                    var tip = document.getElementsByClassName('page')[0]
                    tip.addEventListener('touchmove', function(e) {
                      e.preventDefault();
                    })
                  }, 100);
                }

              }
            }
            //提交成功后 当前证件状态改为已经填充
          } else {
            alert("错误：" + res.data.Message)
          }
        })
    },
    optionBlur(e, valueEl, childerDom, parentEl, level, tag, objOptions, boolan) {
      var len
      if (objOptions != undefined) {

        len = objOptions.length
      }
      //areaSele 判断区域如果选择的相同 则不清空

      if (!boolan) {
        //// console.log(e.currentTarget.options.length, '<<<<<<<<<<');
        if (e.currentTarget.options.length > 0) {

          var areaSele = (valueEl.innerHTML == e.currentTarget.options[e.currentTarget.selectedIndex].text) ? true : false
          // if( e.currentTarget.options[e.currentTarget.selectedIndex].text!=undefined){
          valueEl.innerHTML = e.currentTarget.options[e.currentTarget.selectedIndex].text
          var index = e.currentTarget.selectedIndex + 1
        }
        // }
      } else {
        for (var i = 0; i < len; i++) {
          // //console.log(objOptions[i].Value,'oooooooooooo');
          if (objOptions[i].Value == valueEl.innerHTML) {
            var index = i + 1
            break;
          }

        }
      }
      if (parentEl.getElementsByClassName('Div_childer')[0] != undefined) {
        parentEl.removeChild(parentEl.getElementsByClassName('Div_childer')[0])
      }

      if (childerDom.length > 0) {
        if (parentEl.getElementsByClassName('Div_childer')[0] == undefined) {
          var Div_childer = document.createElement('div');
          this.$root.addClass(Div_childer, 'Div_childer');
          parentEl.appendChild(Div_childer)
        }



        var arr = []

        if (tag == 'JT000501' || tag == 'JT000601' || tag == 'JT000716' || tag == 'LX003506') {

          // index = childerDom.length-index

          console.log(index, childerDom.length, '==');
          // if(index==='')
          //if index===undefined 则不创建下面的表单
          if (typeof(index) == "undefined") {
            return
          }
          if (tag == 'JT000716' || tag == 'LX003506') {
            index = index + 1 //这两个OPTIONS不同 需要增加1个
          }

          // console.log(childerDom.length);
          var addDom = 0
          if (index - 1 <= childerDom.length) {
            var specialNum = index - 1
            index = 1
          } else {
            var specialNum = childerDom.length
            addDom = index - 1 - childerDom.length
            index = 1
          }

          for (var l = 0; l < index; l++) {
            arr = []
            var xdzvNum = 0
            for (var i = 0; i < specialNum; i++) {
              var Div_childer_special = document.createElement('div');
              this.$root.addClass(Div_childer_special, 'Div_childer_special');
              Div_childer.appendChild(Div_childer_special)

              for (var j = 0; j < childerDom[i].length; j++) {
                if (childerDom[i][j].OptionIndex == len) {
                  var myObj = JSON.parse(JSON.stringify(childerDom[i][j]))
                  myObj.Tag = myObj.Tag + "_000_" + xdzvNum
                  if (myObj.DependFieldTag != null) {
                    myObj.DependFieldTag = myObj.DependFieldTag + "_000_" + xdzvNum
                  }
                  arr.push(myObj)
                }
              }
              xdzvNum++
              this.createDom(Div_childer_special, arr, ++level)
              arr = []
            }
            for (var i = 0; i < addDom; i++) {
              var Div_childer_special = document.createElement('div');
              this.$root.addClass(Div_childer_special, 'Div_childer_special');
              Div_childer.appendChild(Div_childer_special)
              for (var j = 0; j < childerDom[0].length; j++) {
                if (childerDom[0][j].OptionIndex == len) {
                  var tempArr = JSON.parse(JSON.stringify(childerDom[0][j]))
                  tempArr.Value = ''
                  tempArr.Tag = tempArr.Tag + "_000_" + xdzvNum
                  if (tempArr.DependFieldTag != null) {
                    tempArr.DependFieldTag = tempArr.DependFieldTag + "_000_" + xdzvNum
                  }
                  arr.push(tempArr)
                }
              }
              xdzvNum++
              this.createDom(Div_childer_special, arr, ++level)
              arr = []
            }

          }

        } else {
          for (var i = 0; i < childerDom.length; i++) {
            for (var j = 0; j < childerDom[i].length; j++) {
              if (childerDom[i][j].OptionIndex == index) {
                arr.push(childerDom[i][j])
              }
            }
          }
          if (arr.length == 0) {
            if (parentEl.getElementsByClassName('Div_childer')[0] != undefined) {
              parentEl.removeChild(parentEl.getElementsByClassName('Div_childer')[0])
            }
          }
          this.createDom(Div_childer, arr, ++level)
        }
      }

    },
    inputDom(parentSelectEL, arr) {
      // console.log(arr);
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        //// console.log(arr[i].length>0,arr[i]);
        option.innerHTML = arr[i][1]
        parentSelectEL.appendChild(option)
      }

    },
    inputDom2(parentSelectEL, arr) {
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = arr[i]
        parentSelectEL.appendChild(option)
      }
    },
    optionDom(parentSelectEL, arr) {
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = arr[i].Value
        parentSelectEL.appendChild(option)
      }
    },
    dataProcess(_arr) {
      this.dataObj = _arr
      for (var i = 0; i < _arr.length; i++) {

      }
    },
    cancelBtn() {
      this.showTip = false
    },
    quedingBtn() {
      var that = this
      var t = setTimeout(function() {
        that.postData(true)
      }, 100);
    },
    saveData() {
      this.showTip = false
      this.arr = []
      var el = document.getElementsByClassName('page1')[0];
      this.makeData(el, this.arr, false)
      if (!this.showTip) { //makeData 第三项为flash  this.showTIp必为false
        var that = this
        var t = setTimeout(function() {
          that.postData(false)
        }, 100);
      } else {
        var t = setTimeout(function() {
          var tip = document.getElementsByClassName('page')[0]
          tip.addEventListener('touchmove', function(e) {
            e.preventDefault();
          })
        }, 100);
      }

    },
    makeData(el, arr, showTip) {
      console.log('start');
      for (var i = 0; i < el.childNodes.length; i++) {

        var val = el.childNodes[i].getElementsByClassName('value')[0].innerText;


        if (el.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
          var val = el.childNodes[i].getElementsByClassName('value')[0].value
        }
        val = val.replace(/\n/g, '')
        if (showTip) {
          if (el.childNodes[i].id.indexOf('GP') < 0) {
            console.log('gp');
            if (val == null || val == '') {
              if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {} else {
                this.$root.addClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
              }
              this.showTip = true
            } else {
              if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {
                this.$root.removeClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
              }
            }
          }
        }
        var obj = {
          FieldId: el.childNodes[i].getAttribute('FieldId'),
          Value: val,
          Children: []
        };
        var childer = this.$root.hasClass(el.childNodes[i].lastChild, 'Div_childer')
        if (childer) {

          var dd
          if (el.childNodes[i].lastChild.childNodes[0] == undefined) {
            dd = false
          } else {
            dd = this.$root.hasClass(el.childNodes[i].lastChild.childNodes[0], 'Div_childer_special')
          }
          if (dd) {
            var temp = []
            console.log(el.childNodes[i].lastChild.childNodes.length, '======================');
            for (var k = 0; k < el.childNodes[i].lastChild.childNodes.length; k++) {

              var childerArr = []
              var val = el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].innerText;
              if (el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].type == 'number') {
                val = el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].value
              }
              val = val.replace(/\n/g, '')
              if (showTip) {
                if (el.childNodes[i].id.indexOf('GP') < 0) {
                  if (val == null || val == '') {
                    if (this.$root.hasClass(el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('key')[0], 'red')) {} else {
                      this.$root.addClass(el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('key')[0], 'red')
                    }
                    this.showTip = true

                  } else {
                    if (this.$root.hasClass(el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('key')[0], 'red')) {
                      this.$root.removeClass(el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('key')[0], 'red')
                    }
                  }
                }
              }
              temp.push(childerArr)
              // obj = {
              //   FieldId:'',
              //   Value: '',
              //   Children: temp
              // };
              this.makeData(el.childNodes[i].lastChild.childNodes[k], childerArr, showTip)
            }
            var val = el.childNodes[i].getElementsByClassName('value')[0].innerText;
            if (el.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
              val = el.childNodes[i].getElementsByClassName('value')[0].value
            }
            val = val.replace(/\n/g, '')
            if (showTip) {
              if (el.childNodes[i].id.indexOf('GP') < 0) {
                if (val == null || val == '') {
                  if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {} else {
                    this.$root.addClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
                  }
                  this.showTip = true

                } else {
                  if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {
                    this.$root.removeClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
                  }
                }
              }
            }
            obj = {
              FieldId: el.childNodes[i].getAttribute('FieldId'),
              Value: val,
              Children: temp
            };
          } else {
            var val = el.childNodes[i].getElementsByClassName('value')[0].innerText;
            if (el.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
              val = el.childNodes[i].getElementsByClassName('value')[0].value
            }
            val = val.replace(/\n/g, '')
            if (showTip) {
              if (el.childNodes[i].id.indexOf('GP') < 0) {
                if (val == null || val == '') {
                  if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {} else {
                    this.$root.addClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
                  }
                  this.showTip = true
                } else {
                  if (this.$root.hasClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')) {
                    this.$root.removeClass(el.childNodes[i].getElementsByClassName('key')[0], 'red')
                  }
                }
              }
            }
            var temp = []
            var childerArr = []
            temp.push(childerArr)
            obj = {
              FieldId: el.childNodes[i].getAttribute('FieldId'),
              Value: val,
              Children: temp
            };
            this.makeData(el.childNodes[i].lastChild, childerArr, showTip)
          }
        }
        arr.push(obj);
      }
    }
  },

  mounted: function() {
    this.getGroupListInfo()
  }
}
</script>

<style lang="css">
@import url(../../js/mobiscroll.2.13.2.css);
@import url(./css/applyTableInfo.css);
@import url(../../css/_icons.css);
</style>
