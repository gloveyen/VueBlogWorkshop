const Article = {
  template: `
    <article v-if="filterById" class="article-view-container container">
      <h2>{{ filterById.title }}</h2>
      <i>{{ filterById.date | toDate }}</i>
      <span v-html="filterById.content"></span>
    </article>
  `,
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch("changeFocusId", id);
  },
  computed: {
    ...Vuex.mapGetters(["filterById"])
  },
  filters: {
    toDate: timestamp => {
      const date = new Date(timestamp);
      let Y = date.getFullYear();
      let M = date.getMonth();
      let D = date.getDate();
      let H = date.getHours();
      let min = (Array(2).join("0") + date.getMinutes()).slice(-2);
      return `${Y}/${M + 1}/${D} ${H}:${min}`;
    }
  }
};
