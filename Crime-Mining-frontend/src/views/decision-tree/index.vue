<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
		  <el-select style="margin-top:16px;" v-model="value" placeholder="Please select a decision tree algorithm" v-show="options.length">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		<el-button style="margin-top:16px; margin-left: 40px;" size="middle" type="primary" :loading="loading"
			@click="goTo('Decision-Tree-Result')" v-show="value !== ''">
			Generate decision tree
		</el-button>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-if="tableData.length" type="index" label="ID"/>
			<el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import {decisionTreeAnalysis, decisionTreeAlgorithms} from '@/api/decision-tree.js'
import { getToken } from '@/utils/auth'
export default {
  name: 'Decision-Tree-Algorithm',
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
			formData.append('token', getToken())
			this.loading = true
			decisionTreeAnalysis(formData).then(res => {
				console.log(res);
				const {data} = res
				this.loading = false
				this.$message({
				  message: 'Decision tree analysis successful',
				  type: 'success'
				})

				this.$router.push({
					name: name,
					params: {
						data,
						algorithm: this.value
					},
				})
			},
			error => {
			  // do something with request error
			  console.log(error) // for debug
			  this.loading = false
			})
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
			decisionTreeAlgorithms().then(res => {
				const {data} = res
				
				this.options = data
			})
			this.tableData = results
			this.tableHeader = header
    }
  },
}
</script>
