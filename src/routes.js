import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import AddRestaurant from "./components/AddRestaurant.vue";
import UpdateRestaurant from "./components/UpdateRestaurant.vue";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/signup",
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
  },
  {
    name: "AddRestaurant",
    component: AddRestaurant,
    path: "/addRestaurant",
  },
  {
    name: "UpdateRestaurant",
    component: UpdateRestaurant,
    path: "/updateRestaurant/:id",
  },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
