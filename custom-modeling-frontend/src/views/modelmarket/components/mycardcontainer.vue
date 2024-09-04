<template>
  <el-row class="container">
    <el-col :span="6" v-for="item in data">
      <my-card :itemData="item" ></my-card>
    </el-col>
    <el-col :span="6">
      <my-card :isAdd="true"></my-card>
    </el-col>
  </el-row>
</template>

<script>
import {mapActions} from 'vuex'
import myCard from './mycard';
  export default {
    components: {
      myCard,
    },
    props: {
      data: {
        type: Array,
        default: []
      },
    },
    methods: {

    },
  }
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 80%;
  overflow-y: auto;
}
</style>