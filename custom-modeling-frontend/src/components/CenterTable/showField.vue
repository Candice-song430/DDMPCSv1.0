<template>
  <div class="table">
    <el-table
      :data="getTableData"
      ref="multipleTable"
      tooltip-effect="dark"
      height="400"
      style="width:100%"
      @select="selectSingle"

      @select-all="selectAll"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="show_field" label="显示字段名称"></el-table-column>
      <el-table-column prop="ori_field" label="字段实际名"></el-table-column>
      <el-table-column prop="type" label="字段类型">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getTableData: 'getTableData'
    })
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  mounted () {
    this.SelectionChange();
  },
  methods: {
    SelectionChange() {
        let table = this.getTableData; 
        table.forEach(row => {
          if (row.checked == "true")
            this.$refs.multipleTable.toggleRowSelection(row, true);
        });
    },
    selectAll(val){
      if(val.length > 0){
        this.getTableData.forEach(item => {
          item.checked = "true";
        })
      }
      else {
        this.getTableData.forEach(item => {
          item.checked = "false";
        })        
      }
    },
    selectSingle(selection, row){
      row.checked = row.checked === "true" ? "false" : "true";
    }
  },
};
</script>

<style lang="scss" scoped>
</style>