<template>
  <div class="container">
    <el-form ref="form" :model="item" label-width="80px" size="mini">
      <el-form-item label="Node Type">
        <el-row type="flex" align="middle" justify="space-around">
          <el-col :span="20"
            ><el-tag>{{ item.type }}</el-tag></el-col
          >

          <el-col :span="4">
            <el-tooltip
              effect="dark"
              :content="item.type | getComment"
              placement="bottom-start"
            >
              <i
                class="el-icon-question"
                style="font-size: 20px; line-height: 28px;"
              ></i
            ></el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Node Name">
        <el-input v-model="item.title"></el-input>
      </el-form-item>
      <el-form-item label="Node Description">
        <el-input v-model="item.desc"></el-input>
      </el-form-item>
      <el-form-item label="Entry Node">
        <el-input v-model="nodeTitle" disabled></el-input>
      </el-form-item>
      <el-button type="primary" @click="handle_exec" plain>Execution</el-button>
      <el-button type="primary" @click="exportData" plain>Export</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import myMixin from "./mixin";
export default {
  mixins: [myMixin],
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  watch: {
    "item.ports": {
      handler(newVal, oldVal) {
        this.flash();
        return newVal;
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      setCasProps: {
        value: "my_field",
        label: "show_field"
      },
      topNode: null,
      nodeTitle: "",

      value: [],
      options: []
    };
  },
  mounted() {
    this.flash();
  },
  methods: {
    ...mapActions({
      execSql: "mynodes/execSql",
      addPreShowTitles: "centertable/addPreShowTitles",
      countDataNum: "mynodes/countDataNum"
    }),
    flash() {
      this.topNode = this.getNodeByLine(this.item, 0);
      if (this.topNode) {
        this.nodeTitle = this.topNode.title;
        this.options = this.topNode.data_state.field;
      } else {
        this.nodeTitle = "None";
        this.options = [];
        this.$set(this.item.custom_data, "choiceField", []);
      }
      if (this.topNode) {
        this.$set(
          this.item.data_state,
          "field",
          this.topNode.data_state.field.filter(it => it.checked === "true") ||
            []
        );
      } else {
        this.$set(this.item.data_state, "field", []);
      }
      this.value = this.item.custom_data.choiceField || [];
    },
    handleChange(val) {
      this.$set(this.item.custom_data, "choiceField", val);
    },
    async handle_exec() {
      let res = await this.execSql();
      this.addPreShowTitles([
        {
          label: this.item.title,
          exec: this.item.id,
          desc: this.item.desc
        }
      ]);

      var r = [];

      r = this.topNode.data_state.field.filter(function(element, index, self) {
        return self.indexOf(element) === index;
      });
      let payload = {
        title: "Execution Results",
        table_header: r.filter(it => it.checked === "true"),
        table_data: res.data
      };

      this.openTable();
      this.countDataNum();
      this.setTable(payload);
    },



 

exportData() {
  this.$message.closeAll();
  this.$message.info("Exporting");
  this.export()
},
export() {

  const params = {
    page: this.page.currentPage,
    size: this.page.pageSize
  };

  const time = this.getCurentTime()

  ExportCheckResult(params).then((res) => {

    let blob = new Blob([res.data], {
      type: "application/octet-stream",
    });
    let filename = "Filename" + time + '.xls'

    var blobURL = window.URL.createObjectURL(blob);

    var tempLink = document.createElement("a");

    tempLink.style.display = "none";

    tempLink.href = blobURL;

    tempLink.setAttribute("download", filename);
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);

    tempLink.click();

    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
    this.$message({
      message: "Export successfully",
      type: "success",
    });
  })
},
getCurentTime() {
  var date = new Date();

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var minute = date.getMinutes();
  var hour = date.getHours();
  var second = date.getSeconds();

  if (month >= 1 && month <= 9) {
  month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
  strDate = "0" + strDate;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minute >= 0 && minute <= 9) {
    minute = "0" + minute;
  }
  if (second >= 0 && second <= 9) {
    second = "0" + second;
  }
  var currentdate = "_" + year + month + strDate + hour + minute + second;
  return currentdate;
}



  }
};
</script>

<style lang="scss" scoped></style>
