<template>
  <div class="changeStatus">
    <div class="cancel" v-tap='{methods:cancelFun}'>×</div>
    <div>
      <form class="statusList">
        <div v-if='addBgId>1'>
          <label>
            <input type="radio" v-model='statusNum' value='1'><span>信息录入</span></label>
        </div>
        <div v-if='addBgId>4'>
          <label>
            <input type="radio" v-model='statusNum' value='4'><span>操作办理</span></label>
        </div>
        <div v-if='addBgId>2'>
          <label>
            <input type="radio" v-model='statusNum' value='2'><span>材料签收</span></label>
        </div>
        <div v-if='addBgId>5'>
          <label>
            <input type="radio" v-model='statusNum' value='5'><span>签证送取</span></label>
        </div>
        <div v-if='addBgId>3'>
          <label>
            <input type="radio" v-model='statusNum' value='3'><span>任务分配</span></label>
        </div>
        <div v-if='addBgId>6'>
          <label>
            <input type="radio" v-model='statusNum' value='6'><span>完成签证</span></label>
        </div>
        <div>
          <label>
            <input type="radio" v-model='statusNum' value='8'><span>取消办理</span></label>
        </div>
      </form>
    </div>
    <div class="btns">
      <div class="okbtn" v-tap='{methods:okFun}'>确认</div>
      <div class="cancelbtn" v-tap='{methods:cancelFun}'>取消</div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      statusNum: ""
    }
  },
  methods:{
  	cancelFun(){
  		// changeStatusFrame
  		this.$parent.$emit('CLOSE',{closeName:"changeStatusFrame"})
  	},
  	okFun(){
      this.$http.post(this.$store.state.app.host + 'api/Manage/ModifyUserVisaStatus',{
        UserVisaId:this.$store.state.app.ivisaId,
        VisaStatus:this.statusNum
      },{headers:{Authorization: this.$store.state.app.token},timeout: this.$store.state.app.httpTime})
      .then(
        function(res){
          if(res.data.Code == 0){
            this.$parent.$emit('CLOSE',{closeName:"changeStatusFrame"})
          }
        },
        function(err){
            this.$layer.msg("网络连接超时")            
        }
      )
  		
  	}

  },
  created(){
    this.addBgId = this.$route.params.id
    console.log(this.addBgId,this.addBgId<1)
  }
}

</script>
<style type="text/css">
.changeStatus:hover{
	cursor: pointer;
}
.changeStatus .cancel {
  position: absolute;
  top: 16px;
  right: 10px;
  font-size: 24px;
  color: #4C5E70;
}
.changeStatus{
	width: 400px;
	height: auto;

}
.changeStatus form{
	padding-left: 20px;
	min-height: 98px;
}
.changeStatus .statusList div {
  display: inline-block;
  width: 49%;
  margin-bottom: 10px;
}

.changeStatus .btns {
  text-align: right;
  border-top: 1px solid #bbb;
  padding: 10px;
}

.changeStatus .btns .okbtn {
  background: #63a8eb;
  display: inline-block;
  width: 61px;
  height: 32px;
  color: #fff;
  text-align: center;
  line-height: 32px;
  border-radius: 4px;
  font-size: 14px;
}

.changeStatus .btns .cancelbtn {
  background: #fff;
  display: inline-block;
  border: 1px solid #bbb;
  width: 61px;
  height: 32px;
  color: #000;
  text-align: center;
  line-height: 32px;
  border-radius: 4px;
  font-size: 14px;
}

</style>
