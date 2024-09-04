<template>
  <div class="table-container" v-show="getShowState">
    <div class="mask"></div>
    <div class="table-container-inner">
      <div class="title">
        {{ getTableTitle }}
        <i class="el-icon-close close" @click="closeTable"></i>
      </div>
      <el-tabs
        v-model="activeName"
        type="border-card"
        @tab-click="handleClick"
        style="width: 100%"
      >
        <el-tab-pane
          v-for="(item, index) in getPreShowTitles"
          :label="item.label"
          :name="index | stringfy"
          :it="item"
          :key="index"
        >
          <component
            :is="getCenterCmpIs"
            :changePageMethod="changePageMethod"
          ></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import showData from "./showData";
import showField from "./showField";
import showCharts from "./showCharts";
import preShow from "./preShow";
import showConditions from "./showConditions";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "centerTable",
  filters: {
    stringfy: function(value) {
      return value.toString();
    }
  },
  computed: {
    ...mapGetters({
      getShowState: "getShowState",
      getTableTitle: "getTableTitle",
      getCenterCmpIs: "getCenterCmpIs",
      getPreShowTitles: "getPreShowTitles",
      getPreShowId: "getPreShowId"
    })
  },
  methods: {
    ...mapActions({
      loadModelById: "mymodel/loadModelById",
      resetModel: "mymodel/resetModel",
      openTable: "centertable/openTable",
      setPreShow: "centertable/setPreShow",
      getAllPortsById: "centertable/getAllPortsById",
      deleteModel: "mymodel/deleteModel",
      getModelById: "mymodel/getModelById",
      execSqlPayload: "mynodes/execSqlPayload",
      setTable: "centertable/setTable",
      countDataNumPayload: "mynodes/countDataNumPayload",
      flashToolFieldPayload: "mynodes/flashToolFieldPayload",
      closeTable: "centertable/closeTable",
      setPage: "centertable/setPage"
    }),
    handleClick(clickItem) {
      let it = clickItem.$attrs.it;
      this.preShow(it);
    },
    async preShow(it) {
      console.log("预览");
      let res = await this.getModelById({ id: this.getPreShowId });
      let {
        model_id,
        model_title,
        model_desc,
        model_creater,
        model_nodes,
        model_lines
      } = res.data[0];
      model_nodes = JSON.parse(model_nodes);
      model_lines = JSON.parse(model_lines);
      let payload = {
        nodes: model_nodes.nodes,
        lines: model_lines.lines,
        currentClickNode: it.execId
      };
      let res1 = await this.execSqlPayload(payload);
      let tempData = await this.flashToolFieldPayload({
        node: model_nodes.nodes[it.execId],
        nodes: model_nodes.nodes,
        lines: model_lines.lines
      });
      let payloadTable = {
        title: "",
        table_header: tempData.filter(it => it.checked === "true"),
        table_data: res1.data
      };
      this.openTable();
      this.countDataNumPayload(payload);
      console.log(payloadTable);
      this.setTable(payloadTable);
    },
    async changePageMethod() {
      console.log("change!!!");
      let res = await this.getModelById({ id: this.getPreShowId });
      let {
        model_id,
        model_title,
        model_desc,
        model_creater,
        model_nodes,
        model_lines
      } = res.data[0];
      model_nodes = JSON.parse(model_nodes);
      model_lines = JSON.parse(model_lines);
      let payload = {
        nodes: model_nodes.nodes,
        lines: model_lines.lines,
        currentClickNode: this.getPreShowId
      };
      let res1 = await this.execSqlPayload(payload);

      let payloadTable = {
        title: "",
        table_header: [],
        table_data: res1.data
      };
      this.openTable();
      this.countDataNumPayload(payload);
      console.log(payloadTable);
      this.setTable(payloadTable);
    }
  },
  components: {
    showData,
    showField,
    showCharts,
    preShow,
    showConditions
  },
  watch: {
    getShowState(newValue, oldValue) {
      // 这样每次都从第一个选项卡开始看起
      this.activeName = "0";
    },
    activeName() {
      this.setPage(1);
    }
  },
  data() {
    return {
      activeName: "0"
    };
  },
  mounted() {},
  activated() {}
};
</script>

<style lang="scss" scoped>
.table-container {
  z-index: 1005;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .table-container-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 78%;
    height: 1000px;
    margin-top: 0px;
  }
  .title {
    height: 60px;
    line-height: 60px;
    background-color: rgb(54, 155, 168);
    width: 100%;
    text-align: center;
    position: relative;
    .close {
      position: absolute;
      right: 0;
      font-size: 30px;
      margin-right: 10px;
      height: 100%;
      line-height: 60px;
      cursor: pointer;
    }
  }

  .table {
    width: 100%;
  }

  .mask {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: rgba(126, 116, 116, 0.2);
  }
}
</style>
