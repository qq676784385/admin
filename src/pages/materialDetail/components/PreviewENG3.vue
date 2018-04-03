<template>
<div class="previewEng">
  <div class="previewCont">
    <div class="title">
      <span>{{previewInfo[0].title}}</span>
      <span class="cancelBtn" v-tap="{methods:cancel}">×</span>
    </div>
    <div class="middleCont">
      <div class="realImg">
        <div class="changeImg left_btn" v-tap="{methods:changeImgFun,index:'-1'}">
          <img src="static/left.png">
        </div>
        <div class="middleImg">
          <img id="r_img" :src="$store.state.app.host+previewInfo[showImgIndex].File" ref='image' v-if="previewInfo[showImgIndex].File">
          <span v-if="!previewInfo[showImgIndex].File">无图片{{showImgIndex+1}}</span>
        </div>
        <div class="changeImg right_btn" v-tap="{methods:changeImgFun,index:'1'}">
          <img src="static/right.png">
        </div>
        <div class="numIndex">

        </div>
      </div>
      <div class="info">
        <div class="tempImg">
          <div class="noTemp" v-tap="{methods:addTemp}" v-if="previewInfo[showImgIndex].TemplateId==null">
            <div v-if="tempList.length==0">
              暂时没有模板
            </div>
            <div v-if="tempList.length>0">
              <img src="static/iconfont-jia.png">
              <div>选择模板</div>
            </div>
          </div>
          <div class="haveTemp" v-if="previewInfo[showImgIndex].TemplateId!=null">
            <div class="img">
              <img :src="previewInfo[showImgIndex].Url?$store.state.app.host + previewInfo[showImgIndex].Url:'static/demoTemplate.png'">
            </div>
            <div class="tempTitle">{{previewInfo[showImgIndex].TemplateData.Name}}</div>
            <div class="addBtn">
              <div class="b1" v-tap="{methods:addTemp}">
                <img src="static/changeImg.png">
                <span>重新选择</span>
              </div>
              <div class="b1" v-tap="{methods:creatNewTemp}" v-if="previewInfo[showImgIndex].TemplateData.IsCustomTemplate">
                去制作模板
              </div>
            </div>
          </div>
        </div>
        <!-- 原模板内容 -->
        <div class="allInfo" v-if="!createTemp">
          <div class="x_title">
            <div class="txt">
              中文：
            </div>
            <div class="txt">
              英文：
            </div>
          </div>
          <!-- 识别字段 -->
          <div v-for="info in previewInfo[showImgIndex].FileData" v-if="!previewInfo[showImgIndex].TemplateId">
            <div class="left_cont info_cont">
              <div class="name">{{info.Name}}</div>
              <input type="text" name="" v-model="info.ValueCHS" class="value">
            </div>
            <div class="right_cont info_cont">
              <div class="name">{{info.Name}}</div>
              <input type="text" name="" v-model="info.ValueENG" class="value">
            </div>
          </div>
          <!-- 模板字段 -->
          <div v-for="info in previewInfo[showImgIndex].TemplateData.TemplateFieldInfo" v-if="previewInfo[showImgIndex].TemplateId">
            <div class="left_cont info_cont">
              <div class="name">{{info.Name}}</div>
              <input type="text" name="" v-model="info.ValueCHS" class="value" @focus="focusInput(info,$event)" v-if="info.FieldType != 8">
              <select class="value" v-if="info.FieldType == 8" v-model="info.ValueCHS">
                <option v-for="opt in info.Options">{{opt.Value}}</option>
              </select>
            </div>
            <div class="right_cont info_cont">
              <div class="name">{{info.Name}}</div>
              <input type="text" v-model="info.ValueENG" class="value" @focus="focusInput(info,$event)" v-if="info.FieldType != 8">
              <select class="value" v-if="info.FieldType == 8" v-model="info.ValueENG">
                <option v-for="opt in info.Options">{{opt.ValueENG}}</option>
              </select>
            </div>
          </div>
        </div>
        <!-- 制作模板 -->
        <div class="allInfo" v-if="createTemp">
          <component :is="creatempText"></component>
        </div>
        <!-- end -->
      </div>
    </div>
    <div class="footBtn" v-if="!previewInfo[showImgIndex].TemplateData.IsCustomTemplate">
      <div class="blueBg" v-tap="{methods:translateFun,type:1}">翻译</div>
      <div class="blueBg" v-tap="{methods:translateFun,type:2}">保存</div>
      <div v-tap="{methods:cancel}">取消</div>
    </div>
    <div class="footBtn" v-if="previewInfo[showImgIndex].TemplateData.IsCustomTemplate">
      <!-- 自定义模板-->
      <div class="blueBg" v-tap="{methods:translateFunTemp}">翻译</div>
      <div class="blueBg" v-tap="{methods:saveInfoFunTemp}">保存</div>
      <div v-tap="{methods:cancel}">取消</div>
    </div>

  </div>
  <!-- 选择模板弹窗 -->
  <div class="allTemp previewCont" v-if="showTemp">
    <div class="header title">
      <span>选择模板</span>
      <span class="cancelBtn" v-tap="{methods:hideTemp}">×</span>
    </div>
    <div class="tempList">
      <div class="oneTemp" v-for="(temp,index) in tempList" v-tap="{methods:selectTemp,info:temp,index:index}">
        <img class="onetempImg" :src="temp.Url?$store.state.app.host+temp.Url:'static/demoTemplate.png'">
        <div>{{temp.Name}}</div>
        <div class="mask" v-if="temp.TemplateId == templateId">
          <img src="static/selected.png">
        </div>
      </div>
    </div>
    <div class="footBtn">
      <div class="blueBg" v-tap="{methods:saveTempId}">保存</div>
      <div v-tap="{methods:hideTemp}">取消</div>
    </div>
  </div>
  <component :is="creatTempName"></component>
</div>
</template>
<script type="text/javascript">
import CreatTemplate from "./CreatTemplate.vue"
import CreatTempText from "./CreatTempText.vue"
// import CreateT1 from "./CreateT1.vue"
export default {
  data() {
    return {
      tempList: [],
      showTemp: false,
      templateId: "",
      creatTempName: "",
      showImgIndex: 0,
      selectTempInfo: "",
      previewInfo: [],
      kongObj: {
        File: "",
        FileData: "",
        FileType: "",
        Name: "",
        NameNotEnabled: "",
        Tag: "",
        TemplateData: [],
        TemplateId: "",
        UserVisaFileId: "",
        title: ""
      },
      createTemp: false,
      creatempText: "",
      num: 0,
      yingyeObj: {},
      yingyeObj2: {}
    }
  },
  methods: {
    preview() {
      var passport = null
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
    },
    getFileTemplate() {
      // 获取模板信息
      console.log("获取模板信息", this.previewInfo[this.showImgIndex].Tag)
      this.$http.get(this.$store.state.app.host + "api/Manage/GetFileTemplate", {
          params: {
            userVisaId: this.$store.state.app.ivisaId,
            visaFileId: this.$store.state.visa.fileInfo.VisaFileId,
            tag: this.previewInfo[this.showImgIndex].Tag
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
              this.tempList = this.$store.state.visa.templateInfo
            } else {
              this.$layer.msg(res.data.Message)
            }
          },
          function(err) {
            console.log("出错了")
          }
        )
    },
    cancel() {
      this.$root.eventHub.$emit("CLOSENEWPREVIEW")
    },
    addTemp() {
      console.log(this.$store.state.visa.fileInfo)
      // 每次重新选择模板都要先翻译保存
      this.translateFun({
        type: 2
      })
      var that = this
      var t1 = setTimeout(function() {
        // 每次选择模板都要重新获取模板信息
        that.getFileTemplate()
        // 展示模板弹窗
        // 添加模板
        that.showTemp = true
        // 判断现在图片所对应的模板id
        if (that.previewInfo[that.showImgIndex].TemplateData.IsCustomTemplate) {
          that.templateId = 0
        } else {

          that.templateId = that.previewInfo[that.showImgIndex].TemplateId
        }
      }, 200)

    },
    hideTemp() {
      // 取消选择模板
      // 模板id还是取之前的id
      this.templateId = this.previewInfo[this.showImgIndex].TemplateId
      this.selectTempInfo = ""
      this.showTemp = false
    },
    saveTempId() {
      // 保存所选模板
      // 选择完模板 更新预览数据结构中的数据
      console.log("保存所选模板", this.selectTempInfo);
      this.templateId = this.selectTempInfo.TemplateId
      this.previewInfo[this.showImgIndex].TemplateId = this.selectTempInfo.TemplateId
      this.previewInfo[this.showImgIndex].TemplateData = this.selectTempInfo
      this.previewInfo[this.showImgIndex].Name = this.selectTempInfo.Name
      // this.previewInfo[this.showImgIndex].IsCustomTemplate = this.selectTempInfo.IsCustomTemplate
      this.showTemp = false
      this.$store.state.previewImg.showImgIndex = this.showImgIndex
      console.log("11111", this.previewInfo[this.showImgIndex].TemplateData.IsCustomTemplate)
      if (this.previewInfo[this.showImgIndex].TemplateData.IsCustomTemplate) {
        // 自定义模板
        this.createTemp = true,
          this.creatempText = "CreatTempText"
      } else {
        this.createTemp = false,
          this.creatempText = ""
      }
      console.log("??", this.previewInfo[this.showImgIndex])
    },
    selectTemp(par) {
      this.templateId = par.info.TemplateId
      this.selectTempInfo = par.info

      for (var i = 0; i < this.tempList.length; i++) {
        this.tempList[i].IsSelected = false
      }
      this.tempList[par.index].IsSelected = true
      this.num++
        console.log(this.tempList)


    },
    creatNewTemp() {
      console.log(123445, this.showImgIndex);
      // 保存 自定义模板数据
      this.$root.eventHub.$emit("SAVEZDYIMGINFO")
      this.$store.state.previewImg.showImgIndex = this.showImgIndex
      this.creatTempName = "CreatTemplate"

    },
    init() {
      this.naturalWidth = this.cropper.initialImageData.naturalWidth
      this.naturalHeight = this.cropper.initialImageData.naturalHeight
      if (this.naturalWidth >= this.naturalHeight) {
        this.imageStyle = 'H'
      } else {
        this.imageStyle = 'S'
      }
    },
    changeImgFun(par) {
      // 翻页
      // 上一页 index：-1  下一页 index：1
      console.log(par.index)
      console.log(this.showImgIndex)
      var num = this.showImgIndex

      // 保存前一页的数据
      if (this.previewInfo[this.showImgIndex].TemplateData.TemplateFieldInfo != null && this.previewInfo[this.showImgIndex].TemplateData.TemplateFieldInfo.length > 0) {
        if (this.previewInfo[this.showImgIndex].TemplateData.IsCustomTemplate) {
          //自定义模板
          // 发送事件
          // this.$root.eventHub.$emit("SAVEOK")
        } else {
          this.translateFun({
            type: 2,
            num: this.showImgIndex
          })
        }
      } else {

      }
      var that = this
      var t = setTimeout(function() {
        if (par.index == "-1" && that.showImgIndex == 0) {
          // 第一张
          that.showImgIndex == 0
          that.$layer.msg("没有上一页了")
          // return
        } else if (par.index == "1" && that.showImgIndex == that.previewInfo.length - 1) {
          // 最后一张
          that.showImgIndex == that.previewInfo.length - 1
          that.$layer.msg("没有下一页了")
          // return
        } else {
          that.showImgIndex = that.showImgIndex + Number(par.index)
        }

        // 每次替换图片要重新得到新的url
        if (that.previewInfo[that.showImgIndex].File) {
          that.url = that.$store.state.app.host + that.previewInfo[that.showImgIndex].File
          if (that.cropper) {
            that.cropper.replace(that.url);
          }
        }
        // console.log(that.previewInfo[that.showImgIndex],"？？？？？？？？？？？？？？？")
        if (that.previewInfo[that.showImgIndex].TemplateData.IsCustomTemplate) {
          that.createTemp = true
          that.creatempText = "CreatTempText"
          that.templateId = 0;
        } else {
          that.createTemp = false,
            that.creatempText = ""
          that.templateId = that.previewInfo[that.showImgIndex].TemplateId
        }
      }, 500)



    },
    saveInfoFun() {
      console.log(this.previewInfo)
      this.yingyeObj = {
        Tag: "",
        ValueCHS: "",
        ValueENG: ""
      }
      var oldInfo = JSON.parse(JSON.stringify(this.previewInfo))
      console.log(oldInfo);
      // 营业执照副本 保存 添加特殊teg值
      if (this.previewInfo[0].FileType == 6) {
        for (var i = 0; i < oldInfo[0].FileData.length; i++) {
          // 单位名称
          // 主申请人 澳大利亚 美国 新西兰
          if (oldInfo[0].FileData[i].Tag == "GZ00010101") {
            this.yingyeObj.Tag = "GZ00010203"
            this.yingyeObj.ValueCHS = oldInfo[0].FileData[i].ValueCHS
            this.yingyeObj.ValueENG = oldInfo[0].FileData[i].ValueENG
          }
          // 配偶 新西兰
          if (oldInfo[0].FileData[i].Tag == "GZP00010101") {
            this.yingyeObj.Tag = "GZP00010203"
            this.yingyeObj.ValueCHS = oldInfo[0].FileData[i].ValueCHS
            this.yingyeObj.ValueENG = oldInfo[0].FileData[i].ValueENG
          }
          // 单位地址
          // 澳大利亚 美国
          if (oldInfo[0].FileData[i].Tag == "GZ00010102") {
            this.yingyeObj2.Tag = "GZ00010205"
            this.yingyeObj2.ValueCHS = oldInfo[0].FileData[i].ValueCHS
            this.yingyeObj2.ValueENG = oldInfo[0].FileData[i].ValueENG
          }
        }
        oldInfo[0].FileData.push(this.yingyeObj)
        if (this.yingyeObj2.Tag) {
          oldInfo[0].FileData.push(this.yingyeObj2)
        }

      }

      var saveData = []

      for (var i = 0; i < this.previewInfo.length; i++) {
        var saveObj = {
          UserVisaId: this.$store.state.app.ivisaId,
          TemplateId: "",
          UserVisaFileId: "",
          CredentialsData: "",
          TemplateData: ""
        }
        saveObj.TemplateId = this.previewInfo[i].TemplateId
        saveObj.UserVisaFileId = this.previewInfo[i].UserVisaFileId
        // saveObj.CredentialsData = this.previewInfo[i].FileData
        saveObj.CredentialsData = oldInfo[i].FileData
        saveObj.TemplateData = this.previewInfo[i].TemplateData.TemplateFieldInfo
        saveObj.tag = this.previewInfo[i].Tag
        saveData.push(saveObj)
      }
      console.log("???", saveData)

      this.$http.post(this.$store.state.app.host + "api/Manage/SavePreViewData", {
          Data: saveData
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              // 关闭弹窗
              // this.$root.eventHub.$emit("CLOSENEWPREVIEW")
              // this.$layer.msg("保存成功")
            }
          },
          function(err) {
            console.log("出错了");
          }

        )
    },
    translateFun(par) {

      var translateInfoAry = []

      var index = par.num ? par.num : this.showImgIndex
      if (this.previewInfo[index].TemplateData.TemplateFieldInfo == null || this.previewInfo[index].TemplateData.TemplateFieldInfo.length == 0) {

        translateInfoAry = []
      } else {
        for (var j = 0; j < this.previewInfo[index].TemplateData.TemplateFieldInfo.length; j++) {
          var obj = {
            Tag: "",
            ValueCHS: "",
            ValueENG: ""
          }
          obj.Tag = this.previewInfo[index].TemplateData.TemplateFieldInfo[j].Tag
          obj.ValueENG = this.previewInfo[index].TemplateData.TemplateFieldInfo[j].ValueENG
          obj.ValueCHS = this.previewInfo[index].TemplateData.TemplateFieldInfo[j].ValueCHS
          translateInfoAry.push(obj)
        }
      }


      console.log(translateInfoAry)
      this.$http.post(this.$store.state.app.host + "api/Manage/TranslateTemplateFields",
          translateInfoAry, {
            headers: {
              Authorization: this.$store.state.app.token
            },
            timeout: this.$store.state.app.httpTime
          }
        )
        .then(
          function(res) {
            if (res.data.Code == 0) {
              console.log("Result", res.data.Result)
              var result = res.data.Result

              for (var j = 0; j < this.previewInfo[index].TemplateData.TemplateFieldInfo.length; j++) {
                for (var m = 0; m < result.length; m++) {
                  if (this.previewInfo[index].TemplateData.TemplateFieldInfo[j].Tag == result[m].Tag) {

                    this.previewInfo[index].TemplateData.TemplateFieldInfo[j].ValueCHS = result[m].ValueCHS
                    this.previewInfo[index].TemplateData.TemplateFieldInfo[j].ValueENG = result[m].ValueENG
                  }
                }
              }


              if (par.type == 2) {
                // 保存
                this.saveInfoFun()
              }
            }
          },
          function(err) {
            console.log("出错了");
          }
        )

    },
    translateFunTemp() {
      this.$root.eventHub.$emit("TRANSLATETEMP")
    },
    saveInfoFunTemp() {
      // console.log(123)
      this.$root.eventHub.$emit("SAVEOK")
    },
    focusInput(info, e) {
      console.log(info)
      var currYear = new Date().getFullYear();
      if (info.FieldType == 1) {
        // 日期
        var that = this
        $(e.target).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 50,
          dateFormat: "yyyy-mm-dd",
          dateOrder: "yyyymmdd",
          onSelect: function(event, inst) {
            info.ValueENG = event
            info.ValueCHS = event
          }
        });
      } else if (info.FieldType == 6) {
        //年月
        var that = this
        $(e.target).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 50,
          dateFormat: "yyyy-mm",
          dateOrder: "yyyymm",
          onSelect: function(event, inst) {
            info.ValueENG = event
            info.ValueCHS = event
          }
        });
      }
    }
  },
  computed: {
    image() {
      return this.$refs.image
    }
  },
  created() {
    // 获取模板信息
    // this.getFileTemplate()
    this.tempList = this.$store.state.visa.templateInfo
    this.showImgIndex = 0
    this.previewInfo = this.$store.state.visa.previewInfo

    console.log("预览信息", this.previewInfo, this.tempList)
    if (this.previewInfo[this.showImgIndex].TemplateData.IsCustomTemplate) {
      this.templateId = 0;
    } else {
      this.templateId = this.previewInfo[0].TemplateId
    }
    if (this.previewInfo[0].FileType == 6) {
      // 营业执照副本特殊处理
      for (var i = 0; i < this.previewInfo[0].FileData.length; i++) {
        // 新西兰 主申请人、配偶
        if (this.previewInfo[0].FileData[i] && this.previewInfo[0].FileData[i].Tag == "GZ00010203") {
          this.previewInfo[0].FileData.splice(i, 1)
        }
        if (this.previewInfo[0].FileData[i] && this.previewInfo[0].FileData[i].Tag == "GZP00010203") {
          this.previewInfo[0].FileData.splice(i, 1)
        }
        // 澳大利亚 美国
        if (this.previewInfo[0].FileData[i] && this.previewInfo[0].FileData[i].Tag == "GZ00010205") {
          this.previewInfo[0].FileData.splice(i, 1)
        }
      }
    }

  },
  mounted() {
    this.previewInfo = this.$store.state.visa.previewInfo

    // 第几张图
    this.$store.state.previewImg.showImgIndex = this.showImgIndex

    if (this.previewInfo[this.showImgIndex].TemplateData.IsCustomTemplate) {
      // 自定义模板
      this.createTemp = true,
        this.creatempText = "CreatTempText"
    } else {
      this.createTemp = false,
        this.creatempText = ""
    }

    window.onmousewheel = function() {
      // 禁止滚轮事件 避免弹窗后的页面滚动
      // return false
    };
    var that = this
    this.$root.eventHub.$on("CLOSENEWCREATE", function() {
      // 关闭创建模板窗口
      that.creatTempName = ""
    })
    this.$root.eventHub.$on("CLOSENEWTEMPTEXT", function() {
      that.creatempText = ""
      that.createTemp = false
    })

    if (this.previewInfo[0].File) {
      that.cropper = new Cropper(that.image, {
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
        },

      })
    }

  },
  components: {
    CreatTemplate,
    CreatTempText
  }
}
</script>
<style type="text/css" lang="scss" src="../css/previewENG2.scss"></style>
