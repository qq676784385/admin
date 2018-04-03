<template>
  <div class="preview">
    <div class="cancel" v-tap='{methods:closeModal}'>×</div>
    <div class="allpreInfo">
      <div class="x_part" v-for='item in preViewInfo'>
        <div class="title">
          {{item.Name}}
          <span v-if='item.FileType == 3||item.FileType == 32||item.FileType == 33'>
            <span v-if='item.Tag ==1'>正面</span>
          <span v-if='item.Tag ==2'>反面</span>
          </span>
        </div>
        <div class="partImg" v-if='item.FileType == 3||item.FileType == 32||item.FileType == 33'>
          <img :src="$store.state.app.host + item.File" width="285px" height="189px">
        </div>
        <div class="partInfo">
          <div :class='item.FileData.length==0&&item.FileType !=2?"col middle":"col"'>
            <!-- 中文 -->
            <div class="partImg" v-if='item.FileType != 3&&item.FileType != 32&&item.FileType != 33'>
              <img :src="$store.state.app.host + item.File">
            </div>
            <div v-for='info in item.FileData' v-if='info&&info.Tag !="JB0006"'>
              <!-- 将是否有身份证列隐藏 -->
              <label>{{info.Name}}：</label>
              <input type="text" class="value" v-model='info.ValueCHS' :title='info.ValueCHS' v-if='item.FileType == 3&&info.Tag =="JB0021"||info.Tag == "JB0022"||info.Tag == "JT000102"||info.Tag == "JT000101"||info.Tag == "JTXXL002"||info.Tag == "JTXXL003" ' :contenteditable="!item.NameNotEnabled" @focus="focusInput(info,$event)" :tag="info.Tag">
              <input type="text" class="value" v-model='info.ValueCHS' contenteditable="true" v-else @focus="focusInput(info,$event)" :tag="info.Tag">
            </div>
          </div>
          <div class="col" v-if='item.FileType ==2||item.FileType ==3||item.FileType == 6||item.FileType == 32||item.FileType == 33||item.FileType == 37' :class="item.FileType != 3&&item.FileType != 32&&item.FileType != 33?'addBorder':''">
            <!-- 英文 -->
            <div class="partImg" v-if='item.FileType != 3&&item.FileType != 32&&item.FileType != 33'>
              <img :src="$store.state.app.host + item.File">
            </div>
            <div v-for='info in item.FileData' v-if='info&&info.Tag !="JB0006"'>
              <label>{{info.Name.replace("中文","拼音")}}：</label>
              <input type="text" class="value" v-model='info.ValueENG' :title='info.ValueENG' v-if='item.FileType == 3&&info.Tag =="JB0021"||info.Tag == "JB0022"||info.Tag == "JT000102"||info.Tag == "JT000101"||info.Tag == "JTXXL002"||info.Tag == "JTXXL003"' :contenteditable="!item.NameNotEnabled" @focus="focusInput(info,$event)" :tag="info.Tag">
              <input type="text" class="value" v-model='info.ValueENG' contenteditable="true" v-else @focus="focusInput(info,$event)" :tag="info.Tag">
            </div>
          </div>
        </div>
        <div v-if='canChooseLong&&item.Tag == 2'>
          <input type="checkbox" id='chooseLong' v-model='isLong' v-tap='{methods:selectLong}'>长期
        </div>
      </div>
    </div>
    <div class="changePage" v-if='preViewInfo.length>0&&fenye'>
      <div class="prev" @click='pageNum<=1?pageNum=1:pageNum--;changeInfoFun({num:pageNum})'>上一页</div>
      <div class="x_page" v-for='num in oldInfo.length'>
        <span class="pageN" :class='pageNum == num?"selected":""' v-tap='{methods:changeInfoFun,num:num}'>{{num}}</span>
      </div>
      <div class="next" @click='pageNum>=oldInfo.length?pageNum=oldInfo.length:pageNum++;changeInfoFun({num:pageNum})'>下一页</div>
    </div>
    <div class="saveInfo">
      <button v-tap='{methods:saveInfoFun}'>确认</button>
      <button class="cancelBtn" v-tap='{methods:closeModal}'>取消</button>
    </div>
  </div>
</template>
<script type="text/javascript">
// import '../../js/mobiscroll.2.13.2.js'
export default {
  data() {
    return {
      cansave: true,
      preViewInfo: "",
      pageNum: 1,
      oldInfo: [],
      dataAry: [],
      fenye: false,
      canChooseLong: false,
      isLong: false,
      saveDateCHS: "",
      saveDateENG: "",
      num: 0,
      yinyeObj: {
        Tag: null,
        ValueCHS: null,
        ValueENG: null
      }, //营业执照特殊处理 名称
      yinyeObj2: {
        Tag: null,
        ValueCHS: null,
        ValueENG: null
      } //营业执照特殊处理  地址
    }
  },
  methods: {
    selectLong() {

      if (this.preViewInfo[0].FileType == 3) {
        for (var i = 0; i < this.preViewInfo.length; i++) {
          if (this.preViewInfo[i].Tag == 2) {
            if (this.isLong) {
              this.preViewInfo[i].FileData[2].ValueCHS = "长期"
              this.preViewInfo[i].FileData[2].ValueENG = "long"
            } else {
              this.preViewInfo[i].FileData[2].ValueCHS = this.saveDateCHS
              this.preViewInfo[i].FileData[2].ValueENG = this.saveDateENG
            }
          }
        }
      }
    },
    closeModal() {
      this.$parent.$emit('CLOSE', { hideFrame: "previewFrame" })
    },
    getInfo() {
      /*var passport = ""
      if(this.$store.state.visa.fileInfo.Passport){
        passport = this.$store.state.visa.fileInfo.Passport
      }

      this.$http.get(this.$store.state.app.host + 'api/Manage/PreView', {
        params: {
          userVisaId: this.$store.state.app.ivisaId,
          visaFileId: this.$store.state.visa.fileInfo.VisaFileId,
          passport:passport
        }, headers: { Authorization: this.$store.state.app.token }, timeout: this.$store.state.app.httpTime})
        .then(
          function(res) {
            if (res.data.Code == 0) {

            }
          },
          function(err){
            this.$layer.msg("网络连接超时")
          }
        )*/

      this.preViewInfo = this.$store.state.visa.previewInfo
      // for(var i = 0;i<this.preViewInfo.length;i++){
      //     for(var j = 0;j<this.preViewInfo[i].FileData.length;j++){
      //       this.preViewInfo[i].FileData[j].NameENG = this.preViewInfo[i].FileData[j].Name.replace("中文","拼音")
      //     }
      // }
      // console.log(this.preViewInfo)
      if (this.preViewInfo[0].FileType == 4 || this.preViewInfo[0].FileType == 15 || this.preViewInfo[0].FileType == 20 || this.preViewInfo[0].FileType == 21 || this.preViewInfo[0].FileType == 22 || this.preViewInfo[0].FileType == 16 || this.preViewInfo[0].FileType == 29 || this.preViewInfo[0].FileType == 30 || this.preViewInfo[0].FileType == 31 || this.preViewInfo[0].FileType == 35) {
        this.fenye = true
      }
      this.oldInfo = this.$store.state.visa.previewInfo
      if (this.preViewInfo[0].FileType == 4 || this.preViewInfo[0].FileType == 15 || this.preViewInfo[0].FileType == 20 || this.preViewInfo[0].FileType == 21 || this.preViewInfo[0].FileType == 22 || this.preViewInfo[0].FileType == 16 || this.preViewInfo[0].FileType == 29 || this.preViewInfo[0].FileType == 30 || this.preViewInfo[0].FileType == 31 || this.preViewInfo[0].FileType == 35) {
        this.changeInfoFun({ num: 1 })
      }

      if (this.preViewInfo[0].FileType == 3) {
        for (var i = 0; i < this.preViewInfo.length; i++) {
          if (this.preViewInfo[i].Tag == 2) {
            this.canChooseLong = true
            if (this.preViewInfo[i].FileData[1].ValueCHS == "长期") {
              this.preViewInfo[i].FileData[1].ValueENG = "long"
            }

            if (this.preViewInfo[i].FileData[2].ValueCHS == "长期") {
              this.preViewInfo[i].FileData[2].ValueENG = "long"
              this.isLong = true
            } else {
              this.saveDateCHS = this.preViewInfo[i].FileData[2].ValueCHS
              this.saveDateENG = this.preViewInfo[i].FileData[2].ValueENG
              this.isLong = false
            }
          }
        }
      }
      if (this.preViewInfo[0].FileType == 6) {
        for (var i = 0; i < this.preViewInfo[0].FileData.length; i++) {
          // 新西兰 主申请人、配偶
          if (this.preViewInfo[0].FileData[i].Tag == "GZ00010203") {
            this.preViewInfo[0].FileData.splice(i, 1)
          }
          if (this.preViewInfo[0].FileData[i].Tag == "GZP00010203") {
            this.preViewInfo[0].FileData.splice(i, 1)
          }
          // 澳大利亚 美国
          // if(this.preViewInfo[0].FileData[i].Tag == "GZ00010203"){
          //   this.preViewInfo[0].FileData.splice(i,1)
          // }
          if (this.preViewInfo[0].FileData[i].Tag == "GZ00010205") {
            this.preViewInfo[0].FileData.splice(i, 1)
          }

        }
      }
    },
    saveInfoFun() {
      this.dataAry = []
      /*// 中文
      console.log($(".partInfo").children().eq(0).children());
      var child = $(".partInfo").children().eq(0).children()
      for (var i = 0; i < child.length; i++) {
        var ValueCHS = $(child[i]).children().eq(1).html()
        console.log(ValueCHS);
      }
      // 英文
      return*/
      if (this.preViewInfo[0].FileType == 6) {
        for (var i = 0; i < this.oldInfo[0].FileData.length; i++) {
          // 单位名称
          // 主申请人 澳大利亚 美国 新西兰
          if (this.oldInfo[0].FileData[i].Tag == "GZ00010101") {
            this.yinyeObj.Tag = "GZ00010203"
            this.yinyeObj.ValueCHS = this.oldInfo[0].FileData[i].ValueCHS
            this.yinyeObj.ValueENG = this.oldInfo[0].FileData[i].ValueENG
          }
          // 配偶 新西兰
          if (this.oldInfo[0].FileData[i].Tag == "GZP00010101") {
            this.yinyeObj.Tag = "GZP00010203"
            this.yinyeObj.ValueCHS = this.oldInfo[0].FileData[i].ValueCHS
            this.yinyeObj.ValueENG = this.oldInfo[0].FileData[i].ValueENG
          }
          // 单位地址
          // 澳大利亚 美国
          if (this.oldInfo[0].FileData[i].Tag == "GZ00010102") {
            this.yinyeObj2.Tag = "GZ00010205"
            this.yinyeObj2.ValueCHS = this.oldInfo[0].FileData[i].ValueCHS
            this.yinyeObj2.ValueENG = this.oldInfo[0].FileData[i].ValueENG
          }
        }
        this.oldInfo[0].FileData.push(this.yinyeObj)
        if (this.yinyeObj2.Tag) {
          this.oldInfo[0].FileData.push(this.yinyeObj2)
        }

      }
      for (var i = 0; i < this.oldInfo.length; i++) {
        var obj = {}
        obj.UserVisaId = this.$store.state.app.ivisaId
        obj.UserVisaFileId = this.oldInfo[i].UserVisaFileId
        obj.CredentialsData = this.oldInfo[i].FileData
        if (this.$store.state.visa.fileInfo.UserType > 0 || this.$store.state.visa.fileInfo.UserType == 0) {
          obj.PassportStatus = this.$store.state.visa.fileInfo.UserType
        } else {
          obj.PassportStatus = null
        }
        this.dataAry.push(obj)
      }
      if (this.preViewInfo[0].FileType == 2) {
        for (var i = 0; i < this.dataAry[0].CredentialsData.length; i++) {
          if (this.dataAry[0].CredentialsData[i].Tag == "JT000117") {
            // 配偶
            this.dataAry[0].CredentialsData[i].ValueENG = this.dataAry[0].CredentialsData[i].ValueENG.toLowerCase()
          }
          if (this.dataAry[0].CredentialsData[i].Tag == "JTXXL00804") {
            // 子女
            this.dataAry[0].CredentialsData[i].ValueENG = this.dataAry[0].CredentialsData[i].ValueENG.toLowerCase()
          }
        }
      }
      if (this.cansave) {
        this.cansave = false
        this.$http.post(this.$store.state.app.host + 'api/Manage/SavePreViewData', {
            PassportStatus: this.$store.state.visa.fileInfo.UserType,
            Passport: this.$store.state.visa.fileInfo.Passport,
            Data: this.dataAry
          }, { headers: { Authorization: this.$store.state.app.token }, timeout: this.$store.state.app.httpTime })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.$parent.$emit('CLOSE', { hideFrame: "previewFrame" })
                this.cansave = true
              } else {
                this.$layer.alert(res.data.Message)
                this.cansave = true
              }
            },
            function(err) {
              this.cansave = true
              this.$layer.msg("网络连接超时")
            }
          )
      }

    },
    changeInfoFun(par) {
      // this.preViewInfo

      this.pageNum = par.num
      this.preViewInfo = this.oldInfo.slice(this.pageNum - 1, this.pageNum)

    },
    focusInput(info, e) {
      var currYear = new Date().getFullYear();
      if (info.FieldType == 6) {
        var that = this
        $(e.target).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          // defaultValue: new Date(2017,1,1),
          // startYear:currYear,
          // endYear: currYear + 20,
          dateFormat: "yyyy-mm",
          dateOrder: "yyyymm",
          onSelect: function(event, inst) {
            // if(info.Tag == "JB000605"){
            //   document.getElementById("chooseLong").click()
            // }
            if (event) {
              info.ValueCHS = event
              info.ValueENG = event
              if (info.Tag == "JB000605") {
                that.isLong = false
                that.saveDateCHS = event
                that.saveDateENG = event
              }
            }
          }
        });
      } else if (info.FieldType == 1) {
        var that = this
        $(e.target).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          // defaultValue: new Date(2017,1,1),
          // startYear:currYear,
          endYear: currYear + 50,
          dateFormat: "yyyy-mm-dd",
          dateOrder: "yyyymmdd",
          onSelect: function(event, inst) {
            // console.log(that.isLong)
            // if(info.Tag == "JB000605"&&this.isLong){
            //   document.getElementById("chooseLong").click()
            //   this.isLong = false
            // }
            if (event) {
              info.ValueCHS = event
              info.ValueENG = event
              if (info.Tag == "JB000605") {
                that.isLong = false
                that.saveDateCHS = event
                that.saveDateENG = event
              }
            }

          }
        });
      }
    }
  },
  created() {
    this.getInfo()
  }
}

</script>
<style type="text/css">
@import url(../css/preview.css);

</style>
