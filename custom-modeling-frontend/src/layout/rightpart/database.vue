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
        <el-input type="textarea" v-model="item.desc"></el-input>
      </el-form-item>
      <el-form-item label="number">
      <el-row type="flex" align="middle" justify="space-around">
          <el-col :span="20"
            ><el-tag>{{ getAllDataItems }}</el-tag></el-col
          >
          
          
        </el-row>
      </el-form-item>
       
    </el-form>
    <el-form>
      <el-form-item label="Show Table"></el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="click_detail"
          >Show Table</el-button
        >
      </el-form-item>
      <el-form-item label="Choose items"> </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="click_field"
          >Chosen{{ field_num }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({      
      getAllDataItems: "getAllDataItems", 
    }),    

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
  mounted() {
    console.log(this.item);
  },
  methods: {
    ...mapActions({
      openTable: "centertable/openTable",
      setTable: "centertable/setTable",
      setField: "centertable/setField",
      execSql: "mynodes/execSql",
      countDataNum: "mynodes/countDataNum",
      addPreShowTitles: "centertable/addPreShowTitles"
    }),
    async click_detail() {
      let res = await this.execSql();
      this.addPreShowTitles([{
        label: this.item.title,
        exec: this.item.id,
        desc: this.item.desc
      }])
      let payload = {
        label: "Show Table",
        table_header: this.item.data_state.field.filter(
          (it) => it.checked === "true"
        ),
        table_data: res.data,
      };
      this.openTable();
      this.countDataNum();
      this.setTable(payload);
      
    },
    click_field() {
      this.openTable();
      this.addPreShowTitles([{
        label: this.item.title,
        exec: this.item.id,
        desc: this.item.desc
      }])
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
.container {
  display: flex;
  flex-direction: column;
}
</style>