import { createRouter, createWebHistory } from "vue-router";
import ShowDetail from "@/pages/ShowDetail.vue";
import EpisodeDetailPage from "@/pages/EpisodeDetailPage.vue";

const routes = [
  { path: "/", component: ShowDetail },
  { path: "/episode/:id", component: EpisodeDetailPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
