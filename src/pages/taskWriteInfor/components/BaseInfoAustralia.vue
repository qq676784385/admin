<template>
    <div :class='outHeight<pmHeight?"realHeight":""'>
      <div id='out' class='baseInfoOut'>
        <div class="part">
          <div class="partTitle">
            <p>{{$store.state.visa.groupName}}<span style="display: none;">{{testNum}}</span></p>
          </div>
          <div :class='$store.state.visa.groupName!="众信"?"partList":""' v-if="userVisaInfo&&userVisaInfo.ShowTagInfo">
            <div class="marginBotm" v-for='(info,index) in userVisaInfo.ShowTagInfo'>
              <span v-if='info.IsMust'>*</span>
              <label :class='$store.state.visa.groupName=="众信"?"addWidth":""'><span :class='info.Children[0]&&info.Children[0].length?"boldFont":""' v-html='info.title.replace("\n","<br/>")'></span><span>:</span></label>
              <br v-if='$store.state.visa.groupName=="众信"'>
              <input type='text' v-model='info.ValueCHS' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType !=1&&info.FieldType !=6' @blur="inputVal(info.ValueCHS,info.Tag,info,true)" @focus="focusInput(info,$event)" :disabled='info.Disabled'>
              <input type='text' v-model='info.ValueCHS' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType ==1' @blur="inputVal(info.ValueCHS,info.Tag,info,true)" @focus="focusInput(info,$event)" :disabled='info.Disabled'>
              <input type='text' v-model='info.ValueCHS' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType ==6' @blur="inputVal(info.ValueCHS,info.Tag,info,true)" @focus="focusInput(info,$event)" :disabled='info.Disabled'>
              <select :id='info.Tag+"_C"' v-if='info.Options&&!info.Tag.match(new RegExp(/^GP/))' @change="selectVal($event.target.selectedIndex,info.Tag,info,index,1)" v-model='info.ValueCHS' @click='clickSelect($event,info)' :disabled='info.Disabled'>
                  <option v-for='(opt,optIndex) in info.Options' :value='opt.Value'>{{opt.Value}}</option>
                </select>
              <div class="secondLevel" :id="'C_'+info.Tag+index2" v-for='(info2,index2) in returnInfo(info.ValueCHS,info.ValueENG,info.Tag,info)' v-if='returnInfo(info.ValueCHS,info.ValueENG,info.Tag,info).length>0'>
                <div :class="info3.Tag" v-for='(info3,index3) in info2'>
                  <label><span v-html='info3.title.replace("\n","<br/>")'></span><span>：</span></label>
                  <span :id='info3.Tag+"_CX"'>
                      <input type="text" v-model='info3.ValueCHS' v-if='!info3.Options&&info3.FieldType !=1&&info3.FieldType !=6' @blur="inputVal(info3.ValueCHS,info.Tag,info3,true,index2)"  @focus="focusInput(info3,$event)" :disabled='info3.Disabled'>
                      <input type="text" v-model='info3.ValueCHS' v-if='!info3.Options&&info3.FieldType ==1' @blur="inputVal(info3.ValueCHS,info.Tag,info3,true,index2)"  @focus="focusInput(info3,$event)" :disabled='info3.Disabled'>
                      <input type="text" v-model='info3.ValueCHS'  v-if='!info3.Options&&info3.FieldType ==6' @blur="inputVal(info3.ValueCHS,info.Tag,info3,true,index2)"  @focus="focusInput(info3,$event)" :disabled='info3.Disabled'>
                      <select :id='info3.Tag+"_C"' v-if='info3.Options' @change="selectVal($event.target.selectedIndex,info.Tag,info3,index2)" v-model='info3.ValueCHS' :disabled='info3.Disabled'>
                        <option v-for='(opt3,optindex3) in info3.Options' :value='opt3.Value'>{{opt3.Value}}</option>
                      </select>
                    </span>
                  <div :class="'secondLevel CHS '+ info3.Tag" v-for='(info4,index4) in returnInfo(info3.ValueCHS,info3.ValueENG,info3.Tag,info3)' v-if='returnInfo(info3.ValueCHS,info3.ValueENG,info3.Tag,info3).length>0'>
                    <div :class="info5.Tag" v-for='(info5,index5) in info4'>
                      <label><span v-html='info5.title.replace("\n","<br/>")'></span><span>：</span></label>
                      <input :id="info5.Tag+'_C'+index4" type="text" v-model='info5.ValueCHS' v-if='!info5.Options&&info5.FieldType !=1&&info5.FieldType !=6' @blur="inputVal(info5.ValueCHS,info3.Tag,info5,true,index4)" @focus="focusInput(info5,$event)" :disabled='info5.Disabled'>
                      <input :id="info5.Tag+'_C'+index4" type="text" v-model='info5.ValueCHS' v-if='!info5.Options&&info5.FieldType ==1' @blur="inputVal(info5.ValueCHS,info3.Tag,info5,true,index4)" @focus="focusInput(info5,$event)" :disabled='info5.Disabled'>
                      <input type="text" v-model='info5.ValueCHS' v-if='!info5.Options&&info5.FieldType ==6' @blur="inputVal(info5.ValueCHS,info3.Tag,info5,true,index4)" :disabled='info5.Disabled' @focus="focusInput(info5,$event)">
                      <!-- v-tap='{methods:focusInput,info:info5}'  -->
                      <select :id="info5.Tag+'_C'+index4" v-if='info5.Options' @change="selectVal($event.target.selectedIndex,info3.Tag,info5,index4)" v-model='info5.ValueCHS' :disabled='info5.Disabled'>
                          <option v-for='(opt5,optindex5) in info5.Options' :value='opt5.Value'>{{opt5.Value}}</option>
                        </select>
                      <div class="secondLevel" v-for='(info6,index6) in returnInfo(info5.ValueCHS,info5.ValueENG,info5.Tag,info5)' v-if='returnInfo(info5.ValueCHS,info5.ValueENG,info5.Tag,info5).length>0'>
                        <div :class="info7.Tag" v-for='(info7,index7) in info6'>
                          <label><span v-html='info7.title.replace("\n","<br/>")'></span><span>：</span></label>
                          <input type="text" name="" v-model='info7.ValueCHS' v-if='!info7.Options&&info7.FieldType !=1&&info7.FieldType !=6' @blur="inputVal(info.ValueCHS,info7.Tag,info7,true,index4)" @focus="focusInput(info7,$event)" :disabled='info7.Disabled'>
                          <input type="text" name="" v-model='info7.ValueCHS' v-if='!info7.Options&&info7.FieldType ==1' @blur="inputVal(info.ValueCHS,info7.Tag,info7,true,index4)" @focus="focusInput(info7,$event)" :disabled='info7.Disabled'>
                          <input type="text" name="" v-model='info7.ValueCHS' v-if='!info7.Options&&info7.FieldType ==6' @blur="inputVal(info.ValueCHS,info7.Tag,info7,true,index4)" @focus="focusInput(info7,$event)" :disabled='info7.Disabled'>
                          <select v-if='info7.Options' @change="selectVal($event.target.selectedIndex,info5.Tag,info7,index6)" v-model='info7.ValueCHS' :disabled='info7.Disabled'>
                              <option v-for='(opt7,optindex7) in info7.Options' :value='opt7.Value'>{{opt7.Value}}</option>
                            </select>
                          <div class="secondLevel" v-for='(info8,index8) in returnInfo(info7.ValueCHS,info7.ValueENG,info7.Tag,info7)' v-if='returnInfo(info7.ValueCHS,info7.ValueENG,info7.Tag,info7).length>0'>
                            <div :class="info9.Tag" v-for='(info9,index9) in info8'>
                              <label><span v-html='info9.title.replace("\n","<br/>")'></span><span>：</span></label>
                              <input type="text" name="" v-model='info9.ValueCHS' v-if='!info9.Options&&info9.FieldType !=1&&info9.FieldType !=6' @blur="inputVal(info.ValueCHS,info9.Tag,info9,true)" @focus="focusInput(info9,$event)" :disabled='info9.Disabled'>
                              <input type="text" name="" v-model='info9.ValueCHS' v-if='!info9.Options&&info9.FieldType ==1' @blur="inputVal(info.ValueCHS,info9.Tag,info9,true)" @focus="focusInput(info9,$event)" :disabled='info9.Disabled'>
                              <input type="text" name="" v-model='info9.ValueCHS' v-if='!info9.Options&&info9.FieldType ==6' @blur="inputVal(info.ValueCHS,info9.Tag,info9,true)" @focus="focusInput(info9,$event)" :disabled='info9.Disabled'>
                              <select v-if='info9.Options' @change="selectVal($event.target.selectedIndex,info7.Tag,info9,index8)" v-model='info9.ValueCHS' :disabled='info9.Disabled'>
                                  <option v-for='(opt9,optindex9) in info9.Options' :value='opt9.Value'>{{opt9.Value}}</option>
                                </select>
                              <div class="secondLevel" v-for='(info10,index10) in returnInfo(info9.ValueCHS,info9.ValueENG,info9.Tag,info9)' v-if='returnInfo(info9.ValueCHS,info9.ValueENG,info9.Tag,info9).length>0'>
                                <div :class="info11.Tag" v-for='(info11,index11) in info10'>
                                  <label><span v-html='info11.title.replace("\n","<br/>")'></span><span>：</span></label>
                                  <input type="text" name="" v-model='info11.ValueCHS' v-if='!info11.Options&&info11.FieldType !=1&&info11.FieldType !=6' @blur="inputVal(info.ValueCHS,info11.Tag,info11,true)" @focus="focusInput(info11,$event)" :disabled='info11.Disabled'>
                                  <input type="text" name="" v-model='info11.ValueCHS' v-if='!info11.Options&&info11.FieldType ==1' @blur="inputVal(info.ValueCHS,info11.Tag,info11,true)" @focus="focusInput(info11,$event)" :disabled='info11.Disabled'>
                                  <input type="text" name="" v-model='info11.ValueCHS' v-if='!info11.Options&&info11.FieldType ==6' @blur="inputVal(info.ValueCHS,info11.Tag,info11,true)" @focus="focusInput(info11,$event)" :disabled='info11.Disabled'>
                                  <select v-if='info11.Options' @change="selectVal($event.target.selectedIndex,info9.Tag,info11,index10)" v-model='info11.ValueCHS' :disabled='info11.Disabled'>
                                      <option v-for='(opt11,optindex11) in info11.Options' :value='opt11.Value'>{{opt11.Value}}</option>
                                    </select>
                                  <div class="secondLevel" v-for='(info12,index12) in returnInfo(info11.ValueCHS,info11.ValueENG,info11.Tag,info11)' v-if='returnInfo(info11.ValueCHS,info11.ValueENG,info11.Tag,info11).length>0'>
                                    <div :class="info13.Tag" v-for='(info13,index13) in info12'>
                                      <label><span v-html='info13.title.replace("\n","<br/>")'></span><span>：</span></label>
                                      <input type="text" name="" v-model='info13.ValueCHS' v-if='!info13.Options&&info13.FieldType !=1&&info13.FieldType !=6' @blur="inputVal(info.ValueCHS,info13.Tag,info13,true)" @focus="focusInput(info13,$event)" :disabled='info13.Disabled'>
                                      <input type="text" name="" v-model='info13.ValueCHS' v-if='!info13.Options&&info13.FieldType ==1' @blur="inputVal(info.ValueCHS,info13.Tag,info13,true)" @focus="focusInput(info13,$event)" :disabled='info13.Disabled'>
                                      <input type="text" name="" v-model='info13.ValueCHS' v-if='!info13.Options&&info13.FieldType ==6' @blur="inputVal(info.ValueCHS,info13.Tag,info13,true)" @focus="focusInput(info13,$event)" :disabled='info13.Disabled'>
                                      <select v-if='info13.Options' @change="selectVal($event.target.selectedIndex,info11.Tag,info13,index12)" v-model='info13.ValueCHS' :disabled='info13.Disabled'>
                                          <option v-for='(opt13,optindex13) in info13.Options' :value='opt13.Value'>{{opt13.Value}}</option>
                                        </select>
                                      <div class="secondLevel" v-for='(info14,index14) in returnInfo(info13.ValueCHS,info13.ValueENG,info13.Tag,info13)' v-if='returnInfo(info13.ValueCHS,info13.ValueENG,info13.Tag,info13).length>0'>
                                        <div :class="info15.Tag" v-for='(info15,index15) in info14'>
                                          <label><span v-html='info15.title.replace("\n","<br/>")'></span><span>：</span></label>
                                          <input type="text" name="" v-model='info15.ValueCHS' v-if='!info15.Options&&info15.FieldType !=1&&info15.FieldType !=6' @blur="inputVal(info.ValueCHS,info15.Tag,info15,true)" @focus="focusInput(info15,$event)" :disabled='info15.Disabled'>
                                          <input type="text" name="" v-model='info15.ValueCHS' v-if='!info15.Options&&info15.FieldType ==1' @blur="inputVal(info.ValueCHS,info15.Tag,info15,true)" @focus="focusInput(info15,$event)" :disabled='info15.Disabled'>
                                          <input type="text" name="" v-model='info15.ValueCHS' v-if='!info15.Options&&info15.FieldType ==6' @blur="inputVal(info.ValueCHS,info15.Tag,info15,true)" @focus="focusInput(info15,$event)" :disabled='info15.Disabled'>
                                          <select v-if='info15.Options' @change="selectVal($event.target.selectedIndex,info13.Tag,info15,index14)" v-model='info15.ValueCHS' :disabled='info15.Disabled'>
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
              <input type="text" name="" v-model='info.ValueENG' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType !=1&&info.FieldType !=6' @blur="inputVal(info.ValueENG,info.Tag,info,false)" @focus="focusInput(info,$event)" :disabled='info.Disabled'>
              <input type="text" name="" v-model='info.ValueENG' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType ==1' @blur="inputVal(info.ValueENG,info.Tag,info,false)" @focus="focusInput(info,$event)" :disabled='info.Disabled'>
              <input type="text" name="" v-model='info.ValueENG' v-if='!info.Options&&!info.Tag.match(new RegExp(/^GP/))&&info.FieldType ==6' @blur="inputVal(info.ValueENG,info.Tag,info,false)" @focus="focusInput(info,$event)" :disabled='info.Disabled'>
              <select :id='info.Tag+"_E"' v-if='info.Options&&!info.Tag.match(new RegExp(/^GP/))' @change="selectVal($event.target.selectedIndex,info.Tag,info)" v-model='info.ValueENG' @click='clickSelect($event,info)' :disabled='info.Disabled'>
                  <option v-for='(opt,optIndex) in info.Options' :value='opt.ValueENG'>{{opt.ValueENG}}</option>
                </select>
              <div class="secondLevel" :id='info.Tag' v-for='(info2,index2) in returnInfo(info.ValueCHS,info.ValueENG,info.Tag,info)' v-if='returnInfo(info.ValueCHS,info.ValueENG,info.Tag,info).length>0'>
                <div v-for='(info3,index3) in info2'>
                  <label><span v-html='info3.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                  <span :id='info3.Tag+"_EX"'>
                      <input type="text" name="" v-model='info3.ValueENG' v-if='!info3.Options&&info3.FieldType !=1&&info3.FieldType !=6' @blur="inputVal(info3.ValueENG,info.Tag,info3,false,index2)" @focus="focusInput(info3,$event)" :disabled='info3.Disabled'>
                      <input type="text" name="" v-model='info3.ValueENG' v-if='!info3.Options&&info3.FieldType ==1' @blur="inputVal(info3.ValueENG,info.Tag,info3,false,index2)" @focus="focusInput(info3,$event)" :disabled='info3.Disabled'>
                      <input type="text" name="" v-model='info3.ValueENG' v-if='!info3.Options&&info3.FieldType ==6' @blur="inputVal(info3.ValueENG,info.Tag,info3,false,index2)" @focus="focusInput(info3,$event)" :disabled='info3.Disabled'>
                      <select :id='info3.Tag+"_E"' v-if="info3.Options" @change="selectVal($event.target.selectedIndex,info.Tag,info3,index2)" v-model='info3.ValueENG' :disabled='info3.Disabled'>
                        <option v-for='(opt3,optindex3) in info3.Options' :value='opt3.ValueENG'>{{opt3.ValueENG}}</option>
                      </select>
                    </span>
                  <div class="secondLevel" v-for='(info4,index4) in returnInfo(info3.ValueCHS,info3.ValueENG,info3.Tag,info3)' v-if='returnInfo(info3.ValueCHS,info3.ValueENG,info3.Tag,info3).length>0'>
                    <div v-for='(info5,index5) in info4'>
                      <label><span v-html='info5.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                      <input :id="info5.Tag+'_E'+index4" type="text" name="" v-model='info5.ValueENG' v-if='!info5.Options&&info5.FieldType !=1&&info5.FieldType !=6' @blur="inputVal(info5.ValueENG,info3.Tag,info5,false,index4)" @focus="focusInput(info5,$event)" :disabled='info5.Disabled'>
                      <input :id="info5.Tag+'_E'+index4" type="text" name="" v-model='info5.ValueENG' v-if='!info5.Options&&info5.FieldType ==1' @blur="inputVal(info5.ValueENG,info3.Tag,info5,false,index4)" @focus="focusInput(info5,$event)" :disabled='info5.Disabled'>
                      <input :id="info5.Tag+'_E'+index4" type="text" name="" v-model='info5.ValueENG' v-if='!info5.Options&&info5.FieldType ==6' @blur="inputVal(info5.ValueENG,info3.Tag,info5,false,index4)" @focus="focusInput(info5,$event)" :disabled='info5.Disabled'>
                      <select :id="info5.Tag+'_E'+index4" v-if='info5.Options' @change="selectVal($event.target.selectedIndex,info3.Tag,info5,index4)" v-model='info5.ValueENG' :disabled='info5.Disabled'>
                          <option v-for='(opt5,optindex5) in info5.Options' :value='opt5.ValueENG'>{{opt5.ValueENG}}</option>
                        </select>
                      <div class="secondLevel" v-for='(info6,index6) in returnInfo(info5.ValueCHS,info5.ValueENG,info5.Tag,info5)' v-if='returnInfo(info5.ValueCHS,info5.ValueENG,info5.Tag,info5).length>0'>
                        <div v-for='(info7,index7) in info6'>
                          <label><span v-html='info7.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                          <input type="text" name="" v-model='info7.ValueENG' v-if='!info7.Options&&info7.FieldType !=1&&info7.FieldType !=6' @blur="inputVal(info.ValueENG,info7.Tag,info7,false,index4)" @focus="focusInput(info7,$event)" :disabled='info7.Disabled'>
                          <input type="text" name="" v-model='info7.ValueENG' v-if='!info7.Options&&info7.FieldType ==1' @blur="inputVal(info.ValueENG,info7.Tag,info7,false,index4)" @focus="focusInput(info7,$event)" :disabled='info7.Disabled'>
                          <input type="text" name="" v-model='info7.ValueENG' v-if='!info7.Options&&info7.FieldType ==6' @blur="inputVal(info.ValueENG,info7.Tag,info7,false,index4)" @focus="focusInput(info7,$event)" :disabled='info7.Disabled'>
                          <select v-if='info7.Options' @change="selectVal($event.target.selectedIndex,info7.Tag,info7)" v-model='info7.ValueENG' :disabled='info7.Disabled'>
                              <option v-for='(opt7,optindex7) in info7.Options' :value='opt7.ValueENG'>{{opt7.ValueENG}}</option>
                            </select>
                          <div class="secondLevel" v-for='(info8,index8) in returnInfo(info7.ValueCHS,info7.ValueENG,info7.Tag,info7)' v-if='returnInfo(info7.ValueCHS,info7.ValueENG,info7.Tag,info7).length>0'>
                            <div v-for='(info9,index9) in info8'>
                              <label><span v-html='info9.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                              <input type="text" name="" v-model='info9.ValueENG' v-if='!info9.Options&&info9.FieldType !=1&&info9.FieldType !=6' @blur="inputVal(info.ValueENG,info9.Tag,info9,false)" @focus="focusInput(info9,$event)" :disabled='info9.Disabled'>
                              <input type="text" name="" v-model='info9.ValueENG' v-if='!info9.Options&&info9.FieldType ==1' @blur="inputVal(info.ValueENG,info9.Tag,info9,false)" @focus="focusInput(info9,$event)" :disabled='info9.Disabled'>
                              <input type="text" name="" v-model='info9.ValueENG' v-if='!info9.Options&&info9.FieldType ==6' @blur="inputVal(info.ValueENG,info9.Tag,info9,false)" @focus="focusInput(info9,$event)" :disabled='info9.Disabled'>
                              <select v-if='info9.Options' @change="selectVal($event.target.selectedIndex,info9.Tag,info9)" v-model='info9.ValueENG' :disabled='info9.Disabled'>
                                  <option v-for='(opt9,optindex9) in info9.Options' :value='opt9.ValueENG'>{{opt9.ValueENG}}</option>
                                </select>
                              <div class="secondLevel" v-for='(info10,index10) in returnInfo(info9.ValueCHS,info9.ValueENG,info9.Tag,info9)' v-if='returnInfo(info9.ValueCHS,info9.ValueENG,info9.Tag,info9).length>0'>
                                <div v-for='(info11,index11) in info10'>
                                  <label><span v-html='info11.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                                  <input type="text" name="" v-model='info11.ValueENG' v-if='!info11.Options&&info11.FieldType !=1&&info11.FieldType !=6' @blur="inputVal(info.ValueENG,info11.Tag,info11,false)" @focus="focusInput(info11,$event)" :disabled='info11.Disabled'>
                                  <input type="text" name="" v-model='info11.ValueENG' v-if='!info11.Options&&info11.FieldType ==1' @blur="inputVal(info.ValueENG,info11.Tag,info11,false)" @focus="focusInput(info11,$event)" :disabled='info11.Disabled'>
                                  <input type="text" name="" v-model='info11.ValueENG' v-if='!info11.Options&&info11.FieldType ==6' @blur="inputVal(info.ValueENG,info11.Tag,info11,false)" @focus="focusInput(info11,$event)" :disabled='info11.Disabled'>
                                  <select v-if='info11.Options' @change="selectVal($event.target.selectedIndex,info11.Tag,info11)" v-model='info11.ValueENG' :disabled='info11.Disabled'>
                                      <option v-for='(opt11,optindex11) in info11.Options' :value='opt11.ValueENG'>{{opt11.ValueENG}}</option>
                                    </select>
                                  <div class="secondLevel" v-for='(info12,index12) in returnInfo(info11.ValueCHS,info11.ValueENG,info11.Tag,info11)' v-if='returnInfo(info11.ValueCHS,info11.ValueENG,info11.Tag,info11).length>0'>
                                    <div v-for='(info13,index13) in info12'>
                                      <label><span v-html='info13.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                                      <input type="text" name="" v-model='info13.ValueENG' v-if='!info13.Options&&info13.FieldType !=1&&info13.FieldType !=6' @blur="inputVal(info.ValueENG,info13.Tag,info13,false)" @focus="focusInput(info13,$event)" :disabled='info13.Disabled'>
                                      <input type="text" name="" v-model='info13.ValueENG' v-if='!info13.Options&&info13.FieldType ==1' @blur="inputVal(info.ValueENG,info13.Tag,info13,false)" @focus="focusInput(info13,$event)" :disabled='info13.Disabled'>
                                      <input type="text" name="" v-model='info13.ValueENG' v-if='!info13.Options&&info13.FieldType ==6' @blur="inputVal(info.ValueENG,info13.Tag,info13,false)" @focus="focusInput(info13,$event)" :disabled='info13.Disabled'>
                                      <select v-if='info13.Options' @change="selectVal($event.target.selectedIndex,info13.Tag,info13)" v-model='info13.ValueENG' :disabled='info13.Disabled'>
                                          <option v-for='(opt13,optindex13) in info13.Options' :value='opt13.ValueENG'>{{opt13.ValueENG}}</option>
                                        </select>
                                      <div class="secondLevel" v-for='(info14,index14) in returnInfo(info13.ValueCHS,info13.ValueENG,info13.Tag,info13)' v-if='returnInfo(info13.ValueCHS,info13.ValueENG,info13.Tag,info13).length>0'>
                                        <div v-for='(info15,index15) in info14'>
                                          <label><span v-html='info15.title.replace("\n","<br/>").replace("中文","拼音")'></span><span>：</span></label>
                                          <input type="text" name="" v-model='info15.ValueENG' v-if='!info15.Options&&info15.FieldType !=1&&info15.FieldType !=6' @blur="inputVal(info.ValueENG,info15.Tag,info15,false)" @focus="focusInput(info15,$event)" :disabled='info15.Disabled'>
                                          <input type="text" name="" v-model='info15.ValueENG' v-if='!info15.Options&&info15.FieldType ==1' @blur="inputVal(info.ValueENG,info15.Tag,info15,false)" @focus="focusInput(info15,$event)" :disabled='info15.Disabled'>
                                          <input type="text" name="" v-model='info15.ValueENG' v-if='!info15.Options&&info15.FieldType ==6' @blur="inputVal(info.ValueENG,info15.Tag,info15,false)" @focus="focusInput(info15,$event)" :disabled='info15.Disabled'>
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
        <button id='translate' class="transBtn" v-tap='{methods:translateFun,save:false}'><!--  -->
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
        ['China', '中国'],
        ['Angola', '安哥拉'],
        ['Afghanistan', '阿富汗'],
        ['Albania', '阿尔巴尼亚'],
        ['Algeria', '阿尔及利亚'],
        ['Andorra', '安道尔共和国'],
        ['Anguilla', '安圭拉岛'],
        ['Antigua and Barbuda', '安提瓜和巴布达'],
        ['Argentina', '阿根廷'],
        ['Armenia', '亚美尼亚'],
        ['Australia', '澳大利亚'],
        ['Austria', '奥地利'],
        ['Azerbaijan', '阿塞拜疆'],
        ['Bahamas', '巴哈马'],
        ['Bahrain', '巴林'],
        ['Bangladesh', '孟加拉国'],
        ['Barbados', '巴巴多斯'],
        ['Belarus', '白俄罗斯'],
        ['Belgium', '比利时'],
        ['Belize', '伯利兹'],
        ['Benin', '贝宁'],
        ['Bermuda', '百慕大群岛'],
        ['Bolivia', '玻利维亚'],
        ['Botswana', '博茨瓦纳'],
        ['Brazil', '巴西'],
        ['Brunei', '文莱'],
        ['Bulgaria', '保加利亚'],
        ['Burkina Faso', '布基纳法索'],
        ['Myanmar', '缅甸'],
        ['Burundi', '布隆迪'],
        ['Cameroon', '喀麦隆'],
        ['Canada', '加拿大'],
        ['Central African Republic', '中非共和国'],
        ['Chad', '乍得'],
        ['Chile', '智利'],
        ['Colombia', '哥伦比亚'],
        ['Congo', '刚果'],
        ['Island', '库克群岛'],
        ['Costa Rica', '哥斯达黎加'],
        ['Cuba', '古巴'],
        ['Cyprus', '塞浦路斯'],
        ['Czech Republic', '捷克'],
        ['Denmark', '丹麦'],
        ['Djibouti', '吉布提'],
        ['Dominican Republic', '多米尼加共和国'],
        ['Ecuador', '厄瓜多尔'],
        ['Egypt', '埃及'],
        ['El Salvador', '萨尔瓦多'],
        ['Estonia', '爱沙尼亚'],
        ['Ethiopia', '埃塞俄比亚'],
        ['Fiji', '斐济'],
        ['Finland', '芬兰'],
        ['France', '法国'],
        ['French Guiana', '法属圭亚那'],
        ['Gabon', '加蓬'],
        ['Gambia', '冈比亚'],
        ['Georgia', '格鲁吉亚'],
        ['Germany', '德国'],
        ['Ghana', '加纳'],
        ['Gibraltar', '直布罗陀'],
        ['Greece', '希腊'],
        ['Grenada', '格林纳达'],
        ['Guam', '关岛'],
        ['Guatemala', '危地马拉'],
        ['Guinea', '几内亚'],
        ['Guyana', '圭亚那'],
        ['Haiti', '海地'],
        ['Honduras', '洪都拉斯'],
        ['Hungary', '匈牙利'],
        ['Iceland', '冰岛'],
        ['India', '印度'],
        ['Indonesia', '印度尼西亚'],
        ['Iran', '伊朗'],
        ['Iraq', '伊拉克'],
        ['Ireland', '爱尔兰'],
        ['Israel', '以色列'],
        ['Italy', '意大利'],
        ['Jamaica', '牙买加'],
        ['Japan', '日本'],
        ['Jordan', '约旦'],
        ['Cambodia', '柬埔寨'],
        ['Kazakhstan', '哈萨克斯坦'],
        ['Kenya', '肯尼亚'],
        ['Korea', '韩国'],
        ['Kuwait', '科威特'],
        ['Kyrgyzstan', '吉尔吉斯坦'],
        ['Laos', '老挝'],
        ['Latvia', '拉脱维亚'],
        ['Lebanon', '黎巴嫩'],
        ['Lesotho', '莱索托'],
        ['Liberia', '利比里亚'],
        ['Libya', '利比亚'],
        ['Liechtenstein', '列支敦士登'],
        ['Lithuania', '立陶宛'],
        ['Luxembourg', '卢森堡'],
        ['Madagascar', '马达加斯加'],
        ['Malawi', '马拉维'],
        ['Malaysia', '马来西亚'],
        ['Maldives', '马尔代夫'],
        ['Mali', '马里'],
        ['Malta', '马耳他'],
        ['Mauritius', '毛里求斯'],
        ['Mexico', '墨西哥'],
        ['Moldova', '摩尔多瓦'],
        ['Monaco', '摩纳哥'],
        ['Mongolia', '蒙古'],
        ['Montserrat', '蒙特塞拉特岛'],
        ['Morocco', '摩洛哥'],
        ['Mozambique', '莫桑比克'],
        ['Namibia', '纳米比亚'],
        ['Nauru', '瑙鲁'],
        ['Nepal', '尼泊尔'],
        ['Netherlands', '荷兰'],
        ['new Zealand', '新西兰'],
        ['Nicaragua', '尼加拉瓜'],
        ['Niger', '尼日尔'],
        ['Nigeria', '尼日利亚'],
        ['Korea', '朝鲜'],
        ['Norway', '挪威'],
        ['Oman', '阿曼'],
        ['Pakistan', '巴基斯坦'],
        ['Panama', '巴拿马'],
        ['Papua New Guinea', '巴布亚新几内亚'],
        ['Paraguay', '巴拉圭'],
        ['Peru', '秘鲁'],
        ['Philippines', '菲律宾'],
        ['Poland', '波兰'],
        ['French Polynesia', '法属玻利尼西亚'],
        ['Portugal', '葡萄牙'],
        ['Puerto Rico', '波多黎各'],
        ['Qatar', '卡塔尔'],
        ['Romania', '罗马尼亚'],
        ['Russia', '俄罗斯'],
        ['Saint Lucia', '圣卢西亚'],
        ['Saint Vincent and the Grenadines', '圣文森特岛'],
        ['San Marino', '圣马力诺'],
        ['Sao Tome and Principe', '圣多美和普林西比'],
        ['Saudi Arabia', '沙特阿拉伯'],
        ['Senegal', '塞内加尔'],
        ['Seychelles', '塞舌尔'],
        ['Sierra Leone', '塞拉利昂'],
        ['Singapore', '新加坡'],
        ['Slovakia', '斯洛伐克'],
        ['Slovenia', '斯洛文尼亚'],
        ['Solomon Islands', '所罗门群岛'],
        ['Somalia', '索马里'],
        ['South Africa', '南非'],
        ['Spain', '西班牙'],
        ['Sri Lanka', '斯里兰卡'],
        ['Sudan', '苏丹'],
        ['Suriname', '苏里南'],
        ['Swaziland', '斯威士兰'],
        ['Sweden', '瑞典'],
        ['Switzerland', '瑞士'],
        ['Syria', '叙利亚'],
        ['Tajikistan', '塔吉克斯坦'],
        ['Tanzania', '坦桑尼亚'],
        ['Thailand', '泰国'],
        ['Togo', '多哥'],
        ['Tonga', '汤加'],
        ['Trinidad and Tobago', '特立尼达和多巴哥'],
        ['Tunisia', '突尼斯'],
        ['Turkey', '土耳其'],
        ['Turkmenistan', '土库曼斯坦'],
        ['Uganda', '乌干达'],
        ['Ukraine', '乌克兰'],
        ['United Arab Emirates', '阿拉伯联合酋长国'],
        ['United Kingdom', '英国'],
        ['United States', '美国'],
        ['Uruguay', '乌拉圭'],
        ['Uzbekistan', '乌兹别克斯坦'],
        ['Venezuela', '委内瑞拉'],
        ['Vietnam', '越南'],
        ['Yemen', '也门'],
        ['Yugoslavia', '南斯拉夫'],
        ['Zimbabwe', '津巴布韦'],
        ['Zaire', '扎伊尔'],
        ['Zambia', '赞比亚']

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
      Isinit: true,
      bcGuojia: {},
      canTrans: true,
      xunhuanAry: [],
      peerPeople: [],
      friendAry: []
    }
  },
  methods: {

    getGroupInfo(id) {
      var wait1 = this.$layer.loading()
      this.groupId = id
      this.$http.get(this.$store.state.app.host + 'api/Manage/GroupInfo', {
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

              this.userVisaInfo = res.data.Result
              this.requestOldData = JSON.parse(JSON.stringify(this.userVisaInfo))
              var that = this
              that.$layer.close(wait1)

              if (id == 6 && this.$store.state.visa.certificateInfo.Country == "澳大利亚") {
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
                //  设置兄弟子女的国家的初始值
                if (this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].DefaultValue) {
                  this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].ValueCHS == null ? this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].ValueCHS = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[
                    "0"][5].DefaultValue.split("|")[0] : void 0
                  this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].ValueENG == null ? this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].ValueENG = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[
                    "0"][5].DefaultValue.split("|")[1] : void 0
                }
                if (this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].DefaultValue) {
                  this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].ValueCHS == null ? this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].ValueCHS = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[
                    "0"][5].DefaultValue.split("|")[0] : void 0
                  this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].ValueCHS == null ? this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].ValueENG = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[
                    "0"][5].DefaultValue.split("|")[1] : void 0
                }

                this.brotherSaveAry = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0]
                this.childrenSaveAry = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0]
                // this.friendAry = this.userVisaInfo.ShowTagInfo[4].Children["0"]["0"].Children[0]
                // 在澳大利亚的亲戚
                this.friendAry = []
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo[4].Children["0"]["0"].Children.length; i++) {
                  for (var j = 0; j < this.userVisaInfo.ShowTagInfo[4].Children["0"]["0"].Children[i].length; j++) {
                    this.friendAry.push(this.userVisaInfo.ShowTagInfo[4].Children["0"]["0"].Children[i][j])
                  }
                }

                var allInfo = this.userVisaInfo.ShowTagInfo[2],
                  allInfo2 = this.userVisaInfo.ShowTagInfo[3],
                  area1 = this.area1
                var that = this
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"].length / 12; i++) {
                  (function(i) {
                    if (allInfo.Children["0"]["0"].Children["0"][i * 12 + 5].FieldType == 2) {
                      if (allInfo.Children["0"]["0"].Children["0"][i * 12 + 5].ValueCHS == "中国") {
                        allInfo.Children["0"]["0"].Children["0"][i * 12 + 6].Options = area1
                        allInfo.Children["0"]["0"].Children["0"][i * 12 + 7].Options = that.getarea2(allInfo.Children["0"]["0"].Children["0"][i * 12 + 6].ValueCHS)
                      }
                    }
                    that.userVisaInfo.ShowTagInfo[2] = allInfo
                  })(i)
                }

                for (var i = 0; i < this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"].length / 12; i++) {
                  (function(i) {
                    if (allInfo2.Children["0"]["0"].Children["0"][i * 12 + 5].FieldType == 2) {
                      if (allInfo2.Children["0"]["0"].Children["0"][i * 12 + 5].ValueCHS == "中国") {
                        allInfo2.Children["0"]["0"].Children["0"][i * 12 + 6].Options = area1
                        allInfo2.Children["0"]["0"].Children["0"][i * 12 + 7].Options = that.getarea2(allInfo2.Children["0"]["0"].Children["0"][i * 12 + 6].ValueCHS)
                      }
                    }
                    that.userVisaInfo.ShowTagInfo[3] = allInfo2
                  })(i)
                }
              }

              // 众信信息 存在初始值
              if (this.$store.state.visa.groupName == "众信") {
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {
                  if (!this.userVisaInfo.ShowTagInfo[i].ValueCHS && this.userVisaInfo.ShowTagInfo[i].DefaultValue) {
                    this.userVisaInfo.ShowTagInfo[i].ValueCHS = this.userVisaInfo.ShowTagInfo[i].DefaultValue.split("|")[0]
                    this.userVisaInfo.ShowTagInfo[i].ValueENG = this.userVisaInfo.ShowTagInfo[i].DefaultValue.split("|")[1]
                  }

                  if (this.userVisaInfo.ShowTagInfo[i].Children.length > 0) {
                    for (var n = 0; n < this.userVisaInfo.ShowTagInfo[i].Children[0].length; n++) {
                      if (!this.userVisaInfo.ShowTagInfo[i].Children[0][n].ValueCHS && this.userVisaInfo.ShowTagInfo[i].Children[0][n].DefaultValue) {
                        this.userVisaInfo.ShowTagInfo[i].Children[0][n].ValueCHS = this.userVisaInfo.ShowTagInfo[i].Children[0][n].DefaultValue.split("|")[0]
                        this.userVisaInfo.ShowTagInfo[i].Children[0][n].ValueENG = this.userVisaInfo.ShowTagInfo[i].Children[0][n].DefaultValue.split("|")[1]
                      }
                      for (var m = 0; m < this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children.length; m++) {
                        if (!this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].ValueCHS && this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].DefaultValue) {
                          this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].ValueCHS = this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].DefaultValue.split("|")[0]
                          this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].ValueENG = this.userVisaInfo.ShowTagInfo[i].Children[0][n].Children[0][m].DefaultValue.split("|")[1]
                        }
                      }
                    }
                  }
                }
              }

              // 几个人同行
              if (id == 7 && this.$store.state.visa.certificateInfo.Country == "澳大利亚") {
                this.peerPeople = []
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo[7].Children["0"]["0"].Children.length; i++) {
                  for (var j = 0; j < this.userVisaInfo.ShowTagInfo[7].Children["0"]["0"].Children[i].length; j++) {
                    this.peerPeople.push(this.userVisaInfo.ShowTagInfo[7].Children["0"]["0"].Children[i][j])
                  }
                }
              }

              // 改身份证有效期日期  长期 英文为 long
              if (id == 1 && this.$store.state.visa.certificateInfo.Country != "美国EVUS") {
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo[5].Children["0"].length; i++) {
                  if (this.userVisaInfo.ShowTagInfo[5].Children["0"][i].Tag == "JB000604") {
                      if(this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueCHS == "长期"||this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueCHS == "long"){
                          this.userVisaInfo.ShowTagInfo[5].Children["0"][i].FieldType = 0
                          this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueCHS = "长期"
                          this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueENG = "long"
                      }

                  }
                  if (this.userVisaInfo.ShowTagInfo[5].Children["0"][i].Tag == "JB000605") {
                      if(this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueCHS == "长期"||this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueCHS == "long"){
                          this.userVisaInfo.ShowTagInfo[5].Children["0"][i].FieldType = 0
                          this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueCHS = "长期"
                          this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueENG = "long"
                      }

                  }
                }
              }

              if (id == 6 && this.$store.state.visa.certificateInfo.Country == "新西兰") {
                // 跟随子女
                this.gsChildAry = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"]
                // 不跟随子女
                this.bgsChildAry = this.userVisaInfo.ShowTagInfo[4].Children["0"]["0"].Children["0"]
                // 在新西兰的朋友
                this.friendAryNZL = this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].Children["0"]
                // 子女的职业信息 JTXXL00806
                this.childStudentInfo = []
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].ValueCHS; i++) {
                  var index = (i + 1) * 14 - 2
                  this.childStudentInfo.push(this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][index].Children)
                }
                this.applyPeopleInfo = []
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].ValueCHS; i++) {
                  var index = (i + 1) * 14 - 1
                  this.applyPeopleInfo.push(this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][index].Children)
                }
                this.NZLfriendInfo = []
                for (var i = 0; i < this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].ValueCHS; i++) {
                  var index = (i + 1) * 6 - 4
                  this.NZLfriendInfo.push(this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].Children["0"][index].Children)
                }

              }


              if (this.$store.state.visa.certificateInfo.Country == "英国") {
                if (id == 6 && this.$store.state.visa.certificateInfo.Country == "英国") {
                  // 有几个需要经济支持的人 JTUK0801
                  if (this.userVisaInfo.ShowTagInfo[2].Tag == "GP20") {
                    this.ENGJJZC = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"]

                    // 受抚养人现居住地
                    this.fyNowLive = []
                    for (var i = 0; i < this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"].length / 7; i++) {
                      var index = (i + 1) * 7 - 3
                      this.fyNowLive.push(this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][index].Children)
                    }
                    // fywithgo 受抚养人是否同行
                    this.fywithgo = []
                    for (var i = 0; i < this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"].length / 7; i++) {
                      var index = (i + 1) * 7 - 1
                      this.fywithgo.push(this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][index].Children)
                    }
                  }

                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {
                    if (this.userVisaInfo.ShowTagInfo[i].Tag == "JTUK07") {
                      // 亲戚
                      this.ENGqinqi = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                      var num = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].ValueCHS ? this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].ValueCHS : 0
                      var len = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"].length
                      this.visitqinqi = []
                      this.liveEngReason = []
                      for (var j = 0; j < len; j++) {
                        // 是否有访问他的计划
                        if (this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"][j].Tag == "JTUK0708") {
                          this.visitqinqi.push(this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"][j].Children)
                        }
                        //  亲戚留在英国的原因 英个签
                        if (this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"][j].Tag == "JTUK0712") {
                          this.liveEngReason.push(this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"][j].Children)
                        }
                      }
                    }
                    // 小于18岁 谁与你同行
                    this.ENGTtogether = []
                    if (this.userVisaInfo.ShowTagInfo[i].Tag == "JTUKT001") {
                      this.ENGTtogether = this.userVisaInfo.ShowTagInfo[i].Children["0"]["1"].Children["0"]["0"].Children["0"]
                    }
                  }

                }
                if (id == 7) {
                  // 几处住宿
                  // if(this.userVisaInfo.ShowTagInfo[7].Tag == "LXUK06"){
                  //   this.ENGzhusu = this.userVisaInfo.ShowTagInfo[7].Children["0"]["1"].Children["0"]
                  // }
                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {
                    if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUK06") {
                      this.ENGzhusu = this.userVisaInfo.ShowTagInfo[i].Children["0"]["1"].Children["0"]
                    }
                  }
                }
                if (id == 8) {
                  this.ENGT1 = []
                  this.ENGT2 = []
                  this.ENGT3 = []
                  this.ENGT4 = []
                  this.ENGT5 = []
                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {
                    if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0001") {
                      this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                    }
                    if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0002") {
                      this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                    }
                    if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0003") {
                      this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                    }
                    if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0005") {
                      this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                    }
                    if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0009") {
                      this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                    }
                  }
                }
              }

              if (this.$store.state.visa.certificateInfo.Country == "美国") {
                if (id == 7) {
                  // 同行人 有几个
                  this.MEItongxing = this.userVisaInfo.ShowTagInfo[6].Children["0"]["0"].Children["0"]["0"].Children["0"]
                  // console.log("????",this.MEItongxing);
                }
                if (id == 8) {
                  // 您去过几个国家
                  this.MEIotherCountry = this.userVisaInfo.ShowTagInfo[0].Children["0"]["0"].Children["0"]
                  // 去过几次美国
                  this.MEIgoNumber = this.userVisaInfo.ShowTagInfo[1].Children["0"]["0"].Children["0"]
                }
              }

              if(this.$store.state.visa.certificateInfo.Country == "法国"){
                  if(id == "8"){
                      this.fa1 = this.userVisaInfo.ShowTagInfo[0].Children["0"]["0"].Children["0"]
                  }
              }

              this.Isinit = true
              var t1 = setTimeout(function() {
                var allElCHS = $("#out").children().children().eq(1).children()
                var allElENG = $("#out").children().children().eq(3).children()
                for (var i = 0; i < allElCHS.length; i++) {
                  if ($(allElCHS[i]).find("input").attr("id") && $(allElCHS[i]).find("input").attr("id").indexOf("mobiscroll") > -1) {
                    $(allElCHS[i]).find("input").mobiscroll('getInst').destroy()
                    $(allElCHS[i]).find("input").attr("id", "")
                  }
                }
                for (var i = 0; i < allElENG.length; i++) {
                  if ($(allElENG[i]).find("input").attr("id") && $(allElENG[i]).find("input").attr("id").indexOf("mobiscroll") > -1) {
                    $(allElENG[i]).find("input").mobiscroll('getInst').destroy()
                    $(allElENG[i]).find("input").attr("id", "")
                  }
                }

              }, 100)


            } else {
              this.$layer.close(wait1)
            }
          },
          function(err) {
            this.$layer.close(wait1)
            this.$layer.msg("网络连接超时")
          }
        )
    },
    specialAry(tag, len) {
      if (this.newChild[tag]) {
        // ary = []
        var ary1 = []
        for (var n = 0; n < this.newChild[tag].length / len; n++) {
          var middleAry = []
          for (var m = n * len; m < this.newChild[tag].length; m++) {
            if (middleAry.length > len - 1) {
              break;
            } else {
              middleAry.push(this.newChild[tag][m][0])
            }
          }
          ary1.push(middleAry)
        }
        this.saveChild[tag] = ary1
      }
      return this.saveChild

    },
    changeGroupInfo() {
      // console.log(this.childStudentInfo)

      // 保存的时候去修改提交数据结构
      // 兄弟姐妹brotherSaveAry   子女childrenSaveAry
      var that = this
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


      this.specialAry("JT000501", 12)
      this.specialAry("JT000601", 12)
      this.specialAry("JT000716", 14)
      if (this.$root.get("country") == "英国") {
        this.specialAry("LX003506", 4)
      } else {
        this.specialAry("LX003506", 5)
      }
      this.specialAry("JTXXL019", 4)
      this.specialAry("JT000907", 6)
      this.specialAry("JTXXL001", 14)
      this.specialAry("JTUK0801", 7)
      if(this.$root.get("isGroupVisa") == "true"){
          this.specialAry("JTUK0701", 9)
      }else {
          this.specialAry("JTUK0701", 8)
      }

      this.specialAry("LXUK0608", 6)
      // 英团
      this.specialAry("JTUKT00202", 10)
      this.specialAry("LXUKT000101", 4)
      this.specialAry("LXUKT000201", 3)
      this.specialAry("LXUKT000301", 3)
      this.specialAry("LXUKT000501", 4)
      this.specialAry("LXUKT000901", 3)



      //美国
      this.specialAry("LXUSABC0030102", 3)
      this.specialAry("CJUSA000611", 1)
      this.specialAry("CJUSA0010", 2)

      //法国
      this.specialAry("CJFAR0101", 2)



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
                            tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children = that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Tag] ? that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[
                              a6][a7].Tag] : []
                            // 5
                            if (tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children.length > 0) {
                              for (var a8 = 0; a8 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children.length; a8++) {
                                for (var a9 = 0; a9 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8].length; a9++) {
                                  tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children = that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Tag] ? that.saveChild[tagInfo[
                                    a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Tag] : []
                                  // 6
                                  if (tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children.length > 0) {
                                    for (var a10 = 0; a10 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children.length; a10++) {
                                      for (var a11 = 0; a11 < tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children[a10].length; a11++) {
                                        tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children[a10][a11].Children = that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children[
                                          a10][a11].Tag] ? that.saveChild[tagInfo[a1].Children[a2][a3].Children[a4][a5].Children[a6][a7].Children[a8][a9].Children[a10][a11].Tag] : []
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
      // 更改特殊的数据结构
      // 代码一定要改 太麻烦了
      if (this.$store.state.visa.groupId == 6 && this.$store.state.visa.certificateInfo.Country == "澳大利亚") {
        // 分别添加兄弟 去过澳大利亚的时间
        if (this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children.length == 0) {
          this.outTime_B = []
        }
        if (this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children.length == 0) {
          this.outTime_C = []
        }
        // console.log(this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children)
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
      if (this.$store.state.visa.groupId == 6 && this.$store.state.visa.certificateInfo.Country == "新西兰") {
        // 新西兰 未成年子女监护人
        for (var i = 0; i < this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children.length; i++) {
          this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][12].Children = this.childStudentInfo[i]
          if (this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][13].ValueCHS == "是申请人") {
            this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][13].Children = this.applyPeopleInfo[i]
          } else {
            this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][13].Children = [
              []
            ]
          }
        }

        if (this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"] && this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].ValueCHS == 2) {
          if (this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].Children[0][2].ValueCHS == "其他" || this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].Children[0][2].ValueENG == "OTHER") {
            this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].Children[0][2].Children = this.NZLfriendInfo[0]
          } else {
            this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].Children[0][2].Children = [
              []
            ]
          }
        }



      }
      // fyNowLive 受抚养人现住址
      // fywithgo 受抚养人现住址
      // liveEngReason 亲戚留在英国的原因
      // console.log("???",this.fyNowLive)
      if (this.$store.state.visa.groupId == 6 && this.$store.state.visa.certificateInfo.Country == "英国" && this.userVisaInfo.ShowTagInfo[2].Tag == "GP20") {
        for (var i = 0; i < this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children.length; i++) {
          if (this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[i][4].ValueENG == "NO") {
            this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[i][4].Children = this.fyNowLive[i]
          } else {
            this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[i][4].Children = [
              []
            ]
          }
          if (this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[i][6].ValueENG == "YES") {
            this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[i][6].Children = this.fywithgo[i]
          } else {
            this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[i][6].Children = [
              []
            ]
          }
        }
        if (this.userVisaInfo.ShowTagInfo[3].ValueENG == "YES") {
          for (var i = 0; i < this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children.length; i++) {
            // 在英国的原因
            if (this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][7].ValueCHS || this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][7].ValueENG) {
              for (var j = 0; j < this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][7].Options.length; j++) {
                if (this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][7].ValueCHS == this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][7].Options[j].Value) {

                  if (this.liveEngReason[i]) {
                    var ary = [
                      []
                    ]
                    ary[0].push(this.liveEngReason[i][0][j])
                    this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][7].Children = ary
                  }
                }
              }
            } else {
              this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][7].Children = [
                []
              ]
            }
            // 是否访问
            if (this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][6].ValueCHS == "是" || this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][6].ValueENG == "YES") {
              if (this.visitqinqi[i] && this.visitqinqi[i].length > 0) {
                this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][6].Children = this.visitqinqi[i]
              }

            } else {
              this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[i][6].Children = [
                []
              ]
            }

          }
        }
      }
    },
    getUserInfo() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo', {
          params: {
            userVisaId: this.$store.state.app.ivisaId,
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

              this.fillNum = 0
              this.groupNum = this.meterialDetail.GroupList.length

              for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
                if (this.meterialDetail.GroupList[i].IsFilled) {
                  this.fillNum++;
                }
              }
              this.progress = parseInt(this.fillNum * 100 / this.groupNum)
              this.progressFun()
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    getUserInfoNZL() {
      this.$http.get(this.$store.state.app.host + 'api/Manage/UserVisaInfo4NZL', {
          params: {
            userVisaId: this.$store.state.app.ivisaId,
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
              // 记录百分比
              this.fillNum = 0
              this.groupNum = this.meterialDetail.GroupList.length
              for (var i = 0; i < this.meterialDetail.GroupList.length; i++) {
                if (this.meterialDetail.GroupList[i].IsFilled) {
                  this.fillNum++;
                }
              }
              this.progress = parseInt(this.fillNum * 100 / this.groupNum)
              this.progressFun()
            }
          },
          function(err) {
            this.$layer.msg("网络连接超时")
          }
        )
    },
    progressFun() {
      this.$http.post(this.$store.state.app.host + "api/Manage/SetPaperProgress", {
          UserVisaId: this.$store.state.app.ivisaId,
          TypeId: 2,
          Progress: this.progress
        }, {
          headers: {
            Authorization: this.$store.state.app.token
          }
        })
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
        this.$http.post(this.$store.state.app.host + 'api/Manage/SaveFilledGroupInfo', {
            UserVisaID: this.$store.state.app.ivisaId,
            GroupId: this.$root.get("GroupId"),
            TagInfo: this.userVisaInfo.ShowTagInfo
          }, {
            headers: {
              Authorization: this.$store.state.app.token
            },
            timeout: this.$store.state.app.httpTime
          })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.cantSave = false
                this.$layer.msg('保存成功')
                this.getGroupInfo(this.$store.state.visa.groupId)
                this.$root.eventHub.$emit("REFRESHFILL")
                this.$root.remove("SaveGroupId")
                if (this.$root.get("country") == "新西兰") {
                  this.getUserInfoNZL()
                } else {
                  this.getUserInfo()
                }

              } else {
                this.$layer.alert(res.data.Message)
                this.cantSave = false
              }
            },
            function(err) {
              this.cantSave = false
              this.$layer.msg("网络连接超时")
            }
          )
      }
    },
    changeOldData(tag, index, infoLen, childIndex, f_ChildIndex) {
      // 修改就数据结构
      // tag 最外层数据的第几组值  循环的长度  循环的内容的index值  问题:有几个人的index
      // console.log(tag,index,infoLen,childIndex,f_ChildIndex);
      var ary = []
      if (tag == "LXUSA003") {
        if (this.requestOldData.ShowTagInfo[index] && this.requestOldData.ShowTagInfo[index].Tag == tag && this.requestOldData.ShowTagInfo[index].Children["0"][f_ChildIndex].ValueCHS == "否") {

          for (var i = 0; i < this.requestOldData.ShowTagInfo[index].Children["0"][f_ChildIndex].Children["0"]["0"].Children["0"].length; i += infoLen) {
            ary.push(this.requestOldData.ShowTagInfo[index].Children["0"][f_ChildIndex].Children["0"]["0"].Children[childIndex].slice(i, i + infoLen))
          }
          this.requestOldData.ShowTagInfo[index].Children["0"][f_ChildIndex].Children["0"]["0"].Children = ary
        }
      } else {
        if (this.requestOldData.ShowTagInfo[index] && this.requestOldData.ShowTagInfo[index].Tag == tag) {
          for (var i = 0; i < this.requestOldData.ShowTagInfo[index].Children["0"][f_ChildIndex].Children["0"].length; i += infoLen) {
            ary.push(this.requestOldData.ShowTagInfo[index].Children["0"][f_ChildIndex].Children[childIndex].slice(i, i + infoLen))
          }
          this.requestOldData.ShowTagInfo[index].Children["0"][f_ChildIndex].Children = ary
        }
      }

      return this.requestOldData.ShowTagInfo
    },
    translateFun(par) {
      this.changeGroupInfo()

      // // 修改旧数据的结构 改为提交的结构 （兄弟姐妹/子女）

      // 澳大利亚
      this.changeOldData("GP03", 2, 12, 0, 0)
      this.changeOldData("GP04", 3, 12, 0, 0)
      // 新西兰
      this.changeOldData("GP13", 3, 14, 0, 0)
      this.changeOldData("GP14", 4, 4, 0, 0)
      this.changeOldData("JT0009", 5, 6, 0, 0)
      // 英国
      this.changeOldData("GP20", 2, 7, 0, 0) //受抚养人
      // this.$root.set("isGroupVisa",par.isGroupVisa)
      if(this.$root.get("isGroupVisa") == "true"){
          // 团签
          this.changeOldData("JTUK07", 3, 9, 0, 0) //在英国的亲戚
      }else{
          this.changeOldData("JTUK07", 3, 8, 0, 0) //在英国的亲戚
      }

      this.changeOldData("LXUK06", 6, 6, 0, 1) //在英国的住处
      // 美国
      this.changeOldData("LXUSA003", 6, 3, 0, 0) //同行人
      this.changeOldData("CJUSA0006", 0, 1, 0, 0) //去过几个国家
      this.changeOldData("CJUSA001", 1, 2, 0, 0) //去过美国几次

      // 英国团签 以往出入境
      // JTUKT001
      this.changeOldData("JTUKT001", 2, 10, 0, 1)
      this.changeOldData("LXUKT0001", 0, 4, 0, 0)
      this.changeOldData("LXUKT0002", 1, 3, 0, 0)
      this.changeOldData("LXUKT0003", 2, 3, 0, 0)
      this.changeOldData("LXUKT0005", 4, 4, 0, 0)
      this.changeOldData("LXUKT0009", 8, 3, 0, 0)
      //法国
      this.changeOldData("CJFAR01", 0, 2, 0, 0)


      if (this.canTrans) {
        this.canTrans = false
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
          }, {
            headers: {
              Authorization: this.$store.state.app.token
            },
            timeout: this.$store.state.app.httpTime
          })
          .then(
            function(res) {
              if (res.data.Code == 0) {
                this.canTrans = true
                this.Isinit = true
                this.userVisaInfo = res.data.Result
                this.requestOldData = JSON.parse(JSON.stringify(this.userVisaInfo))
                this.outTime_B = []
                this.outTime_C = []
                if (this.$store.state.visa.groupId == 6 && this.$store.state.visa.certificateInfo.Country == "澳大利亚") {
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

                  if (this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].DefaultValue) {
                    this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].ValueCHS == null ? this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].ValueCHS = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[
                      "0"][5].DefaultValue.split("|")[0] : void 0
                    this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].ValueENG == null ? this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][5].ValueENG = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[
                      "0"][5].DefaultValue.split("|")[1] : void 0
                  }
                  if (this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].DefaultValue) {
                    this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].ValueCHS == null ? this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].ValueCHS = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[
                      "0"][5].DefaultValue.split("|")[0] : void 0
                    this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].ValueCHS == null ? this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][5].ValueENG = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[
                      "0"][5].DefaultValue.split("|")[1] : void 0
                  }


                  this.brotherSaveAry = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children[0]
                  this.childrenSaveAry = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children[0]
                  this.friendAry = []
                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo[4].Children["0"]["0"].Children.length; i++) {
                    for (var j = 0; j < this.userVisaInfo.ShowTagInfo[4].Children["0"]["0"].Children[i].length; j++) {
                      this.friendAry.push(this.userVisaInfo.ShowTagInfo[4].Children["0"]["0"].Children[i][j])
                    }
                  }


                  var allInfo = this.userVisaInfo.ShowTagInfo[2],
                    allInfo2 = this.userVisaInfo.ShowTagInfo[3],
                    area1 = this.area1
                  var that = this
                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"].length / 12; i++) {

                    (function(i) {
                      if (allInfo.Children["0"]["0"].Children["0"][i * 12 + 5].FieldType == 2) {
                        if (allInfo.Children["0"]["0"].Children["0"][i * 12 + 5].ValueCHS == "中国") {
                          allInfo.Children["0"]["0"].Children["0"][i * 12 + 6].Options = area1
                          allInfo.Children["0"]["0"].Children["0"][i * 12 + 7].Options = that.getarea2(allInfo.Children["0"]["0"].Children["0"][i * 12 + 6].ValueCHS)
                        }
                      }
                      that.userVisaInfo.ShowTagInfo[2] = allInfo
                    })(i)
                  }

                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"].length / 12; i++) {
                    (function(i) {
                      if (allInfo2.Children["0"]["0"].Children["0"][i * 12 + 5].FieldType == 2) {
                        if (allInfo2.Children["0"]["0"].Children["0"][i * 12 + 5].ValueCHS == "中国") {
                          allInfo2.Children["0"]["0"].Children["0"][i * 12 + 6].Options = area1
                          allInfo2.Children["0"]["0"].Children["0"][i * 12 + 7].Options = that.getarea2(allInfo2.Children["0"]["0"].Children["0"][i * 12 + 6].ValueCHS)
                        }
                      }
                      that.userVisaInfo.ShowTagInfo[3] = allInfo2
                    })(i)
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
                if (this.groupId == 7 && this.$store.state.visa.certificateInfo.Country == "澳大利亚") {
                  this.peerPeople = []
                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo[7].Children["0"]["0"].Children.length; i++) {
                    for (var j = 0; j < this.userVisaInfo.ShowTagInfo[7].Children["0"]["0"].Children[i].length; j++) {
                      this.peerPeople.push(this.userVisaInfo.ShowTagInfo[7].Children["0"]["0"].Children[i][j])
                    }
                  }
                }
                // 身份证 长期-long
                if (this.groupId == 1 && this.$store.state.visa.certificateInfo.Country != "美国EVUS") {
                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo[5].Children["0"].length; i++) {
                    if (this.userVisaInfo.ShowTagInfo[5].Children["0"][i].Tag == "JB000605" && this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueCHS == "长期") {
                      this.userVisaInfo.ShowTagInfo[5].Children["0"][i].FieldType = 0
                      this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueCHS = "长期"
                      this.userVisaInfo.ShowTagInfo[5].Children["0"][i].ValueENG = "long"
                    }
                  }

                }

                if (this.groupId == 6 && this.$store.state.visa.certificateInfo.Country == "新西兰") {
                  // 跟随
                  this.gsChildAry = this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"]
                  // 不跟随子女
                  this.bgsChildAry = this.userVisaInfo.ShowTagInfo[4].Children["0"]["0"].Children["0"]
                  // 在新西兰的朋友
                  this.friendAryNZL = this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].Children["0"]
                  // 子女职业信息
                  this.childStudentInfo = []
                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].ValueCHS; i++) {
                    var index = (i + 1) * 14 - 2
                    this.childStudentInfo.push(this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][index].Children)
                  }
                  this.applyPeopleInfo = []
                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].ValueCHS; i++) {
                    var index = (i + 1) * 14 - 1
                    this.applyPeopleInfo.push(this.userVisaInfo.ShowTagInfo[3].Children["0"]["0"].Children["0"][index].Children)
                  }
                  this.NZLfriendInfo = []
                  for (var i = 0; i < this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].ValueCHS; i++) {
                    var index = (i + 1) * 6 - 4
                    this.NZLfriendInfo.push(this.userVisaInfo.ShowTagInfo[5].Children["0"]["0"].Children["0"][index].Children)
                  }
                }

                if (this.$store.state.visa.certificateInfo.Country == "英国") {
                  if (this.groupId == 6) {
                    // 有几个需要经济支持的人 JTUK0801
                    if (this.userVisaInfo.ShowTagInfo[2].Tag == "GP20") {
                      this.ENGJJZC = this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"]

                      // 受抚养人现居住地
                      this.fyNowLive = []
                      for (var i = 0; i < this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"].length / 7; i++) {
                        var index = (i + 1) * 7 - 3
                        this.fyNowLive.push(this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][index].Children)
                      }
                      // fywithgo 受抚养人是否同行
                      this.fywithgo = []
                      for (var i = 0; i < this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"].length / 7; i++) {
                        var index = (i + 1) * 7 - 1
                        this.fywithgo.push(this.userVisaInfo.ShowTagInfo[2].Children["0"]["0"].Children["0"][index].Children)
                      }
                    }

                    for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {
                      if (this.userVisaInfo.ShowTagInfo[i].Tag == "JTUK07") {
                        // 亲戚
                        this.ENGqinqi = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]

                        var len = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"].length
                        this.visitqinqi = []
                        this.liveEngReason = []
                        for (var j = 0; j < len; j++) {
                          // 是否有访问他的计划
                          if (this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"][j].Tag == "JTUK0708") {
                            this.visitqinqi.push(this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"][j].Children)
                          }
                          //  亲戚留在英国的原因 英个签
                          if (this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"][j].Tag == "JTUK0712") {
                            this.liveEngReason.push(this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"][j].Children)
                          }
                        }
                      }
                      // 小于18岁 谁与你同行
                      this.ENGTtogether = []
                      if (this.userVisaInfo.ShowTagInfo[i].Tag == "JTUKT001") {
                        this.ENGTtogether = this.userVisaInfo.ShowTagInfo[i].Children["0"]["1"].Children["0"]["0"].Children["0"]
                      }
                    }
                  }
                  if (this.groupId == 7) {
                    // 几处住宿
                    // this.ENGzhusu = this.userVisaInfo.ShowTagInfo[7].Children["0"]["1"].Children["0"]
                    this.ENGzhusu = []
                    for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {
                      if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUK06") {
                        this.ENGzhusu = this.userVisaInfo.ShowTagInfo[i].Children["0"]["1"].Children["0"]
                      }
                    }
                  }
                  if (this.groupId == 8) {
                    this.ENGT1 = []
                    this.ENGT2 = []
                    this.ENGT3 = []
                    this.ENGT4 = []
                    this.ENGT5 = []
                    for (var i = 0; i < this.userVisaInfo.ShowTagInfo.length; i++) {
                      if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0001") {
                        this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                      }
                      if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0002") {
                        this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                      }
                      if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0003") {
                        this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                      }
                      if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0005") {
                        this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                      }
                      if (this.userVisaInfo.ShowTagInfo[i].Tag == "LXUKT0009") {
                        this.ENGT1 = this.userVisaInfo.ShowTagInfo[i].Children["0"]["0"].Children["0"]
                      }
                    }
                  }

                }


                if (this.$store.state.visa.certificateInfo.Country == "美国") {
                  if (this.groupId == 7) {
                    // 同行人 有几个
                    this.MEItongxing = this.userVisaInfo.ShowTagInfo[6].Children["0"]["0"].Children["0"]["0"].Children["0"]
                    // console.log("????",this.MEItongxing);
                  }
                  if (this.groupId == 8) {
                    // 您去过几个国家
                    this.MEIotherCountry = this.userVisaInfo.ShowTagInfo[0].Children["0"]["0"].Children["0"]
                    // 去过几次美国
                    this.MEIgoNumber = this.userVisaInfo.ShowTagInfo[1].Children["0"]["0"].Children["0"]
                  }
                }
                if(this.$store.state.visa.certificateInfo.Country == "法国"){
                    if(this.groupId == "8"){
                        this.fa1 = this.userVisaInfo.ShowTagInfo[0].Children["0"]["0"].Children["0"]
                    }
                }


                if (par.save) {
                  var that = this
                  setTimeout(function() {
                    that.saveInfo()
                  }, 100)
                }

              } else {
                this.canTrans = true
                this.$layer.msg(res.data.Message)
              }
            },
            function(err) {
              this.canTrans = true
              this.$layer.msg("网络连接超时")
            }
          )
      }

    },
    returnInfo(valC, valE, tag, info) {

      var index_s = 0
      var index_z = 0
      if (info.DefaultValue != null && this.Isinit) {
        if (info.ValueCHS == null) {
          info.ValueCHS = info.DefaultValue.split("|")[0]
          info.ValueENG = info.DefaultValue.split("|")[1]
        }
        valC = info.ValueCHS
        valE = info.ValueENG
      }


      if (info.FieldType == 2) {
          // 国家
        info.Options = !info.Options?this.countryOption:info.Options
        this.guojia = info.ValueCHS
        if (info.ValueENG == "CHINA") {
          info.ValueENG = "China"
        }
      }

      // tag == "JT000501" || tag == "JT000601"
      // 国家 省 市
      if (tag != "JT000501" && tag != "JT000601") {
        if (this.Isinit) {

          this.bcGuojia[info.Tag] = []
          if (info.FieldType == 2) {
            // 国家
            this.guojia = info.ValueCHS
            this.bcGuojia[info.Tag].push(info)
          }
          var that = this
          setTimeout(function() {
            if (info.Tag != "JT000515" && info.Tag != "JT000516" && info.Tag != "JT000517" && info.Tag != "JT000618" && info.Tag != "JT000619" && info.Tag != "JT000620") {
              if (info.FieldType == 3) {
                // 省
                if (that.bcGuojia[info.DependFieldTag] && that.bcGuojia[info.DependFieldTag].length > 1) {} else if (that.bcGuojia[info.DependFieldTag]) {

                  if (that.bcGuojia[info.DependFieldTag][index_s].ValueCHS == "中国" || that.bcGuojia[info.DependFieldTag][index_s].ValueENG == "China") {
                    info.Options = that.area1
                  } else {
                    info.Options = null
                  }
                }

                that.bcGuojia[info.Tag].push(info)
                that.shengshi = info.ValueCHS
              }
              if (info.FieldType == 4) {
                // 市
                if (that.bcGuojia[info.DependFieldTag] && that.bcGuojia[info.DependFieldTag].length > 1) {

                } else if (that.bcGuojia[info.DependFieldTag]) {
                  if (that.bcGuojia[info.DependFieldTag].length > 0 && that.bcGuojia[info.DependFieldTag][index_z].Options != null) {
                    info.Options = that.getarea2(that.bcGuojia[info.DependFieldTag][0].ValueCHS)
                  } else {
                    info.Options = null
                  }
                }
                that.bcGuojia[info.Tag].push(info)
              }
            }

          }, 5)
        }
      } else {

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

      } else if (tag == "JT000501" || tag == "JT000601" || tag == "JT000716" || tag == "LX003506" || tag == "JTXXL019" || tag == "JT000907" || tag == "JTXXL001" || tag == "JTUK0801" || tag == "JTUK0701" || tag == "LXUK0608" || tag ==
        "LXUSABC0030102" || tag == "CJUSA000611" || tag == "CJUSA0010" || tag == "LXUKT000101" || tag == "LXUKT000201" || tag == "LXUKT000301" || tag == "LXUKT000501" || tag == "LXUKT000901" || tag == "JTUKT00202"||tag == "CJFAR0101") {

        switch (tag) {
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
            if (this.$root.get("country") == "英国") {
              var infoLength = 4
            } else {
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

            if(this.$root.get("isGroupVisa") == "true"){
                var infoLength = 9
            }else {
                var infoLength = 8
            }
            this.xunhuanAry = this.ENGqinqi
            break;
          case "LXUK0608":
            var infoLength = 6
            this.xunhuanAry = this.ENGzhusu
            break;
          case "LXUSABC0030102":
            var infoLength = 3
            this.xunhuanAry = this.MEItongxing
            break;
          case "CJUSA000611":
            var infoLength = 1
            this.xunhuanAry = this.MEIotherCountry
            break;
          case "CJUSA0010":
            var infoLength = 2
            this.xunhuanAry = this.MEIgoNumber
            break;
          case "LXUKT000101":
            var infoLength = 4
            this.xunhuanAry = this.ENGT1
            break;
          case "LXUKT000201":
            var infoLength = 3
            this.xunhuanAry = this.ENGT2
            break;
          case "LXUKT000301":
            var infoLength = 3
            this.xunhuanAry = this.ENGT3
            break;
          case "LXUKT000501":
            var infoLength = 4
            this.xunhuanAry = this.ENGT4
            break;
          case "LXUKT000901":
            var infoLength = 3
            this.xunhuanAry = this.ENGT5
            break;
          case "JTUKT00202":
            var infoLength = 10
            this.xunhuanAry = this.ENGTtogether
            break;
            case "CJFAR0101":
              var infoLength = 2
              this.xunhuanAry = this.fa1
              break;
        }



        if (valC && !isNaN(valC)) {
          index = info.Options.length

          if (info.Children.length > 0) {
            this.newChild[tag] = []
            for (var i = 0; i < info.Children.length; i++) {
              for (var j = 0; j < info.Children[i].length; j++) {
                if (info.Children[i][j] && info.Children[i][j].OptionIndex == index) {
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
                    if (this.newChild[tag][this.newChild[tag].length - 1][0].DefaultValue) {

                      if (this.xunhuanAry && this.xunhuanAry[this.newChild[tag].length - 1]) {
                        this.newChild[tag][this.newChild[tag].length - 1][0].ValueCHS = this.xunhuanAry[this.newChild[tag].length - 1].ValueCHS
                        this.newChild[tag][this.newChild[tag].length - 1][0].ValueENG = this.xunhuanAry[this.newChild[tag].length - 1].ValueENG
                        this.newChild[tag][this.newChild[tag].length - 1][0].Options = this.xunhuanAry[this.newChild[tag].length - 1].Options
                      } else {
                        this.newChild[tag][this.newChild[tag].length - 1][0].ValueCHS = this.newChild[tag][this.newChild[tag].length - 1][0].DefaultValue.split("|")[0]
                        this.newChild[tag][this.newChild[tag].length - 1][0].ValueENG = this.newChild[tag][this.newChild[tag].length - 1][0].DefaultValue.split("|")[1]
                      }

                    } else {

                      if (this.xunhuanAry && this.xunhuanAry[this.newChild[tag].length - 1]) {
                        this.newChild[tag][this.newChild[tag].length - 1][0].ValueCHS = this.xunhuanAry[this.newChild[tag].length - 1].ValueCHS
                        this.newChild[tag][this.newChild[tag].length - 1][0].ValueENG = this.xunhuanAry[this.newChild[tag].length - 1].ValueENG
                        this.newChild[tag][this.newChild[tag].length - 1][0].Options = this.xunhuanAry[this.newChild[tag].length - 1].Options
                      } else {
                        this.newChild[tag][this.newChild[tag].length - 1][0].ValueCHS = null
                        this.newChild[tag][this.newChild[tag].length - 1][0].ValueENG = null
                      }
                    }
                  }

                }

                if (tag == "JT000501") {
                  this.outTime_B.push(this.outTime_B[0])
                  if (this.outTime_B[this.outTime_B.length - 1]) {
                    this.outTime_B[this.outTime_B.length - 1][0].ValueCHS = ""
                    this.outTime_B[this.outTime_B.length - 1][0].ValueENG = ""
                  }
                } else if (tag == "JT000601") {
                  this.outTime_C.push(this.outTime_C[0])
                  if (this.outTime_C[this.outTime_C.length - 1]) {
                    this.outTime_C[this.outTime_C.length - 1][0].ValueCHS = ""
                    this.outTime_C[this.outTime_C.length - 1][0].ValueENG = ""
                  }

                }

              }
            } else {
              info.Children = this.newChild[tag]
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
                if (info.Children[i][j] && info.Children[i][j].OptionIndex == index + 1) {
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
      if (CorE) {
        // 中文
        value = info.ValueCHS
      } else {
        // 英文
        value = info.ValueENG
      }
      if (value && type == 2) { //护照号码验证
        // var reg = /^[A-Za-z][0-9]{9}$/

        var reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[0-9A-Za-z]{9}$/

        if (value.match(reg) == null) {
          this.$layer.alert('请输入正确的护照号')
          info.ValueCHS = ""
          info.ValueENG = ""
          // if (CorE) {
          //   info.ValueCHS = ""
          // } else {
          //   info.ValueENG = ""
          // }
        } else {}
      }
      if (value && type == 4) { //邮箱验证
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (value.match(reg) == null) {
          this.$layer.alert('请输入正确的邮箱格式')
          info.ValueCHS = ""
          info.ValueENG = ""
          // if (CorE) {
          //   info.ValueCHS = ""
          // } else {
          //   info.ValueENG = ""
          // }
        } else {}
      }
      if (value && type == 1) { //身份证有效期
        if (this.$root.verifyDay(value) < 180) {
          this.$layer.alert('您的身份证有效期已不满六个月，请到相应机构办理新的身份证后再进行办理。')
          info.ValueCHS = ""
          info.ValueENG = ""
          // if (CorE) {
          //   info.ValueCHS = ""
          // } else {
          //   info.ValueENG = ""
          // }
        } else {}
      }
      if (value && type == 3) { //护照有效期
        if (this.$root.verifyDay(value) < 180) {
          this.$layer.alert("您的护照有效期已不满六个月，请到相应机构换发新护照后再进行办理，并留出充足的签证办理时间，以免耽误您的出行。")
          info.ValueCHS = ""
          info.ValueENG = ""

          // if (CorE) {
          //   info.ValueCHS = ""
          // } else {
          //   info.ValueENG = ""
          // }
        } else {}
      }
      if (value && type == 6) { //出发日期不能为今天及以前
        this.outDate = value
        if (this.$root.verifyDay(value) < 0) {
          this.$layer.alert("出发日期不能为今天及以前的日期，请选择正确日期。")
          info.ValueCHS = ""
          info.ValueENG = ""
          // if (CorE) {
          //   info.ValueCHS = ""
          // } else {
          //   info.ValueENG = ""
          // }
        } else {}
      }
      if (value && type == 7) { //回国日期不能为出行日期及以前
        // console.log(this.$root.verifyDay(value))
        if (this.$root.verifyDay(value) <= 0) {
          this.$layer.alert('回国日期不能为出发日期当天及以前的日期，请选择正确日期。')
          info.ValueCHS = ""
          info.ValueENG = ""
          // if (CorE) {
          //   info.ValueCHS = ""
          // } else {
          //   info.ValueENG = ""
          // }
        } else {
          // var goDate = document.getElementById('LX000801').getElementsByClassName('value')[0].innerHTML
          if (this.$root.verifyDay1(value, this.outDate) <= 0) {
            // console.log("cuole")
            this.$layer.alert('回国日期不能为出发日期当天及以前的日期，请选择正确日期。')
            info.ValueCHS = ""
            info.ValueENG = ""

          } else {

          }
        }
      }
    },
    focusInput(info, e) {
      this.Isinit = false
      // console.log(info.FieldType);
      var currYear = new Date().getFullYear();
      if (info.FieldType == 6) {
        var that = this

        $(e.target).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 20,
          dateFormat: "yyyy-mm",
          dateOrder: "yyyymm",
          onSelect: function(event, inst) {
            if (event) {
              info.ValueCHS = event
              info.ValueENG = event
              that.VerifyTypeFun(info, info.VerifyType, true)
            }
          }
        });
      } else if (info.FieldType == 1) {
          console.log(122);
        var that = this
        $(e.target).mobiscroll().date({
          theme: 'mobiscroll',
          display: 'bubble',
          lang: "zh",
          endYear: currYear + 20,
          dateFormat: "yyyy-mm-dd",
          dateOrder: "yyyymmdd",
          onSelect: function(event, inst) {
            if (event) {
              info.ValueCHS = event
              info.ValueENG = event
              // console.log(info)
              that.VerifyTypeFun(info, info.VerifyType, true)
            }
          }
        });
      }
    },
    inputDom(parentSelectEL, arr) {

      for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = arr[i][1]
        parentSelectEL.appendChild(option)
      }
    },
    inputVal(val, tag, info, CorE, index) {
      this.Isinit = false
      if (tag == "JT000501" && this.newChild.JT000501.length > 0) {
        // this.newChild.JT000501[index][0] = info
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
    selectVal(seleIndex, tag, info, index, level) {
      // console.log(seleIndex, tag, info, index,level,this.newChild[tag])
      if (level == 1) {
        if (info.Options[seleIndex]) {
          info.ValueCHS = info.Options[seleIndex].Value
          info.ValueENG = info.Options[seleIndex].ValueENG
        }
        if (this.userVisaInfo.ShowTagInfo[index + 1] && this.userVisaInfo.ShowTagInfo[index + 1].FieldType == 4) {
          // 市
          this.userVisaInfo.ShowTagInfo[index + 1].Options = this.getarea2(info.ValueCHS)
        }
        return
      }




      // this.Isinit = false
      // if(this.newChild[tag][0]&&this.newChild[tag][0][0].Children.length>0){
      //   for(var i = 0;i<this.newChild[tag][0][0].Children[0].length;i++){
      //     if(this.newChild[tag][0][0].Children[0][i].DefaultValue){
      //       if(this.newChild[tag][0][0].Children[0][i].ValueCHS == null){
      //         this.newChild[tag][0][0].Children[0][i].ValueCHS = this.newChild[tag][0][0].Children[0][i].DefaultValue.split("|")[0]
      //       }
      //       if(this.newChild[tag][0][0].Children[0][i].ValueENG == null){
      //         this.newChild[tag][0][0].Children[0][i].ValueENG = this.newChild[tag][0][0].Children[0][i].DefaultValue.split("|")[1]
      //       }
      //     }
      //   }
      // }
      if (seleIndex > -1) {
        info.ValueENG = info.Options[seleIndex].ValueENG
        info.ValueCHS = info.Options[seleIndex].Value
      }
      if (tag == "JT000501" && this.newChild.JT000501.length > 0) {
        this.newChild.JT000501[index][0] = info
        // this.userVisaInfo.ShowTagInfo[2].Children[0][0].Children[0][index] = info
      }
      if (tag == "JT000601" && this.newChild.JT000601.length > 0) {
        this.newChild.JT000601[index][0] = info
        // this.userVisaInfo.ShowTagInfo[3].Children[0][0].Children[0][index] = info
      }
      if (info.FieldType == 3) {
        this.Isinit = false
// 省
        // this.newChild[tag][index + 1][0].aa = this.getarea2(info.ValueCHS)
        if (this.newChild[tag][index + 1][0].FieldType == 4) {
          this.newChild[tag][index + 1][0].ValueCHS = null
          this.newChild[tag][index + 1][0].ValueENG = null
          this.newChild[tag][index + 1][0].Options = this.getarea2(info.ValueCHS)
        }
        // console.log(this.newChild[tag][index + 1])
      }
      if (info.FieldType == 2 && index >= 0) {
        var that = this
        this.Isinit = false
        setTimeout(function() {
          if (info.ValueCHS != "中国" && info.ValueENG != "China") {
            that.Isinit = false
            that.newChild[tag][index + 1] && that.newChild[tag][index + 1][0].FieldType == 3 ? that.newChild[tag][index + 1][0].Options = null : void 0
            that.newChild[tag][index + 2] && that.newChild[tag][index + 2][0].FieldType == 4 ? that.newChild[tag][index + 2][0].Options = null : void 0
          } else {
            that.Isinit = true
            if (tag == "JT000501" || tag == "JT000601") that.Isinit = false
            that.newChild[tag][index + 1] && that.newChild[tag][index + 1][0].FieldType == 3 ? that.newChild[tag][index + 1][0].Options = that.area1 : void 0
            that.newChild[tag][index + 2] && that.newChild[tag][index + 2][0].FieldType == 4 ? that.newChild[tag][index + 2][0].Options = [] : void 0
          }
          // console.log(that.newChild[tag][index + 1][0])
          if (that.newChild[tag][index + 1] && that.newChild[tag][index + 1][0].FieldType == 3) {
            that.newChild[tag][index + 1][0].ValueCHS = null
            that.newChild[tag][index + 1][0].ValueENG = null
          }
          if (that.newChild[tag][index + 2] && that.newChild[tag][index + 2][0].FieldType == 4) {
            that.newChild[tag][index + 2][0].ValueCHS = null
            that.newChild[tag][index + 2][0].ValueENG = null
          }
        }, 6)

      }

    },
    clickSelect(el, info) {

    },
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
    this.Isinit = true
    this.getGroupInfo(this.$store.state.visa.groupId)
    var that = this
    this.$root.eventHub.$on("GROUPID", function(obj) {
      that.firstRequse = 1
      that.cantSave = false
      that.Isinit = true
      that.getGroupInfo(obj.groupId)
    })

    this.nowdate = new Date()
    var month = null
    if ((this.nowdate.getMonth() + 1) < 10) month = "0" + (this.nowdate.getMonth() + 1)
    this.nowdate = this.nowdate.getFullYear() + "" + month + "" + this.nowdate.getDate()
  },
  updated() {
    document.getElementById("out") ? this.outHeight = document.getElementById("out").offsetHeight : void 0;
    this.pmHeight = document.body.offsetHeight - 100
  }
}
</script>
<style type="text/css">
@import url(./../css/baseInfoAustralia.css);
</style>
