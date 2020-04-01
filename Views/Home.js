const Home = {
  template: `
  <div class="home-view-container container">
  <section >
    <article v-for="art,index in articles" :key="index">
      <h2 @click="goToArticle(art.id)">{{ art.title }}</h2>
      <i>{{ art.date | toDate }}</i>
      <span>{{ art.content | subContent }}</span>
    </article>
  </section>
  <SideBar />
  </div>
  `,
  methods: {
    goToArticle: function(id) {
      this.$router.push({ path: `/article/${id}` });
    }
  },
  computed: {
    ...Vuex.mapState(["articles"])
  },
  filters: {
    subContent: content => {
      return content.replace(/<br>/g, "").substring(0, 150);
    },
    toDate: timestamp => {
      const date = new Date(timestamp);
      let Y = date.getFullYear();
      let M = date.getMonth();
      let D = date.getDate();
      let H = date.getHours();
      let min = (Array(2).join("0") + date.getMinutes()).slice(-2);
      return `${Y}/${M + 1}/${D} ${H}:${min}`;
    }
  },
  components: { SideBar }
};
