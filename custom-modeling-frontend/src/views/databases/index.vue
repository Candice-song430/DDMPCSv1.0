<template>
  <div class="databases-container">
    <div class="databases-switch">
      <router-link class="databases-switch-button" :to="{ name: 'Sources' }"
        >Resource Repository</router-link
      >

    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Databases",
  data() {
    return {};
  },
  computed: {
    key() {
      return this.$route.path;
    }
  },
  methods: {
    pushRouter(e) {
      console.log(e.target.to);
    }
  }
};
</script>

<style lang="scss" scoped>
$border-color: #ccc;
$hover-color: blue;
.databases-container {
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
      flex: 1;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: $hover-color;
      }
    }
  }
}
</style>
