// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/HelloWorld.vue';
// import NotFound from './views/NotFound.vue';

const routes = [
  {
    path: '/ss',
    component: Home,
  },
//   {
//     path: '/your-deep-link',
//     component: YourDeepLinkComponent,
//   },
//   {
//     path: '/:catchAll(.*)',
//     component: NotFound,
//   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
