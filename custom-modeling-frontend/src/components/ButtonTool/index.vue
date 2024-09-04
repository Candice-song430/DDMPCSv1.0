<template>
  <el-tooltip
    placement="top-start"
    :content="item_title"
    width="260"
    trigger="hover"
    effect="dark"
    :open-delay="500"
  >
    <div
      class="source-item-container"
      :draggable="true"
      @dragstart="onDragStart($event)"
      @dragend.stop="onDragEnd($event)"
    >
      <img :src="item_url" />
      <el-button>{{ item_title }}</el-button>
    </div>
  </el-tooltip>
</template>

<script>
import { getCategoryType } from "@/utils/categories";
export default {
  name: "buttonTool",
  props: {
    item_title: {
      type: String,
      default: ""
    },
    item_url: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default: null
    },
    item_type: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: "el-icon-coin"
    }
  },
  // data() {
  //   return {
  //     item_type: null
  //   }
  // },
  // mounted () {
  //   this.item_type = getCategoryType(this.item_title);
  // },
  methods: {
    onDragEnd(e) {
      e.preventDefault();
    },
    onDragStart(e) {
      e.dataTransfer.setData("myEventType", "createNode");
      e.dataTransfer.setData("createNodeType", this.item_type);
      e.dataTransfer.setData("title", this.item_title);
      if (this.item) {
        e.dataTransfer.setData("item_data", this.item.did);
        e.dataTransfer.setData("item", JSON.stringify(this.item));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$border-color: #289de9;
.source-item-container {
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin: 15px 0px;
  transition: background-color 0.3s;
  position: relative;
  &:hover {
    //cursor: grab;
    //background-color: $border-color;
  }
  .el-button {
    width: 200px;
    padding-left: 36px;
  }
  img {
    position: absolute;
    top: 12px;
    left: 9px;
    z-index: 99;
    width: 25%;
  }
}

.container-left {
  border-radius: 100% 0 0 100%;
  height: 100%;
  // border-left: 1px solid $border-color;
  // border-top: 1px solid $border-color;
  // border-bottom: 1px solid $border-color;
  color: $border-color;
  font-size: 20px;
  line-height: 30px;
  padding-left: 4px;
}

.container-middle {
  height: 100%;
  text-align: center;
  line-height: 30px;
  // border-top: 1px solid $border-color;
  // border-bottom: 1px solid $border-color;
}

.container-right {
  border-radius: 0 100% 100% 0;
  height: 100%;
  // border-right: 1px solid $border-color;
  // border-top: 1px solid $border-color;
  // border-bottom: 1px solid $border-color;
}
</style>
