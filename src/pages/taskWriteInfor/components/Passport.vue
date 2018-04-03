<template>
	<div class="baseInfoOut">
		<div class="part">
			<div class="partTitle"><p>护照</p></div>
			<div class="partList">
				<div class="huzhaoImg">
					<img src="/static/huzhao.png">
				</div>
				<div>
					<label>国籍：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>出生日期：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>出生国家：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>出生地点：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>出生所在省份：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>护照号：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>签发地点：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>签发日期：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>到期日：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label class="boldFont">另外一份护照或旅行证件：</label>
					<input type="text" name="" v-model='value'>
					<div class="secondLevel">
						<div>
							<label>护照号：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>签发地点：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>签发日期：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>到期日：</label>
							<input type="text" name="" v-model='value'>
						</div>
					</div>
				</div>
				<div>
					<label class="boldFont">旧护照信息：</label>
					<input type="text" name="" v-model='value'>
					<div class="secondLevel">
						<div>
							<label>护照号：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>签发地点：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>签发日期：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>到期日：</label>
							<input type="text" name="" v-model='value'>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="part">
			<div class="partTitle"><p>护照(protection)</p></div>
			<div class="">
				<div class="huzhaoImg">
					<img src="/static/huzhao.png">
				</div>
				<div>
					<label>国籍：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>出生日期：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>出生国家：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>出生地点：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>出生所在省份：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>护照号：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>签发地点：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>签发日期：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>到期日：</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label class="boldFont">另外一份护照或旅行证件：</label>
					<input type="text" name="" v-model='value'>
					<div class="secondLevel">
						<div>
							<label>护照号：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>签发地点：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>签发日期：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>到期日：</label>
							<input type="text" name="" v-model='value'>
						</div>
					</div>
				</div>
				<div>
					<label class="boldFont">旧护照信息：</label>
					<input type="text" name="" v-model='value'>
					<div class="secondLevel">
						<div>
							<label>护照号：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>签发地点：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>签发日期：</label>
							<input type="text" name="" v-model='value'>
						</div>
						<div>
							<label>到期日：</label>
							<input type="text" name="" v-model='value'>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				value:'val'
			}
		}
	}
</script>
<style type="text/css">
	@import url(./../css/baseInfo.css);
</style>