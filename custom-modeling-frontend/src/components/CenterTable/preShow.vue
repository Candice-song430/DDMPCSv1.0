<template>
<div class="table">
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane v-for="(it, index) in getPreShowTitles" :label="it" :name="index" :key="index">
      <component :is="getPreShowCmp"></component>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import showData from './showData'
import showField from './showField'
import showCharts from './showCharts'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getTableHeader:'getTableHeader',
      getTableData: 'getTableData',
      getPreShowTitles: 'getPreShowTitles'
    })
  },
  components: {
    showData,
    showField,
    showCharts,
  },
  data() {
    return {
      activeName: 'first'
    }
  },
};
</script>

<style lang="scss" scoped>
.table{
  width: 100%;
  height: 100%;
  // background-color: rgb(255,255,255);
}
</style>