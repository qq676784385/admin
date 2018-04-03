<template>
	<div class="main">
		<div class="mainTitle">
			<component is="TopTitle"></component>
		</div>
		<div class="mainAside" @click='hideDown'>
			<component is="LeftAside"></component>
		</div>
		<div class= "mainCont" @click='hideDown'>
			<router-view></router-view>
		</div> 
	</div>
</template>
<script type="text/javascript">
import Header from '../header/Header.vue'
import Aside from '../aside/Aside.vue'
	export default{
		data(){
			return{
				contentModal:'',
			}
		},
		methods:{
			hideDown(){
				this.$store.state.app.showDropdown = false
			}

		},
		created(){
		},
		watch:{
			'$route'(to,from){
				
				// if(to.params.id){
				// 	window.localStorage.setItem('addBgId',to.params.id)
				// }else{
				// 	window.localStorage.setItem('addBgId',to.path.substr(1))
				// }
				// window.localStorage.setItem('addBgName',to.path.substr(1))
			}
		},
		components:{
			"TopTitle":Header,
			"LeftAside":Aside
		}
	}
</script>
<style>
	@import url(./style.css);
	/*@import url('../css/mobiscroll.2.13.2.css');*/
	@import url('../css/mobiscroll.2.13.2.css');
</style>