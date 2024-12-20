import BookList from '@/components/BookList.vue';
import StackQueue from '@/components/StackQueue.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'book-list',
      component: BookList,
    },
    {
      path: '/stack-queue',
      name: 'stack-queue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => StackQueue,
    },
  ],
});

export default router;
