<template>
  <div class="certificate">
    <div class="userInfo">
      <div class="line">
        <label>受理单号：</label>
        <span class="whiteBg">{{certificateInfo.OrderNumber}}</span>
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
      <div class="line" v-if='haveMarriedCountry.indexOf(certificateInfo.Country)<0'>
        <label>出行目的：</label>
        <!-- <span>{{visaType[certificateInfo.VisaType]}}</span> -->
        <select class="" v-model = 'certificateInfo.VisaType'>
            <option value="1">旅游</option>
            <option value="4">商务</option>
            <option value="5">探亲</option>
        </select>
      </div>
      <br v-if='haveMarriedCountry.indexOf(certificateInfo.Country)<0'>
      <div class="line">
        <label>职业：</label>
        <select v-model='certificateInfo.Identity' v-if="certificateInfo.Country=='法国'||certificateInfo.Country=='奥地利'||certificateInfo.Country=='葡萄牙'||certificateInfo.Country=='意大利'||certificateInfo.Country=='美国'||certificateInfo.Country=='英国'">
          <option value='1'>自雇</option>
          <option value='6'>受雇</option>
          <option value='5' v-if='certificateInfo.VisaType!=4'>自由职业</option>
          <option value='4' v-if='certificateInfo.VisaType!=4'>退休</option>
          <option value='3'>学生（18岁及以上）</option>
          <option value='2'>学生（18岁以下）</option>
          <option value='7' v-if='certificateInfo.VisaType!=4'>学龄前儿童</option>
        </select>
        <select v-model='certificateInfo.Identity' v-else>
          <option value='1'>自雇</option>
          <option value='6'>受雇</option>
          <option value='5' v-if='certificateInfo.VisaType!=4'>自由职业</option>
          <option value='4' v-if='certificateInfo.VisaType!=4'>退休</option>
          <option value='3' v-if='certificateInfo.VisaType!=4'>学生（18岁及以上）</option>
          <option value='2' v-if='certificateInfo.VisaType!=4'>学生（18岁以下）</option>
          <option value='7' v-if='certificateInfo.VisaType!=4'>学龄前儿童</option>
        </select>
      </div>
      <div class="line" v-if='haveMarriedCountry.indexOf(certificateInfo.Country)<0'>
        <label>婚姻状况：</label>
        <select v-model='certificateInfo.Married'>
          <option value="0">未婚</option>
          <option value="1">已婚</option>
          <option value="2">离异</option>
          <option value="3">丧偶</option>
        </select>
      </div>
      <br v-if='certificateInfo.Country == "美国EVUS"'>
      <div class="line" v-if='certificateInfo.Country == "美国EVUS"'>
        <label>您的有效美国签证页是否在您当前使用的护照内：</label>
        <select v-model='certificateInfo.PassportIncludeVisa'>
          <option value='true'>是</option>
          <option value='false'>否</option>
        </select>
      </div>
      <div class="line">
        <div class="saveInfo" v-tap='{methods:saveInfoFun}'>保存</div>
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
              <th class="delPadding">删除</th>
            </tr>
            <tr v-for='(item,index) in certificateInfo.CredentialsFileList'>
              <td class="numberBg numberColor">{{index+1}}</td>
              <td>
                <span>{{item.FileName}}</span>
              </td>
              <td  :class="item.HaveContent&&item.UploadFileName.length>0?'link':''" v-tap='{methods:preview,info:item}'>
                浏览
              </td>
              <td>
              <a  :class="item.HaveContent&&item.UploadFileName?'link':'nothingA'" v-tap='{methods:downLoadFun,info:item}'>下载</a>

              </td>
              <td class="numberColor link uploadInput" @click='upload(item,1)'>
                点击上传
              </td>
              <td>
                <span v-if='!item.HaveContent'>---</span>
                <span v-else v-html='item.UploadFileName||"---"'></span>
              </td>
              <td class="redColor delPadding" v-tap='{methods:delectFun,info:item}'>删除</td>
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
              <th class="delPadding">删除</th>
            </tr>
            <tr v-for='(item,index) in certificateInfo.PaperFileList'>
              <td class="numberBg numberColor">{{index+1}}</td>
              <td>
                <span>{{item.FileName}}</span>
              </td>
              <td :class="!item.HaveContent?'':'numberColor link'" v-tap='{methods:preview,info:item}'>
                浏览
              </td>
              <td>
                <!-- <a  class="numberColor link" :href="$store.state.app.host+item.File" :download="$store.state.app.host+item.File" v-if='item.HaveContent'>下载</a>
                <span :class="!item.HaveContent?'':'link'" v-if='!item.HaveContent'>下载</span> -->
                <a  :class="item.HaveContent&&item.UploadFileName?'link':'nothingA'" target="_blank" v-tap='{methods:downLoadFun,info:item}'>下载</a>
                <!-- <a  :href="'http://dev.ivisa.ydynasty.com/devtest/api/Manage/MergeJPEGToPDF?userVisaId='+$store.state.app.ivisaId+'&fileType='+item.FileType+'&download=true'" class="numberColor link"  v-if='item.HaveContent&&item.FileType ==29'>
                下载2
              </a> -->
              </td>
              <td class="numberColor link uploadInput" @click='upload(item,3)'>
                点击上传
              </td>
              <td>
                <span v-html='item.UploadFileName||"---"'></span>
              </td>
              <td class="redColor delPadding" v-tap='{methods:delectFun,info:item}'>删除</td>
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
import DelectAll from './DelectAll.vue'
import Identification from './Identification.vue'
// import PreviewENG from './PreviewENG.vue'
import PreviewENG2 from './PreviewENG2.vue'


export default {
  data() {
    return {
      certificateInfo: {},
      uploadFile: {
        accepts: { //允许的上传类型
          type: String,
          default: 'image/jpeg,image/jpg,image/png,image/gif'
        },
      },
      career: ["", "在职", "学生，小于18岁", "学生，大于等于18岁", "退休", "失业"],
      visaType: ["", "旅游", "工作", "学生", "商务", "探亲"],
      addInfo: {},
      IdCardIndex: "",
      addNum: 1,
      newPreview:"",
      haveMarriedCountry:["美国EVUS"],//弹窗不显示婚姻状态的国家
      mubanCountry:["英国","比利时","法国","瑞典","捷克","西班牙","挪威","瑞士","德国","奥地利","希腊","葡萄牙","意大利"],//有模板的国家
    }
  },
  methods: {
    upload(item,type) {
      this.$store.state.visa.uploadInfo = item
      this.$store.state.visa.progressType = type
      this.idcardFrame = this.$layer.iframe({
        content: {
          content: Identification,
          parent: this,
          data: []
        },
        title: item.FileName
      })
    },
    preview(par){

      this.$store.state.visa.fileInfo = par.info
      var passport = null
      // if(this.$store.state.visa.uploadInfo.Passport){
      //   passport = this.$store.state.visa.uploadInfo.Passport
      // }
      if (par.info.HaveContent&&par.info.UploadFileName.length>0){
        this.$http.get(this.$store.state.app.host + 'api/Manage/PreView',{
          params:{
            userVisaId:this.$store.state.app.ivisaId,
            visaFileId:this.$store.state.visa.fileInfo.VisaFileId,
            passport:passport
          },headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
        .then(
          function(res){
            if(res.data.Code == 0){
              this.$store.state.visa.previewInfo = res.data.Result

              if(this.mubanCountry.indexOf(this.$root.get("country"))>-1){
                this.$root.set("IsPrint","false")
                this.getFileTemplate(this.$store.state.visa.fileInfo)
                // this.newPreview = "PreviewENG2"
                // return

              }else{
                this.previewFrame = this.$layer.iframe({
                  content: {
                    content: Preview,
                    parent: this,
                    data: []
                  },
                  title: par.info.FileName
                })
              }


            }
          },
          function(err){
              this.$layer.msg("网络连接超时")
          }
        )
      }else{

      }
    },
    getFileTemplate(info){
      // 获取模板信息
      this.$http.get(this.$store.state.app.host + "api/Manage/GetFileTemplate",{
        params:{
          userVisaId:this.$store.state.app.ivisaId,
          visaFileId:info.VisaFileId,
          tag:info.Tag
        },headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime
      })
      .then(
          function(res){
            if(res.data.Code == 0){
              this.$store.state.visa.templateInfo = res.data.Result

              this.newPreview = "PreviewENG2"

            }else{
              this.$layer.msg(res.data.Message)
            }
          },
          function(err){
            console.log("出错了")

          }
      )
    },
    getUserInfo() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo', { params: { userVisaId: this.$store.state.app.ivisaId, isAllFiles: true }, headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime})
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.certificateInfo = res.data.Result

              for(var i = 0;i<this.certificateInfo.PaperFileList.length;i++){
                if(this.certificateInfo.PaperFileList[i]&&this.certificateInfo.PaperFileList[i].FileType == 8){
                  this.certificateInfo.PaperFileList.splice(i,1)
                }
                if(this.certificateInfo.PaperFileList[i]&&this.certificateInfo.PaperFileList[i].FileType == 28){
                  this.certificateInfo.PaperFileList.splice(i,1)
                }
                if(this.certificateInfo.PaperFileList[i]&&this.certificateInfo.PaperFileList[i].FileType == 42){
                  this.certificateInfo.PaperFileList.splice(i,1)
                }
              }
              this.$store.state.visa.certificateInfo = this.certificateInfo
            }
          },
          function(err){
              this.$layer.msg("网络连接超时")
          }
        )
    },
    delectFun(par) {
      this.$store.state.visa.VisaFileId = par.info.VisaFileId
      this.$store.state.visa.delectPassport = ""
      if(par.info.HaveContent){
        this.delectFrame = this.$layer.iframe({
          content: {
            content: DelectAll,
            parent: this,
            data: []
          },
          title: "删除"
        })
      }else{
        this.$layer.msg("请先上传文件")
      }
    },
    saveInfoFun(){
      this.$http.post(this.$store.state.app.host + "api/Manage/ModifyVisaInfo",{
          Career:this.certificateInfo.Identity,
          VisaType: this.certificateInfo.VisaType,
          Married:this.certificateInfo.Married,
          UserVisaId:this.$store.state.app.ivisaId,
          PassportIncludeVisa:this.certificateInfo.PassportIncludeVisa
        },{headers:{Authorization: this.$store.state.app.token}})
        .then(
          function(res){
            if(res.data.Code == 0){
              this.$root.eventHub.$emit("REFRESHFILL")
              this.getUserInfo()
            }
          }
        )
    },
    downLoadFun(par){
      if(par.info.HaveContent){
        // if(this.$root.get("country") == "英国"){
        //   if(par.info.FileType !=2){
        //     par.event.target.setAttribute("target","_blank")
        //     par.event.target.setAttribute("href",this.$store.state.app.host + "api/Manage/GetFileTemplateInfo?userVisaId="+this.$store.state.app.ivisaId+"&fileType="+par.info.FileType)
        //   }else{
        //     // 护照
        //     par.event.target.setAttribute("href",this.$store.state.app.host+par.info.File)
        //     par.event.target.setAttribute("download",this.$store.state.app.host+par.info.File)
        //   }
        //   return
        // }



        // 澳大利亚 美国EVUS 新西兰
        if(par.info.FileType == 3||par.info.FileType ==4||par.info.FileType ==15||par.info.FileType ==20||par.info.FileType ==21||par.info.FileType ==22||par.info.FileType ==16||par.info.FileType ==29||par.info.FileType ==30||par.info.FileType ==31||par.info.FileType ==32||par.info.FileType ==33||par.info.FileType ==35||par.info.FileType ==5){
          par.event.target.setAttribute("target","_blank")
          par.event.target.setAttribute("href",this.$store.state.app.host + "api/Manage/MergeJPEGToPDF?userVisaId="+this.$store.state.app.ivisaId+"&fileType="+par.info.FileType+"&passport=&download=true")
        }else{
          par.event.target.setAttribute("href",this.$store.state.app.host+par.info.File)
          par.event.target.setAttribute("download",this.$store.state.app.host+par.info.File)
        }
      }else{
        par.event.target.removeAttribute("href")
        par.event.target.removeAttribute("download")
      }
    }
  },
  mounted() {
    this.$store.state.app.ivisaId = this.$root.get("IvisaId")
    this.getUserInfo()
    var _this = this
    this.$on('CLOSE', function(obj) {
      // console.log(obj.hideFrame)
      switch(obj.hideFrame){
        case "previewFrame":
        _this.$layer.close(_this.previewFrame)
        break;
        case "idcardFrame":
         _this.$layer.close(_this.idcardFrame)
        if(obj.back){
          _this.upload(this.$store.state.visa.uploadInfo)
        }
        break;
        case "delectFrame":
         _this.$layer.close(_this.delectFrame)
        break;
        case "previewFrameENG":
         _this.$layer.close(_this.previewFrameENG)
        break;
      }
      _this.$root.eventHub.$emit("REFRESHFILL")
      _this.getUserInfo()
    })
    this.$root.$on("REFRESHINFO",function(obj){
       _this.getUserInfo()
    })
    this.$root.eventHub.$on("CLOSENEWPREVIEW",function(){
      _this.newPreview = ""
    })

  },
  created() {


  },
  components: {
    'Preview': Preview,
    "Identification":Identification,
    "DelectAll":DelectAll,
    "PreviewENG2":PreviewENG2
  },
  destroyed(){
    this.$root.eventHub.$off("REFRESHINFO")
    this.$root.eventHub.$off("CLOSENEWPREVIEW")
  }
}

</script>
<style type="text/css">
@import url(../css/certificate.css);

</style>
