<template>
	<div class="selectPeople">
		 <div class="cancel" v-tap='{methods:cancelFun}'>×</div>
		<div class="par">
			<div v-for='(user,index) in peopleList'>
				<label><input type="radio" :value="user.UserID" v-model='selectId'>{{user.Name}}</label>
			</div>
		</div>
		<div class="okBtn">
			<button v-tap='{methods:okFun}'>确认分配</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				peopleList:[],
				selectId:"",
				ivisaIdAry:[],
				modelId:""
			}
		},
		methods:{
			okFun(par){
				console.log(this.$store.state.app.ivisaIdGroup,this.$store.state.app.ivisaId)
				if(this.$store.state.app.ivisaId){
					this.ivisaIdAry.push(this.$store.state.app.ivisaId)
				}else{
					this.ivisaIdAry = this.$store.state.app.ivisaIdGroup
				}
				console.log("sss",this.ivisaIdAry)

				
				this.modelId = window.localStorage.getItem('addBgId')
				if(!this.$store.state.visa.taskOrMassage){
					// 分配信息录入
					// this.$store.state.visa.twoWrite - false - 分配代录
					// this.$store.state.visa.twoWrite - true - 重新分配代录
					if(!this.$store.state.visa.twoWrite){
						this.$http.post(this.$store.state.app.host + 'api/Manage/AssignTheRecord',
							{
								UserVisaIds:this.ivisaIdAry,
								UserId:this.selectId
							},{headers:{Authorization: this.$store.state.app.token}}
						)
						.then(
							function(res){
								if(res.data.Code == 0){
									this.$parent.$emit('CLOSE',{closeName:"handOutFrame"})
								}
							}
						)
					}else{
						this.$http.post(this.$store.state.app.host + 'api/Manage/ReassignTheRecord',
							{
								UserVisaId:this.$store.state.app.ivisaId,
								UserId:this.selectId
							},{headers:{Authorization: this.$store.state.app.token}}
						)
						.then(
							function(res){
								if(res.data.Code == 0){
									this.$parent.$emit('CLOSE',{closeName:"handOutFrame"})
								}
							}
						)
					}
					
				}else{
					// 任务分配
					// modalId-3 - 分配任务
					// modalId-4 - 重新分配任务
					if(this.modelId == 3){
						this.$http.post(this.$store.state.app.host + 'api/Manage/Assignments',
							{
								UserVisaIds:this.ivisaIdAry,
								UserId:this.selectId
							},{headers:{Authorization: this.$store.state.app.token}}
						)
						.then(
							function(res){
								if(res.data.Code == 0){
									this.$parent.$emit('CLOSE',{closeName:"handOutFrame"})
								}
							}
						)
					}else{
						this.$http.post(this.$store.state.app.host + 'api/Manage/ReassignTasks',
							{
								UserVisaId:this.$store.state.app.ivisaId,
								UserId:this.selectId
							},{headers:{Authorization: this.$store.state.app.token}}
						)
						.then(
							function(res){
								if(res.data.Code == 0){
									this.$parent.$emit('CLOSE',{closeName:"handOutFrame"})
								}
							}
						)
					}
				}
			},
			getPeopleList(){
				var wait = this.$layer.loading()
				this.$http.get(this.$store.state.app.host + 'api/Manage/AssignedPersonList',{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
				.then(
					function(res){
						if(res.data.Code == 0){
							this.$layer.close(wait)
							this.peopleList = res.data.Result
						}else{
							this.$layer.close(wait)
						}
					},
					function(err){
						this.$layer.close(wait)
						this.$layer.msg("网络连接超时")            
	                }
				)
			},
			cancelFun(){
				this.$store.state.app.ivisaIdGroup.length = 0
				this.$store.state.app.ivisaId = ""
				this.$parent.$emit('CLOSE',{closeName:"handOutFrame"})
			}
		},
		created(){
			this.getPeopleList()
		}
	}
</script>
<style type="text/css">
	.selectPeople{
		
	}
	.selectPeople .par{
		min-width: 300px;
		max-height: 500px;
		overflow: auto;
		font-size: 14px;
	}
	.selectPeople .par input{
		margin-bottom: 10px;
		margin-right: 2px;
		margin-left: 20px;
	}
	.selectPeople .okBtn{
		border-top:1px solid #DDD;
		padding-top:10px; 
		padding-bottom:10px; 
	}
	.selectPeople .okBtn button{
		padding: 5px 10px;
		float: right;
		margin-right: 10px;
		background: #63a8eb;
		border: none;
		color: #fff;
	}

	.selectPeople .okBtn:before,.selectPeople .okBtn:after{
	    display: table;
	    content: " ";
	}
    .selectPeople .okBtn:after{
	    clear:both;
    } 
    .selectPeople .cancel{
    	position: absolute;
		top: 16px;
		right: 10px;
		font-size: 24px;
		color: #4C5E70;
    }
    .selectPeople .cancel:hover{
    	cursor: pointer;
    }
   

</style>