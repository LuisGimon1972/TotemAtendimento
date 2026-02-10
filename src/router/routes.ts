import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'), // Boas-vindas
  },
  {
    path: '/produtos',
    component: () => import('pages/ProductosPage.vue'),
  },
  {
    path: '/carrinho',
    component: () => import('pages/CartPage.vue'),
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
