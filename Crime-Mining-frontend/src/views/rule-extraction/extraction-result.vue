<template>
	<div class="tab-container">
		<el-tag>algorithm used ：{{ algorithm }}</el-tag>
		<el-tag type="success" style="margin-left: 10px;">number of rules generated ：{{ rulesNum }}</el-tag>
		<el-tag type="danger" style="margin-left: 10px;">average length of rules ：{{ rulesAvgLength }}</el-tag>
		<el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
			<el-tab-pane :key="tabMapOptions[0].key" :label="tabMapOptions[0].label" :name="tabMapOptions[0].key">
				<el-table :data="ifThenRulesData" border highlight-current-row style="width: 100%;">
					<el-table-column v-if="ifThenRulesData.length" type="index" label="ID" />
					<el-table-column v-for="item of ifThenRulesHeader" :key="item" :prop="item" :label="item" />
				</el-table>
			</el-tab-pane>
			
			<el-tab-pane :key="tabMapOptions[1].key" :label="tabMapOptions[1].label" :name="tabMapOptions[1].key">
				<el-table :data="tableFormatData" border highlight-current-row style="width: 100%;">
					<el-table-column v-if="tableFormatData.length" type="index" label="ID" />
					<el-table-column v-for="item of tableFormatHeader" :key="item" :prop="item" :label="item" />
				</el-table>
			</el-tab-pane>
			
			<el-tab-pane :key="tabMapOptions[2].key" :label="tabMapOptions[2].label" :name="tabMapOptions[2].key">
				<el-table :data="confusionMatrixData" border highlight-current-row style="width: 100%;">
					<el-table-column v-for="item of confusionMatrixHeader" :key="item" :prop="item" :label="item" />
				</el-table>
			</el-tab-pane>
			
			<el-tab-pane :key="tabMapOptions[3].key" :label="tabMapOptions[3].label" :name="tabMapOptions[3].key">
				<el-table :data="oriResults" border highlight-current-row style="width: 100%;">
					<el-table-column v-if="oriResults.length" type="index" label="ID" />
					<el-table-column v-for="item of oriHeader" :key="item" :prop="item" :label="item" />
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'Rule-Extraction-Result',
		components: {
		},
		data() {
			return {
				confusionMatrixHeader: [],
				confusionMatrixData: [],
				tableFormatHeader: [],
				tableFormatData: [],
				ifThenRulesData: [],
				ifThenRulesHeader: [],
				rulesNum: 0,
				rulesAvgLength: 0,
				oriData: [],
				oriHeader: [],
				tabMapOptions: [{
						label: 'IF_THEN Rules',
						key: '1'
					},
					{
						label: 'Tabular Format',
						key: '2'
					},
					{
						label: 'Confusion Matrix',
						key: '3'
					},
					{
						label: 'Raw Data',
						key: '4'
					}
				],
				activeName: '1',
				algorithm: ''
			}
		},
		watch: {
			activeName(val) {
				this.$router.push(`${this.$route.path}?tab=${val}`)
			}
		},
		created() {
			const oriData = this.$route.params.oriData
			this.algorithm = this.$route.params.algorithm
			this.oriResults = oriData.oriResults
			this.oriHeader = oriData.oriHeader
			const data = this.$route.params.data
			this.confusionMatrixHeader = data.confusionMatrix['header']
			this.confusionMatrixData = data.confusionMatrix['matrix']
			this.rulesAvgLength = data.rulesInfo['rulesAvgLength']
			this.rulesNum = data.rulesInfo['rulesNum']
			this.tableFormatHeader = data.tableFormat['header']
			this.tableFormatData = data.tableFormat['data']
			this.ifThenRulesHeader = data.ifThenRules['header']
			this.ifThenRulesData = data.ifThenRules['data']
			
			console.log(data);
			// init the default selected tab
			const tab = this.$route.query.tab
			if (tab) {
				this.activeName = tab
			}

		},
		mounted() {

		},
		methods: {
		}
	}
</script>

<style scoped>
	.tab-container {
		margin: 30px;
	}

	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>
