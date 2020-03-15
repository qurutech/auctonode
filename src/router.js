import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/auctoboard",
      name: "auctoboard",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./views/Auctoboard.vue")
    },
    {
      path: "/vote/:address",
      name: "vote",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "vote" */ "./views/Vote.vue")
    },
    {
      path: "/payout/:address",
      name: "payout",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "vote" */ "./views/Payout.vue")
    },
    {
      path: "/holders",
      name: "holders",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "holders" */ "./views/Holders.vue")
    }
    // {
    //   path: '/authorize',
    //   name: 'authorize',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/Authorize.vue')
    // }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/authorize',];
  const publicPages = ["/", "/holders"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("isLoggedIn");
  // const authorized = localStorage.getItem('authorize');
  // if (to.path !== '/authorize' ) {
  //   if (authorized && to.path !== '/' && !loggedIn) {
  //     return next('/');
  //   } else if (authorized && authRequired && !loggedIn && to.path !== '/')  {
  //     return next('/');
  //   } else if (!authorized  && to.path !== '/authorize') {
  //     return next('/authorize');
  //   }

  // }

  if (authRequired && !loggedIn && to.path !== "/") {
    return next("/");
  }
  next();
});
