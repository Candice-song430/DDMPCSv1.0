<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <el-container class="main-container">
      <!--<el-aside class="container-aside">
        <div class="header-title">模型超市</div>
        <el-tree :data="getModelsFormatTree" @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span style="position:absolute;right:20px;">
          <el-button
            type="text"
            size="mini"
            @click.stop="chooseModels(node, data)">
            展示
          </el-button>

        </span>
          </span>
        </el-tree>
      </el-aside>-->
      <el-main class="main-container-cards">
        <my-card-container :data="getModelsPart"></my-card-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Sidebar } from "@/layout/components";
import { mapGetters, mapActions } from "vuex";
import myCardContainer from "./components/mycardcontainer";
export default {
  name: "Layout",
  components: {
    Sidebar,
    myCardContainer
  },
  computed: {
    ...mapGetters({
      getModelsFormatTree: "getModelsFormatTree",
      getModelsPart: "getModelsPart"
    }),
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  mounted() {
    this.getModelsBasicInfo();
  },
  methods: {
    ...mapActions({
      reloadDatabases: "mydatabases/reloadDatabases",
      getModelsBasicInfo: "mymodel/getModelsBasicInfo",
      saveModelsBasicPart: "mymodel/saveModelsBasicPart"
    }),

    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    iteratorFindChildren(info, node) {
      if (node.children) {
        node.children.forEach(it => {
          this.iteratorFindChildren(info, it);
        });
      } else {
        info.push(node);
      }
    },
    chooseModels(node, data) {
      let info = [];
      this.iteratorFindChildren(info, data);
      this.saveModelsBasicPart(info);
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.main-container {
  // width: 100%;
  .main-container-cards {
    height: 100vh;
  }
}

.container-aside {
  width: 300px;
  height: 100vh;
  overflow-y: auto;
  background-color: #f5f7f8;
  .header-title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
  }
}
</style>
