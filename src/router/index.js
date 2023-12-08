import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
  ],
});
const routesInaccessibleToAuth = ["Login", "Registration"];

router.beforeEach(async (to, from, next) => {
  const body = document.querySelector('body');
  body.classList.add('md:container', 'md:mx-auto');
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      return next("/login");
    } else {
      return next();
    }
  } else if (token && routesInaccessibleToAuth.includes(to.name)) {
    next("/");
  } else {
    return next();
  }
});
export default router;
