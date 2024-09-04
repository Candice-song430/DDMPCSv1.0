<template>
  <div class="container">
    <el-form ref="form" :model="item" label-width="80px" size="mini">
      <el-form-item label="Node Type">
        <el-tag>{{ item.type }}</el-tag>
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
      <el-form-item class="block" label="Entry Node">
        <el-cascader
          v-model="value"
          :options="options"
          @change="handleChange"
          :props="setCasProps"
        ></el-cascader>
      </el-form-item>
      <el-button type="primary" @click="exec" plain>Execution</el-button>
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
      default: null,
    },
  },
  watch: {
    "item.ports": {
      handler(newVal, oldVal) {
        this.flash();
        return newVal;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      setCasProps: {
        value: "my_field",
        label: "show_field",
      },
      topNode: null,
      nodeTitle: "",

      value: [],
      options: [],
    };
  },
  mounted() {
    this.flash();
  },
  methods: {
    flash() {
      this.topNode = this.getNodeByLine(this.item, 0);
      if (this.topNode) {
        this.nodeTitle = this.topNode.title;
        this.options = this.topNode.data_state.field;
      } else {
        this.nodeTitle = "None";
        this.options = [];
        this.$set(this.item, "choiceField", []);
      }
      this.value = this.item.choiceField || [];
    },
    handleChange(val) {
      this.$set(this.item, "choiceField", val);
    },
    exec() {
      let payload = {
        title: "Show Table",
        options: {
          title: {
            text: this.topNode.show_name,
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: [
              "Students",
              "Teachers",
              "Employees"
            ],
          },
          series: [
            {
              name: this.topNode.show_name,
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: 4, name: "Students" },
                { value: 1, name: "Teachers" },
                { value: 1, name: "Employees" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        },
      };

      this.openTable();
      this.setChart(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>