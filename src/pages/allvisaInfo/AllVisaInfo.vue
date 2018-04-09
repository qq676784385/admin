<template>
<div class="inforInput">
  <div class="inforLabel">
    <div class="line">
      <div class="">
        <label>受理单号：</label>
        <input type="text" v-model='searchInfo.OrderNumber'>
      </div>
      <div>
        <label>姓名：</label>
        <input type="text" v-model='searchInfo.Name'>
      </div>
      <div>
        <label>护照号：</label>
        <input type="text" v-model='searchInfo.PassportNumber'>
      </div>
      <div>
        <label>目的地：</label>
        <input type="text" v-model='searchInfo.Destination'>
      </div>
      <div v-if='$root.get("showIndex")!=2||$route.params.id!=2||$route.params.id!=3'>
        <label>办理人：</label>
        <select v-model='searchInfo.OperateUserId'>
						<option></option>
						<option v-for='item in operaterList' :value='item.OperaterId'>{{item.OperaterName}}</option>
					</select>
      </div>
      <div>
        <button class="searchBtn" @click='pageNum=1;goNum="";getIvisaList()'>搜索</button>
      </div>
    </div>
  </div>
  <div class="czTable" v-if='$route.params.id==4'>
    <ul>
      <li :class='modalPage==4?"selected":""' v-tap='{methods:operationFun,id:4}'>全部</li>
      <li :class='modalPage==8?"selected":""' v-tap='{methods:operationFun,id:8}'>材料预审</li>
      <li :class='modalPage==9?"selected":""' v-tap='{methods:operationFun,id:9}'>材料提交</li>
      <li :class='modalPage==10?"selected":""' v-tap='{methods:operationFun,id:10}'>问题处理</li>
    </ul>
  </div>
  <div class="czTable" v-if='$route.params.id==6'>
    <ul>
      <li :class='modalPage==6?"selected":""' v-tap='{methods:operationFun,id:6}'>全部</li>
      <li :class='modalPage==12?"selected":""' v-tap='{methods:operationFun,id:12}'>已通过</li>
      <li :class='modalPage==13?"selected":""' v-tap='{methods:operationFun,id:13}'>拒签</li>
    </ul>
  </div>
  <div class="czTable" v-if='$route.params.id==9'>
    <ul>
      <li :class='modalPage==9?"selected":""' v-tap='{methods:operationFun,id:9}'>全部</li>
      <li :class='modalPage==14?"selected":""' v-tap='{methods:operationFun,id:14}'>未操作</li>
      <li :class='modalPage==15?"selected":""' v-tap='{methods:operationFun,id:15}'>已导入</li>
      <li :class='modalPage==16?"selected":""' v-tap='{methods:operationFun,id:16}'>已打印</li>
      <li :class='modalPage==17?"selected":""' v-tap='{methods:operationFun,id:17}'>已操作</li>
    </ul>
  </div>
  <div class="inforList" :class='$route.params.id!=4&&$route.params.id!=6&&$route.params.id!=9?"addBorder":""'>

    <table border="1" cellspacing="0" frame="above" rules="all">
      <tr>
        <th>No.</th>
        <th>受理单号</th>
        <th>办理渠道</th>
        <th>销售人员</th>
        <th>姓名</th>
        <th>护照号</th>
        <th>目的地</th>
        <th>事由</th>

        <th v-if='modalId == 1'>材料进度</th>


        <th v-if='modalId==3||$route.params.id==4||$route.params.id==8||$route.params.id==9||$route.params.id==10'>分组编号</th>
        <th v-if='modalId==3||$route.params.id==2||$route.params.id==4||$route.params.id==8||$route.params.id==9||$route.params.id==10'>提交时间</th>
        <th v-if='modalId == 2 '>材料签收</th>
        <th v-if='modalId == 2'>拒签理由</th>
        <th v-if='modalId == 4||modalPage==9||modalId==9||modalId>13'>导入/打印</th>
        <th v-if='modalId !=2&& modalId !=5&& modalId !=6&& modalId !=11&& modalId !=12&& modalId !=13'>
          <span v-if='modalId ==1||modalId ==3'>任务分配</span>
          <span v-else>办理人</span>
        </th>
        <th v-if='modalId == 11'>签证状态</th>
        <th v-if='modalId == 5'>送签信息</th>
        <th v-if='$route.params.id == 5||$route.params.id == 6'>送签结果</th>

        <th>操作</th>
      </tr>
      <tr v-for='(visaInfo,index) in visaAllInfo.SearchList'>
        <td>
          <span v-if='modalId == 3' style="float: left;">
							<input type="checkbox" v-model='visaInfo.isCheck' v-tap='{methods:singleSelect,id:visaInfo.VisaID}'>
							<span style='display: none'>{{disNum}}</span>
          </span>
          <span>{{index+1}}</span>
          <!-- <span v-if='daoruIdAry.indexOf(visaInfo.VisaID.toString())>-1'>true</span> -->
        </td>
        <td>{{visaInfo.OrderNumber}}</td>
        <td>{{visaInfo.TransactChannel}}</td>
        <td>{{visaInfo.SalesPerson}}</td>
        <td>{{visaInfo.Name}}</td>
        <td>{{visaInfo.PassportNumber}}</td>
        <td>{{visaInfo.Destination}}</td>
        <td>{{visaInfo.Cause}}</td>
        <!-- 进度 -->
        <td v-if='modalId == 1'>{{visaInfo.PaperProgress}}%</td>

        <!-- 分组编号 -->
        <td v-if='modalId==3||$route.params.id==4||$route.params.id==8||$route.params.id==9||$route.params.id==10'>
          <div>{{visaInfo.GroupNo}}</div>
          <div class="link" v-if='modalId==3&&visaInfo.GroupNo' v-tap='{methods:addGRroupNoFun,id:visaInfo.VisaID}'>修改组号</div>
          <div class="link" v-if='modalId==3&&!visaInfo.GroupNo' v-tap='{methods:addGRroupNoFun,id:visaInfo.VisaID}'>添加编号</div>
        </td>
        <!-- 提交时间 -->
        <td v-if='modalId==3||$route.params.id==2||$route.params.id==4||$route.params.id==8||$route.params.id==9||$route.params.id==10'>
          <div v-if='visaInfo.InputFinishTime'>{{visaInfo.InputFinishTime.split("T")[0]}}</div>
        </td>
        <!-- 材料签收 -->
        <td v-if='modalId == 2'>
          <span class="link" v-tap='{methods:refuseMaterial,id:visaInfo.VisaID,result:false,info:visaInfo}'>拒收</span>
          <span class="link" v-tap='{methods:refuseMaterial,id:visaInfo.VisaID,result:true}'>签收</span>
        </td>
        <!-- 拒签理由 -->
        <td v-if='modalId == 2'>
          <span class="link" v-if='visaInfo.FirstResult||visaInfo.SecondResult||visaInfo.NoReceivedNote!=null' v-tap='{methods:refuseMaterial,id:visaInfo.VisaID,result:false,info:visaInfo}'>拒签详情</span>
        </td>
        <!-- 导入打印 -->
        <!-- <td v-if='modalId == 4'>{{visaInfo.InAndOut}}</td> -->
        <td v-if='modalId == 4||modalPage==9||modalId>13' :id="'visa_'+visaInfo.VisaID">
          <span><img src="static/weixuan.png" v-if='!visaInfo.ImportFinish'><img src="static/ok.png" v-if='visaInfo.ImportFinish'></span>
          <span style="display: inline-block;vertical-align: top;">/</span>
          <span><img src="static/weixuan.png" v-if='!visaInfo.PrintFinish'><img src="static/ok.png" v-if='visaInfo.PrintFinish'></span>
        </td>

        <!-- 任务锁定 -->
        <td v-if='modalId !=2 && modalId !=5&& modalId !=6&& modalId !=11&& modalId !=12&& modalId !=13'>
          <div v-if='modalId !=1 && modalId !=3'>{{visaInfo.InputPerson||visaInfo.OperaterName}}</div>
          <!-- <div class='link' v-if='$route.params.id == 7' >解锁</div> -->
          <!-- <div class='link' v-if='$route.params.id>7' v-tap='{methods:handOut,id:visaInfo.VisaID,taskOrMassage:true}'>解锁2</div> -->

          <!-- 信息录入分配 -->
          <span v-if='modalId ==1'>
							<div v-if='visaInfo.InputPerson'>{{visaInfo.InputPerson}}</div>
							<div class="link" v-if='visaInfo.InputPerson' v-tap='{methods:handOut,id:visaInfo.VisaID,taskOrMassage:false,twoWrite:true}'>重新分配</div>
							<span class="link" v-else v-tap='{methods:handOut,id:visaInfo.VisaID,taskOrMassage:false,twoWrite:false}'>分配</span>
          </span>
          <!-- 任务分配 -->
          <span v-if='modalId ==3' class="link" v-tap='{methods:handOut,id:visaInfo.VisaID,taskOrMassage:true}'>分配</span>
          <span class='link' v-if='$route.params.id == 4' v-tap='{methods:handOut,id:visaInfo.VisaID,taskOrMassage:true}'>重新分配</span>
        </td>
        <!-- 签证状态 -->
        <td v-if='modalId ==11'>
          <span>已取消</span>
          <div v-if='visaInfo.CancelTime'>{{visaInfo.CancelTime.split("T")[0]}}</div>
        </td>
        <!-- 送签信息 -->
        <td v-if='modalId == 5'><span v-if='visaInfo.SendTime'>{{visaInfo.SendTime.split("T")[0]}}</span><br>{{visaInfo.SendUser}}</td>
        <!-- 送签结果 -->
        <td v-if='$route.params.id == 6'>
          <span v-if='visaInfo.VisaResult==="False"'>未通过</span>
          <span v-else>已通过</span>
          <div v-if='visaInfo.RecvedTime'>{{visaInfo.RecvedTime.split("T")[0]}}</div>
        </td>
        <td v-if='$route.params.id == 5'>
          <span class="link" v-tap='{methods:visaPass,id:visaInfo.VisaID,result:true}'>通过</span>
          <span class="link" v-tap='{methods:visaPass,id:visaInfo.VisaID,result:false}'>拒绝</span>
        </td>
        <!-- 操作 -->
        <td>
          <div class="lineTop">
            <span class="link" v-if='modalId != 7' v-tap='{methods:gocheckDetail,id:visaInfo.VisaID,country:visaInfo.Destination,isGroupVisa:visaInfo.IsGroupVisa}'>材料详情&nbsp;</span>
          </div>
          <div class="lineTop">
            <span class="link" v-if='modalId == "8" || modalId == "10"' v-tap='{methods:preApproveFun,id:visaInfo.VisaID}'>预审&nbsp;</span>
            <div v-tap='{methods:createSubmitFile,id:visaInfo.VisaID,country:visaInfo.Destination,isGroupVisa:visaInfo.IsGroupVisa}'>
              <span class="link" v-if='modalId == "9"||modalId>13'>打印</span>
              <span class="link" v-if='modalId== "9"||modalId>13'>/</span>
              <span class="link" v-if='modalId == "9"||modalId>13'>下载</span>
            </div>
            <span class="link" v-if="isUZ&&!visaInfo.IsGroupVisa" >
                <span class="import" v-if='modalId == "9"||modalId>13' v-tap='{methods:importData,id:visaInfo.VisaID,countryName:visaInfo.Destination}'>导入&nbsp;</span>
            </span>
            <span class="link" v-if="isUZ&&visaInfo.IsGroupVisa" >
                <span class="groupImport" v-if='modalId == "9"||modalId>13' v-tap='{methods:importData,id:visaInfo.VisaID,countryName:visaInfo.Destination}'>团导</span>
            </span>
            <span class="link" v-if='modalId == "9"||modalId>13' v-tap='{methods:sendSigned,id:visaInfo.VisaID}'>送签&nbsp;</span>
          </div>

          <div>
            <span class="link" v-if='modalId <7 || modalId == 11' v-tap='{methods:changeStatus,id:visaInfo.VisaID}'>
								状态修改
							</span>
            <span class="link" v-if='$route.params.id == 7' v-tap='{methods:writeInfo,id:visaInfo.VisaID,country:visaInfo.Destination,isGroupVisa:visaInfo.IsGroupVisa}'>录入信息</span>
          </div>
        </td>
      </tr>
    </table>
    <div class="page">
      <div class="p1">
        共有{{visaAllInfo.TotalCount}}条，当前第{{pageNum}}/{{visaAllInfo.TotalPageCount||1}}页
      </div>
      <div class="p2">
        <span @click='pageNum=1;goNum=""' v-tap='{methods:getIvisaList}'>&laquo;</span>
        <!--
						 --><span @click='pageNum<=1?pageNum=1:pageNum--;goNum=""' v-tap='{methods:getIvisaList}'>&lsaquo; </span>
        <!--
						 --><span class="blue">{{pageNum}}</span>
        <!--
						 --><span @click='pageNum>=visaAllInfo.TotalPageCount?visaAllInfo.TotalPageCount?pageNum=visaAllInfo.TotalPageCount:pageNum=1:pageNum++;goNum=""' v-tap='{methods:getIvisaList}'>&rsaquo;</span>
        <!--
						 --><span @click='pageNum=visaAllInfo.TotalPageCount;goNum=""' v-tap='{methods:getIvisaList}'>&raquo;</span>
      </div>
      <div class="p3"><input type="text" name="" v-model='goNum'></div>
      <div class="p4" v-tap='{methods:getIvisaList}'>GO</div>
    </div>
    <div class="otherLine" v-if='modalId == 3'>
      <input type="checkbox" v-model='checked' v-tap='{methods:selectAll}'>
      <button v-tap='{methods:handOut,id:checkboxId,taskOrMassage:true}'>批量分配</button>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
import HandOut from '../modal/HandOut.vue'
import Refuse from '../modal/Refuse.vue'
import PreApprove from '../modal/PreApprove.vue'
import NoPassResult from '../modal/NoPassResult.vue'
import ChangeStatus from '../modal/ChangeStatus.vue'
import AddGRroupNo from '../modal/AddGRroupNo.vue'

export default {
  data() {
    return {
      visaAllInfo: [],
      modalId: 1,
      modalPage: 1,
      checkboxId: [],
      checked: false,
      pageNum: 1,
      goNum: '',
      operaterList: [],
      refreshIds: [],
      payStatus: ["未付款", "部分付款", "已付款"], //0-未付款 1-部分  2-已付款
      isShowAll: "",
      searchInfo: {
        OrderNumber: "",
        Name: "",
        PassportNumber: "",
        Destination: "",
        OperateUserId: ""
      },
      disNum: 0,
      daoruIng: null,
      daoruIdAry: [],
      showIndex: this.$root.get("showIndex"),
      // countryName: ["澳大利亚", "美国EVUS", "新西兰","英国"],
      isUZ:false
    }
  },
  methods: {
    gocheckDetail(par) {
      // 材料详情
      // 1 2 3 7 8 10
      this.$store.state.visa.country = par.country
      this.$root.set("country", par.country)
      this.$root.set("isGroupVisa",par.isGroupVisa)
      this.$store.state.app.ivisaId = par.id
      this.$root.set("IvisaId", this.$store.state.app.ivisaId)
      if (this.$route.params.id == "7" || this.$route.params.id == "8" || this.$route.params.id == "9" || this.$route.params.id == "10") {
        this.$root.goRouter({
          router: '/taskWriteInfor/' + this.modalId
        })
      } else {
        this.$root.goRouter({
          router: '/materialDetail'
        })
      }
    },
    writeInfo(par) {
      // 录入信息
      this.$store.state.visa.country = par.country
      this.$root.set("country", par.country)
      this.$root.set("isGroupVisa",par.isGroupVisa)
      this.$store.state.app.ivisaId = par.id
      window.localStorage.setItem("IvisaId", this.$store.state.app.ivisaId)
      this.$root.goRouter({
        router: '/taskWriteInfor/' + this.modalId
      })
    },
    handOut(par) {

      if (par.id instanceof Array) {
        this.$store.state.app.ivisaIdGroup = par.id
        this.$store.state.app.ivisaId = ""
      } else {
        this.$store.state.app.ivisaId = par.id
        this.$store.state.app.ivisaIdGroup = []
      }
      this.$root.set("IvisaId", this.$store.state.app.ivisaId)

      this.$store.state.visa.taskOrMassage = par.taskOrMassage
      this.$store.state.visa.twoWrite = par.twoWrite

      if (this.$store.state.app.ivisaIdGroup.length > 0 || this.$store.state.app.ivisaId > 0) {
        this.handOutFrame = this.$layer.iframe({
          content: {
            content: HandOut,
            parent: this,
            data: []
          },
          title: "将任务分配给",
          move: false
        })
      } else {
        this.$layer.msg("请选择至少一个订单！")
      }
    },
    refuseMaterial(par) {
      this.$store.state.app.ivisaId = par.id
      this.$store.state.visa.rejectMeterial = par.result
      this.$store.state.visa.refuseInfo = par.info //拒签详情
      if (par.result) {
        // 签收
        this.$http.post(this.$store.state.app.host + 'api/Manage/PaperReceive', {
            UserVisaID: par.id,
            Result: par.result
          }, {
            headers: {
              Authorization: this.$store.state.app.token
            },
            timeout: this.$store.state.app.httpTime
          })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.getIvisaList()
              }
            },
            function(err) {
              this.$layer.msg("网络连接超时")
            }
          )

      } else {
        // 拒签
        this.refuseFrame = this.$layer.iframe({
          content: {
            content: Refuse,
            parent: this,
            data: []
          },
          title: "拒绝理由"
        })
      }

    },
    printFun(par) {
      this.$store.state.app.ivisaId = par.id
      this.$root.set("IvisaId", this.$store.state.app.ivisaId)
      // par.country = "新西兰"
      if (par.country == "新西兰") {
        this.$root.goRouter({
          router: '/resourcePrint_NZL'
        })
      } else {
        this.$root.goRouter({
          router: '/resourcePrint'
        })
      }

    },
    sendSigned(par) {
      this.$store.state.app.ivisaId = par.id
      this.$root.set("IvisaId", this.$store.state.app.ivisaId)
      this.$root.goRouter({
        router: '/sendPerson'
      })
    },
    selectAll(par) {
      this.disNum++
        var that = this

      this.visaAllInfo.SearchList.forEach(item => {
        item.isCheck = this.checked
        if (this.checked) {
          this.checkboxId.push(item.VisaID)
        } else {
          this.checkboxId.length = 0;
        }
      })
    },
    singleSelect(par) {
      var that = this
      var selectData = that.visaAllInfo.SearchList.filter(item => {
        return item.isCheck == true
      })
      selectData.length == that.visaAllInfo.SearchList.length ? that.checked = true : that.checked = false

      if (this.checkboxId.indexOf(par.id) > 0 || this.checkboxId.indexOf(par.id) == 0) {
        this.checkboxId.splice(this.checkboxId.indexOf(par.id), 1)
      } else {
        this.checkboxId.push(par.id)
      }
    },
    importData(par) {
			this.$root.set("IvisaId", par.id)
			this.$root.set("country", par.countryName)
      /*this.$http.post(this.$store.state.app.host + 'api/Manage/Import', {
          UserVisaId: par.id
        }, {
          headers: {
            Authorization: this.$store.state.app.token,
            async: "false"
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            res.data.Result.VisaId = par.id
            res.data.Result.Time = new Date().getTime()
            this.$root.set("daoruIng", par.id)
            this.$root.set("CanImport", "true")
            this.$root.set("country", par.countryName)
            if (this.$root.get("Allinfo")) {
              this.$root.remove("Allinfo")
            };
            this.$root.set("Allinfo", JSON.stringify(res.data.Result))
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )*/
    },
    preApproveFun(par) {
      this.$store.state.app.ivisaId = par.id
      this.$root.set("IvisaId", this.$store.state.app.ivisaId)
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo', {
          params: {
            userVisaId: par.id,
            isAllFiles: true
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.meterialDetail = res.data.Result

              var groupNum = null
              for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
                if (this.meterialDetail.GroupList[i].IsFilled) {
                  groupNum++
                }
              }
              if (groupNum != this.meterialDetail.GroupList.length) {
                this.$layer.msg("还有未添加的项，不能提交信息！")
              } else {
                if (this.modalId == "10") {
                  this.$http.get(this.$store.state.app.host + 'api/Manage/PreCheckResult', {
                      params: {
                        userVisaId: par.id
                      },
                      headers: {
                        Authorization: this.$store.state.app.token
                      },
                      timeout: this.$store.state.app.httpTime
                    })
                    .then(
                      function(res) {
                        if (res.data.Code == 0) {
                          this.$store.state.visa.approveResult = res.data.Result
                          this.preApproveFrame = this.$layer.iframe({
                            content: {
                              content: PreApprove,
                              parent: this,
                              data: []
                            },
                            title: "预审"
                          })
                        }
                      },
                      function(err) {
                        this.$layer.msg("网络连接超时")
                      }
                    )
                } else {
                  this.$store.state.visa.approveResult = ""
                  this.preApproveFrame = this.$layer.iframe({
                    content: {
                      content: PreApprove,
                      parent: this,
                      data: []
                    },
                    title: "预审"
                  })
                }
              }
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },

    getOperaters() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/GetOperaters', {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.operaterList = res.data.Result
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    refreshFun(par) {
      this.refreshIds = []
      if (par.id) {
        this.refreshIds.push(par.id)
      } else {
        for (var i = 0; i < this.visaAllInfo.SearchList.length; i++) {
          this.refreshIds.push(this.visaAllInfo.SearchList[i].VisaID)
        }
      }
      console.log(this.refreshIds)
      this.$http.post(this.$store.state.app.host + 'api/Manage/Refresh', {
        UserVisaId: this.refreshIds
      }, {
        headers: {
          Authorization: this.$store.state.app.token
        },
        timeout: this.$store.state.app.httpTime
      }).then(
        function(res) {
          // 暂时没有返回结果
          console.log(res.data.Result)
        },
        function(err) {
          this.$layer.msg("网络连接超时")
        }
      )
    },
    getIvisaList() {
      // 全部--true
      // 我的任务 -- false
      var wait = this.$layer.loading()
      this.checked = false
      if (window.localStorage.getItem('isIvisa')) {
        this.isShowAll = window.localStorage.getItem('isIvisa').indexOf("visa") > -1 ? "true" : "false"
      }

      if (this.goNum) this.pageNum = this.goNum
      this.$http.post(this.$store.state.app.host + 'api/Manage/Search', {
          OrderNumber: this.searchInfo.OrderNumber,
          Name: this.searchInfo.Name,
          PassportNumber: this.searchInfo.PassportNumber,
          Destination: this.searchInfo.Destination,
          OperateUserId: this.searchInfo.OperateUserId,
          Page: this.modalPage,
          IsShowAll: this.isShowAll,
          CurrentIndex: this.pageNum,
          ShowCount: 10
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.visaAllInfo = res.data.Result
              this.visaAllInfo.SearchList.forEach(item => {
                item.isCheck = false
              })
              var that = this
              setTimeout(function() {
                that.$layer.close(wait)
              }, 500)

              // console.log(this.visaAllInfo.SearchList)
            } else {
              this.$layer.close(wait)
            }
          },
          function(err) {
            this.$layer.close(wait)
            this.$layer.msg("网络连接超时")
          }
        )
    },
    visaPass(par) {
      this.$store.state.app.ivisaId = par.id
      this.$root.set("IvisaId", this.$store.state.app.ivisaId)
      if (par.result) {
        this.$http.post(this.$store.state.app.host + 'api/Manage/VisaPass', {
            UserVisaID: this.$store.state.app.ivisaId,
            VisaResult: par.result,
            Reason: ""
          }, {
            headers: {
              Authorization: this.$store.state.app.token
            },
            timeout: this.$store.state.app.httpTime
          })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.getIvisaList()
              }
            },
            function(err) {
              this.$layer.msg("网络连接超时")
            }
          )
      } else {
        this.NoPassResultFrame = this.$layer.iframe({
          content: {
            content: NoPassResult,
            parent: this,
            data: []
          },
          title: "拒绝理由"
        })
      }
    },
    changeStatus(par) {
      this.$store.state.app.ivisaId = par.id
      this.$root.set("IvisaId", this.$store.state.app.ivisaId)
      this.changeStatusFrame = this.$layer.iframe({
        content: {
          content: ChangeStatus,
          parent: this,
          data: []
        },
        // area:["300px","240px"],
        title: "将状态修改为"
      })
    },
    operationFun(par) {
      this.modalId = par.id
      this.modalPage = par.id
      this.pageNum = 1;
      this.goNum = "";
      this.getIvisaList()
    },
    createSubmitFile(par) {

      var wait = this.$layer.loading()
      // 生成模板文件
      // alert(par.id)

      this.$root.set("country", par.country)
      this.$root.set("isGroupVisa", par.isGroupVisa)

      // 生成模板文件
      /*if(this.countryName.indexOf(this.$store.state.visa.country)>-1){
          var CountryNumber = this.countryName.indexOf(this.$store.state.visa.country)+1
      }*/
      // 之前没有考虑到团签，现在考虑团签 防止以后再改国家的id 分开写 ！！！
      var countryId = null
      if(this.$root.get("isGroupVisa") == "true"){
          // 团签
          switch (this.$store.state.visa.country) {
              case "英国":
              countryId = "11"
              break;
              case "比利时":
              countryId = "13"
              break;
              case "美国":
              countryId = "14"
              break;
              case "法国":
              countryId = "15"
              break;
              case "意大利":
              countryId = "16"
              break;
              case "捷克":
              countryId = "17"
              break;
              case "瑞典":
              countryId = "18"
              break;
              case "西班牙":
              countryId = "20"
              break;
          }
      }else{
          // 个签
          switch (this.$store.state.visa.country) {
              case "澳大利亚":
              countryId = "1"
              break;
              case "美国EVUS":
              countryId = "2"
              break;
              case "新西兰":
              countryId = "3"
              break;
              case "英国":
              countryId = "4"
              break;
              case "法国":
              countryId = "5"
              break;
              case "比利时":
              countryId = "6"
              break;
              case "意大利":
              countryId = "7"
              break;
              case "奥地利":
              countryId = "8"
              break;
              case "捷克":
              countryId = "9"
              break;
              case "葡萄牙":
              countryId = "10"
              break;
              case "美国":
              countryId = "12"
              break;
              case "西班牙":
              countryId = "19"
              break;
              case "瑞典":
              countryId = "21"
              break;
          }
      }
      this.$http.post(this.$store.state.app.host + 'api/Manage/CreateSubmitFiles', {
          UserVisaID: par.id,
          CountryNumber: countryId
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.$layer.close(wait)
              this.printFun(par)
            } else {
              this.$layer.close(wait)
              this.$layer.msg(res.data.Message)
            }
          },
          function(err) {
            this.$layer.close(wait)
            this.$layer.msg("网络连接超时")
          }
        )
    },
    importFinish(id) {
      /*this.$http.get(this.$store.state.app.host + "api/Manage/SetImportOrPrintFinish", {
          params: {
            userVisaId: id,
            type: 1
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            this.$root.remove("over")
            this.getIvisaList()
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )*/
    },
    addGRroupNoFun(par) {
      this.$store.state.app.ivisaId = par.id
      this.addGroupNoFrame = this.$layer.iframe({
        content: {
          content: AddGRroupNo,
          parent: this,
          data: []
        },
        title: "添加编号"
      })
    }
  },
  created() {
      if(window.location.href.indexOf("uztest")>-1||window.location.href.indexOf("8060")>-1){
          this.isUZ = true
      }else{
          this.isUZ = false
      }
    // this.$store.state.app.host = this.$root.get("AppHost")
    this.$store.state.app.token = this.$root.get("AppToken")

    this.modalId = this.$route.params.id
    this.modalPage = this.$route.params.id
    this.getOperaters()
    this.getIvisaList()

    var that = this
    this.$root.eventHub.$on("MODEL_ID", function(obj) {
      that.modalId = obj.id
      that.modalPage = obj.id
      that.pageNum = 1
      that.getIvisaList()
    })
  },
  mounted() {
    // if(window.location.href.split("/")[3]){
    // 	window.location.href.split("/")[3].toLowerCase()
    // 	window.location.href =
    // }
    this.searchInfo.OrderNumber = ""
    this.searchInfo.Name = ""
    this.searchInfo.PassportNumber = ""
    this.searchInfo.Destination = ""
    this.searchInfo.OperateUserId = ""
    this.getIvisaList()
    var that = this
    this.$on('CLOSE', function(obj) {
      if (obj.closeName == 'handOutFrame') {
        that.$layer.close(that.handOutFrame)
      } else if (obj.closeName == 'refuseFrame') {
        that.$layer.close(that.refuseFrame)
      } else if (obj.closeName == "preApproveFrame") {
        that.$layer.close(that.preApproveFrame)
      } else if (obj.closeName == "NoPassResult") {
        that.$layer.close(that.NoPassResultFrame)
      } else if (obj.closeName == "changeStatusFrame") {
        that.$layer.close(that.changeStatusFrame)
      } else if (obj.closeName == "addGroupNoFrame") {
        that.$layer.close(that.addGroupNoFrame)
      }
      that.getIvisaList()
    })



  },
  updated() {
    /*var that = this
    if (this.modalId == "9") {
      var timer = setInterval(function() {
        if (that.$root.get("over")) {
          that.disNum = that.$root.get("over")
          that.importFinish(that.disNum)
        }


      }, 5000)
    } else {
      clearInterval(timer)
    }*/

  },
  components: {
    "HandOut": HandOut,
    "Refuse": Refuse,
    "NoPassResult": NoPassResult,
    "ChangeStatus": ChangeStatus,
    "AddGRroupNo": AddGRroupNo
  }
}
</script>
<style type="text/css">
@import url(./allVisaInfo.css);
</style>
