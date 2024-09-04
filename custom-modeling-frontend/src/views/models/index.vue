<template>
  <div class="databases-container">
    <div class="databases-switch">
      <router-link class="databases-switch-button" :to="{name:'Sources'}">模型工具</router-link>

    </div>
          <source-item v-for="item in getModelsAll" :item_title="item.model_title" :item_type="'modelNode' | getCategoryType" :item="item"></source-item>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'Databases',
  computed: {
    ...mapGetters({
      getModelsAll: 'getModelsAll'
    })
  },

  methods: {
    ...mapActions({
      getModelsBasicInfo: "mymodel/getModelsBasicInfo",

    })
  },
  mounted () {
    this.getModelsBasicInfo();
  },
  data() {
    return {
     
    }
  },

}
</script>

<style lang="scss" scoped>
$border-color: #ccc;
$hover-color: blue;
.databases-container {
  height: 100vh;
  overflow-y:auto;
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
