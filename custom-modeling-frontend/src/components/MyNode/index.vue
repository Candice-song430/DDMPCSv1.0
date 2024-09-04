<template>
  <el-row
    class="container"
    :style="cstyle"
    :draggable="true"
    @drag.native="draging($event)"
    @dragstart.native="dragStart($event)"
    @dragend.native="dragEnd($event)"
    @click.native="onclick($event)"
  >
    <my-port v-for="port in node.ports" :port="port"></my-port>
    <el-col :span="4" class="container-left">
      <i class="el-icon-coin"></i>
    </el-col>
    <el-col :span="16" class="container-middle overElipsis" style="height:30px">{{ node.title }}</el-col>
    <el-col :span="4" class="container-right"></el-col>
  </el-row>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "myNode",
  props: {
    node: {
      type: Object,
      default: null,
    },
  },
  computed: {
    cstyle() {
      return `transform: translateX(${this.node.x}px) translateY(${this.node.y}px);`;
    },
  },
  methods: {
    ...mapActions({
      "changeCurrentClickNode": "mynodes/changeCurrentClickNode"
    }),
    onclick(e) {
      // console.log(e.clientX, e.clientY, e.offsetX, e.offsetY);
      // console.log(e);
      let payload = {
        nodeId: this.node.id
      }
      this.changeCurrentClickNode(payload);
    },
    draging(e) {
      this.$emit("node-drag-ing", e, this.node);
    },
    dragStart(e) {
      this.$emit("node-drag-start", e, this.node);
      e.dataTransfer.setData("startClientX", e.clientX);
      e.dataTransfer.setData("startClientY", e.clientY);
      e.dataTransfer.setData("nodeId", this.node.id);
      e.dataTransfer.setData("myEventType", 'reLocateNode');
    },
    dragEnd(e) {
      this.$emit("node-drag-end", e, this.node);
    },
  },
};
</script>

<style lang="scss" scoped>
$border-color: #289de9;
.container {
  box-sizing: border-box;
  color: black;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  transition: background-color 0.3s;
  border-radius: 30px;
  &:hover {
    cursor: grab;
    background-color: rgba(227, 244, 255, 0.9);
  }
  & > {
    box-sizing: inherit;
  }
  height: 30px;
  width: 180px;
}
.container-left {
  border-radius: 100% 0 0 100%;
  height: 100%;
  border-left: 1px solid $border-color;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  color: $border-color;
  font-size: 20px;
  line-height: 30px;
  padding-left: 4px;
}

.container-middle {
  height: 100%;
  text-align: center;
  line-height: 30px;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
}

.container-right {
  border-radius: 0 100% 100% 0;
  height: 100%;
  border-right: 1px solid $border-color;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
}
</style>