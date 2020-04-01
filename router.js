// const Home = { template: "<div>Home Page</div>" };

const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/article/:id",
      name: "article",
      component: Article
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      children: [
        {
          path: "add",
          name: "admin-add",
          component: Add
        }
      ]
    },
    {
      path: "/add",
      name: "add",
      component: Add
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: Add
    },
    {
      //建立404 not found
      //路由確保使用者不會跳出Router的控制範圍
      path: "*",
      name: "404notfound",
      component: NotFound
    }
  ]
});
