<template>
  <div class="card-container" :style="border_style">
    <el-row v-if="isAdd" @click.native="createNewModel">
      <el-col type="flex" justify="center"
        ><i style="" class="el-icon-circle-plus-outline"></i
      ></el-col>
    </el-row>
    <div v-else @dblclick="handler_dblclick">
      <!-- <div>id: {{ itemData.model_id }}</div>
      <div>model_title: {{ itemData.model_title }}</div>
      <div>model_desc: {{ itemData.model_desc }}</div>
      <div>model_creater: {{ itemData.model_creater }}</div>
      <div>model_type: {{ itemData.model_type | getLabelByValue }}</div> -->
      <el-row class="card">
        <el-col>
          <el-row class="card-header">
            <el-col :span="3"><i class="el-icon-edit"></i></el-col>
            <el-col :span="18">{{ itemData.model_title }}</el-col>
            <el-col :span="3">
              <el-tooltip effect="dark" placement="bottom-start">
                <div slot="content">
                  　<span>Model ID:{{ itemData.model_id }}</span><br />
                  　<span>Model Title:{{ itemData.model_title }}</span><br />
                  　<span>Model Description:{{ itemData.model_desc }}</span><br />
                  　<span>Model Creator:{{ itemData.model_creater }}</span><br />
                  　<span>Model Type:{{ itemData.model_type | getLabelByValue }}</span>
                  　
                </div>

                <i
                  class="el-icon-question"
                  style="font-size: 20px; line-height: 28px"
                ></i
              ></el-tooltip>
            </el-col>
          </el-row>
        </el-col>
        <el-col>
          <el-row>
            <el-col :span="24" class="card-main"
              >Model Description:{{ itemData.model_desc }}</el-col
            >
          </el-row>
        </el-col>
        <el-col>
          <el-row class="card-footer">
            <el-button
              @click="preShow"
              icon="el-icon-message"
              circle
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delete_handler"
              size="mini"
            ></el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {getColorByValue} from '@/utils/modelType'
export default {
  computed: {
    ...mapGetters({
      getPreShowTitles: "getPreShowTitles",
      getPreShowId: "getPreShowId",
    }),
    border_style(){
      let border_color = getColorByValue(this.itemData.model_type);
      return `border-top: 3px solid ${border_color};border-bottom: 1px solid ${border_color}`;
    }
  },
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
          model_id: -1,
          model_title: "",
          model_desc: "",
          model_creater: "",
        };
      },
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
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
    }),
    handler_dblclick() {
      this.loadModelById({ id: this.itemData.model_id });
      this.$router.push({ name: "Sources" });
    },
    createNewModel() {
      this.resetModel();
      this.$router.push({ name: "Sources" });
    },
    async preShow() {
      // console.log("预览");
      this.openTable();
      this.setPreShow({ id: this.itemData.model_id });
      this.getAllPortsById({ id: this.itemData.model_id });
      let res = await this.getModelById({ id: this.itemData.model_id });
      let {
        model_id,
        model_title,
        model_desc,
        model_creater,
        model_nodes,
        model_lines,
      } = res.data[0];
      model_nodes = JSON.parse(model_nodes);
      model_lines = JSON.parse(model_lines);
      let payload = {
        nodes: model_nodes.nodes,
        lines: model_lines.lines,
        currentClickNode: this.getPreShowTitles[0].execId,
      };
      let res1 = await this.execSqlPayload(payload);
      let tempData = await this.flashToolFieldPayload({
        node: model_nodes.nodes[this.getPreShowTitles[0].execId],
        nodes: model_nodes.nodes,
        lines: model_lines.lines,
      });
      let payloadTable = {
        title: "",
        table_header: tempData.filter(it => it.checked === "true"),
        table_data: res1.data,
      };
      this.openTable();
      this.countDataNumPayload(payload);
      console.log(payloadTable);
      this.setTable(payloadTable);
    },
    delete_handler() {
      this.deleteModel({ id: this.itemData.model_id });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  height: 200px;
  margin: 10px;
  

  box-shadow: 4px 0 5px #d4d6d7;
  padding: 10px 16px;
  &:hover {
    cursor: pointer;
  }
}

.card {
}
.card-header {
  height: 30px;
  border-bottom: 1px solid #d4d6d7;
  font-size: 16px;
}
.card-main {
  height: 100px;
  margin-top: 10px;
  color: #aaa;
  font-size: 14px;
  line-height: 24px;

  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-footer {
  height: 50px;
  margin-top: 0px;
  line-height: 50px;
}
</style>