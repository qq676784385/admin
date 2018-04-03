<template>
<div class="newTemplate">
  <div class="newTemplateCont">
    <div class="title">
      <span>{{previewInfo.Name}}</span>
      <span class="cancelBtn" v-tap="{methods:cancel}">×</span>
    </div>
    <div class="tempCont" :class="$root.get('isIvisa').indexOf('visa')>-1||$root.get('IsPrint') == 'true'?'matrialInfoBottom':''">
      <div class="partOne part_left">
        <div class="name">照片：</div>
        <div class="cont">
          <img :src="$store.state.app.host + previewInfo.File" ref='image'>
        </div>
      </div>
      <div class="partOne part_middle">
        <div class="name">
          制作模板：
          <span class="simpleFont">(选择右侧标签在相应位置画框来制作模板)</span>
          <div class="printBtn">
            <!-- <div class="blueBg b2" v-tap='{methods:saveLoc}'>打印</div> -->
            <!-- <div class="blueBg b2" v-tap='{methods:printFun}'>打印</div> -->
            <div class="blueBg b2" v-tap='{methods:previewFun}'>预览</div>
          </div>
        </div>
        <div class="cont">
          <div class="fzline">
            <img src="static/fuzhuxian.png" width="100%" height="100%">
          </div>
          <div id="printCont" class="printInfo backplane">
          </div>
        </div>
      </div>
      <div class="partOne part_right">
        <div class="name">标签：</div>
        <div class="cont">
          <div class="scroll tips">
            <div class="biaoqian blueBg tip" @mouseout='tipout()' @mouseover='tipover()' :id='data.Tag+"_tip"' :class="data.x>0?'created':''" v-for='data in domData' v-tap='{methods:tipClick,Tag:data.Tag}' v-if="data.Base != 1">
              {{data.CHNTitle}}
            </div>
            <div class="base_title">
              通用标签:
            </div>
            <div class="biaoqian blueBg tip" @mouseout='tipout()' @mouseover='tipover()' :id='data.Tag+"_tip"' :class="data.x>0?'created':''" v-for='data in domData' v-tap='{methods:tipClick,Tag:data.Tag}' v-if="data.Base == 1">
              {{data.CHNTitle}}
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="footBtn" v-if="$root.get('isIvisa').indexOf('task')>-1&&this.$root.get('IsPrint') == 'false'">
      <div class="blueBg" v-tap="{methods:saveImg}">保存</div>
      <div v-tap="{methods:cancel}">取消</div>
    </div>
  </div>
</div>
</template>
<!-- <script type="text/javascript" src="../../js/jquery.jqprint-0.3.js"></script> -->
<script type="text/javascript">
export default {
  data() {
    return {
      biaoqian: [],
      showImgIndex: "",
      previewInfo: "",
      // ************

      tipId: '', //当前选择的标签 id;
      domData: [], //标签列表 及 数据
      isCreate: true, //允许创建控制

      hasBorder: false


    }
  },
  methods: {
    cancel() {
      this.$root.eventHub.$emit("CLOSENEWCREATE")
    },
    init() {
      // console.log(111)
      this.naturalWidth = this.cropper.initialImageData.naturalWidth
      this.naturalHeight = this.cropper.initialImageData.naturalHeight
      if (this.naturalWidth >= this.naturalHeight) {
        this.imageStyle = 'H'
      } else {
        this.imageStyle = 'S'
      }
    },

    tipout() {
      var el = event.currentTarget
      // console.log(el);
      if (this.$root.hasClass(el, 'sele')) {
        this.$root.removeClass(el, 'sele')
      }
      var tag = event.currentTarget.id.split('_')[0]
      var divEl = document.getElementById(tag)
      if (divEl == null) {
        return
      }
      if (this.$root.hasClass(divEl, 'seleDiv')) {
        this.$root.removeClass(divEl, 'seleDiv')
      }
    },
    tipover() {
      var el = event.currentTarget
      // console.log(el);
      if (!this.$root.hasClass(el, 'sele')) {
        this.$root.addClass(el, 'sele')
      }
      var tag = event.currentTarget.id.split('_')[0]
      var divEl = document.getElementById(tag)
      if (divEl == null) {
        return
      }
      if (!this.$root.hasClass(divEl, 'seleDiv')) {
        this.$root.addClass(divEl, 'seleDiv')
      }
    },
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    previewFun() {
      // 预览
      // 如果是全部签证信息模块 内容不可以修改
      if (this.$root.get("isIvisa").indexOf("visa") > -1 || this.$root.get("IsPrint") == "true") {
        return
      }
      this.hasBorder = !this.hasBorder
      this.setBGColor(this.hasBorder)
    },
    setBGColor(t) {
      var el = document.getElementsByClassName('backplane')[0];
      if (t) {
        for (var i = 0; i < el.children.length; i++) {
          el.children[i].style.background = 'none'
          el.children[i].style.borderWidth = '0'
        }
      } else {
        for (var i = 0; i < el.children.length; i++) {
          el.children[i].style.background = '#eeeeee'
          el.children[i].style.borderWidth = '1px'
        }
      }
    },
    tipClick(obj) {
      this.clearTipBorder();
      this.clearDivBorder()
      if (!this.$root.hasClass(obj.event.currentTarget, 'sele')) {
        this.$root.addClass(obj.event.currentTarget, 'sele');
      }


      this.setBGColor(false)
      if (document.getElementById(obj.Tag) == null) {
        this.tipId = obj.Tag;
        if (!this.$root.hasClass(obj.event.currentTarget, 'seleBG')) {
          this.$root.addClass(obj.event.currentTarget, 'seleBG');
        }
      } else {
        if (!this.$root.hasClass(document.getElementById(obj.Tag), 'seleDiv')) {
          this.$root.addClass(document.getElementById(obj.Tag), 'seleDiv')
        }
        this.$layer.alert("您已经创建了该内容，如想重新创建，请先删除！")
      }
    },
    clearDivBorder() {
      var el = document.getElementsByClassName('backplane')[0]
      for (var i = 0; i < el.children.length; i++) {
        if (this.$root.hasClass(el.children[i], 'seleDiv')) {
          this.$root.removeClass(el.children[i], 'seleDiv')
        }
      }
    },
    clearTipBorder() {
      var tipEL = document.getElementsByClassName('tips')[0]
      for (var i = 0; i < tipEL.children.length; i++) {

        if (this.$root.hasClass(tipEL.children[i], 'sele')) {
          this.$root.removeClass(tipEL.children[i], 'sele')
        }
        if (this.$root.hasClass(tipEL.children[i], 'seleBG')) {
          this.$root.removeClass(tipEL.children[i], 'seleBG')
        }

      }
    },
    initDom() {
      var that = this
      var backplane = document.getElementsByClassName('backplane')[0]
      var creatediv = ''
      for (var i = 0; i < this.domData.length; i++) {
        if (this.domData[i].w > 0) {
          creatediv = document.createElement('div');
          creatediv.id = this.domData[i].Tag;
          this.$root.addClass(creatediv, 'div');
          creatediv.innerHTML = this.getDomData(this.domData[i].Tag)
          creatediv.style.left = this.domData[i].x + 'px';
          creatediv.style.top = this.domData[i].y + 'px';
          creatediv.style.width = this.domData[i].w + 'px';
          creatediv.style.height = this.domData[i].h + 'px';
          this.createClose(creatediv, this.domData[i].Tag)
          //初始化完成后 ，把数据中的坐标宽高 设置为0
          // this.domData[i].x = 0;
          // this.domData[i].y = 0;
          // this.domData[i].w = 0;
          // this.domData[i].h = 0;
          creatediv.addEventListener('mouseover', function() {
            if (!that.$root.hasClass(this, 'seleDiv')) {
              that.$root.addClass(this, 'seleDiv')
              console.log(this.id, document.getElementById(this.id + "_tip"));
              if (!that.$root.hasClass(document.getElementById(this.id + "_tip"), 'sele')) {
                that.$root.addClass(document.getElementById(this.id + "_tip"), 'sele')
              }
            }
          })
          creatediv.addEventListener('mouseout', function() {
            if (that.$root.hasClass(this, 'seleDiv')) {
              that.$root.removeClass(this, 'seleDiv')
            }
            if (that.$root.hasClass(document.getElementById(this.id + "_tip"), 'sele')) {
              that.$root.removeClass(document.getElementById(this.id + "_tip"), 'sele')
            }
          })
          backplane.appendChild(creatediv);
        }
      }
      // for (var i = 0; i < backplane.children.length; i++) {
      //   // console.log(backplane.children[i].id);
      //   var el = document.getElementById(backplane.children[i].id)
      //   console.log(el);
      //   el.onmouseover = function() {
      //     if (!that.$root.hasClass(el, 'seleDiv')) {
      //       that.$root.addClass(el, 'seleDiv')
      //     }
      //   }
      // }
    },
    saveLoc() {
      //
      // 如果是全部签证信息模块 内容不可以修改
      if (this.$root.get("isIvisa").indexOf("visa") > -1 || this.$root.get("IsPrint") == "true") {
        return
      }

      var allDom = document.getElementsByClassName('backplane')[0]
      var _FileTags = []
      //先把所有数据设置为0
      for (var i = 0; i < this.domData.length; i++) {
        this.domData[i].x = 0
        this.domData[i].y = 0
        this.domData[i].w = 0
        this.domData[i].h = 0
      }
      for (var j = 0; j < allDom.children.length; j++) {
        for (var i = 0; i < this.domData.length; i++) {
          if (allDom.children[j].id == this.domData[i].Tag) {
            this.domData[i].x = parseInt(allDom.children[j].style.left)
            this.domData[i].y = parseInt(allDom.children[j].style.top)
            this.domData[i].w = parseInt(allDom.children[j].style.width)
            this.domData[i].h = parseInt(allDom.children[j].style.height)
            _FileTags.push(this.domData[i].Tag)
          }
        }
      }
      // console.log("dayin", this.domData, _FileTags, this.previewInfo);

      return this.domData
      // return
      //执行接口提交 this.domData
      this.$http.post(this.$store.state.app.host + 'api/Manage/SavePreViewDataDefineTemplate', {
        "Data": this.domData,
        "TemplateId": this.previewInfo.TemplateId,
        "FileTags": _FileTags,
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
    },
    printFun() {
      // console.log($("#printCont"));
      $("#printCont").eq(0).jqprint();



    },
    createClose(dom, id) {
      var that = this
      var createClose = document.createElement('div');
      createClose.innerText = 'x'
      this.$root.addClass(createClose, 'close');
      createClose.id = id + 'close'
      dom.appendChild(createClose);
      createClose.onmousedown = function(ev) {
        that.clearTipBorder()
        var oevent = ev || event;
        dom.parentNode.removeChild(dom);
        that.isCreate = false
        var tip = document.getElementById(id + '_tip')
        that.$root.removeClass(tip, 'created')
      }
      dom.onmouseover = function(ev) {
        var oevent = ev || event;
        createClose.style.opacity = 1
        // that.isCreate = false
      }
      dom.onmouseout = function(ev) {
        var oevent = ev || event;
        createClose.style.opacity = 0
        // that.isCreate = true
      }
    },
    getDomData(tipid) {
      var data = ''
      for (var i = 0; i < this.domData.length; i++) {
        if (this.domData[i].Tag == tipid) {
          // alert(this.domData[i].ENGTitle+'  '+this.domData[i].ENGValue)
          var _title = this.domData[i].ENGTitle
          var _value = this.domData[i].ENGValue == null ? "" : this.domData[i].ENGValue
          data = _title + '&nbsp;&nbsp;' + _value
          // alert(data)
          break;
        }
      }
      return data
      // return 'english&nbsp;:&nbsp;测试文字ABCDE123123.';
    },
    createDiv() {
      var backplane = document.getElementsByClassName('backplane')[0]
      var grandParentEl = backplane.parentNode.parentNode
      var creatediv = ''
      var that = this
      var distanceX = 0
      var distanceY = 0
      var myDivWidth = 0
      var myDivHeight = 0
      //补偿
      var newLeft = grandParentEl.offsetLeft + 16;
      var newTop = 50 + 58 + 7
      backplane.onmousedown = function(ev) {
        if (!that.isCreate) {
          that.isCreate = true
          return
        }
        // that.tipId = '222'
        if (that.tipId == '') {
          that.$layer.alert("请选择要创建的标签！")
          return
        }
        // alert(1)
        creatediv = document.createElement('div');
        creatediv.id = that.tipId;
        that.$root.addClass(creatediv, 'div');
        creatediv.innerHTML = that.getDomData(that.tipId)
        backplane.appendChild(creatediv);
        creatediv.addEventListener('mouseover', function() {
          if (!that.$root.hasClass(this, 'seleDiv')) {
            that.$root.addClass(this, 'seleDiv')
            if (!that.$root.hasClass(document.getElementById(this.id + "_tip"), 'sele')) {
              that.$root.addClass(document.getElementById(this.id + "_tip"), 'sele')
            }
          }
        })
        creatediv.addEventListener('mouseout', function() {
          if (that.$root.hasClass(this, 'seleDiv')) {
            that.$root.removeClass(this, 'seleDiv')
          }
          if (that.$root.hasClass(document.getElementById(this.id + "_tip"), 'sele')) {
            that.$root.removeClass(document.getElementById(this.id + "_tip"), 'sele')
          }
        })
        myDivWidth = creatediv.offsetWidth;
        myDivHeight = creatediv.offsetHeight;
        var oevent = ev || event;
        creatediv.style.left = oevent.clientX - backplane.offsetLeft - newLeft + 'px';　　　
        creatediv.style.top = oevent.clientY - backplane.offsetTop - newTop + 'px';

        // creatediv.style.left = oevent.clientX - backplane.offsetLeft - myDivWidth + 'px';　　　
        // creatediv.style.top = oevent.clientY - backplane.offsetTop - myDivHeight + 'px';
        distanceX = oevent.clientX - myDivWidth;　　　　
        distanceY = oevent.clientY - myDivHeight;
        // console.log(oevent.clientX, myDivWidth);
        creatediv.style.width = creatediv.offsetWidth + 'px';
        creatediv.style.height = creatediv.offsetHeight + 'px';
        document.onmousemove = function(ev) {
          var oevent = ev || event;
          var x = oevent.clientX
          var y = oevent.clientY
          // console.log(oevent.clientX, oevent.clientY, backplane.offsetLeft, backplane.offsetWidth);
          if (x > newLeft + backplane.offsetLeft + backplane.offsetWidth - myDivWidth) {
            x = newLeft + backplane.offsetLeft + backplane.offsetWidth - myDivWidth
          }
          if (y > newTop + backplane.offsetTop + backplane.offsetHeight - myDivHeight) {
            y = newTop + backplane.offsetTop + backplane.offsetHeight - myDivHeight
          }
          var width = x - distanceX;
          var height = y - distanceY;
          // console.log( x , distanceX,width,height);
          if (width <= myDivWidth) {
            width = myDivWidth;
          }
          if (height <= myDivHeight) {
            height = myDivHeight;
          }
          creatediv.style.width = width + 'px';
          creatediv.style.height = height + 'px';

        };　　　　
        document.onmouseup = function() {
          var tip = document.getElementById(that.tipId + '_tip')
          if (that.$root.hasClass(tip, 'seleBG')) {
            that.$root.removeClass(tip, 'seleBG');
          }
          that.$root.addClass(tip, 'created')
          that.createClose(creatediv, that.tipId);
          that.clearTipBorder();
          that.tipId = '';
          document.onmousemove = null;
          document.onmouseup = null;

          if (parseInt(creatediv.style.width) < 20 || parseInt(creatediv.style.height) < 20) {
            backplane.removeChild(creatediv);
            that.$root.removeClass(tip, 'created')
          }
        };
      }
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
            // for (var i = 0; i < res.data.Result.length; i++) {
            //   res.data.Result
            // }

            this.domData = [];
            var domTag = []
            for (var i = 0; i < res.data.Result.NowValue.length; i++) {
              if (res.data.Result.NowValue[i].CHNTitle || res.data.Result.NowValue[i].ENGTitle) {
                domTag.push(res.data.Result.NowValue[i].Tag)
                this.domData.push(res.data.Result.NowValue[i])
              }
            }
            // console.log("chushi",this.domData);
            // this.recoData = res.data.Result.NowValue
            // 从OriginValue中筛选通用的标签 添加到domData 中
            for (var i = 0; i < res.data.Result.OriginValue.length; i++) {
              if (res.data.Result.OriginValue[i].Base == "1"&&domTag.indexOf(res.data.Result.OriginValue[i].Tag)<0) {
                this.domData.push(res.data.Result.OriginValue[i])
              }

            }

            this.initDom()
            this.createDiv()
            // this.recoData = [];
            // for (var i = 0; i < res.data.Result.length; i++) {
            // if(res.data.Result.Base!=1){
            // this.domData.push(res.data.Result[i])
            // this.recoData.push(res.data.Result[i])
            // }
            // }
          }
        })
    },
    saveImg() {
      this.setBGColor(true)
      var divContent = document.getElementsByClassName("backplane")[0].innerHTML;
      // console.log(divContent);
      // divContent = divContent.replace('&nbsp;',' ')
      // divContent = divContent.replace('close">x</di','close"></di')
      var str1 = 'close">x</di'
      var str2 = 'close"></di'
      // divContent = divContent.replace('/{'+name+'}/g', value);
      divContent = divContent.replace(new RegExp(str1, 'gm'), str2)
      var str3 = 'style="left:'
      var str4 = 'style="font-size:13px;position:absolute;overflow: hidden;word-break: break-all;left:'
      divContent = divContent.replace(new RegExp(str3, 'gm'), str4)
      var str5 = '&nbsp;'
      var str6 = ' '
      divContent = divContent.replace(new RegExp(str5, 'gm'), str6)
      // divContent = divContent.replace(,)
      // console.log(divContent);
      // return
      var height_svg = $("#printCont").height()
      // console.log(height_svg);
      var data = "data:image/svg+xml," +
        "<svg xmlns='http://www.w3.org/2000/svg' width='462' height='" + height_svg + "'>" +
        "<foreignObject width='100%' height='100%'>" +
        "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:16px;font-family:Helvetica'>" +
        divContent +
        // '<div style="font-size:13px;position:absolute;overflow: hidden;word-break: break-all;background:red;left:100px; top: 100px; width: 100px; height: 100px;">23423423423423423423' +
        // '</div>' +
        // '<div id="111" class="div" style="font-size:13px;position:absolute;overflow: hidden;word-break: break-all;background:red;left: 100px; top: 100px; width: 100px; height: 100px;">name wanbanghuatang<div class="close" id="111close">x</div></div><div id="222" class="div" style="font-size:13px;position:absolute;overflow: hidden;word-break: break-all;background:red;left: 10px; top: 300px; width: 200px; height: 100px;">name1 wanbanghuatang1<div class="close" id="222close">x</div></div>'+
        "</div>" +
        "</foreignObject>" +
        "</svg>";
      // console.log("data",data);
      var img = new Image();
      img.src = data;
      // document.getElementsByClassName('backplane')[0].appendChild(img);
      this.setBGColor(false)
      var that = this
      var t = setTimeout(function() {
        //2.svg转成canvas
        var canvas = document.createElement('canvas'); //准备空画布
        canvas.width = img.width;
        canvas.height = img.height;

        var context = canvas.getContext('2d'); //取得画布的2d绘图上下文
        context.drawImage(img, 0, 0);
        //3. 图片导出为 png 格式
        var type = 'png';
        var imgData = canvas.toDataURL(type);
        // console.log(imgData);
        //将imgData 提交到数据库
        that.saveCreateImg(imgData)
        return imgData
        // console.log(imgData.length);
        // 加工image data，替换mime type
        imgData = imgData.replace(_fixType(type), 'image/octet-stream');
        var filename = 'baidufe_' + (new Date()).getTime() + '.' + type;
        // download
        saveFile(imgData, filename);
      }, 10);
      // return
      // var a = document.createElement('a');
      // a.href = canvas.toDataURL('image/png');  //将画布内的信息导出为png图片数据
      // a.download = "MapByMathArtSys";  //设定下载名称
      // a.click(); //点击触发下载
      /**
       * 获取mimeType
       * @param  {String} type the old mime-type
       * @return the new mime-type
       */
      var _fixType = function(type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
      };
      /**
       * 在本地进行文件保存
       * @param  {String} data     要保存到本地的图片数据
       * @param  {String} filename 文件名
       */
      var saveFile = function(data, filename) {
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
      };
      // 下载后的图片名
    },
    saveCreateImg(data) {
      var that = this
      var mydata = that.$store.state.previewImg.zdyImgInfo
      var saveLocData = this.saveLoc()
      console.log("saveLocData",saveLocData)
      /*for (var i = 0; i < mydata.TemplateData.length; i++) {
        for(var j = 0;j<saveLocData.length;j++){
          if(mydata.TemplateData[i].Tag == saveLocData[j].Tag){
            mydata.TemplateData[i].h = saveLocData[j].h
            mydata.TemplateData[i].w = saveLocData[j].w
            mydata.TemplateData[i].x = saveLocData[j].x
            mydata.TemplateData[i].y = saveLocData[j].y
          }
        }
      }*/
      mydata.TemplateData = []
      for (var j = 0; j < saveLocData.length; j++) {
        // 为了配合后台的数据字段名称
        saveLocData[j].CHSTitle = saveLocData[j].CHNTitle
        saveLocData[j].ValueCHS = saveLocData[j].CHNValue
        saveLocData[j].ValueENG = saveLocData[j].ENGValue
        if(saveLocData[j].Base !=1){
          mydata.TemplateData.push(saveLocData[j])
        }else{
          if (saveLocData[j].h || saveLocData[j].w || saveLocData[j].x || saveLocData[j].y) {
              mydata.TemplateData.push(saveLocData[j])
          }
        }
      }
      console.log(mydata.TemplateData);
      // debugger
// return
      mydata.PicDesc = data
      var ary = []
      ary.push(mydata)
      that.$http.post(that.$store.state.app.host + 'api/Manage/SavePreViewDataDefineTemplate', {
        "Data": ary,
      }, {
        headers: {
          Authorization: that.$store.state.app.token
        },
        timeout: that.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            //保存成功后获取最新数据。
            this.getAllData()
          }
        })
      // },400)
    }
  },
  computed: {
    image() {
      return this.$refs.image
    }
  },
  created() {
    this.showImgIndex = this.$store.state.previewImg.showImgIndex
    this.previewInfo = this.$store.state.visa.previewInfo[this.showImgIndex]
    console.log(111, this.previewInfo)
  },
  mounted() {
    this.getAllData()
    // this.initDom()
    // this.createDiv()

    var that = this
    this.cropper = new Cropper(that.image, {
      dragMode: 'cropend', //不可以裁剪 可以裁剪 --- crop
      scalable: false,
      zoomable: false,
      aspectRatio: 'NaN',
      background: false,
      guides: false,
      autoCrop: false,
      toggleDragModeOnDblclick: false,
      viewMode: 2,
      crop(e) {

      },
      ready() {
        that.init()
      }
    })
  },
  destroyed() {

  }
}
</script>
<style type="text/css" lang="scss" src="../css/creatTemplate.scss"></style>
<style type="text/css" lang="scss" src='../css/test.scss'></style>
