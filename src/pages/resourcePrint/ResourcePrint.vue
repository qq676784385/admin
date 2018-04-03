<template>
<div class="resourcePrint">
  <div>
    <button class="backBtn" v-tap='{methods:backFun}'>返回已审核列表</button>
  </div>
  <div class="printList">
    <p class="printTitle">申请表打印</p>
    <div class="inforList">
      <table border="1" cellspacing="0" frame="above" rules="all">
        <tr>
          <th class="firstTr">序号</th>
          <th>名称</th>
          <th>在线预览</th>
          <th>下载</th>
          <th>打印</th>
        </tr>
        <tr v-for='(item,index) in listInfo.PaperList'>
          <td class="firstTr">{{index+1}}</td>
          <td>{{item.FileName}}</td>
          <td>
            <span class="link" v-if='item.FileType != 1000' v-tap='{methods:preview,info:item}'>预览</span>
            <a class="link" v-if='item.FileType == 1000' :href="$store.state.app.host + item.File" target="_blank">预览</a>
          </td>
          <td class="link">
            <a class="link" v-tap='{methods:downLoadFun,info:item}'>下载</a>
          </td>
          <td class="link">
            <a class="link" v-tap='{methods:printFun,info:item}'>打印</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <div class="printList">
    <p class="printTitle">资料打印</p>
    <div class="inforList">
      <table border="1" cellspacing="0" frame="above" rules="all">
        <tr>
          <th class="firstTr">序号</th>
          <th>名称</th>
          <th>在线预览</th>
          <th>下载</th>
          <th>打印</th>
        </tr>
        <tr v-for='(item,index) in listInfo.CredentialsList'>
          <td class="firstTr">{{index+1}}</td>
          <td>{{item.FileName}}</td>
          <td>
            <span class="link" v-if='item.FileType !=8&&item.FileType !=28&&item.FileType !=1001' v-tap='{methods:preview,info:item}'>
							预览
							</span>
            <span v-else>---</span>
          </td>
          <td class="link">
            <a class="link" v-tap='{methods:downLoadFun,info:item}' v-if="mubanCountry.indexOf($root.get('country')) == -1">下载</a>
            <a class="link" v-tap='{methods:downLoadFun,info:item}' v-if="mubanCountry.indexOf($root.get('country'))>-1">下载(中文文件)</a>
            <a class="link" v-tap='{methods:downLoadWord,info:item}' v-if="mubanCountry.indexOf($root.get('country'))>-1" :class="item.ExistTemplate==-1?'noTemp':''">下载(英文文件)</a>
          </td>
          <td class="link">
            <a class="link" v-tap='{methods:printFun,info:item}'>打印<a  class="link" v-if="mubanCountry.indexOf($root.get('country'))>-1">(中文文件)</a></a>
            <a class="link" v-tap='{methods:printFunWord,info:item}' v-if="mubanCountry.indexOf($root.get('country'))>-1" :class="item.ExistTemplate==-1?'noTemp':''">打印(英文文件)</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <component :is="newPreview"></component>
</div>
</template>
<script type="text/javascript">
import Preview from '../materialDetail/components/Preview.vue'
// import PreviewENG from '../materialDetail/components/PreviewENG.vue'
import PreviewENG from '../taskWriteInfor/components/PreviewENG2.vue'
export default {
  data() {
    return {
      listInfo: [],
      imgFile: "",
      zichanType: [15, 20, 21, 22],
      chuzirenType: [16, 29, 30, 31],
      hebingType: [2, 36, 35],
      haveczr: false,
      havezc: false,
      havehz: false,
      newPreview: "",
      mubanCountry:["英国","比利时","法国","瑞典","捷克","西班牙","挪威","瑞士","德国","奥地利","希腊","葡萄牙","意大利"],//有模板的国家
    }
  },
  methods: {
    backFun(par) {
      this.$root.goRouter({
        router: '/visaInfo/9'
      })
    },
    getList() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/PrintPage', {
          params: {
            userVisaId: this.$store.state.app.ivisaId
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            this.listInfo = res.data.Result
            for (var i = 0; i < this.listInfo.CredentialsList.length; i++) {
              if (this.zichanType.indexOf(this.listInfo.CredentialsList[i].FileType) > -1 && !this.havezc) {
                // 资产证明
                var obj1 = {
                  FileType: 8,
                  FileName: "资产证明",
                  ExistTemplate: -1
                }
                this.listInfo.CredentialsList.unshift(obj1)
                this.havezc = true
              }
              if (this.chuzirenType.indexOf(this.listInfo.CredentialsList[i].FileType) > -1 && !this.haveczr) {
                // 出资人资产证明
                var obj2 = {
                  FileType: 28,
                  FileName: "出资人资产证明",
                  ExistTemplate: -1
                }
                this.listInfo.CredentialsList.unshift(obj2)
                this.haveczr = true
              }

              if (this.hebingType.indexOf(this.listInfo.CredentialsList[i].FileType) > -1 && !this.havehz) {
                // 护照合并项
                var obj3 = {
                  FileType: 1001,
                  FileName: "护照",
                  ExistTemplate: -1
                }
                this.listInfo.CredentialsList.unshift(obj3)
                this.havehz = true
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


      if (par.info.File) {
        if (this.mubanCountry.indexOf(this.$root.get("country"))>-1) {
          // this.newPreview = "PreviewENG"
          this.$root.set("IsPrint", "true")
          this.previewENG(par)
          /*this.previewFrameENG = this.$layer.iframe({
            content: {
              content: PreviewENG,
              parent: this,
              data: []
            },
            title: par.info.FileName
          })*/
        } else {
          this.previewFrame = this.$layer.iframe({
            content: {
              content: Preview,
              parent: this,
              data: []
            },
            title: par.info.FileName
          })
        }

      } else {
        this.$layer.msg("请先上传完整文件")
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
    printFun(par) {
      this.printFinish(par)
      if (par.info.FileType == 3 || par.info.FileType == 4 || par.info.FileType == 15 || par.info.FileType == 20 || par.info.FileType == 21 || par.info.FileType == 22 || par.info.FileType == 16 || par.info.FileType == 29 || par.info.FileType == 30 ||
        par.info.FileType == 31 || par.info.FileType == 33 || par.info.FileType == 32 || par.info.FileType == 8 || par.info.FileType == 28 || par.info.FileType == 35 || par.info.FileType == 5) {
        par.event.target.setAttribute("href", this.$store.state.app.host + "api/Manage/MergeJPEGToPDF?userVisaId=" + this.$store.state.app.ivisaId + "&fileType=" + par.info.FileType + "&passport=&download=false")
        par.event.target.setAttribute("target", "_blank")
      } else if (par.info.FileType == 1001) {
        // 护照合并项
        par.event.target.setAttribute("href", this.$store.state.app.host + "api/Manage/MergePassportToPDF?userVisaId=" + this.$store.state.app.ivisaId + "&passport=&download=false")
        par.event.target.setAttribute("target", "_blank")
      } else {
        // this.printFinish(par)
        this.imgFile = this.$store.state.app.host + par.info.File
        this.$store.state.visa.fileId = par.info.FileId

        console.log(this.$store.state.app.host + par.info.File)
        let newWindow = window.open(this.$store.state.app.host + par.info.File, "_blank")
        newWindow.print()
        return true

      }
    },
    printFunWord(par) {
      if (par.info.ExistTemplate == -1) {
        return
      }
      this.printFinish(par)
      par.event.target.setAttribute("target", "_blank")
      par.event.target.setAttribute("href", this.$store.state.app.host + "api/Manage/GetFileTemplateInfo2?userVisaId=" + this.$store.state.app.ivisaId + "&fileType=" + par.info.FileType + "&download=false")

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
    printFinish(par) {
      this.$http.get(this.$store.state.app.host + "api/Manage/SetImportOrPrintFinish", {
          params: {
            userVisaId: this.$store.state.app.ivisaId,
            type: 2
          },
          headers: {
            Authorization: this.$store.state.app.token
          }
        })
        .then(
          function(res) {

          }
        )
    },
    downLoadFun(par) {
      // 下载
      if (par.info.FileType == 3 || par.info.FileType == 4 || par.info.FileType == 15 || par.info.FileType == 20 || par.info.FileType == 21 || par.info.FileType == 22 || par.info.FileType == 16 || par.info.FileType == 29 || par.info.FileType == 30 ||
        par.info.FileType == 31 || par.info.FileType == 32 || par.info.FileType == 33 || par.info.FileType == 8 || par.info.FileType == 28 || par.info.FileType == 35 || par.info.FileType == 5) {
        par.event.target.setAttribute("href", this.$store.state.app.host + "api/Manage/MergeJPEGToPDF?userVisaId=" + this.$store.state.app.ivisaId + "&fileType=" + par.info.FileType + "&passport=&download=true")
      } else if (par.info.FileType == 1001) {
        // 护照合并项
        par.event.target.setAttribute("href", this.$store.state.app.host + "api/Manage/MergePassportToPDF?userVisaId=" + this.$store.state.app.ivisaId + "&passport=&download=true")
      } else {
        par.event.target.setAttribute("href", this.$store.state.app.host + par.info.File)
        par.event.target.setAttribute("download", this.$store.state.app.host + par.info.File)
      }
    },
    downLoadWord(par) {
      if (par.info.ExistTemplate == -1) {
        return
      }
      par.event.target.setAttribute("target", "_blank")
      par.event.target.setAttribute("href", this.$store.state.app.host + "api/Manage/GetFileTemplateInfo2?userVisaId=" + this.$store.state.app.ivisaId + "&fileType=" + par.info.FileType + "&download=true")

      /*if(par.info.FileType == 3||par.info.FileType ==4||par.info.FileType ==15||par.info.FileType ==20||par.info.FileType ==21||par.info.FileType ==22||par.info.FileType ==16||par.info.FileType ==29||par.info.FileType ==30||par.info.FileType ==31||par.info.FileType ==32||par.info.FileType ==33||par.info.FileType ==8||par.info.FileType ==28||par.info.FileType ==35){
            		par.event.target.setAttribute("target","_blank")
			        par.event.target.setAttribute("href",this.$store.state.app.host + "api/Manage/GetFileTemplateInfo?userVisaId="+this.$store.state.app.ivisaId+"&fileType="+par.info.FileType)
			    }else if(par.info.FileType == 1001){
			    	// 护照合并项
			    	par.event.target.setAttribute("href",this.$store.state.app.host+"api/Manage/MergePassportToPDF?userVisaId="+this.$store.state.app.ivisaId+"&passport=&download=true")
			    }else{
			        par.event.target.setAttribute("href",this.$store.state.app.host+par.info.File)
			        par.event.target.setAttribute("download",this.$store.state.app.host+par.info.File)
			    }*/
    }

  },
  mounted() {
    // this.$store.state.app.host = this.$root.get("AppHost")
    this.$store.state.app.token = this.$root.get("AppToken")
    this.$store.state.app.ivisaId = this.$root.get("IvisaId")
    this.getList()
    var that = this
    this.$on('CLOSE', function(obj) {
      console.log(obj.hideFrame)
      switch (obj.hideFrame) {
        case "previewFrameENG":
          that.$layer.close(that.previewFrameENG)
          break;
        case "previewFrame":
          that.$layer.close(that.previewFrame)
          break;
      }
    })
    this.$root.eventHub.$on("CLOSENEWPREVIEW", function() {
      that.newPreview = ""
    })

  },
  components: {
    Preview,
    PreviewENG
  }
}
</script>
<style>
@import url(./resourcePrint.css);
</style>
