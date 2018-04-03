<template lang="html">
  <div class="test">
    <div class="backplane">

    </div>
    <div class="tips">
      <div class="tip" @mouseout='tipout()' @mouseover='tipover()' :id='data.Tag+"_tip"' :class="data.x>0?'created':''" v-for='data in domData' v-tap='{methods:tipClick,Tag:data.Tag}'>
        {{data.CHNTitle}}
      </div>
    </div>


      <div class="b" v-tap='{methods:saveLoc}'>
        打印
      </div>
      <div class="b" v-tap='{methods:previewFun}'>
        预览
      </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      tipId: '', //当前选择的标签 id;
      domData: [{
        'Tag': '1121',
        'CHNTitle': '名称名1',
        'CHNValue': '万邦华唐',
        'ENGTitle': 'name',
        'ENGValue': 'wanbanghuatang',
        'x': 0,
        'y': 0,
        'w': 0,
        'h': 0
      },{
        'Tag': '111',
        'CHNTitle': '名称名1',
        'CHNValue': '万邦华唐',
        'ENGTitle': 'name',
        'ENGValue': 'wanbanghuatang',
        'x': '100',
        'y': 100,
        'w': 100,
        'h': 100
      }, {
        'Tag': '222',
        'CHNTitle': '名称1名称',
        'CHNValue': '万邦华唐1',
        'ENGTitle': 'name1',
        'ENGValue': 'wanbanghuatang1',
        'x': 10,
        'y': 300,
        'w': 200,
        'h': 100
      }], //标签列表 及 数据
      isCreate: true, //允许创建控制
    }
  },
  methods: {
    tipout() {
      var el = event.currentTarget
      // console.log(el);
      if (this.$root.hasClass(el, 'sele')) {
        this.$root.removeClass(el, 'sele')
      }
      var tag = event.currentTarget.id.split('_')[0]
      var divEl = document.getElementById(tag)
      if(divEl==null){
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
      if(divEl==null){
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
      this.setBGColor(true)
    },
    setBGColor(t) {
      var el = document.getElementsByClassName('backplane')[0];
      if (t) {
        for (var i = 0; i < el.children.length; i++) {
          el.children[i].style.background = 'none'
        }

      } else {
        for (var i = 0; i < el.children.length; i++) {
          el.children[i].style.background = '#eeeeee'
        }
      }
    },
    tipClick(obj) {
      this.clearTipBorder();
      this.clearDivBorder()
      this.$root.addClass(obj.event.currentTarget, 'sele');

      this.setBGColor(false)
      if (document.getElementById(obj.Tag) == null) {
        this.tipId = obj.Tag;
          this.$root.addClass(obj.event.currentTarget, 'seleBG');
      } else {
        if (!this.$root.hasClass(document.getElementById(obj.Tag), 'seleDiv')) {
          this.$root.addClass(document.getElementById(obj.Tag), 'seleDiv')
        }
        alert('您已经创建了该内容，如想重新创建，请先删除！')
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
          creatediv.addEventListener('mouseover',function(){
            if (!that.$root.hasClass(this, 'seleDiv')) {
              that.$root.addClass(this, 'seleDiv')
              console.log(this.id);
              if (!that.$root.hasClass(document.getElementById(this.id+"_tip"), 'sele')) {
                that.$root.addClass(document.getElementById(this.id+"_tip"), 'sele')
              }
            }
          })
          creatediv.addEventListener('mouseout',function(){
            if (that.$root.hasClass(this, 'seleDiv')) {
              that.$root.removeClass(this, 'seleDiv')
            }
            if (that.$root.hasClass(document.getElementById(this.id+"_tip"), 'sele')) {
              that.$root.removeClass(document.getElementById(this.id+"_tip"), 'sele')
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
      console.log(this.domData);
      // return
      //执行接口提交 this.domData
      this.$http.post(this.$store.state.app.host + 'api/Manage/SavePreViewDataDefineTemplate', {
        "Data": this.domData,
        "TemplateId": '',
        "FileTags": _FileTags,
      }, {
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            //保存成功后获取最新数据。
            this.getAllData()
          }
        })
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
          data = this.domData[i].ENGTitle + '&nbsp;&nbsp;' + this.domData[i].ENGValue
          break;
        }
      }
      return data
      // return 'english&nbsp;:&nbsp;测试文字ABCDE123123.';
    },
    createDiv() {
      var backplane = document.getElementsByClassName('backplane')[0]
      var creatediv = ''
      var that = this
      var distanceX = 0
      var distanceY = 0
      var myDivWidth = 0
      var myDivHeight = 0

      backplane.onmousedown = function(ev) {
        if (!that.isCreate) {
          that.isCreate = true
          return
        }
        // that.tipId = '222'
        if (that.tipId == '') {
          alert('请选择要创建的标签！')
          return
        }
        creatediv = document.createElement('div');
        creatediv.id = that.tipId;
        that.$root.addClass(creatediv, 'div');
        creatediv.innerHTML = that.getDomData(that.tipId)
        backplane.appendChild(creatediv);
        creatediv.addEventListener('mouseover',function(){
          if (!that.$root.hasClass(this, 'seleDiv')) {
            that.$root.addClass(this, 'seleDiv')
            console.log(this.id);
            if (!that.$root.hasClass(document.getElementById(this.id+"_tip"), 'sele')) {
              that.$root.addClass(document.getElementById(this.id+"_tip"), 'sele')
            }
          }
        })
        creatediv.addEventListener('mouseout',function(){
          if (that.$root.hasClass(this, 'seleDiv')) {
            that.$root.removeClass(this, 'seleDiv')
          }
          if (that.$root.hasClass(document.getElementById(this.id+"_tip"), 'sele')) {
            that.$root.removeClass(document.getElementById(this.id+"_tip"), 'sele')
          }
        })
        myDivWidth = creatediv.offsetWidth;
        myDivHeight = creatediv.offsetHeight;
        console.log(myDivWidth, myDivHeight);
        var oevent = ev || event;
        creatediv.style.left = oevent.clientX - backplane.offsetLeft - 0 + 'px';　　　
        creatediv.style.top = oevent.clientY - backplane.offsetTop - 0 + 'px';
        // creatediv.style.left = oevent.clientX - backplane.offsetLeft - myDivWidth + 'px';　　　
        // creatediv.style.top = oevent.clientY - backplane.offsetTop - myDivHeight + 'px';
        distanceX = oevent.clientX - myDivWidth;　　　　
        distanceY = oevent.clientY - myDivHeight;
        creatediv.style.width = creatediv.offsetWidth + 'px';
        creatediv.style.height = creatediv.offsetHeight + 'px';
        document.onmousemove = function(ev) {
          var oevent = ev || event;
          var x = oevent.clientX
          var y = oevent.clientY
          console.log(oevent.clientX, backplane.offsetLeft, backplane.offsetWidth);
          if (x > backplane.offsetLeft + backplane.offsetWidth - myDivWidth) {
            x = backplane.offsetLeft + backplane.offsetWidth - myDivWidth
          }
          if (y > backplane.offsetTop + backplane.offsetHeight - myDivHeight) {
            y = backplane.offsetTop + backplane.offsetHeight - myDivHeight
          }
          var width = x - distanceX;
          var height = y - distanceY;
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
          if(that.$root.hasClass(tip, 'seleBG')){
            that.$root.removeClass(tip, 'seleBG');
          }
          that.$root.addClass(tip, 'created')
          that.createClose(creatediv, that.tipId);
          that.clearTipBorder();
          that.tipId = '';
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }

    },
    getAllData() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/GetDefineTemplateColumns', {
        params: {
          userVisaId: '',
          visaFileId: ''
          // versionId:7,
          // page: 53
        },
        headers: this.$root.crossLogin(),
        timeout: this.$store.state.app.httpTime - 7000
      }).then(
        function(res) {
          if (res.data.Code == 0) {
            // for (var i = 0; i < res.data.Result.length; i++) {
            //   res.data.Result
            // }
            this.domData = [];
            this.domData = res.data.Result
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
    }
  },
  mounted() {
    // this.getAllData()
    this.initDom()
    this.createDiv()
  },
  created() {

  }
}
</script>


<style type="text/css" lang="scss" src='../css/test.scss'></style>
