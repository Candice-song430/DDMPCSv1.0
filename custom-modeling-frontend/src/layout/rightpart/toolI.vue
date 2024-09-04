<template>
  <div class="container">
    <el-form ref="form" :model="item" label-width="120px" size="mini">
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
      <el-form-item label="Left Node">
        <el-input v-model="left" disabled></el-input>
      </el-form-item>
      <el-form-item label="Right Node">
        <el-input v-model="right" disabled></el-input>
      </el-form-item>
      <el-form-item class="block" label="Left Node Field Selection">
        <el-cascader
          v-model="valueLeft"
          :options="optionsLeft"
          placeholder="Please select"
          @change="handleChangeLeft"
          :props="setCasProps"
        ></el-cascader>
      </el-form-item>
      <el-form-item class="block" label="Right Node Field Selection">
        <el-cascader
          v-model="valueRight"
          :options="optionsRight"
          placeholder="Please select"
          :props="setCasProps"
          @change="handleChangeRight"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="SQL statement generation">
        <el-input type="textarea" v-model="sqlStatement"></el-input>
      </el-form-item>
      <el-button type="primary" @click="handle_exec" plain>Execution</el-button>
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
      leftNode: null,
      rightNode: null,
      left: "None",
      right: "None",

      valueLeft: [],
      optionsLeft: [],

      valueRight: [],
      optionsRight: [],

      sqlStatement: ""
    };
  },
  mounted() {
    console.log("mounted");
    this.flash();
  },
  methods: {
    ...mapActions({
      execSql: "mynodes/execSql",
      addPreShowTitles: "centertable/addPreShowTitles",
      countDataNum: "mynodes/countDataNum"
    }),
    handleChangeLeft(val) {
      // console.log(val);
    },
    flash() {
      this.leftNode = this.getNodeByLine(this.item, 0);
      if (this.leftNode) {
        this.left = this.leftNode.title;
        this.optionsLeft = this.leftNode.data_state.field.filter(
          it => it.checked === "true"
        );
      } else {
        this.left = "None";
        this.optionsLeft = [];
        this.$set(this.item, "leftChoiceField", []);
      }
      this.rightNode = this.getNodeByLine(this.item, 1);
      if (this.rightNode) {
        this.right = this.rightNode.title;
        this.optionsRight = this.rightNode.data_state.field.filter(
          it => it.checked === "true"
        );
      } else {
        this.right = "None";
        this.optionsRight = [];
        this.$set(this.item, "rightChoiceField", []);
      }

      this.valueLeft = this.item.leftChoiceField || [];
      this.valueRight = this.item.rightChoiceField || [];
      if (this.leftNode) {
        this.$set(
          this.item.data_state,
          "field",
          this.leftNode.data_state.field
            .filter(it => it.checked === "true")
            .concat(
              this.rightNode.data_state.field.filter(
                it => it.checked === "true"
              )
            ) || []
        );
      } else {
        this.$set(
          this.item.data_state,
          "field",
          this.rightNode.data_state.field.filter(it => it.checked === "true") ||
            []
        );
      }
    },
    handleChangeLeft(val) {
      this.$set(this.item, "leftChoiceField", val);
    },
    handleChangeRight(val) {
      this.$set(this.item, "rightChoiceField", val);
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
      let payload = {
        title: "Execution Results",
        table_header: this.leftNode.data_state.field
          .filter(it => it.checked === "true")
          .concat(
            this.rightNode.data_state.field.filter(it => it.checked === "true")
          ),
        table_data: res.data
      };

      this.openTable();
      this.countDataNum();
      this.setTable(payload);
      // this.sqlStatement = res.data.sqlstr;
      // console.log(res.data);
    }
  }
};
</script>

<style lang="scss" scoped></style>
