const NotFound = {
  template: `
  <div class="not-found-view-container container">
    <b>404 NotFound</b>
    <button @click="backHome">Back Home</button>
  </div>
  `,
  methods: {
    backHome: function() {
      this.$router.push({ name: "home" });
    }
  }
};
