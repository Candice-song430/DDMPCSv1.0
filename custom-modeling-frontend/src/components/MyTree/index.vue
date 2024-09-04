<template>
  <div class="tree-container">
    <header class="header" @click="handle_click">
      <el-row>
        <el-col :span="4" style="text-align: center">
          <i v-if="unfold" class="el-icon-caret-right"></i>
          <i v-else class="el-icon-caret-bottom"></i>
        </el-col>
        <el-col :span="20">
          <span>{{ title }}</span>
        </el-col>
      </el-row>
    </header>
    <div :class="['main_part', { fold: unfold }]">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "myTree",
  data() {
    return {
      unfold: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    handle_click(e) {
      this.unfold = !this.unfold;
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-container {
  transition: height 5s;
}
.header {
  height: 30px;
  line-height: 30px;
  &:hover {
    cursor: pointer;
    background-color: #8197b9;
  }
}
.main_part {
  display: block;
  padding-left: 30px;
}
.fold {
  height: 0px;
  display: none;
}
</style>
