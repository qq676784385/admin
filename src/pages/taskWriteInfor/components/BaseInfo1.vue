<template>
  <div :class='outHeight<pmHeight?"realHeight":""'>
    <div id='out' class='baseInfoOut'>
      <div class="part">
        <div class="partTitle">
          <p>{{$store.state.visa.groupName}}<span style="display: none;">{{testNum}}</span></p>
        </div>
        <div :class='$store.state.visa.groupName!="众信"?"partList":""'>
          <div class="marginBotm" v-for='(info,index) in userVisaInfo.ShowTagInfo'>
            <span v-if='info.IsMust'>*</span>
            <label :class='$store.state.visa.groupName=="众信"?"addWidth":""'><span :class='info.Children[0]&&info.Children[0].length?"boldFont":""' v-html='info.title.replace("\n","<br/>")'></span><span>:</span></label>
            <br v-if='$store.state.visa.groupName=="众信"'>
            <input type='text' v-model='info.ValueCHS' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType !=1&&info.FieldType !=6' @blur="inputVal(info.ValueCHS,info.Tag,info,true)" @focus="focusInput(info)" :disabled='info.Disabled'>
            <input type='date' v-model='info.ValueCHS' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType ==1' @blur="inputVal(info.ValueCHS,info.Tag,info,true)" @focus="focusInput(info)" :disabled='info.Disabled'>
            <input type='month' v-model='info.ValueCHS' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType ==6' @blur="inputVal(info.ValueCHS,info.Tag,info,true)" @focus="focusInput(info)" :disabled='info.Disabled'>
            <select :id='info.Tag+"_C"' v-if='info.Options&&!info.Tag.match(new RegExp(/^GP/))' @change="selectVal($event.target.selectedIndex,info.Tag,info)" v-model='info.ValueCHS' @click='clickSelect($event,info)' :disabled='info.Disabled'>
              <option v-for='(opt,optIndex) in info.Options' :value='opt.Value'>{{opt.Value}}</option>
            </select>
            <div class="secondLevel" :id="'C_'+info.Tag+index2" v-for='(info2,index2) in returnInfo(info.ValueCHS,info.ValueENG,info.Tag,info)'>
              <div :class="info3.Tag" v-for='(info3,index3) in info2'>
                <label><span v-html='info3.title.replace("\n","<br/>")'></span><span>：</span></label>
                <span :id='info3.Tag+"_CX"'>
                  <input type="text" v-model='info3.ValueCHS' v-if='!info3.Options&&info3.FieldType !=1&&info3.FieldType !=6' @blur="inputVal(info3.ValueCHS,info.Tag,info3,true,index2)"  @focus="focusInput(info3)" :disabled='info3.Disabled'>
                  <input type="date" v-model='info3.ValueCHS' v-if='!info3.Options&&info3.FieldType ==1' @blur="inputVal(info3.ValueCHS,info.Tag,info3,true,index2)"  @focus="focusInput(info3)" :disabled='info3.Disabled'>
                  <input type="month" v-model='info3.ValueCHS'  v-if='!info3.Options&&info3.FieldType ==6' @blur="inputVal(info3.ValueCHS,info.Tag,info3,true,index2)"  @focus="focusInput(info3)" :disabled='info3.Disabled'>
                  <select :id='info3.Tag+"_C"' v-if='info3.Options' @change="selectVal($event.target.selectedIndex,info.Tag,info3,index2)" v-model='info3.ValueCHS' :disabled='info3.Disabled'>
                    <option v-for='(opt3,optindex3) in info3.Options' :value='opt3.Value'>{{opt3.Value}}</option>
                  </select>
                </span>
                <div :class="'secondLevel CHS '+ info3.Tag" v-for='(info4,index4) in returnInfo(info3.ValueCHS,info3.ValueENG,info3.Tag,info3)'>
                  <div :class="info5.Tag" v-for='(info5,index5) in info4'>
                    <label><span v-html='info5.title.replace("\n","<br/>")'></span><span>：</span></label>
                    <input :id="info3.Tag+'_C'+index4" type="text" name="" v-model='info5.ValueCHS' v-if='!info5.Options&&info5.FieldType !=1&&info5.FieldType !=6' @blur="inputVal(info5.ValueCHS,info3.Tag,info5,true,index4)" @focus="focusInput(info5)" :disabled='info5.Disabled'>
                    <input :id="info3.Tag+'_C'+index4" type="date" name="" v-model='info5.ValueCHS' v-if='!info5.Options&&info5.FieldType ==1' @blur="inputVal(info5.ValueCHS,info3.Tag,info5,true,index4)" @focus="focusInput(info5)" :disabled='info5.Disabled'>
                    <input :id="info3.Tag+'_C'+index4" type="month" name="" v-model='info5.ValueCHS' v-if='!info5.Options&&info5.FieldType ==6' @blur="inputVal(info5.ValueCHS,info3.Tag,info5,true,index4)" @focus="focusInput(info5)" :disabled='info5.Disabled'>
                    <select :id="info3.Tag+'_C'+index4" v-if='info5.Options' @change="selectVal($event.target.selectedIndex,info3.Tag,info5,index4)" v-model='info5.ValueCHS' :disabled='info5.Disabled'>
                      <option v-for='(opt5,optindex5) in info5.Options' :value='opt5.Value'>{{opt5.Value}}</option>
                    </select>
                    <div class="secondLevel" v-for='(info6,index6) in returnInfo(info5.ValueCHS,info5.ValueENG,info5.Tag,info5)'>
                      <div :class="info7.Tag" v-for='(info7,index7) in info6'>
                        <label><span v-html='info7.title.replace("\n","<br/>")'></span><span>：</span></label>
                        <input type="text" name="" v-model='info7.ValueCHS' v-if='!info7.Options&&info7.FieldType !=1&&info7.FieldType !=6' @blur="inputVal(info.ValueCHS,info7.Tag,info7,true,index4)" @focus="focusInput(info7)" :disabled='info7.Disabled'>
                        <input type="date" name="" v-model='info7.ValueCHS' v-if='!info7.Options&&info7.FieldType ==1' @blur="inputVal(info.ValueCHS,info7.Tag,info7,true,index4)" @focus="focusInput(info7)" :disabled='info7.Disabled'>
                        <input type="month" name="" v-model='info7.ValueCHS' v-if='!info7.Options&&info7.FieldType ==6' @blur="inputVal(info.ValueCHS,info7.Tag,info7,true,index4)" @focus="focusInput(info7)" :disabled='info7.Disabled'>
                        <select v-if='info7.Options' @change="selectVal($event.target.selectedIndex,info7.Tag,info7)" v-model='info7.ValueCHS' :disabled='info7.Disabled'>
                          <option v-for='(opt7,optindex7) in info7.Options' :value='opt7.Value'>{{opt7.Value}}</option>
                        </select>
                        <div class="secondLevel" v-for='(info8,index8) in returnInfo(info7.ValueCHS,info7.ValueENG,info7.Tag,info7)'>
                          <div :class="info9.Tag" v-for='(info9,index9) in info8'>
                            <label><span v-html='info9.title.replace("\n","<br/>")'></span><span>：</span></label>
                            <input type="text" name="" v-model='info9.ValueCHS' v-if='!info9.Options&&info9.FieldType !=1&&info9.FieldType !=6' @blur="inputVal(info.ValueCHS,info9.Tag,info9,true)" @focus="focusInput(info9)" :disabled='info9.Disabled'>
                            <input type="date" name="" v-model='info9.ValueCHS' v-if='!info9.Options&&info9.FieldType ==1' @blur="inputVal(info.ValueCHS,info9.Tag,info9,true)" @focus="focusInput(info9)" :disabled='info9.Disabled'>
                            <input type="month" name="" v-model='info9.ValueCHS' v-if='!info9.Options&&info9.FieldType ==6' @blur="inputVal(info.ValueCHS,info9.Tag,info9,true)" @focus="focusInput(info9)" :disabled='info9.Disabled'>
                            <select v-if='info9.Options' @change="selectVal($event.target.selectedIndex,info9.Tag,info9)" v-model='info9.ValueCHS' :disabled='info9.Disabled'>
                              <option v-for='(opt9,optindex9) in info9.Options' :value='opt9.ValueCHS'>{{opt9.ValueCHS}}</option>
                            </select>
                            <div class="secondLevel" v-for='(info10,index10) in returnInfo(info9.ValueCHS,info9.ValueENG,info9.Tag,info9)'>
                              <div :class="info11.Tag" v-for='(info11,index11) in info10'>
                                <label><span v-html='info11.title.replace("\n","<br/>")'></span><span>：</span></label>
                                <input type="text" name="" v-model='info11.ValueCHS' v-if='!info11.Options&&info11.FieldType !=1&&info11.FieldType !=6' @blur="inputVal(info.ValueCHS,info11.Tag,info11,true)" @focus="focusInput(info11)" :disabled='info11.Disabled'>
                                <input type="date" name="" v-model='info11.ValueCHS' v-if='!info11.Options&&info11.FieldType ==1' @blur="inputVal(info.ValueCHS,info11.Tag,info11,true)" @focus="focusInput(info11)" :disabled='info11.Disabled'>
                                <input type="month" name="" v-model='info11.ValueCHS' v-if='!info11.Options&&info11.FieldType ==6' @blur="inputVal(info.ValueCHS,info11.Tag,info11,true)" @focus="focusInput(info11)" :disabled='info11.Disabled'>
                                <select v-if='info11.Options' @change="selectVal($event.target.selectedIndex,info11.Tag,info11)" v-model='info11.ValueCHS' :disabled='info11.Disabled'>
                                  <option v-for='(opt11,optindex11) in info11.Options' :value='opt11.Value'>{{opt11.Value}}</option>
                                </select>
                                <div class="secondLevel" v-for='(info12,index12) in returnInfo(info11.ValueCHS,info11.ValueENG,info11.Tag,info11)'>
                                  <div :class="info13.Tag" v-for='(info13,index13) in info12'>
                                    <label><span v-html='info13.title.replace("\n","<br/>")'></span><span>：</span></label>
                                    <input type="text" name="" v-model='info13.ValueCHS' v-if='!info13.Options&&info13.FieldType !=1&&info13.FieldType !=6' @blur="inputVal(info.ValueCHS,info13.Tag,info13,true)" @focus="focusInput(info13)" :disabled='info13.Disabled'>
                                    <input type="date" name="" v-model='info13.ValueCHS' v-if='!info13.Options&&info13.FieldType ==1' @blur="inputVal(info.ValueCHS,info13.Tag,info13,true)" @focus="focusInput(info13)" :disabled='info13.Disabled'>
                                    <input type="month" name="" v-model='info13.ValueCHS' v-if='!info13.Options&&info13.FieldType ==6' @blur="inputVal(info.ValueCHS,info13.Tag,info13,true)" @focus="focusInput(info13)" :disabled='info13.Disabled'>
                                    <select v-if='info13.Options' @change="selectVal($event.target.selectedIndex,info13.Tag,info13)" v-model='info13.ValueCHS' :disabled='info13.Disabled'>
                                      <option v-for='(opt13,optindex13) in info13.Options' :value='opt13.Value'>{{opt13.Value}}</option>
                                    </select>
                                    <div class="secondLevel" v-for='(info14,index14) in returnInfo(info13.ValueCHS,info13.ValueENG,info13.Tag,info13)'>
                                      <div :class="info15.Tag" v-for='(info15,index15) in info14'>
                                        <label><span v-html='info15.title.replace("\n","<br/>")'></span><span>：</span></label>
                                        <input type="text" name="" v-model='info15.ValueCHS' v-if='!info15.Options&&info15.FieldType !=1&&info15.FieldType !=6' @blur="inputVal(info.ValueCHS,info15.Tag,info15,true)" @focus="focusInput(info15)" :disabled='info15.Disabled'>
                                        <input type="date" name="" v-model='info15.ValueCHS' v-if='!info15.Options&&info15.FieldType ==1' @blur="inputVal(info.ValueCHS,info15.Tag,info15,true)" @focus="focusInput(info15)" :disabled='info15.Disabled'>
                                        <input type="month" name="" v-model='info15.ValueCHS' v-if='!info15.Options&&info15.FieldType ==6' @blur="inputVal(info.ValueCHS,info15.Tag,info15,true)" @focus="focusInput(info15)" :disabled='info15.Disabled'>
                                        <select v-if='info15.Options' @change="selectVal($event.target.selectedIndex,info15.Tag,info15)" v-model='info15.ValueCHS' :disabled='info15.Disabled'>
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
      <div class="part" v-if='$store.state.visa.groupName!="众信"'>
        <div class="partTitle">
          <p>{{$store.state.visa.groupName}}<span style="display: none;">{{testNum}}</span></p>
        </div>
        <div>
          <div class="marginBotm" v-for='(info,index) in userVisaInfo.ShowTagInfo' :key='info.FileId'>
            <span v-if='info.IsMust'>*</span>
            <label><span :class='info.Children[0]&&info.Children[0].length?"boldFont":""' v-html='info.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
            <input type="text" name="" v-model='info.ValueENG' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType !=1&&info.FieldType !=6' @blur="inputVal(info.ValueENG,info.Tag,info,false)" @focus="focusInput(info)" :disabled='info.Disabled'>
            <input type="date" name="" v-model='info.ValueENG' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType ==1' @blur="inputVal(info.ValueENG,info.Tag,info,false)" @focus="focusInput(info)" :disabled='info.Disabled'>
            <input type="month" name="" v-model='info.ValueENG' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType ==6' @blur="inputVal(info.ValueENG,info.Tag,info,false)" @focus="focusInput(info)" :disabled='info.Disabled'>
            <select :id='info.Tag+"_E"' v-if='info.Options&&!info.Tag.match(new RegExp(/^GP/))' @change="selectVal($event.target.selectedIndex,info.Tag,info)" v-model='info.ValueENG' @click='clickSelect($event,info)' :disabled='info.Disabled'>
              <option v-for='(opt,optIndex) in info.Options' :value='opt.ValueENG'>{{opt.ValueENG}}</option>
            </select>
            <div class="secondLevel" :id='info.Tag' v-for='(info2,index2) in returnInfo(info.ValueCHS,info.ValueENG,info.Tag,info)'>
              <div v-for='(info3,index3) in info2'>
                <label><span v-html='info3.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                <span :id='info3.Tag+"_EX"'>
                  <input type="text" name="" v-model='info3.ValueENG' v-if='!info3.Options&&info3.FieldType !=1&&info3.FieldType !=6' @blur="inputVal(info3.ValueENG,info.Tag,info3,false,index2)" @focus="focusInput(info3)" :disabled='info3.Disabled'>
                  <input type="date" name="" v-model='info3.ValueENG' v-if='!info3.Options&&info3.FieldType ==1' @blur="inputVal(info3.ValueENG,info.Tag,info3,false,index2)" @focus="focusInput(info3)" :disabled='info3.Disabled'>
                  <input type="month" name="" v-model='info3.ValueENG' v-if='!info3.Options&&info3.FieldType ==6' @blur="inputVal(info3.ValueENG,info.Tag,info3,false,index2)" @focus="focusInput(info3)" :disabled='info3.Disabled'>
                  <select :id='info3.Tag+"_E"' v-if="info3.Options" @change="selectVal($event.target.selectedIndex,info.Tag,info3,index2)" v-model='info3.ValueENG' :disabled='info3.Disabled'>
                    <option v-for='(opt3,optindex3) in info3.Options' :value='opt3.ValueENG'>{{opt3.ValueENG}}</option>
                  </select>
                </span>
                <div class="secondLevel" v-for='(info4,index4) in returnInfo(info3.ValueCHS,info3.ValueENG,info3.Tag,info3)'>
                  <div v-for='(info5,index5) in info4'>
                    <label><span v-html='info5.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                    <input :id="info3.Tag+'_E'+index4" type="text" name="" v-model='info5.ValueENG' v-if='!info5.Options&&info5.FieldType !=1&&info5.FieldType !=6' @blur="inputVal(info5.ValueENG,info3.Tag,info5,false,index4)" @focus="focusInput(info5)" :disabled='info5.Disabled'>
                    <input :id="info3.Tag+'_E'+index4" type="date" name="" v-model='info5.ValueENG' v-if='!info5.Options&&info5.FieldType ==1' @blur="inputVal(info5.ValueENG,info3.Tag,info5,false,index4)" @focus="focusInput(info5)" :disabled='info5.Disabled'>
                    <input :id="info3.Tag+'_E'+index4" type="month" name="" v-model='info5.ValueENG' v-if='!info5.Options&&info5.FieldType ==6' @blur="inputVal(info5.ValueENG,info3.Tag,info5,false,index4)" @focus="focusInput(info5)" :disabled='info5.Disabled'>
                    <select :id="info3.Tag+'_E'+index4" v-if='info5.Options' @change="selectVal($event.target.selectedIndex,info3.Tag,info5,index4)" v-model='info5.ValueENG' :disabled='info5.Disabled'>
                      <option v-for='(opt5,optindex5) in info5.Options' :value='opt5.ValueENG'>{{opt5.ValueENG}}</option>
                    </select>
                    <div class="secondLevel" v-for='(info6,index6) in returnInfo(info5.ValueCHS,info5.ValueENG,info5.Tag,info5)'>
                      <div v-for='(info7,index7) in info6'>
                        <label><span v-html='info7.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                        <input type="text" name="" v-model='info7.ValueENG' v-if='!info7.Options&&info7.FieldType !=1&&info7.FieldType !=6' @blur="inputVal(info.ValueENG,info7.Tag,info7,false,index4)" @focus="focusInput(info7)" :disabled='info7.Disabled'>
                        <input type="date" name="" v-model='info7.ValueENG' v-if='!info7.Options&&info7.FieldType ==1' @blur="inputVal(info.ValueENG,info7.Tag,info7,false,index4)" @focus="focusInput(info7)" :disabled='info7.Disabled'>
                        <input type="month" name="" v-model='info7.ValueENG' v-if='!info7.Options&&info7.FieldType ==6' @blur="inputVal(info.ValueENG,info7.Tag,info7,false,index4)" @focus="focusInput(info7)" :disabled='info7.Disabled'>
                        <select v-if='info7.Options' @change="selectVal($event.target.selectedIndex,info7.Tag,info7)" v-model='info7.ValueENG' :disabled='info7.Disabled'>
                          <option v-for='(opt7,optindex7) in info7.Options' :value='opt7.ValueENG'>{{opt7.ValueENG}}</option>
                        </select>
                        <div class="secondLevel" v-for='(info8,index8) in returnInfo(info7.ValueCHS,info7.ValueENG,info7.Tag,info7)'>
                          <div v-for='(info9,index9) in info8'>
                            <label><span v-html='info9.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                            <input type="text" name="" v-model='info9.ValueENG' v-if='!info9.Options&&info9.FieldType !=1&&info9.FieldType !=6' @blur="inputVal(info.ValueENG,info9.Tag,info9,false)" @focus="focusInput(info9)" :disabled='info9.Disabled'>
                            <input type="date" name="" v-model='info9.ValueENG' v-if='!info9.Options&&info9.FieldType ==1' @blur="inputVal(info.ValueENG,info9.Tag,info9,false)" @focus="focusInput(info9)" :disabled='info9.Disabled'>
                            <input type="month" name="" v-model='info9.ValueENG' v-if='!info9.Options&&info9.FieldType ==6' @blur="inputVal(info.ValueENG,info9.Tag,info9,false)" @focus="focusInput(info9)" :disabled='info9.Disabled'>
                            <select v-if='info9.Options' @change="selectVal($event.target.selectedIndex,info9.Tag,info9)" v-model='info9.ValueENG' :disabled='info9.Disabled'>
                              <option v-for='(opt9,optindex9) in info9.Options' :value='opt9.ValueENG'>{{opt9.ValueENG}}</option>
                            </select>
                            <div class="secondLevel" v-for='(info10,index10) in returnInfo(info9.ValueCHS,info9.ValueENG,info9.Tag,info9)'>
                              <div v-for='(info11,index11) in info10'>
                                <label><span v-html='info11.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                                <input type="text" name="" v-model='info11.ValueENG' v-if='!info11.Options&&info11.FieldType !=1&&info11.FieldType !=6' @blur="inputVal(info.ValueENG,info11.Tag,info11,false)" @focus="focusInput(info11)" :disabled='info11.Disabled'>
                                <input type="date" name="" v-model='info11.ValueENG' v-if='!info11.Options&&info11.FieldType ==1' @blur="inputVal(info.ValueENG,info11.Tag,info11,false)" @focus="focusInput(info11)" :disabled='info11.Disabled'>
                                <input type="month" name="" v-model='info11.ValueENG' v-if='!info11.Options&&info11.FieldType ==6' @blur="inputVal(info.ValueENG,info11.Tag,info11,false)" @focus="focusInput(info11)" :disabled='info11.Disabled'>
                                <select v-if='info11.Options' @change="selectVal($event.target.selectedIndex,info11.Tag,info11)" v-model='info11.ValueENG' :disabled='info11.Disabled'>
                                  <option v-for='(opt11,optindex11) in info11.Options' :value='opt11.ValueENG'>{{opt11.ValueENG}}</option>
                                </select>
                                <div class="secondLevel" v-for='(info12,index12) in returnInfo(info11.ValueCHS,info11.ValueENG,info11.Tag,info11)'>
                                  <div v-for='(info13,index13) in info12'>
                                    <label><span v-html='info13.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                                    <input type="text" name="" v-model='info13.ValueENG' v-if='!info13.Options&&info13.FieldType !=1&&info13.FieldType !=6' @blur="inputVal(info.ValueENG,info13.Tag,info13,false)" @focus="focusInput(info13)" :disabled='info13.Disabled'>
                                    <input type="date" name="" v-model='info13.ValueENG' v-if='!info13.Options&&info13.FieldType ==1' @blur="inputVal(info.ValueENG,info13.Tag,info13,false)" @focus="focusInput(info13)" :disabled='info13.Disabled'>
                                    <input type="month" name="" v-model='info13.ValueENG' v-if='!info13.Options&&info13.FieldType ==6' @blur="inputVal(info.ValueENG,info13.Tag,info13,false)" @focus="focusInput(info13)" :disabled='info13.Disabled'>
                                    <select v-if='info13.Options' @change="selectVal($event.target.selectedIndex,info13.Tag,info13)" v-model='info13.ValueENG' :disabled='info13.Disabled'>
                                      <option v-for='(opt13,optindex13) in info13.Options' :value='opt13.ValueENG'>{{opt13.ValueENG}}</option>
                                    </select>
                                    <div class="secondLevel" v-for='(info14,index14) in returnInfo(info13.ValueCHS,info13.ValueENG,info13.Tag,info13)'>
                                      <div v-for='(info15,index15) in info14'>
                                        <label><span v-html='info15.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                                        <input type="text" name="" v-model='info15.ValueENG' v-if='!info15.Options&&info15.FieldType !=1&&info15.FieldType !=6' @blur="inputVal(info.ValueENG,info15.Tag,info15,false)" @focus="focusInput(info15)" :disabled='info15.Disabled'>
                                        <input type="date" name="" v-model='info15.ValueENG' v-if='!info15.Options&&info15.FieldType ==1' @blur="inputVal(info.ValueENG,info15.Tag,info15,false)" @focus="focusInput(info15)" :disabled='info15.Disabled'>
                                        <input type="month" name="" v-model='info15.ValueENG' v-if='!info15.Options&&info15.FieldType ==6' @blur="inputVal(info.ValueENG,info15.Tag,info15,false)" @focus="focusInput(info15)" :disabled='info15.Disabled'>
                                        <select v-if='info15.Options' @change="selectVal($event.target.selectedIndex,info15.Tag,info15)" v-model='info15.ValueENG' :disabled='info15.Disabled'>
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
      <!--  -->
    </div>
    <div class="translate" :class='outHeight<pmHeight?"changeTop":""' v-if='$store.state.visa.groupName!="众信"'>
      <button id='translate' class="transBtn" v-tap='{methods:translateFun,save:false}'>
        <span class="textIcon">翻译</span><span class="nextIcon">&rsaquo;</span>
      </button>
    </div>
    <div class="btnGroup">
      <button class="saveBtn" v-tap='{methods:translateFun,save:true}'>保存</button>
      <button class="cancelBtn" v-tap='{methods:cancelFun}'>取消</button>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      geolocation: [
        ["China", "中国"],
        ["Angola", "安哥拉"],
        ["Afghanistan", "阿富汗"],
        ["Albania", "阿尔巴尼亚"],
        ["Algeria", "阿尔及利亚"],
        ["Andorra", "安道尔共和国"],
        ["Anguilla", "安圭拉岛"],
        ["Barbuda Antigua", "安提瓜和巴布达"],
        ["Argentina", "阿根廷"],
        ["Armenia", "亚美尼亚"],
        ["Australia", "澳大利亚"],
        ["Austria", "奥地利"],
        ["Azerbaijan", "阿塞拜疆"],
        ["Bahamas", "巴哈马"],
        ["Bahrain", "巴林"],
        ["Bangladesh", "孟加拉国"],
        ["Barbados", "巴巴多斯"],
        ["Belarus", "白俄罗斯"],
        ["Belgium", "比利时"],
        ["Belize", "伯利兹"],
        ["Benin", "贝宁"],
        ["Bermuda Is.", "百慕大群岛"],
        ["Bolivia", "玻利维亚"],
        ["Botswana", "博茨瓦纳"],
        ["Brazil", "巴西"],
        ["Brunei", "文莱"],
        ["Bulgaria", "保加利亚"],
        ["Burkina-faso", "布基纳法索"],
        ["Burma", "缅甸"],
        ["Burundi", "布隆迪"],
        ["Cameroon", "喀麦隆"],
        ["Canada", "加拿大"],
        ["Central African Republic", "中非共和国"],
        ["Chad", "乍得"],
        ["Chile", "智利"],
        ["Colombia", "哥伦比亚"],
        ["Congo", "刚果"],
        ["Cook Is.", "库克群岛"],
        ["Costa Rica", "哥斯达黎加"],
        ["Cuba", "古巴"],
        ["Cyprus", "塞浦路斯"],
        ["Czech Republic", "捷克"],
        ["Denmark", "丹麦"],
        ["Djibouti", "吉布提"],
        ["Dominica Rep.", "多米尼加共和国"],
        ["Ecuador", "厄瓜多尔"],
        ["Egypt", "埃及"],
        ["EI Salvador", "萨尔瓦多"],
        ["Estonia", "爱沙尼亚"],
        ["Ethiopia", "埃塞俄比亚"],
        ["Fiji", "斐济"],
        ["Finland", "芬兰"],
        ["France", "法国"],
        ["French Guiana", "法属圭亚那"],
        ["Gabon", "加蓬"],
        ["Gambia", "冈比亚"],
        ["Georgia", "格鲁吉亚"],
        ["Germany", "德国"],
        ["Ghana", "加纳"],
        ["Gibraltar", "直布罗陀"],
        ["Greece", "希腊"],
        ["Grenada", "格林纳达"],
        ["Guam", "关岛"],
        ["Guatemala", "危地马拉"],
        ["Guinea", "几内亚"],
        ["Guyana", "圭亚那"],
        ["Haiti", "海地"],
        ["Honduras", "洪都拉斯"],
        ["Hungary", "匈牙利"],
        ["Iceland", "冰岛"],
        ["India", "印度"],
        ["Indonesia", "印度尼西亚"],
        ["Iran", "伊朗"],
        ["Iraq", "伊拉克"],
        ["Ireland", "爱尔兰"],
        ["Israel", "以色列"],
        ["Italy", "意大利"],
        ["Jamaica", "牙买加"],
        ["Japan", "日本"],
        ["Jordan", "约旦"],
        ["Kampuchea (Cambodia )", "柬埔寨"],
        ["Kazakstan", "哈萨克斯坦"],
        ["Kenya", "肯尼亚"],
        ["Korea", "韩国"],
        ["Kuwait", "科威特"],
        ["Kyrgyzstan", "吉尔吉斯坦"],
        ["Laos", "老挝"],
        ["Latvia", "拉脱维亚"],
        ["Lebanon", "黎巴嫩"],
        ["Lesotho", "莱索托"],
        ["Liberia", "利比里亚"],
        ["Libya", "利比亚"],
        ["Liechtenstein", "列支敦士登"],
        ["Lithuania", "立陶宛"],
        ["Luxembourg", "卢森堡"],
        ["Madagascar", "马达加斯加"],
        ["Malawi", "马拉维"],
        ["Malaysia", "马来西亚"],
        ["Maldives", "马尔代夫"],
        ["Mali", "马里"],
        ["Malta", "马耳他"],
        ["Mauritius", "毛里求斯"],
        ["Mexico", "墨西哥"],
        ["Moldova", "摩尔多瓦"],
        ["Monaco", "摩纳哥"],
        ["Mongolia", "蒙古"],
        ["Montserrat Is.", "蒙特塞拉特岛"],
        ["Morocco", "摩洛哥"],
        ["Mozambique", "莫桑比克"],
        ["Namibia", "纳米比亚"],
        ["Nauru", "瑙鲁"],
        ["Nepal", "尼泊尔"],
        ["Netherlands", "荷兰"],
        ["New Zealand", "新西兰"],
        ["Nicaragua", "尼加拉瓜"],
        ["Niger", "尼日尔"],
        ["Nigeria", "尼日利亚"],
        ["North Korea", "朝鲜"],
        ["Norway", "挪威"],
        ["Oman", "阿曼"],
        ["Pakistan", "巴基斯坦"],
        ["Panama", "巴拿马"],
        ["Papua New Cuinea", "巴布亚新几内亚"],
        ["Paraguay", "巴拉圭"],
        ["Peru", "秘鲁"],
        ["Philippines", "菲律宾"],
        ["Poland", "波兰"],
        ["French Polynesia", "法属玻利尼西亚"],
        ["Portugal", "葡萄牙"],
        ["Puerto Rico", "波多黎各"],
        ["Qatar", "卡塔尔"],
        ["Romania", "罗马尼亚"],
        ["Russia", "俄罗斯"],
        ["Saint Lueia", "圣卢西亚"],
        ["Saint Vincent", "圣文森特岛"],
        ["San Marino", "圣马力诺"],
        ["Sao Tome and Principe", "圣多美和普林西比"],
        ["Saudi Arabia", "沙特阿拉伯"],
        ["Senegal", "塞内加尔"],
        ["Seychelles", "塞舌尔"],
        ["Sierra Leone", "塞拉利昂"],
        ["Singapore", "新加坡"],
        ["Slovakia", "斯洛伐克"],
        ["Slovenia", "斯洛文尼亚"],
        ["Solomon Is.", "所罗门群岛"],
        ["Somali", "索马里"],
        ["South Africa", "南非"],
        ["Spain", "西班牙"],
        ["Sri Lanka", "斯里兰卡"],
        ["Sudan", "苏丹"],
        ["Suriname", "苏里南"],
        ["Swaziland", "斯威士兰"],
        ["Sweden", "瑞典"],
        ["Switzerland", "瑞士"],
        ["Syria", "叙利亚"],
        ["Tajikstan", "塔吉克斯坦"],
        ["Tanzania", "坦桑尼亚"],
        ["Thailand", "泰国"],
        ["Togo", "多哥"],
        ["Tonga", "汤加"],
        ["Trinidad and Tobago", "特立尼达和多巴哥"],
        ["Tunisia", "突尼斯"],
        ["Turkey", "土耳其"],
        ["Turkmenistan", "土库曼斯坦"],
        ["Uganda", "乌干达"],
        ["Ukraine", "乌克兰"],
        ["United Arab Emirates", "阿拉伯联合酋长国"],
        ["United Kiongdom", "英国"],
        ["United States of America", "美国"],
        ["Uruguay", "乌拉圭"],
        ["Uzbekistan", "乌兹别克斯坦"],
        ["Venezuela", "委内瑞拉"],
        ["Vietnam", "越南"],
        ["Yemen", "也门"],
        ["Yugoslavia", "南斯拉夫"],
        ["Zimbabwe", "津巴布韦"],
        ["Zaire", "扎伊尔"],
        ["Zambia", "赞比亚"]
      ],
      userVisaInfo: '',
      groupId: 1,
      // index: 1,
      newChild: {}, //通过不同的tag值来创建dom {tag:[...],tag2:[...]} 
      // levelList: [],
      testNum: 0, //为了在select改变值的时候刷新dom
      cantSave: false,
      brotherSaveAry: [], //兄弟姐妹提交的数组 要组合成8条一个数组
      childrenSaveAry: [], //子女提交的数组 要组合成8条一个数组
      saveChild: {}, // 要提交的数据,
      firstRequse: 1, //第一次请求，储存初始值
      hasTrans: [],
      outHeight: "",
      pmHeight: "",
      gbTop: "",
      sha: "",
      outDate: "",

      guojia: "",
      shengshi: "",
      zhen: "",
      countryOption: null,
      area2: [],

      outTime_B: [],
      outTime_C: [],

    }
  },
  methods: {
    getGroupInfo(id) {
      var wait1 = this.$layer.loading()
      this.groupId = id
      this.$http.get(this.$store.state.app.host + 'api/Manage/GroupInfo', {
          params: { userVisaId: this.$store.state.app.ivisaId, groupId: id },
          headers: { Authorization: this.$store.state.app.token }
        })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.userVisaInfo = res.data.Result
              this.requestOldData = JSON.parse(JSON.stringify(this.userVisaInfo))
              var that = this
              // setTimeout(function(){
              that.$layer.close(wait1)
              // },500)


              if (id == 6) {
                var len_B = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0].length / 12
                this.outTime_B = []
                this.outTime_C = []
                for (var i = 0; i < len_B; i++) {
                  this.outTime_B.push(this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0][(i * 12) + 11].Children[0])
                }

                var len_C = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0].length / 12
                for (var i = 0; i < len_C; i++) {
                  this.outTime_C.push(this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0][(i * 12) + 11].Children[0])
                }
                // console.log("0111",this.outTime_B)
              }


              // 众信信息 存在初始值
              if (this.$store.state.visa.groupName == "众信") {
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {
                  if (!this.userVisaInfo.ShowTagInfo[i].ValueCHS && this.userVisaInfo.ShowTagInfo[i].DefaultValue) {
                    this.userVisaInfo.ShowTagInfo[i].ValueCHS = this.userVisaInfo.ShowTagInfo[i].DefaultValue.split("|")[0]
                  }

                  if (this.userVisaInfo.ShowTagInfo[i].Children.length > 0) {
                    for (var n = 0; n < this.userVisaInfo.ShowTagInfo[i].Children[0].length; n++) {
                      if (!this.userVisaInfo.ShowTagInfo[i].Children[0][n].ValueCHS && this.userVisaInfo.ShowTagInfo[i].Children[0][n].DefaultValue) {
                        this.userVisaInfo.ShowTagInfo[i].Children[0][n].ValueCHS = this.userVisaInfo.ShowTagInfo[i].Children[0][n].DefaultValue.split("|")[0]
                      }
                      for (var m = 0; m < this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children.length; m++) {
                        if (!this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].ValueCHS && this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].DefaultValue) {
                          this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].ValueCHS = this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].DefaultValue.split("|")[0]
                        }
                      }
                    }
                  }
                }
              }
            } else {
              this.$layer.close(wait1)
            }
          }
        )
    },
    changeGroupInfo() {
      // 保存的时候去修改提交数据结构
      // 兄弟姐妹brotherSaveAry   子女childrenSaveAry
      var that = this
      // console.log("new5",this.newChild)
      for (var key in this.newChild) {
        var ary = []
        this.saveChild[key] = []
        for (var i = 0; i < this.newChild[key].length; i++) {
          if (this.newChild[key][i] instanceof Array) {
            ary.push(this.newChild[key][i][0])
          }
        }
        this.saveChild[key].push(JSON.parse(JSON.stringify(ary)))
      }


      if (this.newChild.JT000501) {
        this.brotherSaveAry = []
        for (var n = 0; n < this.newChild.JT000501.length / 12; n++) {
          var middleAry = []
          for (var m = n * 12; m < this.newChild.JT000501.length; m++) {
            if (middleAry.length > 11) {
              break;
            } else {
              middleAry.push(this.newChild.JT000501[m][0])
            }
          }
          this.brotherSaveAry.push(middleAry)
        }
        this.saveChild.JT000501 = this.brotherSaveAry
      }


      if (this.newChild.JT000601) {
        this.childrenSaveAry = []
        for (var n = 0; n < this.newChild.JT000601.length / 12; n++) {
          var middleAry = []
          for (var m = n * 12; m < this.newChild.JT000601.length; m++) {
            if (middleAry.length > 11) {
              break;
            } else {
              middleAry.push(this.newChild.JT000601[m][0])
            }
          }
          this.childrenSaveAry.push(middleAry)
        }
        this.saveChild.JT000601 = this.childrenSaveAry
      }
      // JT000716
      // LX003506
      if (this.newChild.JT000716) {
        this.childrenSaveAry = []
        for (var n = 0; n < this.newChild.JT000716.length / 14; n++) {
          var middleAry = []
          for (var m = n * 14; m < this.newChild.JT000716.length; m++) {
            if (middleAry.length > 13) {
              break;
            } else {
              middleAry.push(this.newChild.JT000716[m][0])
            }
          }
          this.childrenSaveAry.push(middleAry)
        }
        this.saveChild.JT000716 = this.childrenSaveAry
      }

      if (this.newChild.LX003506) {
        this.childrenSaveAry = []
        for (var n = 0; n < this.newChild.LX003506.length / 5; n++) {
          var middleAry = []
          for (var m = n * 5; m < this.newChild.LX003506.length; m++) {
            if (middleAry.length > 4) {
              break;
            } else {
              middleAry.push(this.newChild.LX003506[m][0])
            }
          }
          this.childrenSaveAry.push(middleAry)
        }
        this.saveChild.LX003506 = this.childrenSaveAry
      }

      // 1
      var tagInfo = this.userVisaInfo.ShowTagInfo
      if (tagInfo) {
        for (var a1 = 0; a1 < tagInfo.length; a1++) {
          tagInfo[a1].Children = that.saveChild[tagInfo[a1].Tag] ? that.saveChild[tagInfo[a1].Tag] : []
          // 2
          if (tagInfo[a1].Children.length > 0) {
            for (var a2 = 0; a2 < tagInfo[a1].Children.length; a2++) {
              for (var a3 = 0; a3 < tagInfo[a1].Children[a2].length; a3++) {
                tagInfo[a1].Children[a2][a3].Children = that.saveChild[tagInfo[a1].Children[a2][a3].Tag] ? that.saveChild[tagInfo[a1].Children[a2][a3].Tag] : []
                // 3
                if (tagInfo[a1].Children[a2][a3].Children.length > 0) {
                  for (var a4 = 0; a4 < tagInfo[a1].Children[a2][a3].Children.length; a4++) {
                    for (var a5 = 0; a5 < tagInfo[a1].Children[a2][a3].Children[a4].length; a5++) {
                      tagInfo[a1].Children[a2][a3].Children[a4][a5].Children = that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Tag] ? that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Tag] : []
                      // 4
                      if (tagInfo[a1].Children[a2][a3].Children[a4][a5].Children.length > 0) {
                        for (var a6 = 0; a6 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children.length; a6++) {
                          for (var a7 = 0; a7 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6].length; a7++) {
                            tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children = that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Tag] ? that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Tag] : []
                            // 5
                            if (tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children.length > 0) {
                              for (var a8 = 0; a8 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children.length; a8++) {
                                for (var a9 = 0; a9 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8].length; a9++) {
                                  tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children = that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Tag] ? that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Tag] : []
                                  // 6
                                  if (tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children.length > 0) {
                                    for (var a10 = 0; a10 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children.length; a10++) {
                                      for (var a11 = 0; a11 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children[a10].length; a11++) {
                                        tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children[a10][a11].Children = that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children[a10][a11].Tag] ? that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children[a10][a11].Tag] : []
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (this.$store.state.visa.groupId == 6) {
        // 分别添加兄弟 去过澳大利亚的时间
        if (this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children.length == 0) {
          this.outTime_B = []
        }
        if (this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children.length == 0) {
          this.outTime_C = []
        }
        console.log(this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children)
        for (var i = 0; i < this.outTime_B.length; i++) {
          this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children[i][8].Children = []
          if (this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children[i][8].ValueCHS == "是" || this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children[i][8].ValueENG == "YES") {
            this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children[i][8].Children.push(this.outTime_B[i])
          } else {
            this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children[i][8].Children.push([])
          }
        }
        // 子女
        if (this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children.length > 0) {
          for (var i = 0; i < this.outTime_C.length; i++) {
            this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children[i][8].Children = []
            if (this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children[i][8].ValueCHS == "是" || this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children[i][8].ValueCHS == "YES") {
              this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children[i][8].Children.push(this.outTime_C[i])
            } else {
              this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children[i][8].Children.push([])
            }
          }
        }
      }


    },
    getUserInfo() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo', { params: { userVisaId: this.$store.state.app.ivisaId, isAllFiles: true }, headers: { Authorization: this.$store.state.app.token } })
        .then(
          function(res) {
            if (res.data.Code == 0) {
              this.meterialDetail = res.data.Result

              this.fillNum = 0
              this.groupNum = this.meterialDetail.GroupList.length
              // console.log(this.meterialDetail)
              for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
                if (this.meterialDetail.GroupList[i].IsFilled) {
                  this.fillNum++;
                }
              }
              this.progress = parseInt(this.fillNum * 100 / this.groupNum)
              this.progressFun()
            }
          }
        )
    },
    progressFun() {
      this.$http.post(this.$store.state.app.host + "api/Manage/SetPaperProgress", {
          UserVisaId: this.$store.state.app.ivisaId,
          TypeId: 2,
          Progress: this.progress
        }, { headers: { Authorization: this.$store.state.app.token } })
        .then(
          function(res) {

          }
        )
    },
    saveInfo() {
      // 不管有没有翻译 都走一遍修改数据结构的流程

      // if(this.$store.state.visa.groupId == this.$root.get("SaveGroupId")){
      //   return
      // }else{
      if (this.cantSave == false) {
        this.cantSave = true
        this.$root.set("SaveGroupId", this.$store.state.visa.groupId)
        this.changeGroupInfo()
        // console.log(this.userVisaInfo.ShowTagInfo)
        this.$http.post(this.$store.state.app.host + 'api/Manage/SaveFilledGroupInfo', {
            UserVisaID: this.$store.state.app.ivisaId,
            GroupId: this.$store.state.visa.groupId,
            TagInfo: this.userVisaInfo.ShowTagInfo
          }, { headers: { Authorization: this.$store.state.app.token } })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.cantSave = false
                this.$layer.msg('保存成功')
                this.getGroupInfo(this.$store.state.visa.groupId)
                this.$root.eventHub.$emit("REFRESHFILL")
                this.$root.remove("SaveGroupId")
                this.getUserInfo()
              } else {
                this.cantSave = false
              }
            }
          )
      }

      // }

    },
    translateFun(par) {
      this.changeGroupInfo()

      // 修改旧数据的结构 改为提交的结构 （兄弟姐妹/子女）
      var old_borther = []
      var old_children = []
      if (this.requestOldData.ShowTagInfo[2] && this.requestOldData.ShowTagInfo[2].Tag == "GP03") {
        for (var i = 0; i < this.requestOldData.ShowTagInfo[2].Children["0"]["0"].Children["0"].length; i += 12) {
          old_borther.push(this.requestOldData.ShowTagInfo[2].Children["0"]["0"].Children["0"].slice(i, i + 12))
        }
        this.requestOldData.ShowTagInfo[2].Children["0"]["0"].Children = old_borther
      }
      if (this.requestOldData.ShowTagInfo[3] && this.requestOldData.ShowTagInfo[3].Tag == "GP04") {
        for (var i = 0; i < this.requestOldData.ShowTagInfo[3].Children["0"]["0"].Children["0"].length; i += 12) {
          old_children.push(this.requestOldData.ShowTagInfo[3].Children["0"]["0"].Children["0"].slice(i, i + 12))
        }
        this.requestOldData.ShowTagInfo[3].Children["0"]["0"].Children = old_children
      }

      this.$http.post(this.$store.state.app.host + 'api/Manage/TranslateGroupInfo', {
          newData: {
            GroupId: this.$store.state.visa.groupId,
            UserVisaID: this.$store.state.app.ivisaId,
            TagInfo: this.userVisaInfo.ShowTagInfo
          },
          oldData: {
            GroupId: this.$store.state.visa.groupId,
            UserVisaID: this.$store.state.app.ivisaId,
            TagInfo: this.requestOldData.ShowTagInfo
          }
        }, { headers: { Authorization: this.$store.state.app.token } })
        .then(
          function(res) {
            if (res.data.Code == 0) {

              this.userVisaInfo = res.data.Result
              this.requestOldData = JSON.parse(JSON.stringify(this.userVisaInfo))
              this.outTime_B = []
              this.outTime_C = []
              if (this.$store.state.visa.groupId == 6) {
                var len_B = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0].length / 12
                for (var i = 0; i < len_B; i++) {
                  if (this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0][(i * 12) + 11].ValueCHS == "否" || this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0][(i * 12) + 11].ValueCHS == "NO") {
                    this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0][(i * 12) + 11].Children[0] = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0][11].Children[0]
                  }
                  this.outTime_B.push(this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0][(i * 12) + 11].Children[0])
                }

                var len_C = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0].length / 12
                for (var i = 0; i < len_C; i++) {
                  if (this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0][(i * 12) + 11].ValueCHS == "否" || this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0][(i * 12) + 11].ValueCHS == "NO") {
                    this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0][(i * 12) + 11].Children[0] = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0][11].Children[0]
                  }
                  this.outTime_C.push(this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0][(i * 12) + 11].Children[0])
                }
              }


              if (this.groupId == 9) {
                // 众信信息 存在初始值
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {
                  this.userVisaInfo.ShowTagInfo[i].ValueCHS ? this.userVisaInfo.ShowTagInfo[i].ValueCHS = this.userVisaInfo.ShowTagInfo[i].ValueCHS : this.userVisaInfo.ShowTagInfo[i].ValueCHS = this.userVisaInfo.ShowTagInfo[i].DefaultValue
                  if (this.userVisaInfo.ShowTagInfo[i].Children.length > 0) {
                    for (var n = 0; n < this.userVisaInfo.ShowTagInfo[i].Children[0].length; n++) {
                      if (!this.userVisaInfo.ShowTagInfo[i].Children[0][n].ValueCHS) {
                        this.userVisaInfo.ShowTagInfo[i].Children[0][n].ValueCHS = this.userVisaInfo.ShowTagInfo[i].Children[0][n].DefaultValue
                      }
                      for (var m = 0; m < this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children.length; n++) {
                        if (!this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].ValueCHS) {
                          this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].ValueCHS = this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].DefaultValue
                        }
                      }
                    }
                  }
                }
              }
              if (par.save) {
                var that = this
                setTimeout(function() {
                  that.saveInfo()
                }, 100)
              }

            } else {
              this.$layer.msg(res.data.Message)
            }
          }
        )
    },
    returnInfo(valC, valE, tag, info) {
      if (info.DefaultValue != null) {
        if (info.ValueCHS == null) {
          info.ValueCHS = info.DefaultValue.split("|")[0]
          info.ValueENG = info.DefaultValue.split("|")[1]
        }
        valC = info.ValueCHS
        valE = info.ValueENG
      }

      if (info.FieldType == 2) {
        info.Options = this.countryOption
        this.guojia = info.ValueCHS

        if (info.ValueENG == "CHINA") {
          info.ValueENG = "China"
        }
      }
      var that = this
      setTimeout(function() {
        if (info.FieldType == 3) {
          if (that.guojia == "中国") {
            info.Options = that.area1
          } else {
            info.Options = null
          }
          that.shengshi = info.ValueCHS
        }
        if (info.FieldType == 4) {
          if (that.guojia == "中国") {
            if (that.shengshi) {
              info.Options = that.getarea2(that.shengshi)
            }
          } else {
            info.Options = null
          }
        }
      }, 100)



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

      } else if (tag == "JT000501" || tag == "JT000601" || tag == "JT000716" || tag == "LX003506") {

        if (tag == "JT000501" || tag == "JT000601") {
          var infoLength = 12
        } else if (tag == "JT000716") {
          var infoLength = 14
        } else if (tag == "LX003506") {
          var infoLength = 5
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
                  if (!this.newChild[tag][this.newChild[tag].length - 1][0].Disabled) {
                    if(this.newChild[tag][this.newChild[tag].length - 1][0].DefaultValue){
                      this.newChild[tag][this.newChild[tag].length - 1][0].ValueCHS = this.newChild[tag][this.newChild[tag].length - 1][0].DefaultValue.split("|")[0]
                      this.newChild[tag][this.newChild[tag].length - 1][0].ValueENG = this.newChild[tag][this.newChild[tag].length - 1][0].DefaultValue.split("|")[1]
                    }else{
                      this.newChild[tag][this.newChild[tag].length - 1][0].ValueENG = ""
                      this.newChild[tag][this.newChild[tag].length - 1][0].ValueCHS = ""
                    }
                  }
                }

                if (tag == "JT000501") {
                  this.outTime_B.push(this.outTime_B[0])
                  this.outTime_B[this.outTime_B.length - 1][0].ValueCHS = ""
                  this.outTime_B[this.outTime_B.length - 1][0].ValueENG = ""
                } else if (tag == "JT000601") {
                  this.outTime_C.push(this.outTime_C[0])
                  this.outTime_C[this.outTime_C.length - 1][0].ValueCHS = ""
                  this.outTime_C[this.outTime_C.length - 1][0].ValueENG = ""
                }

              }
            } else {
              this.newChild[tag].length = valC * infoLength
              if (tag == "JT000501") {
                this.outTime_B.length = valC
              }
              if (tag == "JT000601") {
                this.outTime_C.length = valC
              }
            }
            info.Children = this.newChild[tag]
          }

        } else {
          this.newChild[tag] = []
        }
      } else {
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
          // console.log(this.newChild.JT00051301)
        }
      }
     
      // console.log(this.newChild.JT000501)
      return this.newChild[tag]
    },

    getarea1() {
      this.area1 = []
      for (var i = 0; i < this.$store.state.app.area.length; i++) {
        this.area1.push(this.$store.state.app.area[i].province)
      }

      return this.area1
    },
    getarea2(str) {
      this.area2 = []
      this.area = this.$store.state.app.area
      if (this.area) {
        for (var i = 0; i < this.area.length; i++) {
          if (this.area[i].province.Value == str) {
            this.area2 = this.area[i].city
            break;
          }
        }
      }
      return this.area2
    },
    VerifyTypeFun(info, type, CorE) {
      var value = null
      console.log(CorE)
      if (CorE) {
        // 中文
        value = info.ValueCHS
      } else {
        // 英文
        value = info.ValueENG
      }
      console.log(value,type)
      if (value && type == 2) { //护照号码验证
        // var reg = /^[A-Za-z][0-9]{9}$/

        var reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[0-9A-Za-z]{9}$/

        if (value.match(reg) == null) {
          this.$layer.alert('请输入正确的护照号')
          if (CorE) {
            info.ValueCHS = ""
          } else {
            info.ValueENG = ""
          }
        } else {}
      }
      if (value && type == 4) { //邮箱验证
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (value.match(reg) == null) {
          this.$layer.alert('请输入正确的邮箱格式')
          if (CorE) {
            info.ValueCHS = ""
          } else {
            info.ValueENG = ""
          }
        } else {}
      }
      if (value && type == 1) { //身份证有效期
        if (this.$root.verifyDay(value) < 180) {
          this.$layer.alert('您的身份证有效期已不满六个月，请到相应机构办理新的身份证后再进行办理。')
          if (CorE) {
            info.ValueCHS = ""
          } else {
            info.ValueENG = ""
          }
        } else {}
      }
      if (value && type == 3) { //护照有效期
        if (this.$root.verifyDay(value) < 180) {
          this.$layer.alert("您的护照有效期已不满六个月，请到相应机构换发新护照后再进行办理，并留出充足的签证办理时间，以免耽误您的出行。")
          if (CorE) {
            info.ValueCHS = ""
          } else {
            info.ValueENG = ""
          }
        } else {}
      }
      if (value && type == 6) { //出发日期不能为今天及以前
        this.outDate = value
        if (this.$root.verifyDay(value) < 0) {
          this.$layer.alert("出发日期不能为今天及以前的日期，请选择正确日期。")
          if (CorE) {
            info.ValueCHS = ""
          } else {
            info.ValueENG = ""
          }
        } else {}
      }
      if (value && type == 7) { //回国日期不能为出行日期及以前
        if (this.$root.verifyDay(value) <= 0) {
          this.$layer.alert('回国日期不能为出发日期当天及以前的日期，请选择正确日期。')
          if (CorE) {
            info.ValueCHS = ""
          } else {
            info.ValueENG = ""
          }
        } else {
          // var goDate = document.getElementById('LX000801').getElementsByClassName('value')[0].innerHTML
          if (this.$root.verifyDay1(value, this.outDate) <= 0) {
            this.$layer.alert('回国日期不能为出发日期当天及以前的日期，请选择正确日期。')
            if (CorE) {
              info.ValueCHS = ""
            } else {
              info.ValueENG = ""
            }
          } else {

          }
        }
      }
    },
    focusInput(info) {

    },
    inputDom(parentSelectEL, arr) {
      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = arr[i][1]
        parentSelectEL.appendChild(option)
      }
    },
    inputVal(val, tag, info, CorE, index) {

      if (tag == "JT000501" && this.newChild.JT000501.length > 0) {
        this.newChild.JT000501[index][0] = info
        console.log("info", info, index)
        console.log("AA", this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children[0][index])
      }
      if (tag == "JT000601" && this.newChild.JT000601.length > 0) {
        this.newChild.JT000601[index][0] = info
      }

      if (info.Tag == "JT00051301") {
        this.outTime_B[index % 8][0] = info
      }
      if (info.Tag == "JT00061601") {
        this.outTime_C[index % 8][0] = info
      }
      this.VerifyTypeFun(info, info.VerifyType, CorE)
    },
    selectVal(seleIndex, tag, info, index) {

      if (seleIndex > -1) {
        info.ValueENG = info.Options[seleIndex].ValueENG
        info.ValueCHS = info.Options[seleIndex].Value
      }
      // console.log(seleIndex, tag, info, index)
      if (tag == "JT000501" && this.newChild.JT000501.length > 0) {
        this.newChild.JT000501[index][0] = info
        // this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children[0][index] = info
      }
      if (tag == "JT000601" && this.newChild.JT000601.length > 0) {
        this.newChild.JT000601[index][0] = info
        // this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children[0][index] = info
      }
      // console.log(info)
      if (info.FieldType == 3) {
        this.getarea2(info.ValueCHS)
      }
      if (info.FieldType == 2 && index) {
        this.newChild[tag][index + 1][0].ValueCHS = null
        this.newChild[tag][index + 1][0].ValueENG = null
        this.newChild[tag][index + 2][0].ValueCHS = null
        this.newChild[tag][index + 2][0].ValueENG = null
      }

      // console.log(info)
    },
    clickSelect(el, info) {},
    cancelFun() {
      for (var key in this.newChild) {
        delete this.newChild[key]
      }
      this.getGroupInfo(this.$store.state.visa.groupId)
    },
    getJson() {
      this.$http.get("./static/area.json").then(
        function(res) {

          this.$store.state.app.area = res.data.data
          // console.log(this.$store.state.app.area)
          // window.localStorage.setItem('area', JSON.parse(this.$store.state.app.area))
          this.getOption()
          this.getarea1() //省市
        },
        function(err) {
          // console.log('超时');
        })
    },
    getOption() {
      this.countryOption = []
      for (var i = 0; i < this.geolocation.length; i++) {
        var obj = {}
        obj.Value = this.geolocation[i][1]
        obj.ValueENG = this.geolocation[i][0]
        this.countryOption.push(obj)
      }
    }
  },
  mounted() {
    this.getJson()

    this.getGroupInfo(this.$store.state.visa.groupId)
    var that = this
    this.$root.eventHub.$on("GROUPID", function(obj) {
      that.firstRequse = 1
      that.cantSave = false
      that.getGroupInfo(obj.groupId)
    })
    this.nowdate = new Date()
    var month = null
    if ((this.nowdate.getMonth() + 1) < 10) month = "0" + (this.nowdate.getMonth() + 1)
    this.nowdate = this.nowdate.getFullYear() + "" + month + "" + this.nowdate.getDate()
    // console.log(this.nowdate)
  },
  updated() {
    document.getElementById("out") ? this.outHeight = document.getElementById("out").offsetHeight : void 0;
    this.pmHeight = document.body.offsetHeight - 100
  }
}

</script>
<style type="text/css">
@import url(./../css/baseInfo.css);

</style>
