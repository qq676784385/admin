<template>
<div class="previewEng">
  <div class="previewCont">
    <div class="title">
      <span>{{previewInfo[0].Name}}</span>
      <span class="cancelBtn" v-tap="{methods:cancel}">×</span>
    </div>
    <div class="middleCont">
      <div class="realImg">
        <div class="changeImg left_btn" v-tap="{methods:changeImgFun,index:'-1'}" v-if="previewInfo[0].FileType != 3&&previewInfo[0].FileType != 5">
          <img src="static/left.png">
        </div>
        <!-- 不是身份证 居住证 -->
        <div class="middleImg asd" v-if="previewInfo[0].FileType != 3&&previewInfo[0].FileType != 5">
          <img id="r_img" :src="$store.state.app.host+previewInfo[showImgIndex].File" ref='image' v-if="previewInfo[showImgIndex].File" style="opacity:0">
          <span v-if="!previewInfo[showImgIndex].File">无图片{{showImgIndex+1}}</span>
        </div>
        <!-- 身份证 居住证 -->
        <div class="middleImg ewq" v-if="previewInfo[0].FileType == 3||previewInfo[0].FileType == 5">
          <div class="m1">
            <img :src="$store.state.app.host+previewInfo[0].File" v-if="previewInfo[0].File" style="opacity:0" ref='image1'>
          </div>
          <div class="m1 " v-if="previewInfo[1]">
            <img :src="$store.state.app.host+previewInfo[1].File" v-if="previewInfo[1].File" style="opacity:0" ref='image2'>
          </div>
        </div>

        <div class="changeImg right_btn" v-tap="{methods:changeImgFun,index:'1'}" v-if="previewInfo[0].FileType != 3&&previewInfo[0].FileType != 5">
          <img src="static/right.png">
        </div>
        <div class="numIndex" v-if="previewInfo[0].FileType != 3&&previewInfo[0].FileType != 5">
          第{{showImgIndex+1}}页/共{{previewInfo.length}}页
        </div>
        <div class="numIndex" v-if="previewInfo[0].FileType == 3||previewInfo[0].FileType == 5">
          第{{showImgIndex+1}}页/共1页
        </div>
      </div>
      <!-- 字段遮罩层 -->
      <div class="bigMask" v-if="$root.get('isIvisa').indexOf('visa')>-1||$root.get('IsPrint') == 'true'">

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
              <img :src="previewInfo[showImgIndex].Thumbnail?$store.state.app.host + previewInfo[showImgIndex].Thumbnail:'static/demoTemplate.png'">
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

        <div class="allInfo " v-if="!createTemp">

          <div class="x_title">
            <div class="txt">
              中文：
            </div>
            <div class="txt">
              英文：
            </div>
          </div>
          <!-- 识别字段 -->
          <div class="shibie" v-for="info in previewInfo[showImgIndex].FileData" v-if="!previewInfo[showImgIndex].TemplateId">
            <div class="left_cont info_cont">
              <div class="name">{{info.Name}}</div>
              <div type="text" class="value" v-text='info.ValueCHS' v-if='previewInfo[showImgIndex].FileType == 3&&info.Tag =="JB0021"||info.Tag == "JB0022"||info.Tag == "JT000102"||info.Tag == "JT000101"||info.Tag == "JTXXL002"||info.Tag == "JTXXL003" ' :contenteditable="!previewInfo[showImgIndex].NameNotEnabled"
                @focus="focusInput(info,$event)" :tag="info.Tag"></div>
              <div type="text" v-text="info.ValueCHS" class="value" v-else @focus="focusInput(info,$event)" contenteditable="true" :tag="info.Tag"></div>
            </div>
            <div class="right_cont info_cont">
              <div class="name">{{info.Name.replace("中文","拼音")}}</div>
              <div type="text" name="" v-text="info.ValueENG" class="value" v-if='previewInfo[showImgIndex].FileType == 3&&info.Tag =="JB0021"||info.Tag == "JB0022"||info.Tag == "JT000102"||info.Tag == "JT000101"||info.Tag == "JTXXL002"||info.Tag == "JTXXL003" ' :contenteditable="!previewInfo[showImgIndex].NameNotEnabled"
                @focus="focusInput(info,$event)" :tag="info.Tag"></div>
              <div type="text" name="" v-text="info.ValueENG" class="value" v-else @focus="focusInput(info,$event)" contenteditable="true" :tag="info.Tag"></div>
            </div>
          </div>
          <!-- 身份证的第二面信息 -->
          <div v-if="previewInfo[1]&&!previewInfo[0].TemplateId">
            <div class="shibie" v-for="info in previewInfo[1].FileData" v-if="!previewInfo[1].TemplateId">
              <div class="left_cont info_cont">
                <div class="name">{{info.Name}}</div>
                <div type="text" class="value" v-text='info.ValueCHS' v-if='previewInfo[1].FileType == 3&&info.Tag =="JB0021"||info.Tag == "JB0022"||info.Tag == "JT000102"||info.Tag == "JT000101"||info.Tag == "JTXXL002"||info.Tag == "JTXXL003" ' :contenteditable="!previewInfo[1].NameNotEnabled"
                  @focus="focusInput(info,$event)" :tag="info.Tag"></div>
                <div type="text" v-text="info.ValueCHS" class="value" v-else @focus="focusInput(info,$event)" contenteditable="true" :tag="info.Tag"></div>
              </div>
              <div class="right_cont info_cont">
                <div class="name">{{info.Name.replace("中文","拼音")}}</div>
                <div type="text" name="" v-text="info.ValueENG" class="value" v-if='previewInfo[1].FileType == 3&&info.Tag =="JB0021"||info.Tag == "JB0022"||info.Tag == "JT000102"||info.Tag == "JT000101"||info.Tag == "JTXXL002"||info.Tag == "JTXXL003" ' :contenteditable="!previewInfo[1].NameNotEnabled"
                  @focus="focusInput(info,$event)" :tag="info.Tag"></div>
                <div type="text" name="" v-text="info.ValueENG" class="value" v-else @focus="focusInput(info,$event)" contenteditable="true" :tag="info.Tag"></div>
              </div>
            </div>

          </div>


          <!-- 模板字段 -->
          <!-- <div id="muban"> -->
            <div v-for="info in previewInfo[showImgIndex].TemplateData.TemplateFieldInfo" v-if="previewInfo[showImgIndex].TemplateId">
              <div class="left_cont info_cont">
                <div class="name">{{info.Name}}</div>
                <!-- <input type="text" name="" v-model="info.ValueCHS" class="value" @focus="focusInput(info,$event)" v-if="info.FieldType != 8" :disabled="info.IsDisabled"> -->
                <div class="value" @focus="focusInput(info,$event)" v-if="info.FieldType != 8" :contenteditable="!info.IsDisabled" :tag="info.Tag">{{info.ValueCHS}}</div>
                <select class="value" v-if="info.FieldType == 8" v-model="info.ValueCHS" :tag="info.Tag" @change="changeSelect(info,$event.target.selectedIndex)">
                  <option v-for="opt in info.Options">{{opt.Value}}</option>
                </select>
              </div>
              <div class="right_cont info_cont">
                <div class="name">{{info.Name}}</div>
                <!-- <input type="text" v-model="info.ValueENG" class="value" @focus="focusInput(info,$event)" v-if="info.FieldType != 8" :disabled="info.IsDisabled"> -->
                <div class="value" v-text="info.ValueENG" @focus="focusInput(info,$event)" v-if="info.FieldType != 8" :contenteditable="!info.IsDisabled" :tag="info.Tag"></div>
                <select class="value" v-if="info.FieldType == 8" v-model="info.ValueENG" :tag="info.Tag" @change="changeSelect(info,$event.target.selectedIndex)">
                  <option v-for="opt in info.Options">{{opt.ValueENG}}</option>
                </select>
              </div>
            </div>
          <!-- </div> -->

        </div>

        <!-- 制作模板 -->
        <div class="allInfo maskBg" v-if="createTemp">

          <component :is="creatempText"></component>
        </div>
        <!-- end -->
      </div>
    </div>
    <div v-if="$root.get('isIvisa').indexOf('task')>-1&&$root.get('IsPrint') == 'false'">
      <div class="footBtn" v-if="!previewInfo[showImgIndex].TemplateData.IsCustomTemplate">
        <div class="blueBg" v-tap="{methods:translateFun,type:1}" v-if="previewInfo[showImgIndex].TemplateId">翻译</div>
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
  </div>
  <!-- 选择模板弹窗 -->
  <div class="allTemp previewCont" v-if="showTemp">
    <div class="header title">
      <span>选择模板</span>
      <span class="cancelBtn" v-tap="{methods:hideTemp}">×</span>
    </div>
    <div class="tempList">
      <!-- <div class="oneTemp" v-for="(temp,index) in tempList" v-tap="{methods:selectTemp,info:temp,index:index}">
        <img class="onetempImg" :src="temp.Url?$store.state.app.host+temp.Url:'static/demoTemplate.png'">
        <div>{{temp.Name}}</div>
        <div class="mask" v-if="templateId!=-1&&temp.TemplateId == templateId" v-tap="{methods:selectnone}">
          <img src="static/selected.png">
        </div>
      </div> -->
      <div class="tempLeft">
        <div class="templageImg">
          <img :src="$store.state.app.host + imgLageUrl" v-if="imgLageUrl">
        </div>
      </div>
      <div class="tempright">
        <div class="oneTemp" v-for="(temp,index) in tempList" v-tap="{methods:selectTemp,info:temp,index:index}">
          <img class="onetempImg" :src="temp.Thumbnail?$store.state.app.host+temp.Thumbnail:'static/demoTemplate.png'">
          <div>{{temp.Name}}</div>
          <div class="mask" v-if="templateId!=-1&&temp.TemplateId == templateId" v-tap="{methods:selectnone}">
            <img src="static/selected.png">
          </div>
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
      yingyeObj2: {},
      imgLageUrl: "", //模板的放大图 路径

      oldTempData:[]//翻译需要的旧数据
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

              this.oldTempData =[]
              for(var i = 0;i<res.data.Result.length;i++){
                this.oldTempData.push(JSON.parse(JSON.stringify(res.data.Result[i].TemplateData.TemplateFieldInfo)))
              }
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    getFileTemplate() {
      // 获取模板信息
      // console.log("获取模板信息", this.previewInfo[this.showImgIndex].Tag)
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
            // console.log("出错了")
          }
        )
    },
    cancel() {
      this.$root.eventHub.$emit("CLOSENEWPREVIEW")
    },
    addTemp() {
      var that = this

      // 全部签证信息 打印页面
      //不能进行修改
      if (this.$root.get('isIvisa').indexOf('visa') > -1 || this.$root.get('IsPrint') == "true") {
        // alert(123)
        return
      }

      // console.log("?????", this.previewInfo[this.showImgIndex].TemplateData.IsCustomTemplate)
      // 每次重新选择模板都要先翻译保存
      if (this.previewInfo[this.showImgIndex].TemplateData.IsCustomTemplate == true) {
        // 自定义模板
        this.$root.eventHub.$emit("SAVEZDYIMGINFO",{goCreatTemp:"false"})
      } else {
        this.translateFun({
          type: 2
        })
      }


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
          that.imgLageUrl = that.previewInfo[that.showImgIndex].TemplateData.Url
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
      if ($(".allInfo").children().eq(1).children().length > 0) {
        var mubanDom = $(".allInfo").children()
        for (var i = 1; i < mubanDom.length; i++) {
          // mubanDom[i]
          if ($(mubanDom[i]).children().children().eq(1).html().indexOf("<option>") > -1) {
            // select
            $(mubanDom[i]).children().children().eq(1).val("")
            $(mubanDom[i]).children().children().eq(3).val("")
          } else {
            $(mubanDom[i]).children().children().eq(1).text("")
            $(mubanDom[i]).children().children().eq(3).text("")
          }
        }
      }


      // console.log("保存所选模板", this.selectTempInfo, this.showImgIndex, this.templateId);
      // if(this.templateId == -1){
      //   this.previewInfo[this.showImgIndex].TemplateId = -1
      //   this.previewInfo[this.showImgIndex].TemplateData = []
      //   this.previewInfo[this.showImgIndex].Thumbnail = null
      //   this.previewInfo[this.showImgIndex].Name = null
      //   this.createTemp = false
      //   this.creatempText = ""
      // }

      this.templateId = this.selectTempInfo.TemplateId
      this.previewInfo[this.showImgIndex].TemplateId = this.selectTempInfo.TemplateId
      this.previewInfo[this.showImgIndex].TemplateData = this.selectTempInfo
      this.previewInfo[this.showImgIndex].Thumbnail = this.selectTempInfo.Thumbnail
      this.showTemp = false
      this.$store.state.previewImg.showImgIndex = this.showImgIndex
      this.$store.state.visa.previewInfo[this.showImgIndex] = this.previewInfo[this.showImgIndex]
      this.oldTempData[this.showImgIndex] = []
      this.oldTempData[this.showImgIndex] = JSON.parse(JSON.stringify(this.selectTempInfo.TemplateFieldInfo))
      if (this.previewInfo[this.showImgIndex].TemplateData.IsCustomTemplate) {
        // 自定义模板
        this.createTemp = true
        this.creatempText = "CreatTempText"
      } else {
        this.createTemp = false
        this.creatempText = ""
      }
      // console.log("??", this.previewInfo[this.showImgIndex])
      var that = this
      setTimeout(function() {
        that.dateDestory()
        if ($(".allInfo").children().eq(1).children().length > 0) {

          var mubanDom = $(".allInfo").children()
          // console.log(mubanDom);
          for (var i = 0; i < that.previewInfo[that.showImgIndex].TemplateData.TemplateFieldInfo.length; i++) {
            for (var j = 1; j < mubanDom.length; j++) {
              if ($(mubanDom[j]).children().children().eq(1).attr("tag") == that.previewInfo[that.showImgIndex].TemplateData.TemplateFieldInfo[i].Tag) {
                if (that.previewInfo[that.showImgIndex].TemplateData.TemplateFieldInfo[i].FieldType == 8) {
                  // select
                  $(mubanDom[j]).children().children().eq(1).val(that.previewInfo[that.showImgIndex].TemplateData.TemplateFieldInfo[i].ValueCHS)
                  $(mubanDom[j]).children().children().eq(3).val(that.previewInfo[that.showImgIndex].TemplateData.TemplateFieldInfo[i].ValueENG)
                } else {
                  $(mubanDom[j]).children().children().eq(1).text(that.previewInfo[that.showImgIndex].TemplateData.TemplateFieldInfo[i].ValueCHS)
                  $(mubanDom[j]).children().children().eq(3).text(that.previewInfo[that.showImgIndex].TemplateData.TemplateFieldInfo[i].ValueENG)

                  if($(mubanDom[j]).children().children().eq(1).attr("id")){
                    $(mubanDom[j]).children().children().eq(1).mobiscroll('getInst').destroy()
                    $(mubanDom[j]).children().children().eq(1).attr("id","")
                  }
                  if($(mubanDom[j]).children().children().eq(3).attr("id")){
                    $(mubanDom[j]).children().children().eq(3).mobiscroll('getInst').destroy()
                    $(mubanDom[j]).children().children().eq(3).attr("id","")

                  }
                }
              }
            }
          }

        }
      }, 20)


      // return

      // $(shibie[i]).children().children().eq(1)
    },
    selectTemp(par) {
      this.templateId = par.info.TemplateId
      this.selectTempInfo = par.info
      this.imgLageUrl = par.info.Url
      this.cropper.replace(this.imgLageUrl);

      for (var i = 0; i < this.tempList.length; i++) {
        this.tempList[i].IsSelected = false
      }
      this.tempList[par.index].IsSelected = true
      this.num++

    },
    creatNewTemp() {
      // 保存 自定义模板数据
      // 去制作模板  goCreatTemp:"true"
      this.$root.eventHub.$emit("SAVEZDYIMGINFO",{goCreatTemp:"true"})
      this.$store.state.previewImg.showImgIndex = this.showImgIndex
      // this.creatTempName = "CreatTemplate"
      var that = this
      var t1 = setTimeout(function(){
          that.creatTempName = "CreatTemplate"
      },100)

    },
    init() {
      if (!this.cropper.initialImageData) {
        return
      }
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
      // console.log(par.index)
      // console.log(this.showImgIndex)
      var num = this.showImgIndex

      // 保存前一页的数据
      if(this.$root.get('isIvisa').indexOf('task')>-1&&this.$root.get('IsPrint') == 'false'){
        if (this.previewInfo[this.showImgIndex].TemplateData.IsCustomTemplate) {
          //自定义模板
          // 发送事件
          this.$store.state.previewImg.showImgIndex = this.showImgIndex
          this.$root.eventHub.$emit("SAVEOK")
        } else {
          this.translateFun({
            type: 2,
            num: this.showImgIndex
          })
        }
      }


      var that = this
      var t = setTimeout(function() {

        that.showImgIndex = that.showImgIndex + Number(par.index)

        if (par.index == "-1" && that.showImgIndex < 0) {
          // 第一张
          that.showImgIndex = 0
          that.$layer.msg("没有上一页了")

        } else if (par.index == "1" && that.showImgIndex > that.previewInfo.length - 1) {
          // 最后一张
          that.showImgIndex = that.previewInfo.length - 1
          that.$layer.msg("没有下一页了")

        }
        // console.log("showImgIndex", that.showImgIndex)

        that.$store.state.previewImg.showImgIndex = that.showImgIndex

        // 每次替换图片要重新得到新的url
        if (that.previewInfo[that.showImgIndex] && that.previewInfo[that.showImgIndex].File) {
          that.url = that.$store.state.app.host + that.previewInfo[that.showImgIndex].File
          if (that.cropper) {
            that.cropper.replace(that.url);
          }
        }
        //
        if (that.previewInfo[that.showImgIndex] && that.previewInfo[that.showImgIndex].TemplateData.IsCustomTemplate) {
          that.createTemp = true
          that.creatempText = "CreatTempText"
          that.templateId = 0;
          that.$root.eventHub.$emit("CHNAGETEMPTEXT")
        } else {
          that.createTemp = false,
            that.creatempText = ""
          that.templateId = that.previewInfo[that.showImgIndex].TemplateId
        }
        var _that = that
        var t2 = setTimeout(function() {
          _that.dateDestory()
          // console.log("翻页",$(".allInfo").children());
          if ($(".allInfo").children().eq(1).children().length > 0) {
            var mubanDom = $(".allInfo").children()
            for (var i = 0; i < _that.previewInfo[_that.showImgIndex].TemplateData.TemplateFieldInfo.length; i++) {
              for (var j = 1; j < mubanDom.length; j++) {
                if ($(mubanDom[j]).children().children().eq(1).attr("tag") == _that.previewInfo[_that.showImgIndex].TemplateData.TemplateFieldInfo[i].Tag) {
                  if (_that.previewInfo[_that.showImgIndex].TemplateData.TemplateFieldInfo[i].FieldType == 8) {
                    // select
                    $(mubanDom[j]).children().children().eq(1).val(_that.previewInfo[_that.showImgIndex].TemplateData.TemplateFieldInfo[i].ValueCHS)
                    $(mubanDom[j]).children().children().eq(3).val(_that.previewInfo[_that.showImgIndex].TemplateData.TemplateFieldInfo[i].ValueENG)
                  } else {
                    $(mubanDom[j]).children().children().eq(1).text(_that.previewInfo[_that.showImgIndex].TemplateData.TemplateFieldInfo[i].ValueCHS)
                    $(mubanDom[j]).children().children().eq(3).text(_that.previewInfo[_that.showImgIndex].TemplateData.TemplateFieldInfo[i].ValueENG)
                  }
                }
                if($(mubanDom[j]).children().children().eq(1).attr("id")){
                  $(mubanDom[j]).children().children().eq(1).mobiscroll('getInst').destroy()
                  $(mubanDom[j]).children().children().eq(1).attr("id","")
                }
                if($(mubanDom[j]).children().children().eq(3).attr("id")){
                  $(mubanDom[j]).children().children().eq(3).mobiscroll('getInst').destroy()
                  $(mubanDom[j]).children().children().eq(1).attr("id","")

                }
              }
            }
          }

        }, 20)

      }, 300)



    },
    saveInfoFun() {
      this.yingyeObj = {
        Tag: "",
        ValueCHS: "",
        ValueENG: ""
      }
      // 识别的信息
      var oldInfo = JSON.parse(JSON.stringify(this.previewInfo))
      // console.log("old", oldInfo);
      if ($(".shibie")) {
        var shibie = $(".shibie")
        if(oldInfo[0].FileType == 3){
          for (var i = 0; i < shibie.length; i++) {
            for(var j = 0;j<oldInfo.length;j++){
              for (var m = 0; m < oldInfo[j].FileData.length; m++) {
                if(oldInfo[j].FileData[m].Tag == $(shibie[i]).children().children().eq(1).attr("tag")){
                  oldInfo[j].FileData[m].ValueCHS = $(shibie[i]).children().children().eq(1).text()
                  oldInfo[j].FileData[m].ValueENG = $(shibie[i]).children().children().eq(3).text()
                }
              }
            }
          }
        }else{
          for(var i = 0; i < shibie.length; i++){
            oldInfo[this.showImgIndex].FileData[i].ValueCHS = $(shibie[i]).children().children().eq(1).text()
            oldInfo[this.showImgIndex].FileData[i].ValueENG = $(shibie[i]).children().children().eq(3).text()
          }
        }
      }

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
        // saveObj.IsCustomTemplate = this.previewInfo[i].TemplateData.IsCustomTemplate
        saveData.push(saveObj)
      }


      // 身份证 取第一页所选的模板 因为现在身份证正反面是分开的 要取一样的值  所以取了第一页的模板值
      // if (this.previewInfo[0].FileType == 3) {
      //   saveData[1].TemplateId = this.previewInfo[0].TemplateId
      //   saveData[1].TemplateData = this.previewInfo[0].TemplateData.TemplateFieldInfo
      // }

      var middleAry = []

      if(this.previewInfo[0].FileType == 3){
        // 身份证
        for(var i = 0;i<saveData.length;i++){
          for (var j = 0; j < saveData[i].CredentialsData.length; j++) {
            if(saveData[i].CredentialsData[j].Tag == "JB000605"){
              if(saveData[i].CredentialsData[j].ValueCHS == "长期"){
                saveData[i].CredentialsData[j].ValueENG = "long"
              }
            }
          }

        }
        middleAry.push(saveData[0])
        middleAry.push(saveData[1])
      }else {
        middleAry.push(saveData[this.showImgIndex])
      }
      // console.log(middleAry)
      // return

      this.$http.post(this.$store.state.app.host + "api/Manage/SavePreViewData", {
          Data: middleAry
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
              this.$layer.msg("保存成功")
            } else {
              this.$layer.msg("保存错误")
            }
          },
          function(err) {
            // console.log("出错了");
          }

        )
    },
    translateFun(par) {


      var translateInfoAry = []

      var index = par.num ? par.num : this.showImgIndex
      // console.log("????????",this.previewInfo[index]);
      // return
      if (this.previewInfo[index].TemplateData.TemplateFieldInfo == null || this.previewInfo[index].TemplateData.TemplateFieldInfo.length == 0) {
        translateInfoAry = []
      } else {


        var child = $(".allInfo").children()

        for (var i = 1; i < child.length; i++) {

          var obj = {
            Tag: "",
            ValueCHS: "",
            ValueENG: ""
          }
          obj.Tag = $(child[i]).children().children().eq(1).attr("tag")
          // console.log($(child[i]).children().children().eq(1),$(child[i]).children().children().eq(1).html());
          if ($(child[i]).children().children().eq(1).html().indexOf("<option>") > -1) {
            // select
            // console.log($(child[i]).children().children().eq(1).val())
            obj.ValueCHS = $(child[i]).children().children().eq(1).val()
            obj.ValueENG = $(child[i]).children().children().eq(3).val()
          } else {

            obj.ValueCHS = $(child[i]).children().children().eq(1).text()
            obj.ValueENG = $(child[i]).children().children().eq(3).text()
            // if($(child[i]).children().children().eq(3))
          }
          translateInfoAry.push(obj)
        }

      }
      // console.log("????",this.oldTempData[index]);
      // return

      this.$http.post(this.$store.state.app.host + "api/Manage/TranslateTemplateFields", {
          TemplateId: this.previewInfo[index].TemplateData.TemplateId,
          OldList:this.oldTempData[index],
          NewList: translateInfoAry
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.oldTempData[index] = []
              this.oldTempData[index] = JSON.parse(JSON.stringify(res.data.Result))
              // console.log("Result", res.data.Result)
              // console.log($(".allInfo").children());
              var child = $(".allInfo").children()
              // for (var i = 0; i < child.length; i++) {
              //   console.log($(child[i]).children().children().eq(1).text(""));
              // }
              // return
              var result = res.data.Result
              if (this.previewInfo[index].TemplateData.TemplateFieldInfo) {
                for (var j = 0; j < this.previewInfo[index].TemplateData.TemplateFieldInfo.length; j++) {
                  for (var m = 0; m < result.length; m++) {
                    if (this.previewInfo[index].TemplateData.TemplateFieldInfo[j].Tag == result[m].Tag) {

                      this.previewInfo[index].TemplateData.TemplateFieldInfo[j].ValueCHS = result[m].ValueCHS
                      this.previewInfo[index].TemplateData.TemplateFieldInfo[j].ValueENG = result[m].ValueENG
                    }
                  }
                }
              }
              for (var i = 0; i < child.length; i++) {
                for (var j = 0; j < this.previewInfo[index].TemplateData.TemplateFieldInfo.length; j++) {
                  if (this.previewInfo[index].TemplateData.TemplateFieldInfo[j].Tag == $(child[i]).children().children().eq(1).attr("tag")) {
                    var ValueCHS = this.previewInfo[index].TemplateData.TemplateFieldInfo[j].ValueCHS
                    var ValueENG = this.previewInfo[index].TemplateData.TemplateFieldInfo[j].ValueENG
                    if ($(child[i]).children().children().eq(1).html().indexOf("<option>") > -1) {
                      $(child[i]).children().children().eq(1).val(ValueCHS)
                      $(child[i]).children().children().eq(3).val(ValueENG)
                    } else {
                      $(child[i]).children().children().eq(1).text(ValueCHS)
                      $(child[i]).children().children().eq(3).text(ValueENG)
                    }

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
      // console.log(info, $(e.target).parent().parent().children().children())
      var currYear = new Date().getFullYear();
      if (info.FieldType == 1) {
        // 日期
        var that = this
        $(e.target).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 200,
          dateFormat: "yyyy-mm-dd",
          dateOrder: "yyyymmdd",
          onSelect: function(event, inst) {
            // info.ValueENG = event
            // info.ValueCHS = event
            $(e.target).parent().parent().children().children().eq(1).text(event)
            $(e.target).parent().parent().children().children().eq(3).text(event)
          }
        });
      } else if (info.FieldType == 6) {
        //年月
        var that = this
        $(e.target).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 200,
          dateFormat: "yyyy-mm",
          dateOrder: "yyyymm",
          onSelect: function(event, inst) {
            // info.ValueENG = event
            // info.ValueCHS = event
            $(e.target).parent().parent().children().children().eq(1).text(event)
            $(e.target).parent().parent().children().children().eq(3).text(event)
          }
        });
      }
    },
    selectnone(par) {
      // this.templateId = -1
      // $(par.event.currentTarget).css("display","none")
      // this.selectTempInfo.IsCustomTemplate = false
      // this.selectTempInfo.IsSelected = true
      // this.selectTempInfo.Name = ""
      //
      // this.selectTempInfo = []
      // console.log(this.templateId,par.event.currentTarget);
    },
    changeSelect(info,selectIndex){
      // console.log(info,selectIndex);
      info.ValueCHS = info.Options[selectIndex].Value
      info.ValueENG = info.Options[selectIndex].ValueENG
    },
    dateDestory(){
      /*var allInfo = $(".allInfo").children()
      if ($(".allInfo").children().eq(1).children().length > 0) {
        var mubanDom = $(".allInfo").children()
        for (var i = 1; i < mubanDom.length; i++) {
          console.log("dateDestory",$(mubanDom[i]).children().children().eq(1),$(mubanDom[i]).children().children().eq(3));
          if($(mubanDom[i])){
            $(mubanDom[i]).children().children().eq(1).mobiscroll('getInst').destroy()
            $(mubanDom[i]).children().children().eq(3).mobiscroll('getInst').destroy()
          }
        }
      }*/
    }
    // mobiscroll('getInst').destroy()
  },
  computed: {
    image() {
      return this.$refs.image
    },
    image1() {
      return this.$refs.image1
    },
    image2() {
      return this.$refs.image2
    }
  },
  created() {

    this.preview()
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
    for (var i = 0; i < this.previewInfo.length; i++) {
      for(var j = 0; j < this.previewInfo[i].FileData.length; j++){
        if(this.previewInfo[i].FileData[j].Tag == "JB000605"&&this.previewInfo[i].FileData[j].ValueCHS == "长期"){
          this.previewInfo[i].FileData[j].ValueENG = "long"
        }
      }
    }

    // 第几张图
    this.$store.state.previewImg.showImgIndex = this.showImgIndex
    // console.log("保存所mounted选模板", this.selectTempInfo, this.showImgIndex, this.templateId);
    this.selectTempInfo = this.previewInfo[this.showImgIndex].TemplateData
    this.selectTempInfo.Thumbnail = this.previewInfo[this.showImgIndex].Thumbnail
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
      if (that.image) {
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

      if (that.image1) {
        that.cropper = new Cropper(that.image1, {
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

      if (that.image2) {
        that.cropper = new Cropper(that.image2, {
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

    }
    // 如果是全部签证信息模块或者是打印页面 内容不可以修改
    if (this.$root.get("isIvisa").indexOf("visa") > -1 || this.$root.get("IsPrint") == "true") {
      $("input").each(function() {
        $(this).attr("readonly", "readonly")
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
