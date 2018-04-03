<template>
<div class="task">
  <div class="selectList">
    <ul>
      <li v-tap='{methods:selectFun,groupId:0}' :class='selectContModalID==0?"selected titleList":"titleList"' v-if='visaPdf== "false"'>
        证件信息
        <img src="static/ok.png" v-if='zhengjianOk'>
      </li>
      <li class="titleList" v-for='title in meterialDetail.GroupList' v-tap='{methods:selectFun,groupId:title.GroupID,groupName:title.GroupName}' :class='selectContModalID == title.GroupID?"selected":""' v-if='visaPdf== "false"'>
        {{title.GroupName}}
        <img src="static/ok.png" v-if='title.IsFilled'>
      </li>
      <li class="titleList pdfTable" v-for='item in $store.state.visa.pdfFile' v-if='visaPdf== "true"' v-tap='{methods:changePdf,info:item}' :class='pdfTag == item.Tag?"selected":""'>
        {{item.FileName}}
      </li>
      <button class='changeType' v-tap='{methods:createSubmitFile}' v-if='visaPdf== "false"&&addBgId!=7&&showPdfCountry.indexOf($store.state.visa.country)>-1'>
					签证模式
				</button>
      <button class='changeType' v-if='visaPdf=="true"&&showPdfCountry.indexOf($store.state.visa.country)>-1' v-tap='{methods:backEdit}'>
					返回编辑模式
				</button>
      <button class="changeType" v-if='!$store.state.app.canEdit&&$route.params.id<9' v-tap='{methods:saveFun}'>
					{{btnText}}
				</button>
    </ul>
  </div>
  <div class="selectCont">
    <component :is='selectContModal'></component>
  </div>
</div>
</template>
<script type="text/javascript">
import Certificate from './components/Certificate.vue'
import CertificateNewZealand from './components/CertificateNewZealand.vue'
import FamilyInfo from './components/FamilyInfo.vue'

import BaseInfo from './components/BaseNEWCHS.vue'
// import BaseInfo from './components/BaseInfoAustralia.vue'
import UserTinforTip from './components/UserInforTip.vue'
import VisaPdf from './components/VisaPdf.vue'
import PreApprove from '../modal/PreApprove.vue'
export default {
  data() {
    return {
      selectContModal: '',
      meterialDetail: '',
      selectContModalID: '',
      tagInfo: '',
      visaPdf: "false",
      submit: false,
      btnText: "",
      pdfTag: null,
      zhengjianOk: false,
      countryName: ["澳大利亚", "美国", "新西兰"], //生成模板文件 跟后台确定的国家顺序值 CreateSubmitFiles 需要的值
      showPdfCountry: ["澳大利亚", "新西兰"] //哪些国家需要显示签证模式
    }
  },
  methods: {
    selectFun(par) {
      this.submit = true
      this.selectContModalID = par.groupId
      this.$store.state.visa.groupId = this.selectContModalID
      this.$store.state.visa.groupName = par.groupName
      if (par.groupId > 0) {
        this.$root.set("GroupId", par.groupId)
      }
      if (this.selectContModalID > 0) {
        this.selectContModal = "BaseInfo"
        this.$root.eventHub.$emit('GROUPID', {
          groupId: par.groupId
        })
      } else {
        if (this.$store.state.visa.country == "新西兰") {
          this.selectContModal = "CertificateNewZealand"
          this.getUserInfoNZL()
        } else {
          this.getUserInfo()
          this.selectContModal = "Certificate"
        }
      }
    },
    createSubmitFile() {
      var wait = this.$layer.loading()
      // 生成模板文件
      if (this.countryName.indexOf(this.$store.state.visa.country) > -1) {
        var CountryNumber = this.countryName.indexOf(this.$store.state.visa.country) + 1
      }
      this.$http.post(this.$store.state.app.host + 'api/Manage/CreateSubmitFiles', {
          UserVisaID: this.$store.state.app.ivisaId,
          CountryNumber: CountryNumber
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.$layer.close(wait)
              this.visaPdf = "true"
              this.$root.set("VisaPdf", this.visaPdf)
              // this.$root.set("pdfFile",JSON.stringify(res.data.Result))
              this.$store.state.visa.pdfFile = res.data.Result
              this.pdfTag = this.$store.state.visa.pdfFile[0].Tag

              if (res.data.Result.length > 0) {
                for (var i = 0; i < this.$store.state.visa.pdfFile.length; i++) {
                  // switch(this.$store.state.visa.pdfFile[i].Tag){
                  // 	case 5:
                  // 		this.$store.state.visa.pdfFile[i].Name = "54表"
                  // 	break;
                  // 	case 4:
                  // 		this.$store.state.visa.pdfFile[i].Name = "1229委托表"
                  // 	break;
                  // 	// 新西兰
                  // 	case 6:
                  // 		this.$store.state.visa.pdfFile[i].Name = "1017表"
                  // 	break;
                  // 	case 7:
                  // 		this.$store.state.visa.pdfFile[i].Name = "1188委托表"
                  // 	break;
                  // 	case 8:
                  // 		this.$store.state.visa.pdfFile[i].Name = "1027申请人补充表"
                  // 	break;
                  // 	case 9:
                  // 		this.$store.state.visa.pdfFile[i].Name = "1027配偶补充表"
                  // 	break;
                  // 	case 10:
                  // 		this.$store.state.visa.pdfFile[i].Name = "1027子女补充表"
                  // 		// 去ItemChild

                  // 	break;
                  // }
                  if (this.$store.state.visa.pdfFile[i].Tag == 10) {
                    for (var j = 0; j < this.$store.state.visa.pdfFile[i].ItemChild.length; j++) {
                      this.$store.state.visa.pdfFile[i].ItemChild[j].Tag = "10_" + j
                      this.$store.state.visa.pdfFile.push(this.$store.state.visa.pdfFile[i].ItemChild[j])
                    }
                    this.$store.state.visa.pdfFile.splice(i, 1)
                    break;
                  }
                  console.log(this.$store.state.visa.pdfFile)
                }
              } else {
                this.$store.state.visa.pdfFile = [""]
              }

              this.$root.remove("pdfFile")
              this.$root.set("pdfFile", JSON.stringify(this.$store.state.visa.pdfFile))
              this.selectContModal = 'VisaPdf'
              // this.changeShowType(par)
            } else {
              this.visaPdf = "false"
              this.$root.set("VisaPdf", this.visaPdf)
              this.$layer.close(wait)
              // this.$layer.msg(res.data.Message)
            }
          },
          function(err) {
            this.$layer.close(wait)
            this.$layer.msg("网络连接超时")
          }
        )
    },
    backEdit() {
      this.visaPdf = "false"
      this.$root.remove("VisaPdf")
      this.$root.set("VisaPdf", this.visaPdf)
      this.$store.state.app.canEdit = false
      this.selectContModalID = 0
      this.$store.state.visa.groupId = this.selectContModalID

      if (this.$store.state.visa.country == "新西兰") {
        this.selectContModal = "CertificateNewZealand"
      } else {
        this.selectContModal = "Certificate"
      }
    },
    showUserInforTip() {
      this.userInforFrame = this.$layer.iframe({
        content: {
          content: UserTinforTip,
          parent: this,
          data: []
        },
        title: '信息'
      })
    },
    getUserInfo() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo', {
          params: {
            userVisaId: this.$store.state.app.ivisaId,
            isAllFiles: true
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.meterialDetail = res.data.Result
              this.fillNum = 0
              this.groupNum = this.meterialDetail.GroupList.length

              for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
                if (this.meterialDetail.GroupList[i].IsFilled) {
                  this.fillNum++;
                }
              }
              this.progress = parseInt(this.fillNum * 100 / this.groupNum)
              this.progressFun()
              this.$store.state.visa.detailInfo = res.data.Result
              if (this.submit == "false") {
                if (window.localStorage.getItem('addBgId') == "7") {
                  this.showUserInforTip()
                }
              }
              this.submit = true
              this.$root.set("Submit", this.submit)

              for (var i = 0; i < this.meterialDetail.PaperFileList.length; i++) {
                if (this.meterialDetail.PaperFileList[i] && this.meterialDetail.PaperFileList[i].FileType == 8) {
                  this.meterialDetail.PaperFileList.splice(i, 1)
                }
                if (this.meterialDetail.PaperFileList[i] && this.meterialDetail.PaperFileList[i].FileType == 28) {
                  this.meterialDetail.PaperFileList.splice(i, 1)
                }
              }

              for (var i = 0; i < this.meterialDetail.CredentialsFileList.length; i++) {
                if (this.meterialDetail.CredentialsFileList[i].HaveContent == null) {
                  this.zhengjianOk = false
                  return
                } else {
                  this.zhengjianOk = true
                }
              }
              for (var i = 0; i < this.meterialDetail.PaperFileList.length; i++) {
                if (this.meterialDetail.PaperFileList[i].HaveContent == null) {
                  this.zhengjianOk = false
                  return
                } else {
                  this.zhengjianOk = true
                }
              }

            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    getUserInfoNZL() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo4NZL', {
          params: {
            userVisaId: this.$store.state.app.ivisaId,
            isAllFiles: true
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            this.meterialDetail = res.data.Result
            // 记录百分比
            this.fillNum = 0
            this.groupNum = this.meterialDetail.GroupList.length
            for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
              if (this.meterialDetail.GroupList[i].IsFilled) {
                this.fillNum++;
              }
            }
            this.progress = parseInt(this.fillNum * 100 / this.groupNum)
            this.progressFun()

            this.$store.state.visa.detailInfo = res.data.Result
            if (this.submit == "false") {
              if (window.localStorage.getItem('addBgId') == "7") {
                this.familyTip()
              }
            }
            this.submit = true
            this.$root.set("Submit", this.submit)
            // 判断证件信息是否都已经上传
            for (var i = 0; i < this.meterialDetail.ApplyAllMaterialListInfo.length; i++) {
              for (var j = 0; j < this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList.length; j++) {
                if (this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList[j].FileType == 8) {
                  this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList.splice(i, 1)
                }
                if (this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList[j].FileType == 28) {
                  this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList.splice(i, 1)
                }
              }
            }
            for (var i = 0; i < this.meterialDetail.ApplyAllMaterialListInfo.length; i++) {
              for (var n = 0; n < this.meterialDetail.ApplyAllMaterialListInfo[i].CredentialsFileList.length; n++) {
                if (this.meterialDetail.ApplyAllMaterialListInfo[i].CredentialsFileList[n].HaveContent == null) {
                  this.zhengjianOk = false
                  return
                } else {
                  this.zhengjianOk = true
                }
              }
              for (var n = 0; n < this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList.length; n++) {
                if (!this.meterialDetail.ApplyAllMaterialListInfo[i].PaperFileList[n].HaveContent == null) {
                  this.zhengjianOk = false
                  return
                } else {
                  this.zhengjianOk = true
                }
              }
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    progressFun() {
      this.$http.post(this.$store.state.app.host + "api/Manage/SetPaperProgress", {
          UserVisaId: this.$store.state.app.ivisaId,
          TypeId: 2,
          Progress: this.progress
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          }
        })
        .then(
          function(res) {

          }
        )
    },
    saveFun() {
      // 提交
      this.submit = true
      if (this.$store.state.visa.country == "新西兰") {
        this.getUserInfoNZL()
      } else {
        this.getUserInfo()
      }
      var groupFilled = false;
      var materialFilled = false
      var groupNum = 0,
        materialNum = 0;

      for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
        if (this.meterialDetail.GroupList[i].IsFilled) {
          groupNum++
        }
      }

      if (groupNum == this.meterialDetail.GroupList.length) {
        if (window.localStorage.getItem('addBgId') > 7) {
          //操作办理  调用审核的接口
          this.preApproveFrame = this.$layer.iframe({
            content: {
              content: PreApprove,
              parent: this,
              data: []
            },
            title: "预审"
          })
        } else {
          // 录入信息
          this.$http.post(this.$store.state.app.host + 'api/Manage/TypeInfoSubmit', {
              UserVisaID: this.$store.state.app.ivisaId
            }, {
              headers: {
                Authorization: this.$store.state.app.token
              },
              timeout: this.$store.state.app.httpTime
            })
            .then(
              function(res) {
                if (res.data.Code == 0) {
                  this.$layer.msg('提交成功')
                  this.$root.goRouter({
                    router: "/visaInfo/7"
                  })
                }
              },
              function(err) {
                this.$layer.msg("网络连接超时")
              }
            )
        }
      } else {
        this.$layer.alert("请确保提交前除证件信息外都已经保存并且不存在未填写项！")
      }
    },
    changePdf(par) {
      this.pdfTag = par.info.Tag
      // this.$store.state.visa.pdfTag = this.pdfTag
      this.$root.eventHub.$emit("CHANGEPDF", {
        tag: par.info.Tag
      })
    },
    familyTip() {
      this.familyInfoFrame = this.$layer.iframe({
        content: {
          content: FamilyInfo,
          parent: this,
          data: []
        },
        title: '信息'
      })
    }
  },
  created() {
    this.$store.state.visa.country = this.$root.get("country")
    this.$store.state.app.token = this.$root.get("AppToken")
    this.$store.state.app.ivisaId = this.$root.get("IvisaId")
    this.addBgId = this.$root.get("addBgId")
    this.submit = this.$root.get("Submit")
    this.visaPdf = this.$root.get("VisaPdf")
    // this.$store.state.visa.country = "新西兰"
    if (this.$store.state.visa.country == "新西兰") {
      this.getUserInfoNZL()
    } else {
      this.getUserInfo()
    }

    if (this.visaPdf === "true") {
      this.selectContModal = "VisaPdf"
      this.createSubmitFile()
    } else {

      if (this.$store.state.visa.country == "新西兰") {
        this.selectContModal = "CertificateNewZealand"
      } else {
        this.selectContModal = "Certificate"
      }
    }
  },
  mounted() {

    this.$route.params.id == 7 ? this.btnText = "提交" : this.btnText = "预审"
    this.$store.state.visa.pdfTag = this.pdfTag
    var self = this
    this.$store.state.app.canEdit = false
    this.$on('CLOSE', function(obj) {
      switch (obj.hideFrame) {
        case "previewFrame":
          self.$layer.close(self.previewFrame)
          break;
        case "userInforFrame":
          self.$layer.close(self.userInforFrame)
          break;
        case "familyInfoFrame":
          self.$layer.close(self.familyInfoFrame)
          break;
      }
      if (obj.closeName == "preApproveFrame") {
        self.$layer.close(self.preApproveFrame)
      }
    })

    this.$root.eventHub.$on('REFRESHFILL', function(obj) {
      if (self.$root.get("country") == "新西兰") {
        self.getUserInfoNZL()
      } else {
        self.getUserInfo()
      }
    })
  },
  components: {
    "Certificate": Certificate,
    "BaseInfo": BaseInfo,
    "UserTinforTip": UserTinforTip,
    "VisaPdf": VisaPdf,
    "PreApprove": PreApprove,
    "CertificateNewZealand": CertificateNewZealand,
    "FamilyInfo": FamilyInfo
  },
  destroyed() {
    //do something after destroying vue instance
    this.$root.eventHub.$off("REFRESHFILL")
  },
}
</script>
<style type="text/css">
@import url(./css/taskWriteInfo.css);
</style>
