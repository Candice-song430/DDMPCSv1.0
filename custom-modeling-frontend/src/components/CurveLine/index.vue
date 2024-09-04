<template>
  <path :d="curRoad" :class="getCurrentClickLine === id ?'curvelineChoice' : 'curveline'" ref="path" @click="change_line_id"></path>
</template>

<script>
import drawMethods from "@/utils/line.js";
import {mapGetters, mapActions} from 'vuex';
export default {
  name: "curveLine",
  computed: {
    ...mapGetters({
      getCurrentClickLine:'getCurrentClickLine'
    })
  },
  data() {
    return {
      curRoad: null,
    };
  },
  props: {
    start: {
      type: Object,
      default: null,
    },
    end: {
      type: Object,
      default: null,
    },
    id: {
      type: Number,
      default: -1
    }
  },
  watch: {
    start: {
      handler: function () {
        this.changeCurRoad();
      },
      deep: true
    },
    end: {
      handler: function() {
        this.changeCurRoad();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      changeCurrentClickLine: 'mylines/changeCurrentClickLine'
    }),
    changeCurRoad() {
      this.curRoad = drawMethods.calculatedCurvePathQ(this.start, this.end);
    },
    change_line_id() {
      let payload = {
        lineId : this.id
      }
      this.changeCurrentClickLine(payload);
    }
  },
  mounted() {
    this.changeCurRoad();
  },
};
</script>

<style lang="scss" scoped>
.curveline {
  fill: transparent;
  stroke: black;
  stroke-width: 1px;
  z-index: 5;
  &:hover{
    stroke-width: 5px;
    stroke: blue;
  }
}
.curvelineChoice {
  fill: transparent;
  stroke: red;
  stroke-width: 1px;
  z-index: 5;
  &:hover{
    stroke-width: 5px;
    stroke: blue;
  }
}
</style>