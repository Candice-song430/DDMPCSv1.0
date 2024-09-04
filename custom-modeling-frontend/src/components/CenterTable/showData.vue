<template>
  <el-row class="table" type="flex" justify="center" align="middle">
    <el-col :span="24">
      <el-table :data="getTableData" height="700" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item :label="item.show_field" v-for="item in getTableHeader" style="margin:0;">
                <span>{{ props.row[item.my_field] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in getTableHeader"
          :prop="item.my_field"
          :label="item.show_field"
        >
        </el-table-column>
      </el-table>
    </el-col>
    <el-col class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="getAllDataItems"
        @current-change="changePage"
      >
      </el-pagination>
      <div style="position: absolute; right: 20px">
        共计{{ getAllDataItems }}条数据
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getTableHeader: "getTableHeader",
      getTableData: "getTableData",
      getAllDataItems: "getAllDataItems",
      getPreShowId: "getPreShowId"
    }),
  },
  data() {
    return {};
  },
  props: {
    changePageMethod: {
      type: Function,
      default: null
    },
  },
  methods: {
    ...mapActions({
      setPage: "centertable/setPage",
      setTable: "centertable/setTable",
      execSql: "mynodes/execSql",
    }),
    async changePage(val) {
      this.setPage(val);
      if(this.getPreShowId !== -1){
        this.changePageMethod();
      }
      else{
        let res = await this.execSql();
        let payload = {
          title: "",
          table_header: [],
          table_data: res.data,
        };
        this.setTable(payload);

      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-direction: column;
  margin-top: 0;
}
.pagination {
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-expand{
  display: flex;
  flex-direction: column;
}
</style>