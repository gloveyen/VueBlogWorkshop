const store = new Vuex.Store({
  state: {
    articles: null,
    focusId: ""
  },
  mutations: {
    fetchArticles: (state, payload) => {
      state.articles = payload;
    },
    addArticle: (state, payload) => {
      state.articles = [payload, ...state.articles];
    },
    updateArticle: (state, payload) => {
      const index = state.articles.map(art => art.id).indexOf(payload.id);
      state.articles.splice(index, 1, payload);
    },
    deleteArticle: (state, payload) => {
      const index = state.articles.map(art => art.id).indexOf(payload);
      state.articles.splice(index, 1);
    },
    changeFocusId: (state, payload) => {
      state.focusId = "";
      state.focusId = payload;
    }
  },
  actions: {
    fetchArticles: async ({ commit }) => {
      const api =
        "https://us-central1-expressapi-8c039.cloudfunctions.net/app/article";
      const res = await fetch(api);
      const json = await res.json();
      commit("fetchArticles", json.data);
    },
    addArticle: async ({ commit }, payload) => {
      const random = Math.round(Math.random(0.1, 1) * 100000);
      payload.id = `art_${random}`;
      commit("addArticle", payload);
    },
    updateArticle: async ({ commit }, payload) => {
      commit("updateArticle", payload);
    },
    deleteArticle: ({ commit }, payload) => {
      const ensure = confirm("確定要刪除此篇文章嗎？");
      if (ensure) {
        commit("deleteArticle", payload);
      }
    },
    changeFocusId: ({ commit }, payload) => {
      commit("changeFocusId", payload);
    }
  },
  getters: {
    filterById: state => {
      if (state.articles) {
        return state.articles.filter(art => art.id === state.focusId)[0];
      } else {
        return null;
      }
    }
  }
});
