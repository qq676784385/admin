<template lang="html">
    <div class="inputtest">
        <!-- <div class="b" v-tap='{methods:saveData}'>
            保存
        </div> -->

        <div class="txt_title">
          <div class="chs">
            中文：
          </div>
          <div class="chs">
            英文:
          </div>
        </div>
        <!-- <div class="b" v-tap='{methods:backData}'>
            返回
        </div> -->
        <!-- <div class="b" v-tap='{methods:deleData}'>
          -
        </div> -->
        <div class="data">
            <div :id='data.Tag+"|"+data.NewColumn' class="input" v-for='(data,index) in recoData'>
                <!-- <div class="c1 k" contenteditable="true" v-tap='{methods:inputChange,index:index}'> -->
                <!-- if（data.ColumnType==1 || data.ColumnType==6） -->
                <!-- 1:日期   6:年月 -->
                <div class="date" v-if='data.ColumnType==1 || data.ColumnType==6'>
                    <div class="c1 k" contenteditable="true" @blur='clearTipDom(index)' @keyup='inputChange(index)' @keydown='keyEnter()' v-tap='{methods:inputChange,index:index}' :x="data.x" :y="data.y" :h="data.h" :w="data.w">
                        {{data.CHNTitle}}
                    </div>
                    <div class="c2 k" :contenteditable="data.Disabled">
                        {{data.CHNValue}}
                    </div>
                    <div class="c1 k" contenteditable="false">
                        {{data.ENGTitle}}
                    </div>
                    <div class="c2 k" contenteditable="false">
                        {{data.ENGValue}}
                    </div>
                </div>
                <!-- else if（data.ColumnType==8） -->
                <!-- 下拉框 -->
                <div class="" v-else-if='data.ColumnType == 8'>
                    <div class="c1 k" contenteditable="true" @blur='clearTipDom(index)' @keyup='inputChange(index)' @keydown='keyEnter()' v-tap='{methods:inputChange,index:index}' :x="data.x" :y="data.y" :h="data.h" :w="data.w">
                        {{data.CHNTitle}}
                    </div>
                    <select class="c2 k CHN" @change='selectChange()' :disabled = "data.Disabled">
                        <!-- <option :value="index" v-for='(option,index) in data.CHNOption' >{{option}}</option> -->
                        <template v-for='(option,index) in data.CHNOption'>
                            <option :value="option" v-if='option==data.CHNValue' selected>{{option}}</option>
                            <option :value="option" v-else>{{option}}</option>
                        </template>
                    </select>
                    <div class="c1 k" contenteditable="false" @keyup='inputChange3(index)' @keydown='keyEnter()'>
                        {{data.ENGTitle}}
                    </div>
                    <select class="c2 k ENG" @change='selectChange()' :disabled = "data.Disabled">
                        <!-- <option :value="index" v-for='(option,index) in data.ENGOption'>{{option}}</option> -->
                        <template v-for='(option,index) in data.ENGOption'>
                            <option :value="option" v-if='option==data.ENGValue' selected>{{option}}</option>
                            <option :value="option" v-else>{{option}}</option>
                        </template>
                    </select>
                </div>
                <!-- else -->
                <div class="" v-else-if="data.Base!=1">
                    <div class="c1 k" contenteditable="true" @blur='clearTipDom(index)' @keyup='inputChange(index)' @keydown='keyEnter()' v-tap='{methods:inputChange,index:index}' :x="data.x" :y="data.y" :h="data.h" :w="data.w">
                        {{data.CHNTitle}}
                    </div>
                    <div class="c2 k" :contenteditable="!data.Disabled" @keyup='inputChange2(index)' @keydown='keyEnter()'>
                        {{data.CHNValue}}
                    </div>
                    <div class="c1 k" contenteditable="false" @keyup='inputChange3(index)' @keydown='keyEnter()'>
                        {{data.ENGTitle}}
                    </div>
                    <div class="c2 k" :contenteditable="!data.Disabled" @keyup='inputChange4(index)' @keydown='keyEnter()'>
                        {{data.ENGValue}}
                    </div>
                </div>
            </div>
        </div>
        <div class="x_b" v-tap='{methods:addData}' v-if="$root.get('isIvisa').indexOf('task')>-1&&$root.get('IsPrint') == 'false'">
            添加
        </div>
        <div class="tipsplane" :class="tipData.length ==0?'noData':''">
            <div class="tip" v-for='(data,index) in tipData' v-tap='{methods:seleTip,index:index}' @mouseover='tipMouseOver(index)' @mouseout='tipMouseOut(index)' >
                {{data.CHNTitle}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      saveDomData: [],
      ttt: false,
      sicneDateId1: '', //当前DATE插件保留的DOM ID，整个页面钟只保留一个ID，新插件的创建会删除旧插件
      sicneDateId2: '', //当前DATE插件保留的DOM ID，整个页面钟只保留一个ID，新插件的创建会删除旧插件
      pageLoc: 400,
      seleDom: '',
      selerecoDataIndex: '',
      changeTxt: '',
      tipData: [],
      recoData: [],
      domData: [], //标签列表 及 数据
      matchAllStr: false,
      NewColumn: 0,
      saveAry: [],
      oldTempData: [], //翻译所需的旧数据
      getTYInfo:[],//保留通用数据里已经画图的字段 保存的时候直接加到数据结构中
    }
  },
  methods: {
    backData() {
      this.$root.eventHub.$emit("CLOSENEWTEMPTEXT")
    },
    deleData() {
      for (var i = 0; i < 10; i++) {
        // console.log(i);
        if (i == 5) break;
      }
    },
    addData() {
      // 如果是全部签证信息模块 内容不可以修改
      if (this.$root.get("isIvisa").indexOf("visa") > -1 || this.$root.get("IsPrint") == "true") {
        return
      }
      this.NewColumn++
        var _obj = {
          'Tag': '',
          'CHNTitle': '',
          'CHNValue': '',
          'ENGTitle': '',
          'ENGValue': '',
          'ENGOption': [],
          'CHNOption': [],
          'x': 0,
          'y': 0,
          'w': 0,
          'h': 0,
          'ColumnType': 0,
          'NewColumn': this.NewColumn,
          'Disabled': false
        }
      // this.recoData.unshift(_obj)
      this.recoData.push(_obj)
      console.log(_obj);
    },
    inputChange2(index) {
      var str = event.target.innerText
      // this.recoData[index].CHNValue = str
    },
    inputChange3(index) {
      var str = event.target.innerText
      // this.recoData[index].ENGTitle = str
    },
    inputChange4(index) {
      var str = event.target.innerText
      // this.recoData[index].ENGValue = str
    },
    changeData() {
      var el = document.getElementsByClassName('data')[0];
      // console.log(el);
      var NewColumn = this.NewColumn;
      var _TemplateId = this.previewInfo.TemplateId;
      // var mydata = []
      var _FileTags = []
      this.saveAry = []
      for (var i = 0; i < el.children.length; i++) {
        var _CHSTitle = el.children[i].childNodes[0].children[0].innerText
        var _ValueCHS = el.children[i].childNodes[0].children[1].innerText
        var _ENGTitle = el.children[i].childNodes[0].children[2].innerText
        var _ValueENG = el.children[i].childNodes[0].children[3].innerText
        var _Tag = el.children[i].id.split('|')[0];

        if (_Tag == '' && NewColumn > 0 && _CHSTitle == '' && _ValueCHS == '' && _ENGTitle == '' && _ValueENG == '') {
          //新创建并且都为空 则不保存
          //如果是个人创建，保存过，现在读出来了,Tag不为空，则提交到后台，后台负责删除，保存成功后不需刷新数据，同步数据库最新数据
        } else {
          var _UserVisaFileId = this.previewInfo.UserVisaFileId;
          var _UserVisaId = this.$store.state.app.ivisaId;
          var _TemplateId = this.previewInfo.TemplateData.TemplateId
          var _CredentialsData = this.previewInfo.FileData
          var _tag = this.previewInfo.Tag
          /*var _x = 0
          var _y = 0
          var _w = 0
          var _h = 0*/
          var _x = el.children[i].childNodes[0].children[0].getAttribute("x")
          var _y = el.children[i].childNodes[0].children[0].getAttribute("y")
          var _w = el.children[i].childNodes[0].children[0].getAttribute("w")
          var _h = el.children[i].childNodes[0].children[0].getAttribute("h")
          NewColumn = el.children[i].getAttribute("id").split("|")[1]
          console.log("newnew", NewColumn);
          var _base = '0';
          if (_Tag != '') {
            _FileTags.push(_Tag)
            // _base = '1'
          } else {
            // NewColumn++
            // _base = '0'
          }
          var _CredentialsData = {
            "Tag": _Tag,
            "ValueCHS": _ValueCHS,
            "ValueENG": _ValueENG,
            "x": _x,
            "y": _y,
            "w": _w,
            "h": _h,
            "Base": _base,
            "CHSTitle": _CHSTitle,
            "ENGTitle": _ENGTitle,
            "NewColumn": _Tag == '' ? NewColumn : 0,
          }
          this.saveAry.push(_CredentialsData)
          var _data = {
            "UserVisaId": _UserVisaId,
            "UserVisaFileId": _UserVisaFileId,
            "TemplateData": this.saveAry,
            "TemplateId": _TemplateId,
            "CredentialsData": this.previewInfo.FileData,
            "tag": _tag,
            "PicDesc": ""
          }

        }
      } //end for
      this.$store.state.previewImg.zdyImgInfo = _data
      /*if(_data){
        var nowAry = []
        for (var i = 0; i < _data.TemplateData.length; i++) {
          if(_data.TemplateData[i].CHNTitle!=""||_data.TemplateData[i].ENGTitle!=""){
            nowAry.push(_data.TemplateData[i])
          }
        }
         _data.TemplateData = nowAry
         this.recoData = nowAry
      }else{

      }*/

      console.log("_data", _data);

      return {
        _data: _data,
        _TemplateId: _TemplateId,
        _FileTags: _FileTags
      }
    },
    saveData() {
      // this.translateTemp()
      var obj = this.changeData()

      var mydata = []
      mydata.push(obj._data)
console.log(this.getTYInfo);
      // 把之前去掉的通用的字段在保存的时候加上 this.getTYInfo
      for (var i = 0; i < this.getTYInfo.length; i++) {
        this.getTYInfo[i].ValueCHS = this.getTYInfo[i].CHNValue
        this.getTYInfo[i].ValueENG = this.getTYInfo[i].ENGValue
        this.getTYInfo[i].CHSTitle = this.getTYInfo[i].CHNTitle
        mydata[0].TemplateData.push(this.getTYInfo[i])
      }

      this.$http.post(this.$store.state.app.host + 'api/Manage/SavePreViewDataDefineTemplate', {
        "Data": mydata,
      }, {
        headers: {
          Authorization: this.$store.state.app.token
        },
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            //保存成功后获取最新数据。
            this.getAllData()
          }
        })
      // this.saveDomData.push(_obj)
      //创建保存数据格式
      // console.log(this.saveDomData);
    },
    clearTipDom(index) {
      // console.log('clear', this.matchAllStr);
      var that = this
      var str = event.target.innerText
      var myEvent = event
      var match = true
      var el = document.getElementsByClassName('data')[0]
      // alert(this.matchAllStr)
      if (this.matchAllStr == true) {
        return
      }

      var t = setTimeout(function() {
        that.tipData = []
        // console.log(myEvent.target.innerText);
        for (var i = 0; i < that.domData.length; i++) {
          if (that.domData[i].CHNTitle == str) {
            //失去焦点后 匹配当前字符是否有相同的选项，有的话 相当于选择了该条TIP
            match = false
            var that1 = that
            var _domData = JSON.parse(JSON.stringify(that.domData[i]))
            // var t = setTimeout(function() {
            // console.log(el.children[index].childNodes[0].children[2]);
            // console.log(JSON.parse(JSON.stringify(that.domData[i])));
            that1.recoData[index] = _domData;
            el.children[index].childNodes[0].children[2].contentEditable = false
            el.children[index].childNodes[0].children[0].innerText = _domData.CHNTitle
            el.children[index].childNodes[0].children[2].innerText = _domData.ENGTitle
            if (that1.recoData[index].ColumnType == 8) { //如果是下拉菜单 则不设置下拉框，否则将失去内容（OPTION 会被INNERTEXT 覆盖掉）
              el.children[index].childNodes[0].children[1].innerText = _domData.CHNValue
              el.children[index].childNodes[0].children[3].innerText = _domData.ENGValue

            }
            // console.log(that1.recoData);
            that.focusInput(that1.recoData[index], index, el.children[index].childNodes[0].children[1], el.children[index].childNodes[0].children[3])
            // }, 10);

            // that.matchAllStr = true

          }
        }
        if (match) {
          //如果没有相同项，质控，清除时间条插件
          that.recoData[index].ColumnType = 0
          //????
          // that.recoData[index].CHNTitle = el.children[index].childNodes[0].children[0].innerText
          var t = setTimeout(function() {
            el.children[index].childNodes[0].children[2].contentEditable = true
            // el.children[index].childNodes[0].children[2].id=''
            // console.log('here', index, el.children[index].childNodes[0].children[2]);
          }, 10);
          if (el.children[index].childNodes[0].children[1].id != '') {
            $("#" + el.children[index].childNodes[0].children[1].id).mobiscroll('getInst').destroy()
            el.children[index].childNodes[0].children[1].id = ''
          }
          if (el.children[index].childNodes[0].children[3].id != '') {
            $("#" + el.children[index].childNodes[0].children[3].id).mobiscroll('getInst').destroy()
            el.children[index].childNodes[0].children[3].id = ''
          }
          // that.recoData[index].CHNValue = el.children[index].childNodes[0].children[1].innerText
          // that.recoData[index].ENGTitle = el.children[index].childNodes[0].children[2].innerText
          // that.recoData[index].ENGValue = el.children[index].childNodes[0].children[3].innerText

          // if (that.sicneDateId1 != '') {
          //   $("#" + that.sicneDateId1).mobiscroll('getInst').destroy()
          //   $("#" + that.sicneDateId2).mobiscroll('getInst').destroy()
          //   that.sicneDateId1 = ''
          //   that.sicneDateId2 = ''
          // }
        }
        // console.log(that.recoData);
        // that.focusInput(that.recoData[index], index,event)
        if (that.tipData.length > 0) {
          that.tipData = []
        }
      }, 0);

    },
    selectChange() {
      var that = this
      var _parentNode = event.currentTarget.parentNode
      var _currentTargetIndex = event.currentTarget.selectedIndex
      //同步两个SELECT框
      var t = setTimeout(function() {
        for (var i = 0; i < _parentNode.getElementsByTagName('select').length; i++) {
          _parentNode.getElementsByTagName('select')[i].selectedIndex = _currentTargetIndex
        }
      }, 10);
      //   for (var i = 0; i < _parentNode.getElementsByTagName('select').length; i++) {
      //     _parentNode.getElementsByTagName('select')[i].selectedIndex = _currentTargetIndex
      //   }

    },
    tipMouseOut(index) {
      // console.log(index);
      this.ttt = false
      this.matchAllStr = false
      //设置选择框样式
      if (this.$root.hasClass(event.currentTarget, 'seletip')) {
        this.$root.removeClass(event.currentTarget, 'seletip')
      }
    },
    tipMouseOver(index) {
      this.ttt = true;
      this.matchAllStr = true
      //设置选择框样式
      // console.log('over', this.matchAllStr);
      if (!this.$root.hasClass(event.currentTarget, 'seletip')) {
        this.$root.addClass(event.currentTarget, 'seletip')
      }
    },
    seleTip(obj) {
      // alert(1)
      var el = document.getElementsByClassName('data')[0]
      // console.log(11, JSON.parse(JSON.stringify(this.tipData[obj.index])));
      this.recoData[this.selerecoDataIndex] = JSON.parse(JSON.stringify(this.tipData[obj.index]))
      // this.seleDom.innerText = this.recoData[this.selerecoDataIndex].CHNTitle
      el.children[this.selerecoDataIndex].childNodes[0].children[2].contentEditable = false
      el.children[this.selerecoDataIndex].childNodes[0].children[0].innerText = JSON.parse(JSON.stringify(this.tipData[obj.index])).CHNTitle
      el.children[this.selerecoDataIndex].childNodes[0].children[1].innerText = JSON.parse(JSON.stringify(this.tipData[obj.index])).CHNValue
      el.children[this.selerecoDataIndex].childNodes[0].children[2].innerText = JSON.parse(JSON.stringify(this.tipData[obj.index])).ENGTitle
      el.children[this.selerecoDataIndex].childNodes[0].children[3].innerText = JSON.parse(JSON.stringify(this.tipData[obj.index])).ENGValue
      this.matchAllStr = true;
      //记录是TIP选择的条目，这个时候 输入框失去焦点 则不执行 失去焦点的操作。
      this.focusInput(this.recoData[this.selerecoDataIndex], this.selerecoDataIndex, el.children[this.selerecoDataIndex].childNodes[0].children[1], el.children[this.selerecoDataIndex].childNodes[0].children[3])
      //判断是否要增加时间插件

      this.tipData = []

      // if (this.sicneDateId1 != '') {
      //   $("#" + this.sicneDateId1).mobiscroll('getInst').destroy()
      //   $("#" + this.sicneDateId2).mobiscroll('getInst').destroy()
      //   this.sicneDateId1 = ''
      //   this.sicneDateId2 = ''
      // }

    },
    keyEnter() {
      //阻止回车
      if (window.event && window.event.keyCode == 13) {
        window.event.returnValue = false;
        // console.log('hc');
        return
      }
    },
    inputChange(index) {
      this.matchAllStr = false
      // console.log('get jd');
      // console.log(this.recoData);
      var index = typeof(index) == 'object' ? index.index : index
      var myEvent = event
      // console.log(document.documentElement.scrollTop, event.target.offsetTop, event.target.offsetLeft, event.target.offsetWidth, event.target.offsetHeight);
      // this.seleDom = event.currentTarget

      var str = event.currentTarget.innerText
      // alert(str)
      // console.log(str, 'MMMMMMMMMMMMM');
      this.selerecoDataIndex = index;
      // var tipel = document.getElementsByClassName('tipsplane')[0]
      // for (var i = 0; i < tipel.children.length; i++) {
      //   tipel.removeChild(tipel.children[0])
      // }

      // this.tipData = []
      var div = document.getElementsByClassName('tipsplane')[0]
      var el = document.getElementsByClassName('data')[0]
      // this.tipData=[]
      if (str == '') {
        this.tipData = []
        // if (this.tipData.length == 0) {
        // this.tipData = JSON.parse(JSON.stringify(this.domData))
        for (var i = 0; i < this.domData.length; i++) {
          if (this.domData[i].NewColumn == 0) {
            this.tipData.push(this.domData[i])
          }
        }
        // for (var i = 0; i < this.domData.length; i++) {
        //   this.tipData.push(this.domData[i])
        // }
        // }

      } else {

        this.tipData = []
        // if (this.tipData.length < this.domData.length) {
        var t = true
        var tempI = 0
        for (var i = 0; i < this.domData.length; i++) {
          if (this.domData[i].CHNTitle.indexOf(str) > -1) {
            if (this.domData[i].NewColumn == 0) {
              this.tipData.push(this.domData[i])
            }
            if (this.domData[i].CHNTitle == str) {

              //   this.recoData[this.selerecoDataIndex].ColumnType = this.domData[i].ColumnType
              //   this.focusInput(this.recoData[this.selerecoDataIndex], this.selerecoDataIndex, el.children[this.selerecoDataIndex].childNodes[0].children[1], el.children[this.selerecoDataIndex].childNodes[0].children[3])
              //   el.children[this.selerecoDataIndex].childNodes[0].children[0].innerText = str

              t = false
              tempI = i
              //***这里的逻辑 判断TIP只有为一个相同的选项。如果出现多个，默认使用最后的一个
              //只负责判断是否为时间插件，目的是为了解决，输入后直接点击插件绑定的Dom 如果是失去焦点绑定，则帮不上。这里判断 输入的时候就绑定好
            }
          }
        }
        console.log("tipq", this.tipData, str);
        if (t) {
          if (el.children[index].childNodes[0].children[1].id != '') {
            $("#" + el.children[index].childNodes[0].children[1].id).mobiscroll('getInst').destroy()
            el.children[index].childNodes[0].children[1].id = ''
          }
          if (el.children[index].childNodes[0].children[3].id != '') {
            $("#" + el.children[index].childNodes[0].children[3].id).mobiscroll('getInst').destroy()
            el.children[index].childNodes[0].children[3].id = ''
          }
        } else {
          // this.recoData[this.selerecoDataIndex].ColumnType = this.domData[tempI].ColumnType
          this.focusInput(this.recoData[this.selerecoDataIndex], this.selerecoDataIndex, el.children[this.selerecoDataIndex].childNodes[0].children[1], el.children[this.selerecoDataIndex].childNodes[0].children[3], this.domData[tempI].ColumnType)
        }
      }
      //设置tips 位置
      var el = document.getElementsByClassName('tipsplane')[0]
      var that = this
      var t = setTimeout(function() {
        if (myEvent.target.offsetTop - document.documentElement.scrollTop < that.pageLoc) {
          el.style.left = myEvent.target.offsetLeft + 'px'
          el.style.top = myEvent.target.offsetTop + myEvent.target.offsetHeight + 'px'
        } else {
          el.style.left = myEvent.target.offsetLeft + 'px'
          el.style.top = myEvent.target.offsetTop - el.offsetHeight + 'px'
        }
      }, 1);
    },
    focusInput(info, index, tar1, tar2, type) {
      console.log(info, index, tar1, tar2, type);
      if (info.Disabled == true) {
        // 内容锁定
        $(tar1).attr("contenteditable", "false")
        $(tar2).attr("contenteditable", "false")
      } else {
        $(tar1).attr("contenteditable", "true")
        $(tar2).attr("contenteditable", "true")
      }
      var myType = type == undefined ? info.ColumnType : type
      var currYear = new Date().getFullYear();
      var el = document.getElementsByClassName('data')[0];
      //如果有旧插件则删除旧插件
      // console.log(tar1.id);
      if (tar1.id != '') {
        $("#" + tar1.id).mobiscroll('getInst').destroy()
        tar1.id = ''
      }
      if (tar2.id != '') {
        $("#" + tar2.id).mobiscroll('getInst').destroy()
        tar2.id = ''
      }

      if (myType == 6) {
        var that = this
        $(tar1).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 200,
          dateFormat: "yyyy-mm",
          dateOrder: "yyyymm",
          onSelect: function(event, inst) {
            if (event) {
              info.CHNValue = event
              info.ENGValue = event
              el.children[index].childNodes[0].children[1].innerText = event
              el.children[index].childNodes[0].children[3].innerText = event
            }
          }
        });
        $(tar2).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 200,
          dateFormat: "yyyy-mm",
          dateOrder: "yyyymm",
          onSelect: function(event, inst) {
            if (event) {
              info.CHNValue = event
              info.ENGValue = event
              el.children[index].childNodes[0].children[1].innerText = event
              el.children[index].childNodes[0].children[3].innerText = event
            }
          }
        });
      } else if (myType == 1) {
        var that = this
        // alert(1)
        $(tar1).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 50,
          dateFormat: "yyyy-mm-dd",
          dateOrder: "yyyymmdd",
          onSelect: function(event, inst) {
            if (event) {
              info.CHNValue = event
              info.ENGValue = event
              el.children[index].childNodes[0].children[1].innerText = event
              el.children[index].childNodes[0].children[3].innerText = event
            }
          }
        });
        // alert(12)
        $(tar2).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 50,
          dateFormat: "yyyy-mm-dd",
          dateOrder: "yyyymmdd",
          onSelect: function(event, inst) {
            if (event) {
              info.CHNValue = event
              info.ENGValue = event
              el.children[index].childNodes[0].children[1].innerText = event
              el.children[index].childNodes[0].children[3].innerText = event
            }
          }
        });
      }
      //记录当前唯一插件的ID
      this.sicneDateId1 = tar1.id
      this.sicneDateId2 = tar2.id
      // console.log(this.recoData);
    },
    getAllData() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/GetDefineTemplateColumns', {
        params: {
          userVisaId: this.$store.state.app.ivisaId,
          userVisaFileId: this.previewInfo.UserVisaFileId,
          visaFileId: this.$store.state.visa.fileInfo.VisaFileId
        },
        headers: {
          Authorization: this.$store.state.app.token
        },
        timeout: this.$store.state.app.httpTime - 7000
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            this.oldTempData = []
            this.oldTempData = JSON.parse(JSON.stringify(res.data.Result.NowValue))
            this.domData = [];
            this.recoData = [];
            for (var i = 0; i < res.data.Result.OriginValue.length; i++) {
              if (res.data.Result.OriginValue[i].Base != "1"&&res.data.Result.OriginValue[i].Tag!="JB0021"&&res.data.Result.OriginValue[i].Tag!="JB0022") {
                this.domData.push(res.data.Result.OriginValue[i])
              }
            }

            /*for (var i = 0; i < res.data.Result.length; i++) {
              if (res.data.Result[i].Base != "1") {
                this.NewColumn = res.data.Result[i].NewColumn > this.NewColumn ? res.data.Result[i].NewColumn : this.NewColumn

                if(res.data.Result[i].Tag.indexOf("DefineTag")>-1){
                  // 自定义添加的
                  this.domData.unshift(res.data.Result[i])
                  this.recoData.unshift(res.data.Result[i])
                }else{
                  this.domData.push(res.data.Result[i])
                  if(res.data.Result[i].CHNValue||res.data.Result[i].ENGValue){
                    this.recoData.push(res.data.Result[i])
                  }
                }
              }
            }*/
            var NowValue = res.data.Result.NowValue
            this.getTYInfo = []
            for (var i = 0; i < NowValue.length; i++) {
              if (NowValue[i].Base != "1") {
                if (NowValue[i].CHNTitle || NowValue[i].ENGTitle) {
                  this.recoData.push(NowValue[i])
                }
              }else if(NowValue[i].Base == "1"){
                // 为了保留数据中的通用字段的位置 x y w h
                this.getTYInfo.push(NowValue[i])
              }
            }
            if (this.recoData.length < 10) {
              var len = 10 - this.recoData.length
              for (var i = 0; i < len; i++) {
                var _obj = {
                  'Tag': '',
                  'CHNTitle': '',
                  'CHNValue': '',
                  'ENGTitle': '',
                  'ENGValue': '',
                  'ENGOption': [],
                  'CHNOption': [],
                  'x': 0,
                  'y': 0,
                  'w': 0,
                  'h': 0,
                  'ColumnType': 0,
                  'NewColumn': 1,
                  'Disabled': false
                }
                _obj.NewColumn = _obj.NewColumn + i
                this.NewColumn = _obj.NewColumn
                this.recoData.push(_obj)
              }
            }
            console.log(this.recoData, "?");

            var el = document.getElementsByClassName('data')[0]


            if (el) {
              for (var i = 0; i < this.recoData.length; i++) {
                if (el.children[i]) {
                  el.children[i].childNodes[0].children[0].innerText = JSON.parse(JSON.stringify(this.recoData[i])).CHNTitle
                  el.children[i].childNodes[0].children[1].innerText = JSON.parse(JSON.stringify(this.recoData[i])).CHNValue
                  el.children[i].childNodes[0].children[2].innerText = JSON.parse(JSON.stringify(this.recoData[i])).ENGTitle
                  el.children[i].childNodes[0].children[3].innerText = JSON.parse(JSON.stringify(this.recoData[i])).ENGValue
                }
              }
            }
            // this.recoData = this.previewInfo.TemplateData.TemplateFieldInfo
            // console.log(this.recoData);
            // 全部签证页面和打印页面 不可以修改
            var that = this
            setTimeout(function() {
              if (that.$root.get("isIvisa").indexOf("visa") > -1 || that.$root.get("IsPrint") == "true") {
                $(".k").each(function() {
                  $(this).attr("contenteditable", "false")
                })
              }
            }, 200)

          }
        })
    },
    translateTemp(type) {

      var returnObj = this.changeData()
      // console.log(type, "ttttttt",returnObj._data);


      // console.log("translateTemp",this.saveAry);
      for (var i = 0; i < this.saveAry.length; i++) {
        this.saveAry[i].CHNTitle = this.saveAry[i].CHSTitle
      }
      // return
      this.$http.post(this.$store.state.app.host + "api/Manage/TranslateTemplateFieldsDefine", {
            request: this.saveAry,
            oldFieldsInfo: this.oldTempData
          }, {
            headers: {
              Authorization: this.$store.state.app.token
            }
          }, {
            timeout: this.$store.state.app.httpTime - 7000
          }

        )
        .then(
          function(res) {
            if (res.data.Code == 0) {
              // console.log("翻译好了", this.recoData)
              this.oldTempData = []
              this.oldTempData = JSON.parse(JSON.stringify(res.data.Result))
              for (var i = 0; i < this.recoData.length; i++) {
                for (var j = 0; j < res.data.Result.length; j++) {
                  if (this.recoData[i].Tag === "") {
                    // console.log(i, this.recoData[i].NewColumn, res.data.Result[j].NewColumn);
                    if (this.recoData[i].NewColumn == res.data.Result[j].NewColumn) {
                      //
                      this.recoData[i].ENGTitle = res.data.Result[j].ENGTitle
                      this.recoData[i].CHNTitle = res.data.Result[j].CHNTitle

                      this.recoData[i].ENGValue = res.data.Result[j].ValueENG
                      this.recoData[i].CHNValue = res.data.Result[j].ValueCHS
                      //
                    }
                  } else {
                    if (this.recoData[i].Tag == res.data.Result[j].Tag) {
                      // 会不会存在tag相同的情况
                      this.recoData[i].ENGTitle = res.data.Result[j].ENGTitle
                      this.recoData[i].CHNTitle = res.data.Result[j].CHNTitle

                      this.recoData[i].ENGValue = res.data.Result[j].ValueENG
                      this.recoData[i].CHNValue = res.data.Result[j].ValueCHS
                    }
                  }

                }
              }



              var el = document.getElementsByClassName('data')[0]
              if (el) {
                // console.log(this.recoData);
                for (var i = 0; i < this.recoData.length; i++) {
                  // this.recoData[i]
                  // el.children[i].childNodes[0].children[2].contentEditable = false
                  // console.log(JSON.parse(JSON.stringify(this.recoData[i])).ENGTitle);
                  el.children[i].childNodes[0].children[0].innerText = JSON.parse(JSON.stringify(this.recoData[i])).CHNTitle
                  el.children[i].childNodes[0].children[1].innerText = JSON.parse(JSON.stringify(this.recoData[i])).CHNValue
                  el.children[i].childNodes[0].children[2].innerText = JSON.parse(JSON.stringify(this.recoData[i])).ENGTitle
                  el.children[i].childNodes[0].children[3].innerText = JSON.parse(JSON.stringify(this.recoData[i])).ENGValue

                }
              }
              if (this.recoData.length < 10) {
                var len = 10 - this.recoData.length
                for (var i = 0; i < len; i++) {
                  var _obj = {
                    'Tag': '',
                    'CHNTitle': '',
                    'CHNValue': '',
                    'ENGTitle': '',
                    'ENGValue': '',
                    'ENGOption': [],
                    'CHNOption': [],
                    'x': 0,
                    'y': 0,
                    'w': 0,
                    'h': 0,
                    'ColumnType': 0,
                    'NewColumn': 1,
                    'Disabled': false
                  }
                  _obj.NewColumn = _obj.NewColumn + i
                  this.NewColumn = _obj.NewColumn
                  this.recoData.push(_obj)
                }
              }

              if (type == 2) {
                // 保存
                this.saveData()
              }
            }
          }
        )
    }
  },
  mounted() {

    var that = this
    this.$root.eventHub.$on("SAVEZDYIMGINFO", function(obj) {
      // 去制作模板之前 要翻译保存
      console.log(obj.goCreatTemp);
      that.translateTemp(2)
    })

    this.$root.eventHub.$on("SAVEOK", function() {
      // that.saveData()
      // var index = obj.index
      that.translateTemp(2)

    })

    this.$root.eventHub.$on("TRANSLATETEMP", function() {
      that.translateTemp(1)
    })
    // 只是为了翻页过来刷新数据 如果连续的两页都是自定义模板的话
    this.$root.eventHub.$on("CHNAGETEMPTEXT", function() {
      that.showImgIndex = that.$store.state.previewImg.showImgIndex ? that.$store.state.previewImg.showImgIndex : 0
      that.previewInfo = that.$store.state.visa.previewInfo[that.showImgIndex]
      that.getAllData()
    })
    this.$root.eventHub.$on("CLOSENEWCREATE", function() {
      that.showImgIndex = that.$store.state.previewImg.showImgIndex ? that.$store.state.previewImg.showImgIndex : 0
      that.previewInfo = that.$store.state.visa.previewInfo[that.showImgIndex]
      that.getAllData()
    })

    /*var el = document.getElementsByClassName('data')[0]
    for (var i = 0; i < this.recoData.length; i++) {
      this.focusInput(this.recoData[i],i,el.children[i].childNodes[0].children[1], el.children[i].childNodes[0].children[3])
    }*/

  },
  updated() {
    //do something after updating vue instance
    // console.log("upupup", this.$store.state.previewImg.showImgIndex);
    this.showImgIndex = this.$store.state.previewImg.showImgIndex ? this.$store.state.previewImg.showImgIndex : 0
    this.previewInfo = this.$store.state.visa.previewInfo[this.showImgIndex]
    // this.getAllData();
  },
  created() {
    // 预览的第几个图片
    this.showImgIndex = this.$store.state.previewImg.showImgIndex ? this.$store.state.previewImg.showImgIndex : 0
    this.previewInfo = this.$store.state.visa.previewInfo[this.showImgIndex]
    console.log("cccc", this.previewInfo, this.showImgIndex)


    this.getAllData();

  },
  destroyed() {
    this.$root.eventHub.$off("SAVEOK")
    this.$root.eventHub.$off("TRANSLATETEMP")
    this.$root.eventHub.$off("CHNAGETEMPTEXT")
    this.$root.eventHub.$off("SAVEZDYIMGINFO")
    this.$root.eventHub.$off("CLOSENEWCREATE")
  }

}
</script>
<style lang="scss" src='../css/input.scss' type='text/css'></style>
