<template>
  <div class="cutImg identification">
    <div class="cutcontent">
      <!-- 图片旋转 -->
      <div class="cancel" v-tap='{methods:cancelFun}'>×</div>
      <div class="uploadBtn">
        <img src="static/upload.png">
        <span>上传本地照片</span>
        <input class="fileBtn" type="file" :accept="uploadFile.accepts.default" @change="upload($event)">
      </div>
      <div class="photo">
        <img id='cutImage' :src="$store.state.app.host + $store.state.visa.preViewInfo.ImageUrl" ref='image' width="355px" height="233px">
      </div>
      <div class="rotate">
        <img src="static/turnleft.png" width="16px" height="16px"  v-tap='{methods:leftFun}'>
        <img src="static/turnright.png" width="16px" height="16px" v-tap='{methods:rightFun}'>
        <span>*点击按钮旋转照片</span>
      </div>
    </div>
    <div class="btns">
      <div class="okbtn" v-tap='{methods:nextFun}'>下一步</div>
      <div class="cancelbtn" v-tap='{methods:cancelFun}'>取消</div>
    </div>
  </div>
</template>
<script type="text/javascript">
// import Cropper from 'cropperjs'
export default {
  data() {
    return {
      uploadFile: {
        accepts: { //允许的上传类型
          type: String,
          default: 'image/jpeg,image/jpg,image/png,image/gif'
        }
      },
      num: 0,
      imageStyle:'',
      imageUrl:""
    }
  },
  methods: {
    upload(e) {
      // this.$store.state.visa.uploadInfo
      // this.$store.state.visa.uploadInfo.Tag
        
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
              }else{
                formData.append('Passport', "")
              }
              formData.append('Tag', this.$store.state.visa.uploadInfo.Tag)
              var wating = this.$layer.loading()

              //提交给后台处理
              self.$http.post(this.$store.state.app.host + 'api/Manage/IdentifyCredentials', formData, { headers: { Authorization: this.$store.state.app.token },timeout: this.$store.state.app.httpTime })
                .then(
                  function(res) {
                    if (res.data.Code == 0) {
                      this.$parent.$emit('CLOSE',{name:"1",isNext:false,back:true})
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
    init() {
       this.naturalWidth = this.cropper.initialImageData.naturalWidth
      this.naturalHeight = this.cropper.initialImageData.naturalHeight
      if (this.naturalWidth >= this.naturalHeight) {
        this.imageStyle = 'H'
      } else {
        this.imageStyle = 'S'
      }

    },
    leftFun() {
  		this.num--
  		this.cropper.rotateTo(((this.num) * 90) % 360);
  		this.cropper.clear()
  		let data = {
   			left: 0,
    		top: 0,
    		width: 0,
    		height: 0
  		}
  		this.cropper.setCanvasData(data)
  		// console.log(this.cropper);

  		if (this.imageStyle == 'H') {

    		if (Math.abs(this.num) % 2 == 1) {
          		this.cropper.moveTo((this.cropper.containerData.width - this.cropper.getCanvasData().width) / 2)
        	} else {
          		this.cropper.moveTo(0, (this.cropper.containerData.height - 0 - this.cropper.getCanvasData().height) / 2)
        	}
        } else {

	        if (Math.abs(this.num) % 2 == 1) {

	          this.cropper.moveTo(0, (this.cropper.containerData.height - 0 - this.cropper.getCanvasData().height) / 2)

	        } else {
	          this.cropper.moveTo((this.cropper.containerData.width - this.cropper.getCanvasData().width) / 2)
	        }
	    }
  	},
  	rightFun(){
  		this.num++
          this.cropper.rotateTo(((this.num) * 90) % 360);
  	      this.cropper.clear()
  	      let data = {
  	        left: 0,
  	        top: 0,
  	        width: 0,
  	        height: 0
  	      }
  	      this.cropper.setCanvasData(data)

  	      if (this.imageStyle == 'H') {

  	        if (Math.abs(this.num) % 2 == 1) {
  	          this.cropper.moveTo((this.cropper.containerData.width - this.cropper.getCanvasData().width) / 2)
  	        } else {
  	          this.cropper.moveTo(0, (this.cropper.containerData.height - this.cropper.getCanvasData().height) / 2)
  	        }
  	      } else {

  	        if (Math.abs(this.num) % 2 == 1) {

  	          this.cropper.moveTo(0, (this.cropper.containerData.height - this.cropper.getCanvasData().height) / 2)

  	        } else {
  	          this.cropper.moveTo((this.cropper.containerData.width - this.cropper.getCanvasData().width) / 2)
  	        }
  	      }
  	      console.log()
  	},
  	nextFun(){
  		this.$store.state.previewImg.rotateNum = this.cropper.getData().rotate
          this.$store.state.previewImg.num = this.num
          // window.localStorage.setItem('rotateImg', this.cropper.getData().rotate + '-' + this.num)
  	 	
      this.$parent.$emit('CLOSE',{name:"1",isNext:true})
  	},
    cancelFun(){
      this.$parent.$emit('CLOSE',{name:"1",isNext:false})
    }

   },
  computed: {
    image() {
      return this.$refs.image
    }
  },
   mounted(){
   		this.$store.state.previewImg.rotateNum = 0
   		const that = this
   		// let image = this.$refs.image
   		// console.log(this.image)
   		that.cropper = new Cropper(that.image, {
      		dragMode: 'cropend',//不可以裁剪 可以裁剪 --- crop
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
  components: {
    
  }
}

</script>
<style type="text/css">


</style>
