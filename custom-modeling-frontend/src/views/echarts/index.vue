<template>
  <div class="databases-container">
    <div class="databases-switch">
      <router-link class="databases-switch-button" :to="{name:'Sources'}">图表工具</router-link>

    </div>
          <source-item v-for="item in charts" :item_title="item.item_title" :icon="item.icon" :item_type="item.item_title | getCategoryType"></source-item>
  </div>
</template>

<script>

export default {
  name: 'Databases',
  data() {
    return {
      charts: [
          {
            item_title: 'icon-eCharts',
            icon: 'iconfont icon-eCharts'
          },
          {
            item_title: 'icon-echarts_line',
            icon: 'iconfont icon-echarts_line'
          },
          {
            item_title: 'icon-echartstat',
            icon: 'iconfont icon-echartstat'

          },
          {
            item_title: 'icon-echarts_mappie',
            icon: 'iconfont icon-echarts_mappie'

          },
          {
            item_title: 'icon-echarts_heatmap',
            icon: 'iconfont icon-echarts_heatmap'

          },
          {
            item_title: 'icon-echarts_rose',
            icon: 'iconfont icon-echarts_rose'

          },
          
        ]
    }
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
$border-color: #ccc;
$hover-color: blue;
.databases-container {

  .databases-switch {
    height: 40px;
    padding-top: 10px;
    width: 100%;
    display: flex;
    align-items: flex-end;
    .divider {
      height: 100%;
      width: 2px;
      border: 1px solid black;
    }
    .databases-switch-button {
      height: 100%;
      line-height: 30px;
      border-bottom: 1px solid $border-color;
      flex:1;
      text-align: center;
      cursor: pointer;
      &:hover{
        color: $hover-color;
      }
    }
  }
}
</style>
