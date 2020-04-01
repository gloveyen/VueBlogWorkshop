const SideBar = {
  template: `
  <div class="side-bar-component-container">
  <h2>最新文章</h2>
  <hr>
    <ul>
      <li v-for="art,index in articles" :key="index" @click="goToArticle(art.id)">
        {{ art.title }}
      </li>
    </ul>
  </div>
  `,
  methods: {
    goToArticle: function(id) {
      this.$router.push({ path: `/article/${id}` });
    }
  },
  computed: {
    ...Vuex.mapState(["articles"])
  }
};
