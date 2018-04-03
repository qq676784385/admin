<template>
<div class="certificate">
  <div class="userInfo">
    <div class="line">
      <label>受理单号：</label>
      <span>{{certificateInfo.OrderNumber}}</span>
    </div>
    <div class="line">
      <label>姓名：</label>
      <span>{{certificateInfo.Name}}</span>
    </div>
    <div class="line">
      <label>护照号：</label>
      <span>{{certificateInfo.PassportNumber}}</span>
    </div>
    <div class="line">
      <label>国家：</label>
      <span>{{certificateInfo.Country}}</span>
    </div>
    <div class="line" v-if='haveMarriedCountry.indexOf(certificateInfo.Country)>-1'>
      <label>出行目的：</label>
      <span>{{visaType[certificateInfo.VisaType]}}</span>
    </div>
    <br v-if='haveMarriedCountry.indexOf(certificateInfo.Country)>-1'>
    <div class="line">
      <label>职业：</label>
      <span>{{career[certificateInfo.Identity]}}</span>
    </div>
    <div class="line" v-if='haveMarriedCountry.indexOf(certificateInfo.Country)>-1'>
      <label>婚姻状况：</label>
      <span>{{married[certificateInfo.Married]}}</span>
    </div>
    <div class="line" v-if='certificateInfo.Country == "美国EVUS"'>
      <label>您的有效美国签证页是否在您当前使用的护照内：</label>
      <span v-if='certificateInfo.PassportIncludeVisa'>是</span>
      <span v-if='!certificateInfo.PassportIncludeVisa'>否</span>
    </div>
  </div>
  <div class="needMaterial">
    <div class="materialTitle">
      <div class="blueBorder"><span>申请人此次办理所需材料</span></div>
    </div>
    <div class="list">
      <div class="titleTxt">必备证件</div>
      <div class="materialList">
        <table border="1" cellspacing="0" frame="above" rules="all">
          <tr>
            <th>序号</th>
            <th>附件名称</th>
            <th>在线预览</th>
            <th>下载</th>
            <th>上传</th>
            <th>已上传文件名称</th>
            <th>删除</th>
          </tr>
          <tr v-for='(item,index) in certificateInfo.CredentialsFileList'>
            <td class="numberBg numberColor">{{index+1}}</td>
            <td>
              <span>{{item.FileName}}</span>
            </td>
            <td class="link" v-tap='{methods:preview,info:item}'>
              浏览
            </td>
            <td>
              <!--  <a  :href="'http://dev.ivisa.ydynasty.com/DevTest/api/Manage/MergeIdCardToPDF?userVisaId='+$store.state.app.ivisaId+'&download=true'" class="numberColor link"  v-if='item.HaveContent&&item.FileType ==3'>
                   下载
                 </a>
                 <a  :href="'http://dev.ivisa.ydynasty.com/DevTest/api/Manage/MergeBookletToPDF?userVisaId='+$store.state.app.ivisaId+'&download=true'" class="numberColor link"  v-if='item.HaveContent&&item.FileType ==4'>
                   下载
                 </a>
                 <a  class="numberColor link" :href='$store.state.app.host+item.File' :download="$store.state.app.host+item.File" v-if='item.HaveContent&&item.FileType !=4&&item.FileType !=3'>下载</a>
                   <span  v-if='!item.HaveContent'>下载</span> -->
              <a class="link" v-tap='{methods:downLoadFun,info:item}'>下载</a>
            </td>
            <td class="  uploadInput">
              点击上传
            </td>
            <td>
              <span v-html='item.UploadFileName||"---"'></span>
            </td>
            <td>删除</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="list">
      <div class="titleTxt">必备材料</div>
      <div class="materialList">
        <table border="1" cellspacing="0" frame="above" rules="all">
          <tr>
            <th>序号</th>
            <th>附件名称</th>
            <th>在线预览</th>
            <th>下载</th>
            <th>上传</th>
            <th>已上传文件名称</th>
            <th>删除</th>
          </tr>
          <tr v-for='(item,index) in certificateInfo.PaperFileList'>
            <td class="numberBg numberColor">{{index+1}}</td>
            <td>
              <span>{{item.FileName}}</span>
            </td>
            <td class="link" v-tap='{methods:preview,info:item}'>
              浏览
            </td>
            <td>
              <a class="link" v-tap='{methods:downLoadFun,info:item}'>下载</a>
            </td>
            <td class=" uploadInput">
              点击上传
            </td>
            <td>
              <span v-html='item.UploadFileName||"---"'></span>
            </td>
            <td class="">删除</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <component :is="newPreview"></component>
</div>
</template>
<script type="text/javascript">
import Preview from './Preview.vue'
// import PreviewENG from './PreviewENG.vue'
import PreviewENG from './../../taskWriteInfor/components/PreviewENG2.vue'
// import PreviewENG from './PreviewENG3.vue'

export default {
  data() {
    return {
      certificateInfo: '',
      // career:["","在职","学生，小于18岁","学生，大于等于18岁","退休","失业"],
      career: ["", "自雇", "学生（18岁以下）", "学生（18岁及以上）", "退休", "自由职业", "受雇", "学龄前儿童"],
      visaType: ["", "旅游", "工作", "学生", "商务", "探亲"],
      married: ["未婚", "已婚", "离异", "丧偶"],
      newPreview: "",
	  mubanCountry:["英国","比利时","法国","瑞典","捷克","西班牙","挪威","瑞士","德国","奥地利","希腊","葡萄牙","意大利"],//模板国家
	  haveMarriedCountry:["澳大利亚","英国","美国","比利时"]
    }
  },
  methods: {
    getUserInfo() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo', {
          params: {
            userVisaId: this.$store.state.app.ivisaId,
            isAllFiles: false
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.certificateInfo = res.data.Result
              this.$store.state.visa.certificateInfo = this.certificateInfo

              for (var i = 0; i < this.certificateInfo.PaperFileList.length; i++) {
                if (this.certificateInfo.PaperFileList[i].FileType == 8) {
                  this.certificateInfo.PaperFileList.splice(i, 1)
                }
                if (this.certificateInfo.PaperFileList[i].FileType == 28) {
                  this.certificateInfo.PaperFileList.splice(i, 1)
                }
              }

            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    preview(par) {
      this.$store.state.visa.fileInfo = par.info
      if (this.mubanCountry.indexOf(this.$root.get("country"))>-1) {
        // this.getFileTemplate(par.info)
        this.previewENG(par)
        // this.newPreview = "PreviewENG"

      } else {
        if (par.info.HaveContent) {
          this.previewFrame = this.$layer.iframe({
            content: {
              content: Preview,
              parent: this,
              data: []
            },
            title: par.info.FileName
          })
        } else {
          this.$layer.msg("请先上传完整文件")
        }
      }
    },
    previewENG(par) {
      console.log("previewENG", par)
      this.$store.state.visa.fileInfo = par.info
      var passport = null

      if (par.info.HaveContent && par.info.UploadFileName.length > 0) {
        this.$http.get(this.$store.state.app.host + 'api/Manage/PreView', {
            params: {
              userVisaId: this.$store.state.app.ivisaId,
              visaFileId: this.$store.state.visa.fileInfo.VisaFileId,
              passport: passport
            },
            headers: {
              Authorization: this.$store.state.app.token
            },
            timeout: this.$store.state.app.httpTime
          })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.$store.state.visa.previewInfo = res.data.Result
                this.getFileTemplate(this.$store.state.visa.fileInfo)
              }
            },
            function(err) {
              this.$layer.msg("网络连接超时")
            }
          )
      } else {

      }
    },
    getFileTemplate(info) {
      // console.log(info)
      // 获取模板信息
      var tag = info.Tag ? info.Tag : "1"
      console.log(info);
      this.$http.get(this.$store.state.app.host + "api/Manage/GetFileTemplate", {
          params: {
            userVisaId: this.$store.state.app.ivisaId,
            visaFileId: info.VisaFileId,
            tag: tag
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.$store.state.visa.templateInfo = res.data.Result
              this.newPreview = "PreviewENG"
            }
          },
          function(err) {
            console.log("出错了")

          }
        )
    },
    downLoadFun(par) {
      if (par.info.FileType == 3 || par.info.FileType == 4 || par.info.FileType == 15 || par.info.FileType == 20 || par.info.FileType == 21 || par.info.FileType == 22 || par.info.FileType == 16 || par.info.FileType == 29 || par.info.FileType == 30 ||
        par.info.FileType == 31 || par.info.FileType == 32 || par.info.FileType == 33 || par.info.FileType == 35 || par.info.FileType == 5) {
        par.event.target.setAttribute("href", this.$store.state.app.host + "api/Manage/MergeJPEGToPDF?userVisaId=" + this.$store.state.app.ivisaId + "&fileType=" + par.info.FileType + "&passport=&download=true")
      } else {
        par.event.target.setAttribute("href", this.$store.state.app.host + par.info.File)
        par.event.target.setAttribute("download", this.$store.state.app.host + par.info.File)
      }
    }
  },
  mounted() {
    this.getUserInfo()
    var _this = this
    this.$on('CLOSE', function(obj) {
      switch (obj.hideFrame) {
        case "previewFrame":
          _this.$layer.close(_this.previewFrame)
          break;
        case "previewFrameENG":
          _this.$layer.close(_this.previewFrameENG)
          break;
      }
      _this.getUserInfo()
    })
    this.$root.eventHub.$on("CLOSENEWPREVIEW", function() {
      _this.newPreview = ""
    })

  },
  components: {
    'Preview': Preview,
    'PreviewENG': PreviewENG
  }
}
</script>
<style type="text/css">
/*@import url(../css/certificate.css);*/
</style>
