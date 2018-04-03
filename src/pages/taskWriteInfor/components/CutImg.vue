<template>
	<div class="cutImg identification">
		<div class="cutcontent">
				<!-- 图片裁剪 -->
			<div class="cancel" v-tap='{methods:cancelFun}'>×</div>
			<div  class="uploadBtn">
				<img src="static/upload.png">
				<span>上传本地照片</span>
				<input class="fileBtn" type="file" :accept="uploadFile.accepts.default" @change="upload($event)">
			</div>
			<div class="photo column2">
				<img :src="$store.state.app.host + $store.state.visa.preViewInfo.ImageUrl" ref='image'  width="355px" height="233px">
			</div>
			<div  class="rotate">
				<span>*拖动圆点裁剪照片</span>
			</div> 
		</div>
		<div class="btns">
			<div class="okbtn" v-tap='{methods:saveImg}'>确认</div>
			<div class="cancelbtn" v-tap='{methods:cancelFun}'>取消</div>
		</div>
	</div>
</template>
<script type="text/javascript">

	export default{
		data(){
			return {
				uploadFile: {
			        accepts: { //允许的上传类型
			          type: String,
			          default: 'image/jpeg,image/jpg,image/png,image/gif'
			        }
		        },
		        point:[{},{},{},{}]
			}
		},
		methods:{
			upload(e){
				// this.$store.state.visa.uploadInfo
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
	                      this.$parent.$emit('CLOSE',{name:"2",isNext:false,back:true})
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
			init(){
				this.naturalWidth = this.cropper.initialImageData.naturalWidth
			    this.naturalHeight = this.cropper.initialImageData.naturalHeight
			    if (this.naturalWidth >= this.naturalHeight) {
			      this.imageStyle = 'H'
			    } else {
			      this.imageStyle = 'S'
			    }
			    this.cropper.rotateTo(this.$store.state.previewImg.rotateNum);
			    this.num = this.$store.state.previewImg.num
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

			      // var img = document.getElementById('img')
			      // img.style.opacity = 1

			      this.CreatPoint()
			},
			CreatPoint(){
				var canzhao = document.getElementsByClassName('cropper-canvas')[0];
			      var el = document.getElementsByClassName('column2')[0];
			      this.$root.addClass(el, 'test');
			      var div = document.createElement("div");
			      this.$root.addClass(div, 'svg11');
			      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			      // console.log(el.offsetWidth,'LLLLL',el.offsetHeight);
			      svg.setAttribute('width', canzhao.offsetWidth + 56);
			      svg.setAttribute('height', canzhao.offsetHeight + 60);

			      // svg.setAttribute('postion','absolute');
			      // svg.setAttribute('y','-100');
			      // this.$root.addClass(svg, 'svg');
			      // svg.attribute('class','dd')
			      var svgNS = svg.namespaceURI;
			      var circle1 = document.createElementNS(svgNS, 'circle');

			      circle1.setAttribute('id', 'drag1');
			      circle1.setAttribute('cx', 20);
			      circle1.setAttribute('cy', 20);
			      circle1.setAttribute('r', 15);
			      circle1.setAttribute('stroke', 'white');
			      circle1.setAttribute('stroke-width', '10px');
			      circle1.setAttribute('fill', 'red');


			      var circle2 = document.createElementNS(svgNS, 'circle');
			      circle2.setAttribute('id', 'drag2');
			      circle2.setAttribute('cx', canzhao.offsetWidth + 20);
			      circle2.setAttribute('cy', 20);
			      circle2.setAttribute('r', 15);
			      circle2.setAttribute('stroke', 'white');
			      circle2.setAttribute('stroke-width', '10px');
			      circle2.setAttribute('fill', 'red');

			      var circle3 = document.createElementNS(svgNS, 'circle');
			      circle3.setAttribute('id', 'drag3');
			      circle3.setAttribute('cx', canzhao.offsetWidth + 20);
			      circle3.setAttribute('cy', canzhao.offsetHeight + 20);

			      circle3.setAttribute('r', 15);
			      circle3.setAttribute('stroke', 'white');
			      circle3.setAttribute('stroke-width', '10px');
			      circle3.setAttribute('fill', 'red');

			      var circle4 = document.createElementNS(svgNS, 'circle');
			      circle4.setAttribute('id', 'drag4');
			      circle4.setAttribute('cx', 20);
			      circle4.setAttribute('cy', canzhao.offsetHeight + 20);
			      circle4.setAttribute('r', 15);
			      circle4.setAttribute('stroke', 'white');
			      circle4.setAttribute('stroke-width', '10px');
			      circle4.setAttribute('fill', 'red');

			      this.circle1 = circle1
			      this.circle2 = circle2
			      this.circle3 = circle3
			      this.circle4 = circle4

			      var line1 = document.createElementNS(svgNS, 'line');
			      var line2 = document.createElementNS(svgNS, 'line');
			      var line3 = document.createElementNS(svgNS, 'line');
			      var line4 = document.createElementNS(svgNS, 'line');


			      var rect1 = document.createElementNS(svgNS, 'rect');
			      // rect1.setAttribute('id', 'drag5');
			      rect1.setAttribute('x', 0);
			      rect1.setAttribute('y', 0);
			      rect1.setAttribute('width', (canzhao.offsetWidth + 56) / 2);
			      rect1.setAttribute('height', (canzhao.offsetHeight + 60) / 2);
			      rect1.setAttribute('fill', '#000000');
			      rect1.setAttribute('opacity', '0');

			      var rect2 = document.createElementNS(svgNS, 'rect');
			      // rect1.setAttribute('id', 'drag5');
			      rect2.setAttribute('x', (canzhao.offsetWidth + 56) / 2);
			      rect2.setAttribute('y', 0);
			      rect2.setAttribute('width', (canzhao.offsetWidth + 56) / 2);
			      rect2.setAttribute('height', (canzhao.offsetHeight + 60) / 2);
			      rect2.setAttribute('fill', '#000000');
			      rect2.setAttribute('opacity', '0');

			      var rect3 = document.createElementNS(svgNS, 'rect');
			      // rect1.setAttribute('id', 'drag5');


			      rect3.setAttribute('x', (canzhao.offsetWidth + 56) / 2);
			      rect3.setAttribute('y', (canzhao.offsetHeight + 60) / 2);
			      rect3.setAttribute('width', (canzhao.offsetWidth + 56) / 2);
			      rect3.setAttribute('height', (canzhao.offsetHeight + 60) / 2);
			      rect3.setAttribute('fill', '#000000');
			      rect3.setAttribute('opacity', '0');

			      var rect4 = document.createElementNS(svgNS, 'rect');
			      // rect1.setAttribute('id', 'drag5');
			      rect4.setAttribute('x', 0);
			      rect4.setAttribute('y', (canzhao.offsetHeight + 60) / 2);
			      rect4.setAttribute('width', (canzhao.offsetWidth + 56) / 2);
			      rect4.setAttribute('height', (canzhao.offsetHeight + 60) / 2);
			      rect4.setAttribute('fill', '#000000');
			      rect4.setAttribute('opacity', '0');

			      svg.appendChild(line1);
			      svg.appendChild(line2);
			      svg.appendChild(line3);
			      svg.appendChild(line4);
			      svg.appendChild(circle1);
			      svg.appendChild(circle2);
			      svg.appendChild(circle3);
			      svg.appendChild(circle4);

			      svg.appendChild(rect1);
			      svg.appendChild(rect2);
			      svg.appendChild(rect3);
			      svg.appendChild(rect4);


			      line1.setAttribute('x1', circle1.getAttribute('cx'));
			      line1.setAttribute('y1', circle1.getAttribute('cy'));
			      line1.setAttribute('x2', circle2.getAttribute('cx'));
			      line1.setAttribute('y2', circle2.getAttribute('cy'));
			      line1.setAttribute('stroke', 'white');
			      line1.setAttribute('stroke-width', '2px');
			      line2.setAttribute('x1', circle2.getAttribute('cx'));
			      line2.setAttribute('y1', circle2.getAttribute('cy'));
			      line2.setAttribute('x2', circle3.getAttribute('cx'));
			      line2.setAttribute('y2', circle3.getAttribute('cy'));
			      line2.setAttribute('stroke', 'white');
			      line2.setAttribute('stroke-width', '2px');
			      line3.setAttribute('x1', circle3.getAttribute('cx'));
			      line3.setAttribute('y1', circle3.getAttribute('cy'));
			      line3.setAttribute('x2', circle4.getAttribute('cx'));
			      line3.setAttribute('y2', circle4.getAttribute('cy'));
			      line3.setAttribute('stroke', 'white');
			      line3.setAttribute('stroke-width', '2px');
			      line4.setAttribute('x1', circle4.getAttribute('cx'));
			      line4.setAttribute('y1', circle4.getAttribute('cy'));
			      line4.setAttribute('x2', circle1.getAttribute('cx'));
			      line4.setAttribute('y2', circle1.getAttribute('cy'));
			      line4.setAttribute('stroke', 'white');
			      line4.setAttribute('stroke-width', '2px');

			      div.appendChild(svg)


			      // console.log(((this.cropper.containerData.width - this.cropper.getCanvasData().width) / 2), 'x');
			      // console.log(((this.cropper.containerData.height - this.cropper.getCanvasData().height) / 2), 'y');
			      if (this.imageStyle == 'H') {
			          // alert('H')
			        if (Math.abs(this.num) % 2 == 1) {
			          div.style.left = ((this.cropper.containerData.width - this.cropper.getCanvasData().width) / 2) + 'px'
			        } else {
			          div.style.top = ((this.cropper.containerData.height - this.cropper.getCanvasData().height) / 2 + 0) + 'px'
			        }
			      } else {

			        if (Math.abs(this.num) % 2 == 1) {
			          // alert('S')
			          div.style.top = ((this.cropper.containerData.height - this.cropper.getCanvasData().height) / 2 + 0) + 'px'

			        } else {
			          div.style.left = ((this.cropper.containerData.width - this.cropper.getCanvasData().width) / 2 ) + 'px'
			        }
			      }


			      el.appendChild(div)
			      var distanceX = 0
			      var distanceY = 0
			      var press = false
			      var pressEl = ''
			      rect1.addEventListener("mousedown", function(ev) {
			        var oevent = ev || event;
			        console.log("1",oevent);
			        distanceX = oevent.clientX - circle1.getAttribute('cx');　　　　
			        distanceY = oevent.clientY - circle1.getAttribute('cy');　
			        press = true
			        pressEl = circle1
			        console.log(pressEl);
			      });
			      rect2.addEventListener("mousedown", function(ev) {
			        var oevent = ev || event;
			        console.log("2",oevent);
			        distanceX = oevent.clientX - circle2.getAttribute('cx');　　　　
			        distanceY = oevent.clientY - circle2.getAttribute('cy');　
			        press = true
			        pressEl = circle2
			        console.log(pressEl);
			      });
			      rect3.addEventListener("mousedown", function(ev) {
			        var oevent = ev || event;
			        console.log("3",oevent);
			        distanceX = oevent.clientX - circle3.getAttribute('cx');　　　　
			        distanceY = oevent.clientY - circle3.getAttribute('cy');　
			        press = true
			        pressEl = circle3
			        console.log(pressEl);
			      });
			      rect4.addEventListener("mousedown", function(ev) {
			        var oevent = ev || event;
			        console.log("4",oevent);
			        distanceX = oevent.clientX - circle4.getAttribute('cx');　　　　
			        distanceY = oevent.clientY - circle4.getAttribute('cy');　
			        press = true
			        pressEl = circle4
			        console.log(pressEl);
			      });
			      document.addEventListener("mousemove", function(ev) {
			        // console.log(2);　　　
			        var oevent = ev || event;　　　
			        // oevent.stopPropagation();　　　
			        oevent.preventDefault();
			        if (press) {
			          // console.log(oevent.clientX - distanceX, oevent.clientY - distanceY);

			          var x = oevent.clientX - distanceX
			          var y = oevent.clientY - distanceY

			          // console.log(pressEl.id);
			          switch (pressEl.id) {
			            case 'drag1':
			              if (x <= 20) {
			                x = 20
			              }
			              if (x >= (canzhao.offsetWidth + 56) / 2) {
			                x = (canzhao.offsetWidth + 56) / 2
			              }
			              if (y <= 20) {
			                y = 20
			              }
			              if (y > (canzhao.offsetHeight + 60) / 2) {
			                y = (canzhao.offsetHeight + 60) / 2
			              }
			              break;
			            case 'drag2':
			              if (x >= (canzhao.offsetWidth + 20)) {
			                x = (canzhao.offsetWidth + 20)
			              }
			              if (x <= (canzhao.offsetWidth + 56) / 2) {
			                x = (canzhao.offsetWidth + 56) / 2
			              }
			              if (y <= 20) {
			                y = 20
			              }
			              if (y > (canzhao.offsetHeight + 60) / 2) {
			                y = (canzhao.offsetHeight + 60) / 2
			              }
			              break;
			            case 'drag3':
			              if (x >= (canzhao.offsetWidth + 20)) {
			                x = (canzhao.offsetWidth + 20)
			              }
			              if (x <= (canzhao.offsetWidth + 56) / 2) {
			                x = (canzhao.offsetWidth + 56) / 2
			              }
			              if (y < (canzhao.offsetHeight + 60) / 2) {
			                y = (canzhao.offsetHeight + 60) / 2
			              }
			              if (y >= (canzhao.offsetHeight + 20)) {
			                y = (canzhao.offsetHeight + 20)
			              }
			              break;
			            case 'drag4':
			              if (x <= 20) {
			                x = 20
			              }
			              if (x >= (canzhao.offsetWidth + 56) / 2) {
			                x = (canzhao.offsetWidth + 56) / 2
			              }
			              if (y < (canzhao.offsetHeight + 60) / 2) {
			                y = (canzhao.offsetHeight + 60) / 2
			              }
			              if (y >= (canzhao.offsetHeight + 20)) {
			                y = (canzhao.offsetHeight + 20)
			              }
			              break;


			          }
			          pressEl.setAttribute('cx', x);
			          pressEl.setAttribute('cy', y);

			          line1.setAttribute('x1', circle1.getAttribute('cx'));
			          line1.setAttribute('y1', circle1.getAttribute('cy'));
			          line1.setAttribute('x2', circle2.getAttribute('cx'));
			          line1.setAttribute('y2', circle2.getAttribute('cy'));

			          line2.setAttribute('x1', circle2.getAttribute('cx'));
			          line2.setAttribute('y1', circle2.getAttribute('cy'));
			          line2.setAttribute('x2', circle3.getAttribute('cx'));
			          line2.setAttribute('y2', circle3.getAttribute('cy'));

			          line3.setAttribute('x1', circle3.getAttribute('cx'));
			          line3.setAttribute('y1', circle3.getAttribute('cy'));
			          line3.setAttribute('x2', circle4.getAttribute('cx'));
			          line3.setAttribute('y2', circle4.getAttribute('cy'));

			          line4.setAttribute('x1', circle4.getAttribute('cx'));
			          line4.setAttribute('y1', circle4.getAttribute('cy'));
			          line4.setAttribute('x2', circle1.getAttribute('cx'));
			          line4.setAttribute('y2', circle1.getAttribute('cy'));
			        }
			        　　
			      })
			      var that = this
			      document.addEventListener("mouseup", function(ev) {
			        press = false
			        // this.point = []
			        var obj = {X:"",Y:""}
			        // console.log(that.point)

			        
			        if(pressEl){
			        	var num = pressEl.id.substr(4)
			        	obj.X = pressEl.getAttribute("cx")
			        	obj.Y = pressEl.getAttribute("cy")
			        	that.point[num-1] = obj
			        }
			        pressEl = ''

			      })
			      // documen
			      var leftNum = Number(String(div.style.left).split('px')[0])
			      var topNum = Number(String(div.style.top).split('px')[0])
			      div.style.left = leftNum  + 'px';
			      div.style.top = topNum  + 'px';
			},
			saveImg(){
				var canzhao = document.getElementsByClassName('cropper-canvas')[0];
		      // console.log(canzhao.offsetWidth,canzhao.offsetHeight);

		      var _width = canzhao.offsetWidth
		      var _height = canzhao.offsetHeight

		      // alert(this.circle1)
		      // alert(this.circle1.getAttribute('cx'))
		      var _point1x = parseInt(this.circle1.getAttribute('cx') - 20)
		      var _point1y = parseInt(this.circle1.getAttribute('cy') - 20)
		      var _point2x = parseInt(this.circle2.getAttribute('cx') - 20)
		      var _point2y = parseInt(this.circle2.getAttribute('cy') - 20)
		      var _point3x = parseInt(this.circle3.getAttribute('cx') - 20)
		      var _point3y = parseInt(this.circle3.getAttribute('cy') - 20)
		      var _point4x = parseInt(this.circle4.getAttribute('cx') - 20)
		      var _point4y = parseInt(this.circle4.getAttribute('cy') - 20)

		      var _rotate = this.$store.state.previewImg.rotateNum

		      var load = this.$layer.loading()

		      // console.log(_width,_height,_point1x,_point1y,_point2x,_point2y,_point3x,_point3y,_point4x,_point4y,_rotate);

			    this.$http.post(this.$store.state.app.host + 'api/Manage/HandleCredentials',{
			    	UserVisaFileId:this.$store.state.visa.preViewInfo.UserVisaFileId,
			    	Angle:parseInt(_rotate),
			    	Points:[{X:_point1x,Y:_point1y},{X:_point2x,Y:_point2y},{X:_point3x,Y:_point3y},{X:_point4x,Y:_point4y}],
			    	Width:parseInt(_width),
			    	Height:parseInt(_height),
			    	Type:this.$store.state.visa.uploadInfo.UserType,
			    	Passport:this.$store.state.visa.uploadInfo.Passport
			    },{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
			    .then(
			    	function(res){
			    		if(res.data.Code == 0){
			    			this.$layer.close(load)
			    			this.$store.state.previewImg.cutImgInfo = res.data.Result
			    			this.$store.state.previewImg.cutImgInfo.PassportNotSame = res.data.Result.NameNotSameString

			    			if(this.$store.state.visa.uploadInfo.FileType==2||this.$store.state.visa.uploadInfo.FileType==3||this.$store.state.visa.uploadInfo.FileType==6||this.$store.state.visa.uploadInfo.FileType==37){
			    				this.$parent.$emit('CLOSE',{name:"2",isNext:true})
			    			}else{
			    				// 不需要识别的证件 直接保存
			    				this.lastSaveFun()
			    			}
			    		}else{
			    			this.$layer.close(load)
			    			if(res.data.Message!=null)this.$layer.msg(res.data.Message)
			    		}
			    	},
			    	function(err){
			    		this.$layer.close(load)
		                this.$layer.msg("网络连接超时")            
		            }
			    )
			},
			progressFun(){
				// console.log("progressFun",this.$store.state.visa.certificateInfo)

				if(this.$store.state.visa.progressType == 1){
					// 证件
					var haveNum_1 = 0,len = this.$store.state.visa.certificateInfo.CredentialsFileList.length
					for(var i = 0;i<len;i++){
						if(this.$store.state.visa.certificateInfo.CredentialsFileList[i].HaveContent){
							haveNum_1++
						}
					}
					if(this.$store.state.visa.upList.length == 0){
						haveNum_1+=1
					}
					this.progress = parseInt(haveNum_1*100/len)
				}else{
					// 材料
					var haveNum_2 = 0,len = this.$store.state.visa.certificateInfo.PaperFileList.length
					for(var i = 0;i<len;i++){
						if(this.$store.state.visa.certificateInfo.PaperFileList[i].HaveContent){
							haveNum_2++
						}
					}
					if(this.$store.state.visa.upList.length == 0){
						haveNum_2+=1
					}
					this.progress = parseInt(haveNum_2*100/len)
				}
				// console.log(this.progress)
			    this.$http.post(this.$store.state.app.host + "api/Manage/SetPaperProgress",{
			      	UserVisaId:this.$store.state.app.ivisaId,
			      	TypeId:this.$store.state.visa.progressType,
			      	Progress:this.progress
			    },{ headers: { Authorization: this.$store.state.app.token } })
			    .then(
			      	function(res){

			      	}
			    )
			},
			lastSaveFun(){
				// console.log(this.$store.state.visa.certificateInfo)
				// console.log(this.$store.state.previewImg.cutImgInfo)
				this.$http.post(this.$store.state.app.host + "api/Manage/SaveCredentialsData",{
					PassportStatus:this.$store.state.visa.uploadInfo.UserType,
					Passport:this.$store.state.visa.uploadInfo.Passport,
					UserVisaId:this.$store.state.app.ivisaId,
					UserVisaFileId:this.$store.state.previewImg.cutImgInfo.UserVisaFileId,
					CredentialsData:this.$store.state.previewImg.cutImgInfo.ReturnTagInfo
				},{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){

							this.progressFun()
							this.$parent.$emit('CLOSE',{name:"2",isNext:false})
						}else{
							this.$layer.alert(res.data.Message)
						}
					},
					function(err){
			                this.$layer.msg("网络连接超时")            
			        }
				)
			},
			cancelFun(){
				this.$parent.$emit('CLOSE',{name:"2",isNext:false})
			}
		},
		mounted(){
			console.log("上传",this.$store.state.visa.uploadInfo)
			let image = this.$refs.image
			var that = this
			this.cropper = new Cropper(image,{
				dragMode:'cropend',
				scalable: false,
				zoomable: false,
				aspectRatio: 'NaN',
				background: false,
				guides: false,
			    autoCrop: false,
			    toggleDragModeOnDblclick: false,
			    viewMode: 2,
			    crop(e){

			    },
			    ready(){
			    	that.init()
			    }
			})
		},
		components:{

		}
	}
</script>
<style type="text/css">
	
</style>
