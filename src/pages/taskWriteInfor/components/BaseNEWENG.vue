<template>
<div class="page">
  <div class="title">
    {{$store.state.visa.groupName}}
  </div>
  <div id="pageENG">

  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      geolocation: "", //国家的列表
      userVisaInfo: "", //表信息
      outHeight: "",
      pmHeight: "",
      domDataValue: [],
      ceshi:""
    }
  },
  methods: {
    getCountry() {
      // 国家
      this.$http.get("./static/country.json").then(
        function(res) {
          this.geolocation = res.data.country
          this.$root.set("geolocation", JSON.stringify(this.geolocation))
        }
      )
    },
    getJson() {
      // 获取省市列表
      this.$http.get("./static/area.json").then(
        function(res) {
          this.area = res.data.data
          this.$store.state.app.area = res.data.data
          this.$root.set("area", JSON.stringify(this.area))
        })
    },
    getarea1() {
      // 省
      this.area1 = []
      for (var i = 0; i < this.$store.state.app.area.length; i++) {
        this.area1.push(this.$store.state.app.area[i].province)
      }
      return this.area1
    },
    getarea2(str) {
      // 市
      this.area2 = []
      this.area = this.$store.state.app.area
      if (this.area) {
        for (var i = 0; i < this.area.length; i++) {
          if (this.area[i].province.ValueENG == str) {

            this.area2 = this.area[i].city
            break;
          }
        }
      }
      return this.area2
    },
    // 获取表数据
    getGroupListInfo(id) {
      this.$http.get(this.$store.state.app.host + "api/Manage/GroupInfo", {
          params: {
            userVisaId: this.$store.state.app.ivisaId,
            groupId: id
          },
          headers: {
            Authorization: this.$store.state.app.token
          },
          timeout: this.$store.state.app.httpTime
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.requestOldData = JSON.parse(JSON.stringify(res.data.Result.ShowTagInfo))
              this.userVisaInfo = res.data.Result.ShowTagInfo

              var elCHS = $("#pageENG")
              $("#pageENG").html("")

              this.createDom(elCHS, this.userVisaInfo, 1)


            }

          }
        )
    },
    // 开头字母大写
    titleCase(str){
        if(str){
            var newarr, newarr1;
    		if (typeof str == "string") {
    			newarr = str.toLowerCase().split(" ");
    			for (var i = 0; i < newarr.length; i++) {
    				newarr[i] = newarr[i][0].toUpperCase() + newarr[i].substring(1, newarr[i].length);
    			}
    			newarr1 = newarr.join(" ");
    			return newarr1;
    		}
        }else {
            return ""
        }
    },
    //循环创建数据
    // 参数：父级  数据  层级
    createDom(parentEl, dataAry, level) {
      for (var i = 0; i < dataAry.length; i++) {
        this.dom(parentEl, dataAry[i], level, i, 0)
      }

    },
    // 创建dom元素
    // 参数： 父级 一条数据 父级的第几条
    dom(parentEl, dataObj, level, index, tagIndex) {
      this.geolocation = JSON.parse(this.$root.get("geolocation"))
      if (!dataObj.ValueENG && dataObj.DefaultValue) {
        dataObj.ValueENG = dataObj.DefaultValue.split("|")[1]
        dataObj.ValueCHS = dataObj.DefaultValue.split("|")[0]
        if (dataObj.DefaultValue.split("|")[1] == "CHINA") {
          dataObj.ValueENG = "China"
        }
      }
      var Div_info = $("<div class='div_info' x_FieldType='' x_Tag=''></div>")

      var info_label = $("<div class='info_label'></div>")
      var info_input = $("<input class='info_input value'>")
      var info_select = $("<select class='info_select value'></select>")

      $(Div_info).attr("x_FieldType", dataObj.FieldType)
      $(Div_info).attr("x_Tag", dataObj.Tag + "_" + tagIndex)
      $(Div_info).attr("x_val", dataObj.ValueCHS)
      $(Div_info).attr("x_fieldid", dataObj.FieldId)
      $(Div_info).attr("x_dependtag", dataObj.DependFieldTag)
      $(Div_info).append(info_label)


      $(info_label).text(dataObj.title.replace("（中文）","（拼音）") + ":")

      if (dataObj.FieldType == 2 && dataObj.Options === null) {
        // 国家
        dataObj.Options = this.geolocation
        $(Div_info).append(info_select)
        this.selectAddOption(info_select, this.geolocation, this.titleCase(dataObj.ValueENG))
        /*var that = this
        $(info_select).on("change",function(){
            if($(this).val() == "China"){
                var info_select = $("<select class='info_select value'></select>")
                var info_select1 = $("<select class='info_select value'></select>")
                $(parentEl).children().eq(index+1).find(".value").replaceWith(info_select)
                that.selectAddOption(info_select, that.getarea1(), dataObj.ValueCHS)
                $(info_select).on("change",function(){
                    $(parentEl).children().eq(index+2).find(".value").val("")
                })

                $(parentEl).children().eq(index+2).find(".value").replaceWith(info_select1)

                $(info_select1).on("mousedown", function() {
                  that.sheng = ""
                  if ($(parentEl).children().eq(index + 1).attr("x_fieldtype") == "3" && $(parentEl).children().eq(index + 1).attr("x_tag").split("_")[0] == $(parentEl).children().eq(index + 2).attr("x_dependtag")) {
                    that.sheng = $(parentEl).children().eq(index + 1).find(".value").val()
                  }

                  that.selectAddOption(info_select1, that.getarea2(that.sheng), dataObj.ValueCHS)
                })
            }else{
                var info_input = $("<input class='info_input value'>")
                var info_input1 = $("<input class='info_input value'>")
                $(parentEl).children().eq(index+1).find(".value").replaceWith(info_input)
                $(parentEl).children().eq(index+2).find(".value").replaceWith(info_input1)
            }
        })*/

      } else if (dataObj.FieldType == 3) {
        // 省
        this.guojia = ""
        if ($(parentEl).children().eq(index - 1).attr("x_fieldtype") == "2" && $(parentEl).children().eq(index - 1).attr("x_tag").split("_")[0] == dataObj.DependFieldTag) {
          this.guojia = $(parentEl).children().eq(index - 1).find(".value").val()
        }

        if (this.guojia == "China") {
          $(Div_info).append(info_select)
          this.selectAddOption(info_select, this.getarea1(), dataObj.ValueENG)
        } else {
          $(Div_info).append(info_input)
          $(info_input).val(dataObj.ValueENG)
        }

      } else if (dataObj.FieldType == 4) {
        // 市
        if ($(parentEl).children().eq(index - 2).attr("x_fieldtype") == "2") {
          this.guojia = $(parentEl).children().eq(index - 2).find(".value").val()
        }
        if (this.guojia == "China") {
          $(Div_info).append(info_select)
          this.sheng = ""

          if ($(parentEl).children().eq(index - 1).attr("x_fieldtype") == "3" && $(parentEl).children().eq(index - 1).attr("x_tag").split("_")[0] == dataObj.DependFieldTag) {
            // 这么写 字段表的顺序必须是 国家-省-市 不然就会出错
            // 别的方法还不知道怎么写 想到再改
            this.sheng = $(parentEl).children().eq(index - 1).find(".value").val()
          }
          this.selectAddOption(info_select, this.getarea2(this.sheng), dataObj.ValueENG)
          var that = this
          $(info_select).on("mousedown", function() {
            that.sheng = ""

            if ($(parentEl).children().eq(index - 1).attr("x_fieldtype") == "3" && $(parentEl).children().eq(index - 1).attr("x_tag").split("_")[0] == dataObj.DependFieldTag) {
              that.sheng = $(parentEl).children().eq(index - 1).find(".value").val()
            }
            that.selectAddOption(info_select, that.getarea2(that.sheng), dataObj.ValueENG)
          })
        } else {
          $(Div_info).append(info_input)
          $(info_input).val(dataObj.ValueENG)
        }
      } else if (dataObj.Options) {
        // 下拉框 select
        $(info_select).attr("disabled", dataObj.Disabled)
        $(Div_info).append(info_select)
        if(!dataObj.ValueENG){
            for (var i = 0; i < dataObj.Options.length; i++) {
                if(dataObj.Options[i].Value == dataObj.ValueCHS){
                    dataObj.ValueENG = dataObj.Options[i].ValueENG
                }
            }
        }

        this.selectAddOption(info_select, dataObj.Options, dataObj.ValueENG)
        this.selectChange(info_select, Div_info, dataObj, $(info_select).val())

        var that = this
        $(info_select).on("change", function() {

          that.selectChange(info_select, Div_info, dataObj, $(info_select).val())

        })


      } else {
        // 输入框 input
        if(dataObj.ValueENG == "长期"){
            dataObj.ValueENG = "long"
        }
        $(info_input).val(dataObj.ValueENG)
        $(info_input).attr("disabled", dataObj.Disabled)
        if($(Div_info).find(".info_input").attr("id")&&$(Div_info).find(".info_input").attr("id").indexOf("mobiscroll") > -1){
            $(Div_info).find(".info_input").mobiscroll('getInst').destroy()
            $(Div_info).find(".info_input").attr("id","")
        }
        switch (dataObj.FieldType) {
          case 0:
            $(info_input).attr("type", "text")
            // $(info_input).val(dataObj.ValueENG)
            // $(info_input).attr("disabled", dataObj.Disabled)
            $(info_input).prev().css("width", "400px")

            if (dataObj.Tag.match(new RegExp(/^GP/))) {
              // console.log($(info_label));
              $(info_label).css("width", "300px")
              // Tag 开头为GP的 直接显示children里边的内容
              $(info_input).hide()
              this.addGPData($(info_input), Div_info, dataObj.Children)
            }
            break;
          case 1:
            // 年月日
            $(info_input).attr("type", "text")
            // $(info_input).val(dataObj.ValueCHS)
            // $(info_input).attr("disabled", dataObj.Disabled)
            this.addTimePlugin(info_input, dataObj)
            break;
          case 5:
            // 数字
            $(info_input).attr("type", "Number")
            break;
          case 6:
            // 年月
            $(info_input).attr("type", "text")
            // $(info_input).val(dataObj.ValueCHS)
            // $(info_input).attr("disabled", dataObj.Disabled)
            this.addTimePlugin(info_input, dataObj)
            break;
        }

        $(Div_info).append(info_input)
        var allElCHS = $("#pageENG").children().children().eq(1).children()
        for (var i = 0; i < allElCHS.length; i++) {
          if ($(allElCHS[i]).find("input").attr("id") && $(allElCHS[i]).find("input").attr("id").indexOf("mobiscroll") > -1) {
            $(allElCHS[i]).find("input").mobiscroll('getInst').destroy()
            $(allElCHS[i]).find("input").attr("id", "")
          }
        }
        // console.log(this);
        var that = this
        $(info_input).on("blur", function() {
          that.VerifyTypeFun($(info_input).val(), dataObj.VerifyType)
        })

      }

      var that = this
      $(info_select).on("change", function() {
        var info_select = this
        that.selectChange(info_select, Div_info, dataObj, $(info_select).val())
        that.$root.eventHub.$emit("SELECTCHANGEENG", {
          Tag: $(info_select).parent().attr("x_tag"),
          SelectedIndex: $(info_select)[0].selectedIndex,
          DataObj: dataObj
        })
      })
      $(parentEl).append(Div_info)

    },
    selectAddOption(el, dataAry, selectValue) {
      $(el).html("")
      $(el).append($("<option value=''></option>"))
      if (!dataAry) {
        return
      }
      for (var i = 0; i < dataAry.length; i++) {
        var info_select_option = $("<option value=''></option>")
        $(info_select_option).html(dataAry[i].ValueENG)
        $(info_select_option).attr("value", dataAry[i].ValueENG)
        $(el).append($(info_select_option))
        // console.log(selectValue,dataAry[i].ValueENG,i);
        if (selectValue == dataAry[i].ValueENG) {
          $(el)[0].selectedIndex = i + 1
        }
      }
    },
    selectChange(el, parentEl, dataObj, selectValue) {
      if (dataObj.Options&&!isNaN(dataObj.Options[dataObj.Options.length - 1].ValueENG) && dataObj.Options[dataObj.Options.length - 1].Value == dataObj.Options[dataObj.Options.length - 1].ValueENG) {

          if($(el)[0].selectedIndex>0&&dataObj.Children.length>0){
              this.moreSelectChange(el, parentEl, dataObj, selectValue)
          }
      } else if (dataObj.FieldType == 2) {
        if (selectValue == "China") {
            var that = this
            if($(parentEl).next().attr("x_fieldtype") == 3){
                var info_select = $("<select class='info_select value'></select>")
                $(parentEl).next().children(".value").replaceWith(info_select)
                this.selectAddOption(info_select, this.getarea1(), "")
                $(parentEl).next().children(".value").on("change",function(){
                    that.$root.eventHub.$emit("SELECTCHANGEENG",{
                        Tag: $(parentEl).next().attr("x_tag"),
                        SelectedIndex:$(parentEl).next().children(".value")[0].selectedIndex,
                        DataObj:{FieldType:3}
                    })
                })
            }
            if($(parentEl).next().next().attr("x_fieldtype") == 4){
                 var info_select1 = $("<select class='info_select value'></select>")
                 $(parentEl).next().next().children(".value").replaceWith(info_select1)
                 $(info_select1).on("mousedown",function(){
                     that.selectAddOption(info_select1, that.getarea2($(parentEl).next().children(".value").val()), "")
                 })
                 $(info_select1).on("change",function(){
                     that.$root.eventHub.$emit("SELECTCHANGEENG",{
                         Tag: $(parentEl).next().next().attr("x_tag"),
                         SelectedIndex:$(parentEl).next().next().children(".value")[0].selectedIndex,
                         DataObj:{FieldType:4}
                     })
                 })
            }
        } else {
            var that = this
            if($(parentEl).next().attr("x_fieldtype") == 3){
                var info_input = $("<input class='info_input value'>")
                $(parentEl).next().children(".value").replaceWith(info_input)
            }
            if($(parentEl).next().next().attr("x_fieldtype") == 4){
                var info_input1 = $("<input class='info_input value'>")
                $(parentEl).next().next().children(".value").replaceWith(info_input1)
            }
        }
      } else if (dataObj.FieldType == 3) {
        // console.log(el, parentEl, dataObj, selectValue);
        $(parentEl).next().children(".value").val("")
      } else if (dataObj.FieldType == 4) {
        // console.log(el, parentEl, dataObj, selectValue);
      } else {

        if ($(parentEl).find(".nextlevel").length > 0) {
          $(parentEl).find(".nextlevel").remove()
        }
        //
        if(selectValue){
            var el_OptionIndex = $(el)[0].selectedIndex
        }else {
            for (var i = 0; i < dataObj.Options.length; i++) {
                if(dataObj.Options[i].Value == dataObj.ValueCHS){
                    var el_OptionIndex = i+1
                    dataObj.ValueENG = dataObj.Options[i].ValueENG
                }
            }
        }

        var Next_info = $("<div class='nextlevel'></div>")
        $(parentEl).append(Next_info)
        var domDataAry = []
        for (var i = 0; i < dataObj.Children.length; i++) {
          for (var j = 0; j < dataObj.Children[i].length; j++) {
            if (dataObj.Children[i][j].OptionIndex == el_OptionIndex) {
              domDataAry.push(dataObj.Children[i][j])
            }
          }
        }

        for (var i = 0; i < domDataAry.length; i++) {
          // 参数： 父级 一条数据 层级 父级的第几条
          // dom(parentEl, dataObj, level, index)
          this.dom(Next_info, domDataAry[i], 2, i, 0)
        }
      }



    },
    moreSelectChange(el, parentEl, dataObj, selectValue) {
      if ($(parentEl).find(".nextlevel").length > 0) {
        $(parentEl).find(".nextlevel").remove()
      }
      // var el_OptionIndex = dataObj.Options.length
      var xunhuanNumber = $(el).val()
      if (isNaN(xunhuanNumber)) {
        xunhuanNumber = 0
      }


      var domDataAry = []
      // 看一个人有几条信息
      // 然后根据这个aryLen 来拆分原有数据
      /*
      //因为后台的翻译规则不对  不能这么判断取值
      if (dataObj.ValueCHS == "无" || dataObj.ValueCHS == "0" || dataObj.ValueCHS == null) {
        var aryLen = dataObj.Children[0].length
      } else {
        var aryLen = dataObj.Children[0].length / dataObj.ValueCHS
      }*/
      // 取循环数据的第一个字段的tag 判断这个tag出现了几次就有几个人
      //然后找到一个人有几条字段数据
      var tagNum = 0
      var x_tag = dataObj.Children[0][0].Tag
      for(var i = 0;i<dataObj.Children[0].length;i++){
          if(dataObj.Children[0][i].Tag == x_tag){
              tagNum++
          }
      }
      var aryLen = dataObj.Children[0].length / tagNum


      for (var i = 0; i < dataObj.Children[0].length; i += aryLen) {
        domDataAry.push(dataObj.Children[0].slice(i, i + aryLen))
      }
      // console.log("多人处理",xunhuanNumber);
      if (xunhuanNumber > domDataAry.length) {
        for (var m = 0, len = Number(xunhuanNumber) - domDataAry.length; m < len; m++) {
          var m_ary = []
          var xunhuan_domDataAry = JSON.parse(JSON.stringify(domDataAry[0]))
          for (var i = 0; i < xunhuan_domDataAry.length; i++) {
            xunhuan_domDataAry[i].ValueCHS = ""
            xunhuan_domDataAry[i].ValueENG = ""
            m_ary.push(xunhuan_domDataAry[i])
          }
          domDataAry.push(m_ary)
        }
      }else{
          domDataAry.length = xunhuanNumber
      }
      for (var i = 0; i < xunhuanNumber; i++) {
        var Next_info = $("<div class='nextlevel'></div>")
        $(Next_info).html("")
        $(parentEl).append(Next_info)
        for (var j = 0; j < domDataAry[i].length; j++) {
          this.dom(Next_info, domDataAry[i][j], 2, j, i)
        }

      }

    },
    addTimePlugin(el, dataObj) {
      // console.log(dataObj.Disabled)
      if(dataObj.Disabled){
          return
      }
      if (dataObj.FieldType == "1") {
        // 年月日
        var that = this
        $(el).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: new Date().getFullYear() + 20,
          dateFormat: "yyyy-mm-dd",
          dateOrder: "yyyymmdd",
          onSelect: function(event, inst) {
            console.log(123);
            that.VerifyTypeFun(event, dataObj.VerifyType)
          }
        });
      } else if (dataObj.FieldType == "6") {
        // 年月
        var that = this
        $(el).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: new Date().getFullYear() + 20,
          dateFormat: "yyyy-mm",
          dateOrder: "yyyymm",
          onSelect: function(event, inst) {
            that.VerifyTypeFun(event, dataObj.VerifyType)

          }
        });
      }
    },
    addGPData(el, parentEl, dataAry) {
      // Tag 开头为GP的 直接显示children里边的内容
      if ($(parentEl).find(".nextlevel").length > 0) {
        $(parentEl).find(".nextlevel").remove()
      }
      var Next_info = $("<div class='nextlevel'></div>")
      $(parentEl).append(Next_info)

      for (var i = 0; i < dataAry.length; i++) {
        for (var j = 0; j < dataAry[i].length; j++) {
          this.dom(Next_info, dataAry[i][j], 2, j, 0)
        }
      }

    },
    VerifyTypeFun(value, type) {
      if (value && type == 2) { //护照号码验证
        var reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[0-9A-Za-z]{9}$/
        if (value.match(reg) == null) {
          this.$layer.alert('请输入正确的护照号')
        } else {}
      }
      if (value && type == 4) { //邮箱验证
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (value.match(reg) == null) {
          this.$layer.alert('请输入正确的邮箱格式')
        } else {}
      }
      if (value && type == 1) { //身份证有效期
        if (this.$root.verifyDay(value) < 180) {
          this.$layer.alert('您的身份证有效期已不满六个月，请到相应机构办理新的身份证后再进行办理。')
        } else {}
      }
      if (value && type == 3) { //护照有效期

        if (this.$root.verifyDay(value) < 180) {

          this.$layer.alert("您的护照有效期已不满六个月，请到相应机构换发新护照后再进行办理，并留出充足的签证办理时间，以免耽误您的出行。")
        } else {}
      }
      if (value && type == 6) { //出发日期不能为今天及以前
        this.outDate = value
        if (this.$root.verifyDay(value) < 0) {
          this.$layer.alert("出发日期不能为今天及以前的日期，请选择正确日期。")
        } else {}
      }
      if (value && type == 7) { //回国日期不能为出行日期及以前
        if (this.$root.verifyDay(value) <= 0) {
          this.$layer.alert('回国日期不能为出发日期当天及以前的日期，请选择正确日期。')
        } else {
          if (this.$root.verifyDay1(value, this.outDate) <= 0) {
            this.$layer.alert('回国日期不能为出发日期当天及以前的日期，请选择正确日期。')
          } else {}
        }
      }
    },

    translateFun() {
        // this.changeOldData()
      this.domDataValue = []
      this.getValue($("#pageENG"), this.domDataValue)
    },
    getValue(parentEl, valueAry) {
      // console.log("translate");
      var domAll = $(parentEl).children()
      var arr = []
      for (var i = 0; i < domAll.length; i++) {
        var obj = {
          Tag: "",
          FieldId: "",
          ValueCHS: "",
          ValueENG: "",
          Children: [],
        }
        obj.Tag = $(domAll).eq(i).attr("x_tag").split("_")[0]
        obj.FieldId = $(domAll).eq(i).attr("x_fieldid")
        obj.ValueCHS = $(domAll).eq(i).attr("x_val")
        obj.ValueENG = $(domAll).eq(i).children(".value").val()
        arr.push(obj)
        if ($(domAll).eq(i).children(".nextlevel").length > 0 && $(domAll).eq(i).children(".nextlevel").html()) {
          for (var j = 0; j < $(domAll).eq(i).children(".nextlevel").length; j++) {
            this.getValue($(domAll).eq(i).children(".nextlevel")[j], arr[i].Children)
          }
        }

      }
      valueAry.push(arr)
      console.log(valueAry);
    }
  },
  created() {
    this.$store.state.app.ivisaId = this.$root.get('IvisaId')
    this.$store.state.app.token = this.$root.get('AppToken')
    //省市
    this.getCountry()
    this.getJson()
  },
  mounted() {
    var that = this
    this.getGroupListInfo(this.$store.state.visa.groupId)
    this.$root.eventHub.$on("GROUPID", function(obj) {
      that.getGroupListInfo(obj.groupId)

    })
    this.$root.eventHub.$on("SELECTCHANGE", function(obj) {
        // 写这个就是为了在省份改变的时候 市随着改变一下 下拉框的值
      $("#pageENG").find("div[x_tag=" + obj.Tag + "]").find(".value").mousedown()

      $("#pageENG").find("div[x_tag=" + obj.Tag + "]").find(".value")[0].selectedIndex = obj.SelectedIndex
      var info_select = $("#pageENG").find("div[x_tag=" + obj.Tag + "]").find(".value")
      var Div_info = $("#pageENG").find("div[x_tag=" + obj.Tag + "]")
      var dataObj = obj.DataObj
      that.selectChange(info_select, Div_info, dataObj, $(info_select).val())

    })
    this.$root.eventHub.$on("TRANSLATEOK",function(obj){
        var elCHS = $("#pageENG")
        $("#pageENG").html("")
        that.createDom(elCHS, obj.info, 1)
    })
    this.$root.eventHub.$on("SAVEOK",function(obj){
        that.getGroupListInfo(that.$root.get('GroupId'))
    })
  },

  destroyed() {
    //do something after destroying vue instance
    this.$root.eventHub.$off("GROUPID")
    this.$root.eventHub.$off("SELECTCHANGE")
    this.$root.eventHub.$off("TRANSLATEOK")
    this.$root.eventHub.$off("SAVEOK")
  }

}
</script>
<style lang="scss" scoped src="../css/baseCHS.scss">
</style>
