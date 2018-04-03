<template>
	<div class="baseInfoOut">
		<div class="part">
			<div class="partTitle">
				<p>行程单</p>
			</div>
			<div class="partList">
				<div>
					<label>在过去10年内，您访问了英国多少次?</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>您是否曾在英国接受过医疗服务？</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>您在过去10年内曾申请过在英国居留吗？</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label class="boldFont">您在过去的10年内访问过下面的这些地方多少次？</label>
					<input type="text" name="" v-model='value'>
					<div class="secondLevel">
						<div>
							<label>您访问了哪个国家？</label>
							<input type="text" name="" v-model='name'>
						</div>
						<div>
							<label>您访问的理由是什么？</label>
							<input type="text" name="" v-model='name'>
						</div>
						<div>
							<label>访问日期</label>
							<input type="text" name="" v-model='name'>
						</div>
						<div>
							<label>您的访问持续了多长时间？</label>
							<input type="text" name="" v-model='name'>
						</div>
					</div>

				</div>
				<div>
					<label>您在过去10年内访问过其他国家吗？</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>您是都曾被英国拒签？</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>您是否曾被英国以外的任何国家拒签？</label>
					<input type="text" name="" v-model='value'>
				</div>
			</div>
		</div>
		<div class="part">
			<div class="partTitle">
				<p>行程单(itinerary)</p>
			</div>
			<div class="">
				<div>
					<label>在过去10年内，您访问了英国多少次?</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>您是否曾在英国接受过医疗服务？</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>您在过去10年内曾申请过在英国居留吗？</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label class="boldFont">您在过去的10年内访问过下面的这些地方多少次？</label>
					<input type="text" name="" v-model='value'>
					<div class="secondLevel">
						<div>
							<label>您访问了哪个国家？</label>
							<input type="text" name="" v-model='name'>
						</div>
						<div>
							<label>您访问的理由是什么？</label>
							<input type="text" name="" v-model='name'>
						</div>
						<div>
							<label>访问日期</label>
							<input type="text" name="" v-model='name'>
						</div>
						<div>
							<label>您的访问持续了多长时间？</label>
							<input type="text" name="" v-model='name'>
						</div>
					</div>

				</div>
				<div>
					<label>您在过去10年内访问过其他国家吗？</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>您是都曾被英国拒签？</label>
					<input type="text" name="" v-model='value'>
				</div>
				<div>
					<label>您是否曾被英国以外的任何国家拒签？</label>
					<input type="text" name="" v-model='value'>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				value:10
			}
		}
	}
</script>
<style type="text/css">
	
</style>