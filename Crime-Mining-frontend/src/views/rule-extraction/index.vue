<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
		  <el-select style="margin-top:16px;" v-model="value" placeholder="Please select a rule extraction algorithm." v-show="options.length">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		<el-button style="margin-top:16px; margin-left: 40px;" size="middle" type="primary" :loading="loading"
			@click="goTo('Rule-Extraction-Result')" v-show="value !== ''">
			Rules extraction
		</el-button>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-if="tableData.length" type="index" label="ID"/>
			<el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import {ruleExtraction, ruleExtractionAlgorithms} from '@/api/rule-extraction.js'

export default {
  name: 'Rule-Extraction-Algorithm',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
			file: null,
			loading: false,
			options: [],
			value: ''
    }
  },
  methods: {
		goTo(name) {
			// console.log(this.file)
			const formData = new FormData()
			formData.append('file', this.file)
			formData.append('algorithm', this.value)
			this.loading = true
			console.log(formData);
			ruleExtraction(formData).then(res => {
				const {data} = res
				this.loading = false
				this.$message({
				  message: 'Rules extraction successful',
				  type: 'success'
				})
				const oriResults = this.tableData
				const oriHeader = this.tableHeader
				const oriData = {oriResults, oriHeader}
				
				this.$router.push({
					name: name,
					params: {
						data,
						oriData,
						algorithm: this.value
					},
				})
			},
			error => {
				this.loading = false
				this.$message({
					message: 'False',
					type: 'error'
				})
			}
			)
		},
    beforeUpload(file) {
			this.file = file
			return true
      // const isLt1M = file.size / 1024 / 1024 < 1

      // if (isLt1M) {
      //   return true
      // }

      // this.$message({
      //   message: 'Please do not upload files larger than 1m in size.',
      //   type: 'warning'
      // })
      // return false
    },
    handleSuccess({ results, header }) {
			ruleExtractionAlgorithms().then(res => {
				const {data} = res
				console.log(data);
				
				this.options = data
			})
			this.tableData = results
			this.tableHeader = header
    }
  },
}
</script>
