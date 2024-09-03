<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-button style="margin-top:16px;" size="middle" type="primary"
    	@click="goTo('Data-Analysis')" v-show="tableHeader.length">
    	Data Analysis
    </el-button>
		<el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-if="tableData.length" type="index" label="ID"/>
			<el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'Data-Exploration',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
		goTo(name) {
			// console.log(this.excelData)
			const results = this.tableData
			const header = this.tableHeader
			const excelData = {header, results}
			this.$router.push({
				name: name,
				params: {
					excelData
				},
			})
		},
    beforeUpload(file) {
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
      this.tableData = results
      this.tableHeader = header
    }
  },
}
</script>
