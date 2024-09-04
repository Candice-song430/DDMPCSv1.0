<template>
  <div id="app">
    <center-table></center-table>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions({
      getAllDatabases: "mydatabases/getAllDatabases",
    }),
  },
  components: {
  },
  mounted() {
    this.getAllDatabases();
  },
};
</script>

<style scoped>
#app {
}
</style>
