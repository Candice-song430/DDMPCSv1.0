<template>
 <div class="container">
    <el-form ref="form" :model="model_info" label-width="80px" size="mini">
      <el-form-item label="Node Type">
        <el-tag>模型</el-tag>
      </el-form-item>
      <el-form-item label="节点ID" >
        <el-input disabled v-model="model_info.model_id"></el-input>
      </el-form-item>
      <el-form-item label="Node Name">
        <el-input v-model="model_info.model_title"></el-input>
      </el-form-item>
      <el-form-item label="Node Description">
        <el-input type="textarea" v-model="model_info.model_desc"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-cascader
            v-model="model_info.model_type"
            :options="modelOptions"
          ></el-cascader>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input v-model="model_info.model_creater"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {modeTypes} from '@/utils/modelType'
  export default {
      computed: {
      ...mapGetters({
        model_info: 'getModelInfo'
      })
    },
  data() {
    return {
      modelOptions: modeTypes
    }
  },
  }
</script>

<style lang="scss" scoped>

</style>