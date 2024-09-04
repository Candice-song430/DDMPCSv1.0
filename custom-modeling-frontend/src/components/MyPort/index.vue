<template>
  <div
    class="port-container"
    :style="portS"
    draggable="true"
    @drag.stop="dragPortGing($event)"
    @dragstart.stop="dragPortStart($event)"
    @dragend.stop="dragPortEnd($event)"
    @drop.stop="dropEvent($event)"
  >

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "myPort",
  props: {
    port: {
      type: Object,
      default: null,
    },
  },
  computed: {
    portS() {
      return `transform: translateX(${this.port.off_x}px) translateY(${this.port.off_y}px)`;
    },
  },
  methods: {
    ...mapActions({
      createTempLine: "mylines/createTempLine",
      createLine: "mylines/createLine",
      clearTempLine: "mylines/clearTempLine"
    }),
    dragPortGing(e) {
      // let payload = {
      //   start_pos_x: this.port.pos_x, start_pos_y: this.port.pos_y, end_pos_x : e.clientX - 527, end_pos_y: e.clientY
      // }
      let payload = {
        start_pos_x: this.port.pos_x, start_pos_y: this.port.pos_y, end_pos_x : this.port.pos_x+e.offsetX, end_pos_y: this.port.pos_y+e.offsetY
      }
      // console.log(payload);
      this.createTempLine(payload)
    },
    dragPortStart(e) {
      e.dataTransfer.setData('startPortName', this.port.name);
    },
    dragPortEnd(e) {
      this.clearTempLine();
    },
    dropEvent(e) {
      let payload = {
        startPortName: e.dataTransfer.getData('startPortName'),
        endPortName: this.port.name
      }
      this.createLine(payload)
    }
  },
};
</script>

<style lang="scss" scoped>
.port-container {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: white;
  border: 1px solid #ccc;
  cursor: crosshair;
}
</style>