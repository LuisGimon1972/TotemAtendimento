import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
    children: [
      {
        path: '',
        redirect: '/produtos',
      },
      {
        path: 'produtos',
        component: () => import('pages/ProductosPage.vue'),
      },
      {
        path: 'carrinho',
        component: () => import('pages/CartPage.vue'),
      },
      { path: 'configuracoes', component: () => import('pages/ConfigPage.vue') },
      { path: 'sobre', component: () => import('pages/AboutPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
