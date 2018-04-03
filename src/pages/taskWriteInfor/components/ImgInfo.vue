<template>
  <div class="baseImginfo identification">
    <div class="imgInfocontent">
      <div class="cancel" v-tap='{methods:cancelFun}'>×</div>
      <div class="uploadBtn">
        <img src="static/upload.png">
        <span>上传本地照片</span>
        <input class="fileBtn" type="file" :accept="uploadFile.accepts.default" @change="upload($event)">
      </div>
      <div class="photo">
        <img :src="$store.state.app.host+imgInfo.NewImageUrl" width="287px" height="192px">
      </div>
      <div class="imgInfo">
        <div v-for='item in imgInfo.ReturnTagInfo' v-if='item.Tag != "JB0006"'>
          <label>{{item.Name}}：</label>
          <input type="text" v-model='item.Value' :title='item.Value' @focus="focusInput(item,$event)">
        </div>
      </div>
      <div class="longTxt" v-if='$store.state.visa.uploadInfo.FileType ==3&&$store.state.visa.uploadInfo.Tag ==2'>
        <input type="checkbox" id='chooseLong' v-model='isLong' v-tap='{methods:selectLong}'><span>长期</span>
      </div>
    </div>
    <div class="btns">
      <div class="okbtn" v-tap='{methods:okFun}'>确认</div>
      <div class="cancelbtn" v-tap='{methods:cancelFun}'>取消</div>
    </div>
    <div class="different" v-if='$store.state.previewImg.cutImgInfo.PassportNotSame!=null&&saveTip'>
        <div class="tipcont">
          <div class="tip">
            申请人护照与身份证信息不一致时，姓、名、性别以及出生日期将以护照为准。
          </div>
          <div class="tipBtns">
            <div class="ok" v-tap='{methods:saveFun}'>确认</div>
            <!-- <div class="no" v-tap='{methods:noFun}'取消</div> -->
          </div>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      uploadFile: {
        accepts: { //允许的上传类型
          type: String,
          default: 'image/jpeg,image/jpg,image/png,image/gif'
        }
      },
      imgInfo: [],
      isLong:false,
      dateSave:"",
      saveTip:false
    }
  },
  methods: {
    upload(e) {
      let file = event.target.files[0]
      const self = this
      if (file) {

        const formData = new FormData()
        formData.append('file', file)
        formData.append('Title', this.$store.state.visa.uploadInfo.FileName)
        formData.append('UserVisaId', this.$store.state.app.ivisaId)
        formData.append('VisaFileId', this.$store.state.visa.uploadInfo.VisaFileId)
        if(this.$store.state.visa.uploadInfo.Passport){
          formData.append('Passport', this.$store.state.visa.uploadInfo.Passport)
        }else {
          formData.append('Passport', "")
        }

        formData.append('Tag', this.$store.state.visa.uploadInfo.Tag)
        var wating = this.$layer.loading()

        //提交给后台处理
        self.$http.post(this.$store.state.app.host + 'api/Manage/IdentifyCredentials', formData, { headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.$parent.$emit('CLOSE', { name: "3", isNext: false, back: true })
                this.$store.state.visa.preViewInfo = res.data.Result
                this.$layer.close(wating)
              } else {
                this.$layer.close(wating)
              }
            },
            function(err){
              this.$layer.close(wating)
              this.$layer.msg("网络连接超时")
            }
          )
      }
    },
    progressFun() {
      console.log(this.$store.state.visa.certificateInfo,this.$store.state.visa.progressType)

      if (this.$store.state.visa.progressType == 1) {
        // 证件
        var haveNum_1 = 0,
          len = this.$store.state.visa.certificateInfo.CredentialsFileList.length
        for (var i = 0; i < len; i++) {
          if (this.$store.state.visa.certificateInfo.CredentialsFileList[i].HaveContent) {
            haveNum_1++
          }
        }
        if (this.$store.state.visa.upList.length == 0) {
          haveNum_1 += 1
        }
        this.progress = parseInt(haveNum_1 * 100 / len)
      } else {
        // 材料
        var haveNum_2 = 0,
          len = this.$store.state.visa.certificateInfo.PaperFileList.length
        for (var i = 0; i < len; i++) {
          if (this.$store.state.visa.certificateInfo.PaperFileList[i].HaveContent) {
            haveNum_2++
          }
        }
        if (this.$store.state.visa.upList.length == 0) {
          haveNum_2 += 1
        }
        // haveNum_2+=1
        this.progress = parseInt(haveNum_2 * 100 / len)
      }
      console.log(this.progress)
      this.$http.post(this.$store.state.app.host + "api/Manage/SetPaperProgress", {
          UserVisaId: this.$store.state.app.ivisaId,
          TypeId: this.$store.state.visa.progressType,
          Progress: this.progress
        }, { headers: { Authorization: this.$store.state.app.token } })
        .then(
          function(res) {

          }
        )
    },
    okFun() {
      if (this.imgInfo.ReturnTagInfo) {
        for (var i = 0; i < this.imgInfo.ReturnTagInfo.length; i++) {
          if(!this.imgInfo.ReturnTagInfo[i].Value){
            this.$layer.alert("请填写完整信息")
            return
          }
        }
        if(this.$store.state.visa.uploadInfo.FileType == "37"){
          // 旧护照首页
          var xingENG,mingENG
          for(var i = 0;i<this.imgInfo.ReturnTagInfo.length;i++){
            this.imgInfo.ReturnTagInfo[i].ValueENG = this.imgInfo.ReturnTagInfo[i].Value

            if(this.imgInfo.ReturnTagInfo[i].Tag == "JB0001"){
              xingENG = this.imgInfo.ReturnTagInfo[i].Value
            }
            if(this.imgInfo.ReturnTagInfo[i].Tag == "JB0002"){
              mingENG = this.imgInfo.ReturnTagInfo[i].Value
            }
            if(this.imgInfo.ReturnTagInfo[i].Tag == "HZ002001"){
              this.imgInfo.ReturnTagInfo[i].ValueENG = xingENG
            }
            if(this.imgInfo.ReturnTagInfo[i].Tag == "HZ002002"){
              this.imgInfo.ReturnTagInfo[i].ValueENG = mingENG
            }
          }
        }

        var returnInfo = JSON.parse(JSON.stringify(this.imgInfo.ReturnTagInfo))

        if(this.$store.state.visa.uploadInfo.FileType == '6'){
          // 单位名称
          var obj = {
            Tag:null,
            Value:null,
            ValueENG:null
          }
          // 单位地址 新西兰没有地址
          var obj2 = {
            Tag:null,
            Value:null,
            ValueENG:null
          }

          for(var i = 0;i<returnInfo.length;i++){
            if(returnInfo[i].Tag == "GZ00010101"){
              obj.Tag = "GZ00010203"
              obj.Value = returnInfo[i].Value
              obj.ValueENG = returnInfo[i].ValueENG
            }
            if(returnInfo[i].Tag == "GZP00010101"){
              obj.Tag = "GZP00010203"
              obj.Value = returnInfo[i].Value
              obj.ValueENG = returnInfo[i].ValueENG
            }

            if(returnInfo[i].Tag == "GZ00010102"){
              obj2.Tag = "GZ00010205"
              obj2.Value = returnInfo[i].Value
              obj2.ValueENG = returnInfo[i].ValueENG
            }
          }
          returnInfo.push(obj)
          if(obj2.Tag){
            returnInfo.push(obj2)
          }
        }

        if(this.$store.state.visa.uploadInfo.FileType == "2"){
          console.log(returnInfo)
          for(var i = 0;i<returnInfo.length;i++){
            if(returnInfo[i].Tag == "JT000117"){
              returnInfo[i].ValueENG = returnInfo[i].ValueENG.toLowerCase()
            }
            if(returnInfo[i].Tag == "JTXXL00804"){
              returnInfo[i].ValueENG = returnInfo[i].ValueENG.toLowerCase()
            }
          }
        }

        // console.log(">>>",returnInfo)
        // console.log(this.imgInfo.ReturnTagInfo)

        // this.$store.state.visa.uploadInfo.UserType 身份
        this.$http.post(this.$store.state.app.host + "api/Manage/SaveCredentialsData", {
            PassportStatus:this.$store.state.visa.uploadInfo.UserType,
            Passport:this.$store.state.visa.uploadInfo.Passport,
            UserVisaId: this.$store.state.app.ivisaId,
            UserVisaFileId: this.imgInfo.UserVisaFileId,
            CredentialsData: returnInfo
          }, { headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.progressFun()

                if(this.$store.state.previewImg.cutImgInfo.PassportNotSame!=null){
                  this.saveTip = true
                }else{
                  this.$parent.$emit('CLOSE', { name: "3", isNext: true })
                }
              } else {
                this.saveTip = false
                this.$layer.alert(res.data.Message)
              }
            },
            function(err){
                this.$layer.msg("网络连接超时")
            }
          )
      } else {
        var that = this
        this.$layer.alert("上传的图片无法识别，请重新上传！")
      }
    },
    noFun(){
        this.saveTip = false
    },
    saveFun(){
      this.saveTip = false
      this.$parent.$emit('CLOSE', { name: "3", isNext: true })
        // this.$http.post(this.$store.state.app.host + "api/Manage/SaveCredentialsData", {
        //     PassportStatus:this.$store.state.visa.uploadInfo.UserType,
        //     Passport:this.$store.state.visa.uploadInfo.Passport,
        //     UserVisaId: this.$store.state.app.ivisaId,
        //     UserVisaFileId: this.imgInfo.UserVisaFileId,
        //     CredentialsData: this.imgInfo.ReturnTagInfo
        //   }, { headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
        //   .then(
        //     function(res) {
        //       if (res.data.Code == 0) {
        //         this.saveTip = false
        //         this.progressFun()
        //         this.$parent.$emit('CLOSE', { name: "3", isNext: true })
        //       } else {
        //         this.$layer.alert(res.data.Message)
        //       }
        //     },
        //     function(err){
        //         this.$layer.msg("网络连接超时")
        //     }
        //   )
    },
    cancelFun() {
      this.$parent.$emit('CLOSE', { name: "3", isNext: true })
      this.saveTip = false
    },
    selectLong(){
         for(var i = 0;i<this.imgInfo.ReturnTagInfo.length;i++){
            if(this.imgInfo.ReturnTagInfo[i].Tag == "JB000605"){
                if(this.isLong){
                  this.imgInfo.ReturnTagInfo[i].Value = "长期"
                }else{
                  this.imgInfo.ReturnTagInfo[i].Value =  this.dateSave
                }
            }
        }
    },
    focusInput(info, e) {
		var currYear = new Date().getFullYear();
		    if (info.FieldType == 6) {
		      var that = this
		      $(e.target).mobiscroll().date({
		        theme: 'mobiscroll',
		        display: 'bubble',
            lang:"zh",
		        // defaultValue: new Date(2017,1,1),
		        // startYear:currYear,
		        endYear: currYear + 20,
		        dateFormat: "yyyy-mm",
		        dateOrder: "yyyymm",
		        onSelect: function(event, inst) {
			        if (event) {
			            info.Value = event
			            info.ValueENG = event
			        }

		        }
		      });
		    } else if (info.FieldType == 1) {
		      var that = this
		      $(e.target).mobiscroll().date({
		        theme: 'mobiscroll',
		        display: 'bubble',
            lang:"zh",
		        // defaultValue: new Date(2017,1,1),
		        // startYear:currYear,
		        endYear: currYear + 20,
		        dateFormat: "yyyy-mm-dd",
		        dateOrder: "yyyymmdd",
		        onSelect: function(event, inst) {
              // if(info.Tag == "JB000605"){
              //   document.getElementById("chooseLong").click()
              // }
			        if (event) {
				        info.Value = event
				        info.ValueENG = event
			        }
              if(info.Tag == "JB000605"){
                that.isLong = false
              }

			      }
		      });
		    }

    }
  },
  created() {
    /*if (this.$store.state.previewImg.cutImgInfo.PassportNotSame != null) {
      this.$layer.alert(this.$store.state.previewImg.cutImgInfo.NameNotSameString)
    }*/
    this.imgInfo = this.$store.state.previewImg.cutImgInfo

    if(this.$store.state.visa.uploadInfo.FileType ==3&&this.$store.state.visa.uploadInfo.Tag ==2){
        for(var i = 0;i<this.imgInfo.ReturnTagInfo.length;i++){
          if(this.imgInfo.ReturnTagInfo[i].Tag == "JB000605"&&this.imgInfo.ReturnTagInfo[i].Value == "长期"){
            this.dateSave = this.imgInfo.ReturnTagInfo[i].Value
            this.isLong = true
          }else{
            this.dateSave = this.imgInfo.ReturnTagInfo[i].Value
            this.isLong = false
          }
        }
    }
    if(this.$store.state.visa.uploadInfo.FileType == 6){
      for(var i = 0;i<this.imgInfo.ReturnTagInfo.length;i++){
        // 新西兰
        if(this.imgInfo.ReturnTagInfo[i].Tag == "GZ00010203"){
          this.imgInfo.ReturnTagInfo.splice(i,1)
        }
        if(this.imgInfo.ReturnTagInfo[i].Tag == "GZP00010203"){
          this.imgInfo.ReturnTagInfo.splice(i,1)
        }
        //澳大利亚  美
        // if(this.imgInfo.ReturnTagInfo[i].Tag == "GZ00010203"){
        //   this.imgInfo.ReturnTagInfo.splice(i,1)
        // }
        if(this.imgInfo.ReturnTagInfo[i].Tag == "GZ00010205"){
          this.imgInfo.ReturnTagInfo.splice(i,1)
        }
      }
    }
  },
  mounted(){

  }

}

</script>
<style type="text/css"></style>
