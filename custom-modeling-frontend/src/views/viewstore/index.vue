<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <el-main class="main-container">
      <el-row style="margin-bottom:10px">
        <el-button @click="reloadDatabases">Reload the database</el-button>
      </el-row>
      <el-collapse accordion>
        <el-collapse-item
          v-for="database in getAllDatabases"
          :key="database.did"
        >
          <template slot="title">
            <el-row style="width: 100%">
              <el-col :span="4"
                ><el-tag>Database Name{{ database.ori_name }}</el-tag></el-col
              >
              <el-col :span="4"
                ><el-tag  type="success">Database Classifications:{{ database.category }}</el-tag></el-col
              >
              <el-col :span="16"
                ><span style="margin-left: 20px">Database Display Name:{{
                  database.show_name
                }}</span></el-col
              >
            </el-row>
          </template>

          <el-table border :data="database.field" style="width: 100%">
            <el-table-column prop="ori_field" label="Source Field Name">
            </el-table-column>
            <el-table-column prop="show_field" label="Display Field Name">
            </el-table-column>
            <el-table-column prop="type" label="Type"> </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </div>
</template>

<script>
import { Sidebar } from "@/layout/components";
import { mapGetters,mapActions } from "vuex";
export default {
  name: "Layout",
  components: {
    Sidebar,
  },
  computed: {
    ...mapGetters({
      getAllDatabases: "getAllDatabases",
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
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    ...mapActions({
      reloadDatabases: 'mydatabases/reloadDatabases'
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
  },
  data() {
    return {
    };
  },
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
}
</style>
