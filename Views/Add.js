const Add = {
  template: `
    <section class="add-view-container container">
      <form>
        <label>
          <div>
            文章標題：
          </div>
          <input
            v-model="formData.title"
            placeholder="Enter title"
          />
        </label>

        <label>
          <div>
            文章內容：
          </div>
          <textarea
            v-model="formData.content"
            placeholder="Enter content"
          />
        </label>
        <button
          v-if="mode==='add'"
          @click.prevent="submitData"
          name="submit"
        >送出</button>
        <button
          v-else
          @click.prevent="updateData"
          name="submit"
        >修改</button>
        <button @click.prevent="resetData" name="reset">重置</button>:
      </form>
    </section>
  `,
  mounted() {
    if (this.$route.name === "edit") {
      this.mode = "edit";
      const id = this.$route.params.id;
      this.$store.dispatch("changeFocusId", id);
    }
  },
  data() {
    return {
      formData: {
        title: "",
        content: "",
        date: ""
      },
      mode: "add"
    };
  },
  methods: {
    ...Vuex.mapActions(["addArticle", "updateArticle"]),

    resetData: function() {
      this.formData = {
        title: "",
        content: "",
        date: ""
      };
    },
    submitData: async function() {
      this.formData.date = new Date().getTime();
      await this.addArticle(this.formData);
      this.$router.push({ path: "/admin" });
    },
    updateData: async function() {
      await this.updateArticle(this.formData);
      this.$router.push({ path: "/admin" });
    }
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
  },
  watch: {
    $route: function() {
      if (this.$route.name === "add") {
        this.mode = "add";
        this.resetData();
      }
    },
    filterById: function() {
      if (this.mode === "edit") {
        this.formData = Object.assign({}, this.filterById);
      }
    }
  }
};
