<template>
  <div class="source_item_conatiner">
    <el-input
      placeholder="Please enter search content"
      v-model="inputSearch"
      class="input_class"
      debounce="300"
      @input="inputSearchEvent"
    >
      <template slot="prepend">Search</template>
    </el-input>
    <div class="white_block" style="height:1px;"></div>

    <div v-if="inputSearch">
      <my-tree v-for="(item, key) in treeData" :key="key" :title="key">
        <source-item
          v-for="it in item"
          :item_title="it.show_name"
          :item="it"
        ></source-item>
      </my-tree>
    </div>
    <div v-else>
      <my-tree
        v-for="(item, key) in getAllDatabasesByCategory"
        :key="key"
        :title="key"
      >
        <source-item
          v-for="it in item"
          :item_title="it.show_name"
          item_type="Database"
          :item="it"
        ></source-item>
      </my-tree>
    </div>
    <div class="white_block"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getterAllDatabases: "getAllDatabases",
      getAllDatabasesByCategory: "getAllDatabasesByCategory"
    })
  },
  data() {
    return {
      inputSearch: "",
      treeData: {}
    };
  },
  methods: {
    ...mapActions({
      getAllDatabases: "mydatabases/getAllDatabases"
    }),
    getAllDatabasesBySearch(text) {
      let res = {};
      this.getterAllDatabases.forEach(it => {
        if (it.show_name.includes(text)) {
          if (!res[it.category]) {
            res[it.category] = [];
          }
          res[it.category].push(it);
        }
      });

      return res;
    },
    inputSearchEvent() {
      this.treeData = this.getAllDatabasesBySearch(this.inputSearch);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.source_item_conatiner {
  overflow-y: auto;
  height: 865px;
}
.input_class {
  position: fixed;
  box-sizing: border-box;
  bottom: 6px;
  width: 290px;
  margin: 0 5px;
}

.white_block {
  height: 90px;
  width: 100%;
}
</style>
