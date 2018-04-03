<template>
  <div class='baseInfoOut cantEdit'>
    <div class="part">
      <div class="partTitle">
        <p>{{$store.state.visa.groupName}}</p>
      </div>
      <div :class='$store.state.visa.groupName!="众信"?"partList":""' v-if="userVisaInfo&&userVisaInfo.ShowTagInfo">
        <div class="marginBotm" v-for='(info,index) in userVisaInfo.ShowTagInfo' >
          <span v-if='info.IsMust'>*</span>
          <label :class='$store.state.visa.groupName=="众信"?"addWidth":""'><span :class='info.Children[0]&&info.Children[0].length?"boldFont":""' v-html='info.title.replace("\n","<br/>")'></span><span>:</span></label>
          <br v-if='$store.state.visa.groupName=="众信"'>
          <input type="text" name="" v-model='info.ValueCHS' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))' @blur="inputVal(info.ValueCHS,info.Tag,info)">
          <select v-if='info.Options&&!info.Tag.match(new RegExp(/^GP/))' @change="selectVal($event.target.selectedIndex,info.Tag,info)" v-model='info.ValueCHS'>
            <!-- <option value="null"></option> -->
            <option v-for='(opt,optIndex) in info.Options' :value='opt.Value'>{{opt.Value}}</option>
          </select>
          <!-- <span>&rsaquo;</span> -->
          <div class="secondLevel" :id="'C_'+info.Tag+index2" v-for='(info2,index2) in returnInfo(info.ValueCHS,info.ValueENG,info.Tag,info)'>
            <div :class="info3.Tag" v-for='(info3,index3) in info2'>
              <label><span v-html='info3.title.replace("\n","<br/>")'></span><span>：</span></label>
              <input type="text" name="" v-model='info3.ValueCHS' v-if='!info3.Options' @blur="inputVal(info3.ValueCHS,info.Tag,info3,index2)">
              <select v-else @change="selectVal($event.target.selectedIndex,info.Tag,info3,index2)" v-model='info3.ValueCHS'>
                <!-- <option value="null"></option> -->
                <option v-for='(opt3,optindex3) in info3.Options' :value='opt3.Value'>{{opt3.Value}}</option>
              </select>
              <div :class="'secondLevel CHS '+ info3.Tag" v-for='(info4,index4) in returnInfo(info3.ValueCHS,info3.ValueENG,info3.Tag,info3)'>
                <div :class="info5.Tag" v-for='(info5,index5) in info4'>
                  <label><span v-html='info5.title.replace("\n","<br/>")'></span><span>：</span></label>
                  <input :id="info3.Tag+'_C'+index4" type="text" name="" v-model='info5.ValueCHS' v-if='!info5.Options' @blur="inputVal(info5.ValueCHS,info3.Tag,info5,index4)">
                  <select :id="info3.Tag+'_C'+index4" v-else @change="selectVal($event.target.selectedIndex,info3.Tag,info5,index4)" v-model='info5.ValueCHS'>
                    <!-- <option value="null"></option> -->
                    <option v-for='(opt5,optindex5) in info5.Options' :value='opt5.Value'>{{opt5.Value}}</option>
                  </select>
                  <div class="secondLevel" v-for='(info6,index6) in returnInfo(info5.ValueCHS,info5.ValueENG,info5.Tag,info5)'>
                    <div :class="info7.Tag" v-for='(info7,index7) in info6'>
                      <label><span v-html='info7.title.replace("\n","<br/>")'></span><span>：</span></label>
                      <input type="text" name="" v-model='info7.ValueCHS' v-if='!info7.Options' @blur="inputVal(info.ValueCHS,info7.Tag,info7)">
                      <select v-else @change="selectVal($event.target.selectedIndex,info7.Tag,info7)" v-model='info7.ValueCHS'>
                        <!-- <option value="null"></option> -->
                        <option v-for='(opt7,optindex7) in info7.Options' :value='opt7.Value'>{{opt7.Value}}</option>
                      </select>
                      <div class="secondLevel" v-for='(info8,index8) in returnInfo(info7.ValueCHS,info7.ValueENG,info7.Tag,info7)'>
                        <div :class="info9.Tag" v-for='(info9,index9) in info8'>
                          <label><span v-html='info9.title.replace("\n","<br/>")'></span><span>：</span></label>
                          <input type="text" name="" v-model='info9.ValueCHS' v-if='!info9.Options' @blur="inputVal(info.ValueCHS,info9.Tag,info9)">
                          <select v-else @change="selectVal($event.target.selectedIndex,info9.Tag,info9)" v-model='info9.ValueCHS'>
                            <!-- <option value="null"></option> -->
                            <option v-for='(opt9,optindex9) in info9.Options' :value='opt9.ValueCHS'>{{opt9.ValueCHS}}</option>
                          </select>
                          <div class="secondLevel" v-for='(info10,index10) in returnInfo(info9.ValueCHS,info9.ValueENG,info9.Tag,info9)'>
                            <div :class="info11.Tag" v-for='(info11,index11) in info10'>
                              <label><span v-html='info11.title.replace("\n","<br/>")'></span><span>：</span></label>
                              <input type="text" name="" v-model='info11.ValueCHS' v-if='!info11.Options' @blur="inputVal(info.ValueCHS,info11.Tag,info11)">
                              <select v-else @change="selectVal($event.target.selectedIndex,info11.Tag,info11)" v-model='info11.ValueCHS'>
                                <!-- <option value="null"></option> -->
                                <option v-for='(opt11,optindex11) in info11.Options' :value='opt11.Value'>{{opt11.Value}}</option>
                              </select>
                              <div class="secondLevel" v-for='(info12,index12) in returnInfo(info11.ValueCHS,info11.ValueENG,info11.Tag,info11)'>
                                <div :class="info13.Tag" v-for='(info13,index13) in info12'>
                                  <label><span v-html='info13.title.replace("\n","<br/>")'></span><span>：</span></label>
                                  <input type="text" name="" v-model='info13.ValueCHS' v-if='!info13.Options' @blur="inputVal(info.ValueCHS,info13.Tag,info13)">
                                  <select v-else @change="selectVal($event.target.selectedIndex,info13.Tag,info13)" v-model='info13.ValueCHS'>
                                    <!-- <option value="null"></option> -->
                                    <option v-for='(opt13,optindex13) in info13.Options' :value='opt13.Value'>{{opt13.Value}}</option>
                                  </select>
                                  <div class="secondLevel" v-for='(info14,index14) in returnInfo(info13.ValueCHS,info13.ValueENG,info13.Tag,info13)'>
                                    <div :class="info15.Tag" v-for='(info15,index15) in info14'>
                                      <label><span v-html='info15.title.replace("\n","<br/>")'></span><span>：</span></label>
                                      <input type="text" name="" v-model='info15.ValueCHS' v-if='!info15.Options' @blur="inputVal(info.ValueCHS,info15.Tag,info15)">
                                      <select v-else @change="selectVal($event.target.selectedIndex,info15.Tag,info15)" v-model='info15.ValueCHS'>
                                        <!-- <option value="null"></option> -->
                                        <option v-for='(opt15,optindex15) in info15.Options' :value='opt15.Value'>{{opt15.Value}}</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 英文版 -->
    <div class="part" v-if='$store.state.visa.groupName!="众信"&&userVisaInfo&&userVisaInfo.ShowTagInfo' >
      <div class="partTitle">
        <p>{{$store.state.visa.groupName}}</p>
      </div>
      <div>
        <div class="marginBotm" v-for='(info,index) in userVisaInfo.ShowTagInfo' >
          <span v-if='info.IsMust'>*</span>
          <label><span :class='info.Children[0]&&info.Children[0].length?"boldFont":""' v-html='info.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
          <input type="text" name="" v-model='info.ValueENG' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))' @blur="inputVal(info.ValueENG,info.Tag,info)">
          <select v-if='info.Options&&!info.Tag.match(new RegExp(/^GP/))' @change="selectVal($event.target.selectedIndex,info.Tag,info)" v-model='info.ValueENG'>
            <option v-for='(opt,optIndex) in info.Options' :value='opt.ValueENG'>{{opt.ValueENG}}</option>
          </select>
          <div class="secondLevel" :id='info.Tag' v-for='(info2,index2) in returnInfo(info.ValueCHS,info.ValueENG,info.Tag,info)'>
            <div v-for='(info3,index3) in info2'>
              <label><span v-html='info3.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
              <input type="text" name="" v-model='info3.ValueENG' v-if='!info3.Options' @blur="inputVal(info3.ValueENG,info.Tag,info3,index2)">
              <select v-else @change="selectVal($event.target.selectedIndex,info.Tag,info3,index2)" v-model='info3.ValueENG'>
                <option v-for='(opt3,optindex3) in info3.Options' :value='opt3.ValueENG'>{{opt3.ValueENG}}</option>
              </select>
              <div class="secondLevel" v-for='(info4,index4) in returnInfo(info3.ValueCHS,info3.ValueENG,info3.Tag,info3)'>
                <div v-for='(info5,index5) in info4'>
                  <label><span v-html='info5.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                  <input :id="info3.Tag+'_E'+index4" type="text" name="" v-model='info5.ValueENG' v-if='!info5.Options' @blur="inputVal(info5.ValueENG,info3.Tag,info5,index4)">
                  <select :id="info3.Tag+'_E'+index4" v-else @change="selectVal($event.target.selectedIndex,info3.Tag,info5,index4)" v-model='info5.ValueENG'>
                    <option v-for='(opt5,optindex5) in info5.Options' :value='opt5.ValueENG'>{{opt5.ValueENG}}</option>
                  </select>
                  <div class="secondLevel" v-for='(info6,index6) in returnInfo(info5.ValueCHS,info5.ValueENG,info5.Tag,info5)'>
                    <div v-for='(info7,index7) in info6'>
                      <label><span v-html='info7.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                      <input type="text" name="" v-model='info7.ValueENG' v-if='!info7.Options' @blur="inputVal(info.ValueENG,info7.Tag,info7)">
                      <select v-else @change="selectVal($event.target.selectedIndex,info7.Tag,info7)" v-model='info7.ValueENG'>
                        <option v-for='(opt7,optindex7) in info7.Options' :value='opt7.ValueENG'>{{opt7.ValueENG}}</option>
                      </select>
                      <div class="secondLevel" v-for='(info8,index8) in returnInfo(info7.ValueCHS,info7.ValueENG,info7.Tag,info7)'>
                        <div v-for='(info9,index9) in info8'>
                          <label><span v-html='info9.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                          <input type="text" name="" v-model='info9.ValueENG' v-if='!info9.Options' @blur="inputVal(info.ValueENG,info9.Tag,info9)">
                          <select v-else @change="selectVal($event.target.selectedIndex,info9.Tag,info9)" v-model='info9.ValueENG'>
                            <option v-for='(opt9,optindex9) in info9.Options' :value='opt9.ValueENG'>{{opt9.ValueENG}}</option>
                          </select>
                          <div class="secondLevel" v-for='(info10,index10) in returnInfo(info9.ValueCHS,info9.ValueENG,info9.Tag,info9)'>
                            <div v-for='(info11,index11) in info10'>
                              <label><span v-html='info11.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                              <input type="text" name="" v-model='info11.ValueENG' v-if='!info11.Options' @blur="inputVal(info.ValueENG,info11.Tag,info11)">
                              <select v-else @change="selectVal($event.target.selectedIndex,info11.Tag,info11)" v-model='info11.ValueENG'>
                                <option v-for='(opt11,optindex11) in info11.Options' :value='opt11.ValueENG'>{{opt11.ValueENG}}</option>
                              </select>
                              <div class="secondLevel" v-for='(info12,index12) in returnInfo(info11.ValueCHS,info11.ValueENG,info11.Tag,info11)'>
                                <div v-for='(info13,index13) in info12'>
                                  <label><span v-html='info13.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                                  <input type="text" name="" v-model='info13.ValueENG' v-if='!info13.Options' @blur="inputVal(info.ValueENG,info13.Tag,info13)">
                                  <select v-else @change="selectVal($event.target.selectedIndex,info13.Tag,info13)" v-model='info13.ValueENG'>
                                    <option v-for='(opt13,optindex13) in info13.Options' :value='opt13.ValueENG'>{{opt13.ValueENG}}</option>
                                  </select>
                                  <div class="secondLevel" v-for='(info14,index14) in returnInfo(info13.ValueCHS,info13.ValueENG,info13.Tag,info13)'>
                                    <div v-for='(info15,index15) in info14'>
                                      <label><span v-html='info15.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                                      <input type="text" name="" v-model='info15.ValueENG' v-if='!info15.Options' @blur="inputVal(info.ValueENG,info15.Tag,info15)">
                                      <select v-else @change="selectVal($event.target.selectedIndex,info15.Tag,info15)" v-model='info15.ValueENG'>
                                        <option v-for='(opt15,optindex15) in info15.Options' :value='opt15.ValueENG'>{{opt15.ValueENG}}</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      userVisaInfo: '',
      groupId: 1,
      newChild: {}, //通过不同的tag值来创建dom {tag:[...],tag2:[...]}


    }
  },
  methods: {
    getUserVisaInfo(id) {

      var wait = this.$layer.loading()
      this.groupId = id
      this.$http.get(this.$store.state.app.host + 'api/Manage/GroupInfo', {
          params: { userVisaId: this.$store.state.app.ivisaId, groupId: id },
          headers: { Authorization: this.$store.state.app.token },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if(res.data.Code == 0){
              this.userVisaInfo = res.data.Result
              this.$layer.close(wait)
              if (this.$store.state.visa.groupName=="众信") {
                // 众信信息 存在初始值
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {

                    if(!this.userVisaInfo.ShowTagInfo[i].ValueCHS){
                        if(this.userVisaInfo.ShowTagInfo[i].DefaultValue){
                          this.userVisaInfo.ShowTagInfo[i].ValueCHS = this.userVisaInfo.ShowTagInfo[i].DefaultValue.split("|")[0]
                        }
                    }

                  if (this.userVisaInfo.ShowTagInfo[i].Children.length > 0) {
                    for (var n = 0; n < this.userVisaInfo.ShowTagInfo[i].Children[0].length; n++) {
                      if (!this.userVisaInfo.ShowTagInfo[i].Children[0][n].ValueCHS&&this.userVisaInfo.ShowTagInfo[i].Children[0][n].DefaultValue) {
                        this.userVisaInfo.ShowTagInfo[i].Children[0][n].ValueCHS = this.userVisaInfo.ShowTagInfo[i].Children[0][n].DefaultValue.split("|")[0]
                      }
                      for (var m = 0; m < this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children.length; n++) {
                        if (!this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].ValueCHS&&this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].DefaultValue) {
                          this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].ValueCHS = this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].DefaultValue.split("|")[0]
                        }
                      }
                    }
                  }
                }
              }
              // 改身份证日期  长期 英文为 long
              if(id == 1&&this.$store.state.visa.certificateInfo.Country=="澳大利亚"){
                if(this.userVisaInfo.ShowTagInfo[5].Children["0"][4].ValueCHS == "长期"){
                  this.userVisaInfo.ShowTagInfo[5].Children["0"][4].FieldType = 0
                  this.userVisaInfo.ShowTagInfo[5].Children["0"][4].ValueENG = "long"
                }
                if(this.userVisaInfo.ShowTagInfo[5].Children["0"][5].ValueCHS == "长期"){
                  this.userVisaInfo.ShowTagInfo[5].Children["0"][5].FieldType = 0
                  this.userVisaInfo.ShowTagInfo[5].Children["0"][5].ValueENG = "long"
                }
              }
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
    returnInfo(valC, valE, tag, info) {
      if(info.DefaultValue){
          valC = !valC?info.DefaultValue.split("|")[0]:valC
          valE = !valE?info.DefaultValue.split("|")[1]:valE
          info.ValueCHS = !info.ValueCHS?info.DefaultValue.split("|")[0]:info.ValueCHS
          info.ValueENG = !info.ValueENG?info.DefaultValue.split("|")[1]:info.ValueENG
      }
      this.newChild[tag] = []
      var index = 0

      if (tag && tag.match(new RegExp(/^GP/))) {

        this.newChild[tag] = []
        for (var i = 0; i < info.Children.length; i++) {

          for (var j = 0; j < info.Children[i].length; j++) {
            var aa = []
            aa.push(info.Children[i][j])
            this.newChild[tag].push(aa)
          }
        }

      } else if (tag == "JT000501" || tag == "JT000601" || tag == "JT000716" || tag == "LX003506"||tag == "JTXXL019"||tag == "JT000907"||tag == "JTXXL001"||tag=="JTUK0801"||tag=="JTUK0701"||tag=="LXUK0608") {

        switch (tag){
          case "JT000501":
            var infoLength = 12
            this.xunhuanAry = this.brotherSaveAry
          break;
          case "JT000601":
            var infoLength = 12
            this.xunhuanAry = this.childrenSaveAry
          break;
          case "JT000716":
            var infoLength = 14
            this.xunhuanAry = this.friendAry
          break;
          case "LX003506":
            if(this.$root.get("country") == "英国"){
              var infoLength = 4
            }else{
              var infoLength = 5
            }
            this.xunhuanAry = this.peerPeople
          break;
          case "JTXXL019":
              var infoLength = 4
              this.xunhuanAry = this.bgsChildAry
          break;
          case "JT000907":
              var infoLength = 6
              this.xunhuanAry = this.friendAryNZL
          break;
          case "JTXXL001":
              var infoLength = 14
              this.xunhuanAry = this.gsChildAry
          break;
          case "JTUK0801":
              var infoLength = 7
              this.xunhuanAry = this.ENGJJZC
          break;
          case "JTUK0701":
              var infoLength = 8
              this.xunhuanAry = this.ENGqinqi
          break;
          case "LXUK0608":
              var infoLength = 6
              this.xunhuanAry = this.ENGzhusu
          break;
        }

        if (valC && !isNaN(valC)) {
          index = info.Options.length

          if (info.Children.length > 0) {
            this.newChild[tag] = []
            for (var i = 0; i < info.Children.length; i++) {
              for (var j = 0; j < info.Children[i].length; j++) {
                if (info.Children[i][j].OptionIndex == index) {
                  var aa = []
                  aa.push(info.Children[i][j])
                  this.newChild[tag].push(aa)
                }
              }
            }
          }

          if (this.newChild[tag] && this.newChild[tag].length != valC * infoLength) {
            var xunhuan = valC - this.newChild[tag].length / infoLength
            if (xunhuan > 0) {
              for (var i = 0; i < xunhuan; i++) {
                for (var j = 0; j < infoLength; j++) {
                  this.newChild[tag].push(JSON.parse(JSON.stringify(this.newChild[tag][j])))
                }
              }
            } else {
              this.newChild[tag].length = valC * infoLength
            }
            info.Children = this.newChild[tag]
          }
        }
      }else {
        var val = valC ? valC : valE
        if (val && info && info.Options && info.Options.length > 0) {
          for (var n = 0; n < info.Options.length; n++) {
            if (valC == info.Options[n].Value) {
              index = n
            }

          }
          if (info.Children.length > 0) {
            this.newChild[tag] = []
            for (var i = 0; i < info.Children.length; i++) {
              for (var j = 0; j < info.Children[i].length; j++) {
                if (info.Children[i][j].OptionIndex == index + 1) {
                  var aa = []
                  aa.push(info.Children[i][j])
                  this.newChild[tag].push(aa)
                }
              }
            }
          }
        }
      }

      return this.newChild[tag]
    },
    inputVal(val, tag, info, index) {




    },
    selectVal(seleIndex, val, tag, info, index) {

    },

  },
  created() {

    this.$store.state.app.token = this.$root.get("AppToken")
    this.$store.state.app.ivisaId = this.$root.get("IvisaId")
    this.getUserVisaInfo(this.$store.state.visa.groupId)
    var that = this
    this.$root.eventHub.$on("GROUPID", function(obj) {
      that.getUserVisaInfo(obj.groupId)
    })
  }
}

</script>
<style type="text/css">
@import url(../../taskWriteInfor/css/baseInfoAustralia.css);
</style>
