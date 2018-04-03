<template lang="html">
  <div class="applyTableInfo">
    <div class="page1">
      <!-- 中文 -->
    </div>
    <div class="page1 page2">
      <!-- 英文 -->
    </div>
    <div class="translate" :class='outHeight<pmHeight?"changeTop":""' v-if='$store.state.visa.groupName!="众信"'>
      <button id='translate' class="transBtn" v-tap='{methods:translateFun,save:false}'>
        <span class="textIcon">翻译</span><span class="nextIcon">&rsaquo;</span>
      </button>
    </div>
    <div class="btnGroup">
      <button class="saveBtn" v-tap='{methods:saveData,save:true}'>保存</button>
      <button class="cancelBtn" v-tap='{methods:cancelFun,isCreatDom:false}'>取消</button>
    </div>
  </div>
</template>

<script>
// import '../../js/mobiscroll.2.13.2.js'
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
      isCreatDom:true,
      outHeight: "",
      pmHeight: "",
      nowGroupId:"",
      cantSave:false
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
    getarea1() {
      // 省
      this.area1 = [{Value:"",ValueENG:""}]
      for (var i = 0; i < this.$store.state.app.area.length; i++) {
        this.area1.push(this.$store.state.app.area[i].province)
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
    // 获取数据 GroupInfo
    getGroupListInfo(id) {
      this.$http.get(this.$store.state.app.host + 'api/Manage/GroupInfo', {
        params: {
          userVisaId: this.$store.state.app.ivisaId,
          groupId: id
        },
        headers: { Authorization: this.$store.state.app.token },
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          this.requestOldData = JSON.parse(JSON.stringify(res.data.Result))
          var el1 = document.getElementsByClassName('page1')[0]
          var el2 = document.getElementsByClassName('page1')[1]
          var that = this

          el1.innerHTML = '<div class="partTitle"><p>'+this.$store.state.visa.groupName+'</p></div>'
          el2.innerHTML = '<div class="partTitle"><p>'+this.$store.state.visa.groupName+'</p></div>'
          // console.log(this.nowGroupId,id)
          // 中文
          this.createDom(el1, res.data.Result.ShowTagInfo, this.level,"C")
          // 英文
          this.createDom(el2, res.data.Result.ShowTagInfo, this.level,"E")
        },
        function(err) {
          //console.log('超时');
        })
    },
    // 循环创建 中英文 基本内容
    // 参数：父级  数据  层级  中英文C/E
    createDom(parentEl, objArr, level,isChinese) {
      for (var i = 0; i < objArr.length; i++) {
        this.dom(parentEl, objArr[i], level,isChinese)
      }
    },
  // 开始创建dom 元素
  // 参数：父级 数据 层级 C/E
    dom(el, obj, level,isChinese) {
      // input 框
      var that = this
      var Div_info = document.createElement('div');
      this.$root.addClass(Div_info, 'info');
      Div_info.id = obj.Tag+"_"+isChinese
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
      Div_downline.innerHTML = '';
      var Div_key = document.createElement('div');
      this.$root.addClass(Div_key, 'key');

      if(isChinese == "E"){
        Div_key.innerHTML = obj.title.replace("中文","拼音");
      }else{
        Div_key.innerHTML = obj.title
      }



      // 数据类型
      var Div_value
      var div_input
      if (obj.FieldType == 0) { //无
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
      }
      if (obj.FieldType == 1) { //日期 年月日
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
        div_input = document.createElement('input');
        this.$root.addClass(div_input, 'datainput');
        // div_input.type = 'date'

      }
      if (obj.FieldType == 6) { //日期  年月
        Div_value = document.createElement('div');
        this.$root.addClass(Div_value, 'value');
        div_input = document.createElement('input');
        // div_input.type = 'month'
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
      // 是否可修改
      // if(obj.Disabled){
      //   Div_value.setAttribute('disabled', 'disabled')
      // }


      // 中英文 分别赋值
      if(isChinese == "C"){
          Div_value.innerHTML = obj.ValueCHS;
          if(Div_value.type == 'number'){
            Div_value.value = obj.ValueCHS
          }

          // if(div_input)div_input.innerHTML = obj.ValueCHS;
      }else if(isChinese == "E"){
          if(obj.ValueENG == "长期"){
            obj.ValueENG = "long"
          }
          Div_value.innerHTML = obj.ValueENG;
          if(Div_value.type == 'number'){
            Div_value.value = obj.ValueENG
          }


          // if(div_input)div_input.innerHTML = obj.ValueENG;
      }
      // 默认值
      if (obj.ValueCHS == null ||obj.ValueENG == null ||obj.ValueCHS == "" || obj.ValueENG == '') {
        if (obj.DefaultValue != null) {
          if(isChinese == "C"){
            Div_value.innerHTML = String(obj.DefaultValue).split('|')[0];
          }else if(isChinese == "E"){
            Div_value.innerHTML = String(obj.DefaultValue).split('|')[1];
          }
        }
      }
      ///下拉框
      // Div_i Div_triangle  后台 隐藏
      var Div_i = document.createElement('i');
      this.$root.addClass(Div_i, 'icon icon-you you');
      var Div_triangle = document.createElement('div');
      this.$root.addClass(Div_triangle, 'triangle');
      Div_triangle.innerHTML = '';

      var Div_select = document.createElement('select');
      Div_select.setAttribute('onchange', 'this.blur()')
      // 是否可修改
      if(obj.Disabled){
        Div_select.setAttribute('disabled', 'disabled')
      }

      if (obj.ValueCHS == null ||obj.ValueENG == null ||obj.ValueCHS == "" || obj.ValueENG == '') {
        if (obj.DefaultValue != null) {
          if(isChinese == "C"){
            Div_select.innerHTML = String(obj.DefaultValue).split('|')[0];
          }else if(isChinese == "E"){
            Div_select.innerHTML = String(obj.DefaultValue).split('|')[1];
          }
        }
      }

      Div_select.addEventListener('change', function() {
        that.optionBlur(event, Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options, false,isChinese)
      }, false)

      this.$root.addClass(Div_select, 'select');
      Div_select.innerHTML = '';
      Div_downline.appendChild(Div_key)
      Div_downline.appendChild(Div_value)
      if (obj.Options != null) {
        Div_value.style.display = "none"
        Div_downline.appendChild(Div_select)
        this.optionDom(Div_select, obj.Options,obj,isChinese)
      } else {
        if (obj.FieldType == 2 || obj.FieldType == 3 || obj.FieldType == 4) {
          // Div_value.style.display = "none"
          Div_downline.appendChild(Div_select)
          if (obj.FieldType == 2) {
            Div_value.style.display = "none"
            // 国家
            // 给国家 添加下拉框
            this.inputDom(Div_select, this.geolocation,isChinese)

          }
          if (obj.FieldType == 3) {
            // console.log("市");

            var contrySelect = document.getElementById(obj.DependFieldTag+"_"+isChinese).getElementsByClassName('select')[0];
            var contryvalue = contrySelect.value;
            console.log(contryvalue)
            if (contryvalue != '中国') {
              Div_triangle.style.opacity = 0;
              Div_value.contenteditable = true;
              Div_value.style.display = 'inline-block';
              Div_select.style.display = 'none';
            } else {
              Div_triangle.style.opacity = 1;
              Div_value.contentEditable = false;
              Div_value.style.display = 'none';
              Div_select.style.display = 'inline-block';
              that.inputDom2(Div_select, that.getarea1(),isChinese)
            }


            var that = this

            contrySelect.addEventListener('blur', function() {
              // var contryvalue = document.getElementById(obj.DependFieldTag+"_C").getElementsByClassName('value')[0].innerHTML;
              var contryvalue = contrySelect.value;
              if (Div_select.childNodes.length > 0) {
                if(isChinese == "C"){
                  Div_select.innerHTML = obj.ValueCHS
                  Div_value.innerHTML = obj.ValueCHS
                }else if(isChinese == "E"){
                  Div_select.innerHTML = obj.ValueENG
                  Div_value.innerHTML = obj.ValueENG
                }
              }
              //
              var cityvaluedom = document.getElementById(obj.Tag+"_"+isChinese).getElementsByClassName('value')[0];
              var cityselect = document.getElementById(obj.Tag+"_"+isChinese).getElementsByClassName('select')[0]

              if(contryvalue == '中国'||contryvalue == 'China'){
                cityvaluedom.contentEditable = false;
                cityselect.style.display = 'inline-block';
                Div_value.style.display = 'none'
              }else{
                cityvaluedom.contentEditable = true;
                cityselect.style.display = 'none';
                Div_value.style.display = 'inline-block'
              }


              if(isChinese == "C"){
                Div_select.innerHTML = obj.ValueCHS
                Div_value.innerHTML = obj.ValueCHS
              }else if(isChinese == "E"){
                Div_select.innerHTML = obj.ValueENG
                Div_value.innerHTML = obj.ValueENG
              }

              that.inputDom2(Div_select, that.getarea1(),isChinese)
            })
          }
          if (obj.FieldType == 4) {
            // console.log("二级市")
            var contryvalue = document.getElementById(document.getElementById(obj.DependFieldTag+"_C").getAttribute('DependFieldTag')+"_C").getElementsByClassName('value')[0].innerHTML;
            //
            if (contryvalue != '中国') {
              Div_triangle.style.opacity = 0;
              Div_value.contentEditable = true;
              Div_value.style.display = "inline-block"
              Div_select.style.display = 'none';
            } else {
              Div_triangle.style.opacity = 1;
              Div_value.contentEditable = false;
              Div_value.style.display = "none"
              Div_select.style.display = 'inline-block';
            }
            var cityvalue = document.getElementById(obj.DependFieldTag+"_C").getElementsByClassName('value')[0].innerHTML;
            console.log("init",cityvalue)
            that.inputDom2(Div_select, that.getarea2(cityvalue),isChinese)

            var citySelect = document.getElementById(obj.DependFieldTag+"_C").getElementsByClassName('select')[0];
            var contrySelect = document.getElementById(document.getElementById(obj.DependFieldTag+"_C").getAttribute('DependFieldTag')+"_C").getElementsByClassName('select')[0];
            var that = this
            contrySelect.addEventListener('change', function() {
              if (Div_select.childNodes.length > 0) {
                Div_select.innerHTML = ''
                Div_value.innerHTML = ''
              }
              var contryvalue = document.getElementById(document.getElementById(obj.DependFieldTag+"_C").getAttribute('DependFieldTag')+"_C").getElementsByClassName('value')[0].innerHTML;
              var cityvaluedom = document.getElementById(obj.Tag+"_C").getElementsByClassName('value')[0];
              // var citySanjiao = document.getElementById(obj.Tag+"_C").getElementsByClassName('triangle')[0]
              var cityselect = document.getElementById(obj.Tag+"_C").getElementsByClassName('select')[0]
              if (contryvalue != '中国') {
                // citySanjiao.style.opacity = 0;
                cityvaluedom.contentEditable = true;
                cityselect.style.display = 'none';
                Div_value.style.display = 'inline-block';
              } else {
                // citySanjiao.style.opacity = 1;
                cityvaluedom.contentEditable = false;
                cityselect.style.display = 'inline-block';
                Div_value.style.display = 'none';
              }
              Div_select.innerHTML = ''
              Div_value.innerHTML = ''
            })
            citySelect.addEventListener('blur', function() {
              var cityvalue = document.getElementById(obj.DependFieldTag+"_C").getElementsByClassName('value')[0].innerHTML;
              if (Div_select.childNodes.length > 0) {
                Div_select.innerHTML = ''
                Div_value.innerHTML = ''
              }
              console.log("blur",cityvalue)
              that.inputDom2(Div_select, that.getarea2(cityvalue),isChinese)

            })
          }
        } else if (obj.FieldType == 1 || obj.FieldType == 6) {
          // 日期
          Div_downline.appendChild(div_input)
        } else {
          Div_value.contentEditable = true;
          if (obj.VerifyType == 2 || obj.VerifyType == 4) {
            // 护照号 邮箱 验证
            Div_value.addEventListener('blur', function(event) {
              that.VerifyTypeFun(Div_key, Div_value, obj.VerifyType)
            }, false)
          }
        }
      }
      Div_info.appendChild(Div_downline)
      el.appendChild(Div_info)
      if (obj.Tag.indexOf('GP') > -1) {
        this.$root.addClass(Div_info, 'gray');
        Div_downline.appendChild(Div_i)
        Div_value.contentEditable = false
        Div_value.style.display='none'

        var Div_childer = document.createElement('div');
        this.$root.addClass(Div_childer, 'Div_childer');
        Div_info.appendChild(Div_childer);

        // Div_downline.addEventListener("click", function() {
        //   that.specialDom(Div_info, obj.Children, level, Div_i, true)
        // }, false);

        that.specialDom(Div_info, obj.Children, level, Div_i, false,isChinese)
        for (var i = 0; i < obj.Children.length; i++) {
          for (var j = 0; j < obj.Children[i].length; j++) {

          }
        }
      } else if (obj.FieldType == 2 || obj.FieldType == 3 || obj.FieldType == 4) {

        /*Div_downline.addEventListener("click", function() {
          if (!obj.Disabled) {

            that.clickdom(event, true, [])
          } else {
            //特殊处理身份证 提示
            if (obj.Tag == 'JB000603' || obj.Tag == 'JB000607' || obj.Tag == 'JB000604' || obj.Tag == 'JB000605') {
              that.$root.showTip1(['请到"证件上传 - 身份证"处修改。'])
              window.scrollTo(0, 0)
            }
          }
        }, false);*/
      } else if (obj.FieldType == 1 || obj.FieldType == 6) {

        var CorE = null
        if(isChinese == "C"){
          CorE = "E"
        }else if(isChinese == "E"){
          CorE = "C"
        }
        Div_downline.addEventListener("click", function(e) {
          if (!obj.Disabled) {
            if (obj.FieldType == 1) {
              $(Div_downline).mobiscroll().date({
                theme: 'mobiscroll',
                display: 'bubble',
                lang:"zh",
                endYear: new Date().getFullYear() + 20,
                dateFormat: "yyyy-mm-dd",
                dateOrder: "yyyymmdd",
                onSelect: function(event, inst) {
                  var ele = Div_downline.getElementsByClassName('value')[0]
                  var ele2 =  $("#"+obj.Tag+"_"+CorE)[0].getElementsByClassName('value')[0]
                  var elkey = Div_downline.getElementsByClassName('key')[0]
                  ele.innerHTML = event
                  ele2.innerHTML = event

                  if (obj.VerifyType == 1 || obj.VerifyType == 3 || obj.VerifyType == 6 || obj.VerifyType == 7 || obj.VerifyType == 8) {
                    that.VerifyTypeFun(elkey, ele, obj.VerifyType)
                  }
                }
              });
            }
            if (obj.FieldType == 6) {
              $(Div_downline).mobiscroll().date({
                theme: 'mobiscroll',
                display: 'bubble',
                lang:"zh",
                endYear: new Date().getFullYear() + 20,
                dateFormat: "yyyy-mm",
                dateOrder: "yyyymm",
                onSelect: function(event, inst) {
                  var ele = Div_downline.getElementsByClassName('value')[0]
                  var ele2 =  $("#"+obj.Tag+"_"+CorE)[0].getElementsByClassName('value')[0]
                  var elkey = Div_downline.getElementsByClassName('key')[0]
                  ele.innerHTML = event
                  ele2.innerHTML = event
                  if (obj.VerifyType == 1 || obj.VerifyType == 3 || obj.VerifyType == 6 || obj.VerifyType == 7 || obj.VerifyType == 8) {
                    that.VerifyTypeFun(elkey, ele, obj.VerifyType)
                  }
                }
              });
            }

            // that.clickDatedom(event, obj.VerifyType)
          }
          // else {
            // //特殊处理身份证 提示
            // if (obj.Tag == 'JB000603' || obj.Tag == 'JB000607' || obj.Tag == 'JB000604' || obj.Tag == 'JB000605') {
            //   that.$root.showTip1(['请到"证件上传 - 身份证"处修改。'])
            //   // window.scrollTo(0, 0)
            // }
          // }
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
        this.optionBlur(event, Div_value, obj.Children, Div_info, level, obj.Tag, obj.Options, true,isChinese)
      }
      // if (this.$store.state.app.mobileType == 'Android') {
      //   if (!obj.Disabled) {
      //     Div_select.style.width = Div_downline.offsetWidth + 'px'
      //     Div_select.style.height = Div_downline.offsetHeight + 'px'
      //   }
      // }
      if (obj.Disabled) {
        // Div_select.style.display = 'none'
        Div_triangle.style.opacity = 0
        Div_value.contentEditable = 'false'
        if (!this.$root.hasClass(Div_value, 'huise')) {
          this.$root.addClass(Div_value, 'huise')
        }
      }
    },
    clickDatedom(e, type) {
      // var el = e.currentTarget.getElementsByClassName('datainput')[0]
      // var ele = e.currentTarget.getElementsByClassName('value')[0]
      // var elkey = e.currentTarget.getElementsByClassName('key')[0]
      // var that = this



      /*if (this.$store.state.app.mobileType == 'ios') {
        console.log('获得了焦点IOS');
        el.focus()
        el.click()
        //// console.log(el.change==='function','<<<<<,');
        var myEvent = 'blur'
        el.addEventListener(myEvent, function() {
          ele.innerHTML = el.value
          if (type == 1 || type == 3 || type == 6 || type == 7 || type == 8) {
            that.VerifyTypeFun(elkey, ele, type)
          }
        }, false)

      }*/
    },
    clickdom(e, option, options) {
      if (options != null) {

        var index = 0
        for (var i = 0; i < options.length; i++) {
          if (e.currentTarget.getElementsByClassName('value')[0].innerHTML == options[i].Value) {
            index = i;
            break;
          }
        }
        var seleEl = e.currentTarget.getElementsByClassName('select')[0]

      }

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
          el.focus()
          el.click()
        }
      }


    },
    // tag 是 "GP" 的点击事件
    // 后台 GP 没有点击事件
    specialDom(parentEl, obj, level, icon, click,isChinese) {

      var Div_childer = parentEl.getElementsByClassName('Div_childer')[0]
      Div_childer.style.display = 'block';
      // Div_childer.style.display = 'none';
      var arr = []
      for (var i = 0; i < obj.length; i++) {
        for (var j = 0; j < obj[i].length; j++) {
          arr.push(obj[i][j])
        }
      }
      if(isChinese == "C"){
        this.createDom(Div_childer, arr, ++level,"C")
      }else{
        this.createDom(Div_childer, arr, ++level,"E")
      }

      /*if (this.$root.hasClass(icon, 'rotate')) {
        if (this.$root.hasClass(icon, 'rotate')) {
          this.$root.removeClass(icon, 'rotate');
        }
        var Div_childer = parentEl.getElementsByClassName('Div_childer')[0]
        // console.log(click, '<<<<<');
        Div_childer.style.display = 'none';

      } else {
        // console.log(11);
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
          if(parentEl.id.indexOf("_C")){
            this.createDom(Div_childer, arr, ++level,"C")
          }else{
            this.createDom(Div_childer, arr, ++level,"E")
          }

        }
      }*/

    },

    VerifyTypeFun(domKey, domValue, type) {
      // 验证
    },
    postData() {
      console.log(this.arr)
      if (this.cantSave == false) {
        this.cantSave = true
        this.$root.set("SaveGroupId", this.$store.state.visa.groupId)
        // this.changeGroupInfo()
        // console.log(this.userVisaInfo.ShowTagInfo)
        this.$http.post(this.$store.state.app.host + 'api/Manage/SaveFilledGroupInfo', {
            UserVisaID: this.$store.state.app.ivisaId,
            GroupId: this.$store.state.visa.groupId,
            TagInfo: this.arr
          }, { headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.cantSave = false
                this.$layer.msg('保存成功')
                this.getGroupListInfo(this.$store.state.visa.groupId)
                this.$root.eventHub.$emit("REFRESHFILL")
                this.$root.remove("SaveGroupId")
                // this.getUserInfo()
              } else {
                this.$layer.alert(res.data.Message)
                this.cantSave = false
              }
            },
            function(err){
              this.$layer.msg("网络连接超时")
              this.cantSave = false
            }
          )
      }
    },
    optionBlur(e, valueEl, childerDom, parentEl, level, tag, objOptions, boolan,isChinese) {
      /*console.log("?????????????");
      console.log(e)
      console.log(e.currentTarget)
      console.log(valueEl)//select 显示值的div
      console.log(childerDom) //子级
      console.log(parentEl) //父级 给父级添加 .Div_childer元素
      console.log(level) //第几层
      console.log(tag) //当前点击元素的 tag  也是父级的id
      console.log(objOptions) //下拉框的取值
      console.log(boolan)
      console.log("-------------------");*/
      // e.currentTarget.blur()
      var len
      if (objOptions != undefined) {
        len = objOptions.length
      }
      //areaSele 判断区域如果选择的相同 则不清空
      var id = $(parentEl).attr("id").substring(0,$(parentEl).attr("id").length-1)

      if (!boolan) {
        if (e.currentTarget.options.length > 0) {

          var areaSele = (valueEl.innerHTML == e.currentTarget.options[e.currentTarget.selectedIndex].text) ? true : false

          // 两边同步选择
          $("#"+id+"E .downline select")[0].selectedIndex = e.currentTarget.selectedIndex
          $("#"+id+"C .downline select")[0].selectedIndex = e.currentTarget.selectedIndex

          $("#"+id+"E").find(".downline .value")[0].innerHTML = $("#"+id+"E").find(".downline select")[0].value
          $("#"+id+"C").find(".downline .value")[0].innerHTML = $("#"+id+"C").find(".downline select")[0].value

          var index = e.currentTarget.selectedIndex + 1
        }
      } else {
        for (var i = 0; i < len; i++) {

          if (objOptions[i].Value == valueEl.innerHTML||objOptions[i].ValueENG == valueEl.innerHTML) {
            var index = i + 1
            break;
          }

        }
      }

      // if (parentEl.getElementsByClassName('Div_childer')[0] != undefined) {
      //   parentEl.removeChild(parentEl.getElementsByClassName('Div_childer')[0])
      // }
      /*if(isChinese == "C"){
        if($("#"+id+"C")[0].getElementsByClassName('Div_childer')[0] != undefined){
          $("#"+id+"C")[0].removeChild($("#"+id+"C")[0].getElementsByClassName('Div_childer')[0])
        }
        if($("#"+id+"E").length>0&&$("#"+id+"E")[0].getElementsByClassName('Div_childer')[0] != undefined){
          $("#"+id+"E")[0].removeChild($("#"+id+"E")[0].getElementsByClassName('Div_childer')[0])
        }

      }else if(isChinese == "E"){
        if($("#"+id+"E")[0].getElementsByClassName('Div_childer')[0] != undefined){
          $("#"+id+"E")[0].removeChild($("#"+id+"E")[0].getElementsByClassName('Div_childer')[0])
        }
        if($("#"+id+"C").length>0&&$("#"+id+"C")[0].getElementsByClassName('Div_childer')[0] != undefined){
          $("#"+id+"C")[0].removeChild($("#"+id+"C")[0].getElementsByClassName('Div_childer')[0])
        }
      }*/
      if($("#"+id+"C").length>0&&$("#"+id+"C")[0].getElementsByClassName('Div_childer')[0] != undefined){
        $("#"+id+"C")[0].removeChild($("#"+id+"C")[0].getElementsByClassName('Div_childer')[0])
      }
      if($("#"+id+"E").length>0&&$("#"+id+"E")[0].getElementsByClassName('Div_childer')[0] != undefined){
        $("#"+id+"E")[0].removeChild($("#"+id+"E")[0].getElementsByClassName('Div_childer')[0])
      }


      if (childerDom.length > 0) {
        /*console.log(parentEl,parentEl.getElementsByClassName('Div_childer')[0]==undefined)
        if (parentEl.getElementsByClassName('Div_childer')[0] == undefined) {
          var Div_childer = document.createElement('div');
          this.$root.addClass(Div_childer, 'Div_childer');
          parentEl.appendChild(Div_childer)
        }
        */
          var Div_childer = document.createElement('div');
          this.$root.addClass(Div_childer, 'Div_childer');
        /*if(isChinese == "C"){

          $("#"+id+"C")[0].appendChild(Div_childer)
          if($("#"+id+"E").length>0){
            $("#"+id+"E")[0].appendChild(Div_childer)
          }
        }else if(isChinese == "E"){
          $("#"+id+"E")[0].appendChild(Div_childer)
          if($("#"+id+"C").length>0){
            $("#"+id+"C")[0].appendChild(Div_childer)
          }
        }*/
        if($("#"+id+"C").length>0){
          $("#"+id+"C")[0].appendChild(Div_childer)
        }
        if($("#"+id+"E").length>0){
          $("#"+id+"E")[0].appendChild(Div_childer)
        }


        var arr = []

        if (tag == 'JT000501' || tag == 'JT000601' || tag == 'JT000716' || tag == 'LX003506') {

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
                  // console.log(childerDom[i][j], '<<<11');
                  var myObj = JSON.parse(JSON.stringify(childerDom[i][j]))
                  // console.log(i,',,<<<<<<<<<<<<<<<<<');
                  myObj.Tag = myObj.Tag + "_000_" + xdzvNum
                  if (myObj.DependFieldTag != null) {
                    myObj.DependFieldTag = myObj.DependFieldTag + "_000_" + xdzvNum
                  }
                  // console.log(myObj,'<<<<000');
                  arr.push(myObj)
                }
              }
              xdzvNum++
              if(parentEl.id.indexOf("_C")){
                this.createDom(Div_childer_special, arr, ++level,"C")
              }else{
                this.createDom(Div_childer_special, arr, ++level,"E")
              }

              arr = []
            }
            for (var i = 0; i < addDom; i++) {
              var Div_childer_special = document.createElement('div');
              this.$root.addClass(Div_childer_special, 'Div_childer_special');
              Div_childer.appendChild(Div_childer_special)
              for (var j = 0; j < childerDom[0].length; j++) {
                if (childerDom[0][j].OptionIndex == len) {
                  // console.log(childerDom[0][j], '<<<22');
                  // console.log(i,'<<<<<<<<<<<<<<<><><><><');
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
              if(parentEl.id.indexOf("_C")){
                this.createDom(Div_childer_special, arr, ++level,"C")
              }else{
                this.createDom(Div_childer_special, arr, ++level,"E")
              }
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
          console.log("aiyaya",arr.length,parentEl.innerText,isChinese)
          if (arr.length == 0) {
            /*if (parentEl.getElementsByClassName('Div_childer')[0] != undefined) {
              parentEl.removeChild(parentEl.getElementsByClassName('Div_childer')[0])
            }*/

            /*if(isChinese == "C"){
              $("#"+id+"C")[0].removeChild($("#"+id+"C")[0].getElementsByClassName('Div_childer')[0])
              if($("#"+id+"E").length>0&&$("#"+id+"E")[0].getElementsByClassName('Div_childer')[0]!=undefined){
                $("#"+id+"E")[0].removeChild($("#"+id+"E")[0].getElementsByClassName('Div_childer')[0])
              }
            }else if(isChinese == "E"){
              if($("#"+id+"E")[0].getElementsByClassName('Div_childer')[0]!=undefined){
                $("#"+id+"E")[0].removeChild($("#"+id+"E")[0].getElementsByClassName('Div_childer')[0])
              }

              if($("#"+id+"C").length>0&&$("#"+id+"C")[0].getElementsByClassName('Div_childer')[0]!=undefined){
                $("#"+id+"C")[0].removeChild($("#"+id+"C")[0].getElementsByClassName('Div_childer')[0])
              }
            }*/
            if($("#"+id+"C").length>0&&$("#"+id+"C")[0].getElementsByClassName('Div_childer')[0]!=undefined){
              $("#"+id+"C")[0].removeChild($("#"+id+"C")[0].getElementsByClassName('Div_childer')[0])
            }
            if($("#"+id+"E").length>0&&$("#"+id+"E")[0].getElementsByClassName('Div_childer')[0]!=undefined){
              $("#"+id+"E")[0].removeChild($("#"+id+"E")[0].getElementsByClassName('Div_childer')[0])
            }
          }

          // this.createDom(Div_childer, arr, ++level,"C")
          // this.createDom(Div_childer, arr, ++level,"E")

          /*if(isChinese == "C"){
            this.createDom(Div_childer, arr, ++level,"C")

            if($("#"+id+"E").length>0&&$("#"+id+"E")[0].getElementsByClassName('Div_childer').length == 0){
              this.createDom($("#"+id+"E")[0], arr, ++level,"E")
            }
          }else if(isChinese == "E"){
            this.createDom(Div_childer, arr, ++level,"E")
            if($("#"+id+"C").length>0&&$("#"+id+"C")[0].getElementsByClassName('Div_childer').length == 0){
              this.createDom($("#"+id+"C")[0], arr, ++level,"C")
            }
          }*/
          if($("#"+id+"C").length>0&&$("#"+id+"C")[0].getElementsByClassName('Div_childer').length == 0){
            this.createDom($("#"+id+"C")[0], arr, ++level,"C")
          }
          if(isChinese == "E"){
            console.log($("#"+id+"E").length>0&&$("#"+id+"E")[0].getElementsByClassName('Div_childer').length == 0)
          }
          if($("#"+id+"E").length>0&&$("#"+id+"E")[0].getElementsByClassName('Div_childer').length == 0){
            this.createDom($("#"+id+"E")[0], arr, ++level,"E")
          }
        }
      }
    },
    // 添加国家 option
    inputDom(parentSelectEL, arr,isChinese) {
      console.log()
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        //// console.log(arr[i].length>0,arr[i]);
        if(isChinese == "C"){
          option.innerHTML = arr[i][1]
        }else{
          option.innerHTML = arr[i][0]
        }
        parentSelectEL.appendChild(option)
      }
    },
    // 给select 添加 option
    inputDom2(parentSelectEL, arr,isChinese) {
      // console.log("option2",isChinese)
      console.log("option2",arr);
      // console.log("value2",parentSelectEL)
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        if(isChinese == "C"){
          option.innerHTML = arr[i].Value
        }else{
          option.innerHTML = arr[i].ValueENG
        }
        parentSelectEL.appendChild(option)
      }
    },
    optionDom(parentSelectEL, arr,obj,isChinese) {
      // console.log(arr,obj)
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        if(isChinese == "C"){
          option.innerHTML = arr[i].Value
          if(arr[i].Value == obj.ValueCHS){
            option.setAttribute("selected","selected")
          }
          parentSelectEL.appendChild(option)
        }else if(isChinese == "E"){
          option.innerHTML = arr[i].ValueENG
          if(arr[i].ValueENG == obj.ValueENG){
            option.setAttribute("selected","selected")
          }
          parentSelectEL.appendChild(option)
        }
      }
    },
    /*dataProcess(_arr) {
      this.dataObj = _arr
      for (var i = 0; i < _arr.length; i++) {

      }
    },*/
    cancelBtn() {
      this.showTip = false
    },
    quedingBtn() {
      // var that = this
      // var t = setTimeout(function() {
      //   that.postData(true)
      // }, 100);
    },
    saveData() {
      this.showTip = false
      this.arr = []
      var el1 = document.getElementsByClassName('page1')[0];
      var el2 = document.getElementsByClassName('page1')[1];
      // //console.log(el);
      this.makeData(el1, this.arr, false,el2)

      this.postData()
      // //console.log(arr);
      // if (!this.showTip) { //makeData 第三项为flash  this.showTIp必为false
      //   var that = this
      //   var t = setTimeout(function() {
      //     that.postData(false)
      //   }, 100);
      // } else {
      //   var t = setTimeout(function() {
      //     var tip = document.getElementsByClassName('page')[0]
      //     tip.addEventListener('touchmove', function(e) {
      //       e.preventDefault();
      //     })
      //   }, 100);
      // }

    },
    makeData(el, arr, showTip,el2) {

      for (var i = 0; i < el.childNodes.length; i++) {

        if(this.$root.hasClass(el.childNodes[i],"partTitle")){
          // 排除标题
          continue
        }

        var val = el.childNodes[i].getElementsByClassName('value')[0].innerText;

        if (el.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
          var val = el.childNodes[i].getElementsByClassName('value')[0].value
        }
        val = val.replace(/\n/g, '')
        // ********
        var val2 = el2.childNodes[i].getElementsByClassName('value')[0].innerText;

        if (el2.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
          var val2 = el2.childNodes[i].getElementsByClassName('value')[0].value
        }
        val2 = val2.replace(/\n/g, '')
        // ********
        var obj = {
          FieldId: el.childNodes[i].getAttribute('FieldId'),
          ValueCHS: val,
          ValueENG: val2,
          Children: []
        };

        var childer = this.$root.hasClass(el.childNodes[i].lastChild, 'Div_childer')
        if (childer) {
          var dd

          if (el.childNodes[i].lastChild.childNodes[0] == undefined) {
            dd = false
          } else {
            //多个
            dd = this.$root.hasClass(el.childNodes[i].lastChild.childNodes[0], 'Div_childer_special')
          }

          if (dd) {

            var temp = []
            for (var k = 0; k < el.childNodes[i].lastChild.childNodes.length; k++) {

              var childerArr = []
              var val = el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].innerText;
              if (el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].type == 'number') {
                val = el.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].value
              }
              val = val.replace(/\n/g, '')
              temp.push(childerArr)

              this.makeData(el.childNodes[i].lastChild.childNodes[k], childerArr, showTip)
              // ***********
              var val2 = el2.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].innerText;
              if (el2.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].type == 'number') {
                val2 = el2.childNodes[i].lastChild.childNodes[k].getElementsByClassName('value')[0].value
              }
              val2 = val2.replace(/\n/g, '')
              temp.push(childerArr)

              this.makeData(el.childNodes[i].lastChild.childNodes[k], childerArr, showTip,el2)
              // ***********
            }
            var val = el.childNodes[i].getElementsByClassName('value')[0].innerText;
            if (el.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
              val = el.childNodes[i].getElementsByClassName('value')[0].value
            }
            val = val.replace(/\n/g, '')
            // ***********
            var val2 = el2.childNodes[i].getElementsByClassName('value')[0].innerText;
            if (el2.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
              val2 = el2.childNodes[i].getElementsByClassName('value')[0].value
            }
            val2 = val2.replace(/\n/g, '')
            // ***********
            obj = {
              // FieldId: el.childNodes[i].id,
              FieldId: el.childNodes[i].getAttribute('FieldId'),
              ValueCHS: val,
              ValueENG: val2,
              Children: temp
            };
          } else {
            var val = el.childNodes[i].getElementsByClassName('value')[0].innerText;
            if (el.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
              val = el.childNodes[i].getElementsByClassName('value')[0].value
            }
            val = val.replace(/\n/g, '')
            var temp = []
            var childerArr = []
            temp.push(childerArr)
            // ******
            var val2 = el2.childNodes[i].getElementsByClassName('value')[0].innerText;
            if (el2.childNodes[i].getElementsByClassName('value')[0].type == 'number') {
              val2 = el2.childNodes[i].getElementsByClassName('value')[0].value
            }
            val2 = val2.replace(/\n/g, '')
            var temp = []
            var childerArr = []
            temp.push(childerArr)
            // **********
            obj = {
              FieldId: el.childNodes[i].getAttribute('FieldId'),
              ValueCHS: val,
              ValueENG: val2,
              Children: temp
            };
            this.makeData(el.childNodes[i].lastChild, childerArr, showTip,el2.childNodes[i].lastChild)
          }
        }
        arr.push(obj);
      }

    },
    cancelFun(par){
      this.isCreatDom = par.isCreatDom
      this.getGroupListInfo(this.$store.state.visa.groupId)
    },
    translateFun(){
      this.arr = []
      var el1 = document.getElementsByClassName('page1')[0];
      var el2 = document.getElementsByClassName('page1')[1];

      this.makeData(el1, this.arr, false,el2)
      console.log("翻译",this.arr)

      // 修改旧数据的结构 改为提交的结构 （兄弟姐妹/子女）
      var old_borther = []
      var old_children = []
      if (this.requestOldData.ShowTagInfo[2] && this.requestOldData.ShowTagInfo[2].Tag == "GP03") {
        for (var i = 0; i < this.requestOldData.ShowTagInfo[2].Children["0"]["0"].Children["0"].length; i += 12) {
          old_borther.push(this.requestOldData.ShowTagInfo[2].Children["0"]["0"].Children["0"].slice(i, i + 12))
        }
        this.requestOldData.ShowTagInfo[2].Children["0"]["0"].Children = old_borther
      }
      if (this.requestOldData.ShowTagInfo[3] && this.requestOldData.ShowTagInfo[3].Tag == "GP04") {
        for (var i = 0; i < this.requestOldData.ShowTagInfo[3].Children["0"]["0"].Children["0"].length; i += 12) {
          old_children.push(this.requestOldData.ShowTagInfo[3].Children["0"]["0"].Children["0"].slice(i, i + 12))
        }
        this.requestOldData.ShowTagInfo[3].Children["0"]["0"].Children = old_children
      }

      this.$http.post(this.$store.state.app.host + 'api/Manage/TranslateGroupInfo', {
          newData: {
            GroupId: this.$store.state.visa.groupId,
            UserVisaID: this.$store.state.app.ivisaId,
            TagInfo: this.arr
          },
          oldData: {
            GroupId: this.$store.state.visa.groupId,
            UserVisaID: this.$store.state.app.ivisaId,
            TagInfo: this.requestOldData.ShowTagInfo
          }
        }, { headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime})
      .then(
          function(res){
              if(res.data.Code == 0){
                this.requestOldData = JSON.parse(JSON.stringify(res.data.Result))
                el1.innerHTML = '<div class="partTitle"><p>'+this.$store.state.visa.groupName+'</p></div>'
                el2.innerHTML = '<div class="partTitle"><p>'+this.$store.state.visa.groupName+'</p></div>'
                // 中文
                this.createDom(el1, res.data.Result.ShowTagInfo, this.level,"C")
                // 英文
                this.createDom(el2, res.data.Result.ShowTagInfo, this.level,"E")
              }else{
                this.$layer.alert(res.data.Message)
              }
          },
          function(err){
            this.$layer.msg("网络连接超时")
          }
      )


    },
    // 日期点击事件 触发日期控件
    focusInput(obj){
      if (obj.FieldType == 1) {
        $(Div_downline).mobiscroll().date({
          theme: 'material',
          display: 'bottom',
          height: 80,
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
  },
  mounted: function() {
    this.getGroupListInfo(this.$store.state.visa.groupId)
    var that = this
    this.$root.eventHub.$on("GROUPID", function(obj) {
      that.getGroupListInfo(obj.groupId)
    })
  },
  updated(){
    document.getElementById("out") ? this.outHeight = document.getElementById("out").offsetHeight : void 0;
    this.pmHeight = document.body.offsetHeight - 100
  }
}
</script>

<style lang='scss' type="text/css" src='../css/baseInfo.scss'></style>
