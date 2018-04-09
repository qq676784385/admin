<template>
	<div class="aside">
		<div class="asideLeft">
			<div class="asideLeftIcon">
				<img src="static/wait.png">
				<!-- <span>{{addBgId}}</span> -->
			</div>
			<div class="visaInfo" v-if='$store.state.app.isLeader>2'>
				<div class="visaInfoTitle" v-tap='{methods:showFun,index:1}'>
					<img class='leftIcon' src="static/allInfo.png">
					<span>全部签证信息</span>
					<img class="rightIcon" src="static/dropdown.png" :class='showIndex==1?"":"trans90"'>
				</div>
				<ul class="noListStyle " :class='showIndex==1?"":"hideList"'>
					<li v-for='visaList in visaInfoList' v-tap='{methods:changeContFun,hasSecondLevel:visaList.secondLevel,id:visaList.id,isIvisa:visaList.isIvisa}' :class="isIvisa==visaList.isIvisa?'blueBg':''">{{visaList.txt}}</li>
				</ul>
			</div>
			<div class="visaInfo">
				<div class="visaInfoTitle" v-tap='{methods:showFun,index:2}'>
					<img class='leftIcon' src="static/task.png">
					<span>我的任务</span>
					<img class="rightIcon "  src="static/dropdown.png" :class='showIndex==2?"":"trans90"'>
				</div>
				<ul class="noListStyle " :class='showIndex==2?"":"hideList"'>
					<li v-for='taskList in myTaskList' >
						<div class="fistLevel" :class='isIvisa==taskList.isIvisa?dropdown?"dropdown x":"blueBg":""' v-tap='{methods:changeContFun,id:taskList.id,isIvisa:taskList.isIvisa}'>
						{{taskList.txt}}
						</div>
						<img v-if='taskList.id == 8' class="dropIcon" src="static/dropdown.png" :class='dropdown?"":"trans90"'>
						<ul class="noListStyle secondLevel" v-if='taskList.id == 8&&dropdown'>
							<li v-tap='{methods:changeContFun,showLevel:true,id:"8",isIvisa:"task2"}' :class='addBgId==8?"blueBg":""'>材料预审</li>
							<li v-tap='{methods:changeContFun,showLevel:true,id:"9",isIvisa:"task2"}' :class='addBgId==9?"blueBg":""'>材料提交</li>
							<li v-tap='{methods:changeContFun,showLevel:true,id:"10",isIvisa:"task2"}' :class='addBgId==10?"blueBg":""'>问题处理</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="visaInfo">
				<div id='setting' class="visaInfoTitle" v-tap='{methods:setFun,id:"setting",hasSecondLevel:false}' :class="$route.path=='/setting'?'blueBg':''">
					<img class='leftIcon' src="static/setting.png">
					<span>通用设置</span>
				</div>
			</div>
			<div class="visaInfo">
				<div id='statistics' class="visaInfoTitle" v-tap='{methods:statisticFun,id:"statistics",hasSecondLevel:false}' :class="isIvisa == 'statistics'?'blueBg':''">
					<img class='leftIcon' src="static/shuju.png">
					<span>数据统计</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				showIndex:1,
				hasSecondLevel:false,
				visaInfoList:[
					{
						id:'1',
						txt:'信息录入',
						isIvisa:"visa1"
					},
					{
						id:'2',
						txt:'材料签收',
						isIvisa:"visa2"
					},
					{
						id:'3',
						txt:'任务分配',
						isIvisa:"visa3"
					},
					{
						id:'4',
						txt:'操作办理',
						isIvisa:"visa4"
					},
					{
						id:'5',
						txt:'签证送取',
						isIvisa:"visa5"
					},
					{
						id:'6',
						txt:'完成签证',
						isIvisa:"visa6"
					},{
						id:'11',
						txt:'取消办理',
						isIvisa:"visa7"
					}
				],
				myTaskList:[
					{
						id:'7',
						txt:'代录信息',
						isIvisa:"task1"
					},
					{
						id:'8',
						txt:'操作办理',
						isIvisa:"task2"
					},
					{
						id:'5',
						txt:'签证送取',
						isIvisa:"task3"
					},
					{
						id:'6',
						txt:'完成签证',
						isIvisa:"task4"
					}
				],
				addBgId:1,
				isIvisa:"visa1",
				addBgIdName:'',
				openLevel:true,
				dropdown:false,
			}
		},
		methods:{
			showFun(par){
				this.showIndex = par.index==this.showIndex?0:par.index
				this.$root.set('showIndex',this.showIndex)
			},
			changeContFun(par){
				this.$root.set("VisaPdf","false")
				this.$root.set("Submit","false")
				this.addBgId = par.id
				this.isIvisa = par.isIvisa
				if(this.isIvisa == "task2"){
					if(par.showLevel){
						this.dropdown = true
					}else{
						this.dropdown = !this.dropdown
					}

				}else{
					this.dropdown = false
				}

				if(this.addBgId<9 || this.addBgId ==11){
					this.$root.set('addBgId',this.addBgId)
					this.$root.set('isIvisa',par.isIvisa)
				}
				// MODEL_ID
				this.$root.eventHub.$emit('MODEL_ID',{id:par.id})
				this.$root.goRouter({
					router:'/visaInfo/'+par.id
				})
			},
			setFun(par){
				this.addBgId = par.id
				this.$root.goRouter({
					router:'/setting'
				})
				this.isIvisa = 'setting'
				this.$root.set('isIvisa','setting')
				this.isIvisa = this.$store.state.app.isIvisa
			},
			statisticFun(par){
				this.addBgId = par.id
				this.$root.goRouter({
					router:'/' + this.addBgId
				})
				this.isIvisa = 'statistics'
				this.$root.set('isIvisa','statistics')
			},
			hideLevelFun(par){
				this.openLevel = !this.openLevel
			}
		},
		created(){
			this.showIndex = this.$root.get('showIndex')
			this.addBgId = this.$root.get('addBgId')
			this.isIvisa = this.$root.get('isIvisa')
			this.$store.state.app.isLeader =  this.$root.get('IsLeader')
		},
		updated(){
		}
	}
</script>
<style type="text/css">
	@import url(./aside.css);
</style>
