<template>
  <div>
    <el-table :data="getConditionData" style="width: 100%" height="500">
      <el-table-column label="字段">
        <template slot-scope="scope">
          <el-cascader
            v-model="scope.row.choiceField"
            :options="getConditionField"
            :props="setCasProps"
          ></el-cascader>
        </template>
      </el-table-column>
      <el-table-column label="方式">
        <template slot-scope="scope">
          <el-cascader
            v-model="scope.row.method"
            :options="conditions_options"
          ></el-cascader>
        </template>
      </el-table-column>
      <el-table-column label="值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.val"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="字段">
        <template slot-scope="scope">
          <el-cascader
            v-model="scope.row.choiceField2"
            :options="getConditionField"
            :props="setCasProps"
          ></el-cascader>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAdd(scope.$index, scope.row)"
            >新增</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getConditionData: "getConditionData",
      getConditionField: "getConditionField"
    })
  },
  data() {
    return {
      setCasProps: {
        value: "my_field",
        label: "show_field"
      },
      conditions_options: [
        {
          label: "等于",
          value: "="
        },
        {
          label: "不等于",
          value: "!="
        },
        {
          label: "大于",
          value: ">"
        },
        {
          label: "小于",
          value: "<"
        },
        {
          label: "is",
          value: "is"
        }
      ]
    };
  },
  methods: {
    handleAdd(index, row) {
      this.getConditionData.splice(index + 1, 0, {
        choiceField: [""],
        choiceField2: [""],
        method: [""],
        val: [""]
      });
    },
    handleDelete(index, row) {
      this.getConditionData.splice(index, 1);
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
