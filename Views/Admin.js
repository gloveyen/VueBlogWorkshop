const Admin = {
  template: `
    <section class="admin-view-container container">
      <ul v-if="adminPage">
        <li name="admin-header">
          <div>文章標題</div>
          <div>上傳日期</div>
          <div>文章內容</div>
          <div>修改/刪除</div>
        </li>
        <li v-for="art,index in articles" :key="index" name="admin-body">
          <div>{{ art.title }}</div>
          <div>{{ art.date | toDate }}</div>
          <div>{{ art.content | subContent }}</div>
          <div>
            <button @click="editArticle(art.id)">修改</button>
            <button @click="deleteArticle(art.id)">刪除</button>
          </div>
        </li>
      </ul>

      <router-view />
    </section>
  `,
  data() {
    return {
      adminPage: true
    };
  },
  methods: {
    ...Vuex.mapActions(["deleteArticle"]),

    editArticle: function(id) {
      this.$router.push({ path: `/edit/${id}` });
    }
  },
  computed: {
    ...Vuex.mapState(["articles"])
  },
  filters: {
    subContent: content => {
      return content.replace(/<br>/g, "").substring(0, 50) + "...";
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
  watch: {
    $route: {
      handler: function() {
        if (this.$route.name === "admin") {
          this.adminPage = true;
        } else {
          this.adminPage = false;
        }
      },
      immediate: true
    }
  }
};
