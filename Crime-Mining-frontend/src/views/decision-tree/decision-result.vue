<template>
	<div class="tab-container">
		<el-tag>Algorithm adopted:{{ algorithm }}</el-tag>
		<el-upload ref="upload" class="upload-demo" action="" :http-request="upload" accept=".xls"
			:show-file-list="false" style="float: right; margin-right: 10px;">
			<el-button size="mini" type="primary">Import test data and perform testing</el-button>
			<div slot="tip" class="el-upload__tip">Only XLS files can be uploaded.</div>
		</el-upload>
		<el-dialog title="Prompt" :visible.sync="dialogVisible" style="width: 100%;">
			<p style="margin: 0 auto; text-align: center;" v-for="item in testResult" :key="item">{{item}}<br/></p>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
			</span>
		</el-dialog>

		<el-divider></el-divider>
		<el-tree :data="decisionTreeData" :props="defaultProps" style="margin-top: 10px;"></el-tree>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import {
		decisionTreeTest
	} from '@/api/decision-tree.js'
	import { getToken } from '@/utils/auth'
	export default {
		name: 'Decision-Tree-Result',
		components: {

		},
		data() {
			return {
				dialogVisible: false,
				decisionTreeData: [],
				algorithm: '',
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				testResult: []
			}
		},
		created() {
			// console.log(this.$route.params)
			this.decisionTreeData = this.$route.params.data
			this.algorithm = this.$route.params.algorithm

		},
		mounted() {

		},
		methods: {
			upload(param) {
				// console.log(param);
				const formData = new FormData()
				formData.append('file', param.file)
				formData.append('token', getToken())
				decisionTreeTest(formData).then(res => {
					console.log(res);
					const {
						data
					} = res
					this.testResult = data
					this.dialogVisible = true
				})
				this.$refs['upload'].clearFiles()
			},
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
