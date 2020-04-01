const app = new Vue({
  router,
  store,
  el: "#app",
  created: async function() {
    await this.$store.dispatch("fetchArticles");
    this.loading = false;
  },
  data() {
    return {
      loading: true
    };
  }
});
