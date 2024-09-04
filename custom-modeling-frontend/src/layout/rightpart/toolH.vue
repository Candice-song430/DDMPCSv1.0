<template>
  <div class="container">
    <el-form ref="form" :model="item" label-width="80px" size="mini">
      <el-form-item label="Node Type">
        <el-row type="flex" align="middle" justify="space-around">
          <el-col :span="20"
            ><el-tag>{{ item.type }}</el-tag></el-col
          >
          
          <el-col :span="4"
            >
            <el-tooltip effect="dark" :content="item.type | getComment" placement="bottom-start">
            <i 
              class="el-icon-question"
              style="font-size: 20px; line-height: 28px;"
            ></i></el-tooltip>
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
      <el-form-item label="Choose items"> </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="click_field"
          >已选择{{ field_num }}个字段</el-button
        >
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
  computed: {
    field_num() {
      return this.item.data_state.field.filter((it) => it.checked === "true")
        .length;
    },
  },
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
    ...mapActions({
      "execSql":"mynodes/execSql",
      addPreShowTitles: "centertable/addPreShowTitles",
      countDataNum: "mynodes/countDataNum",
      flashAll: "centertable/flashAll"
    }),
    flash() {
      this.topNode = this.getNodeByLine(this.item, 0);
      if (this.topNode) {
        this.nodeTitle = this.topNode.title;
        this.options = this.topNode.data_state.field;
      } else {
        this.nodeTitle = "None";
        this.options = [];
      }
      if(this.topNode){
        if(this.item.data_state.field.length == 0){
          this.$set(this.item.data_state,'field', JSON.parse(JSON.stringify(this.topNode.data_state.field.filter(it => it.checked === "true"))) || []);
        }
      }
      else{
        this.$set(this.item.data_state,'field', []);
      }
      this.value = this.item.custom_data.choiceField || [];
    },
    handleChange(val) {
      this.$set(this.item.custom_data, "choiceField", val);
    },
    async handle_exec(){
      let res = await this.execSql();
      this.addPreShowTitles([{
        label: this.item.title,
        exec: this.item.id,
        desc: this.item.desc
      }])
      let payload = {
            title: 'Execution Results',
            table_header: this.item.data_state.field.filter(it => it.checked === "true"),
            table_data: res.data,          
        };
        this.openTable();
        this.countDataNum();
        this.setTable(payload);
    },

    click_field() {
      // this.flashAll();
      this.addPreShowTitles([{
        label: this.item.title,
        exec: this.item.id,
        desc: this.item.desc
      }])
      this.openTable();
      console.log(this.item.data_state);
      let payload = {
        title: "Choose items",
        table_data: this.item.data_state.field,
      };
      this.setField(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>