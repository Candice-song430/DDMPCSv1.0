<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      :width="width"
      :height="height"
    >
      <slot></slot>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: [Number, String],
      default: "100%"
    },
    width: {
      type: [Number, String],
      default: "100%"
    }
  }
};
</script>

<style lang="scss" scoped>
svg {
  overflow: hidden;
  width: 900px;
  height: 850px;
  background: #fff;
  box-shadow: 1px 15px 15px rgba(0, 0, 0, 0.2);
  /* margin: 0 auto; */
  z-index: 999;
}
</style>
