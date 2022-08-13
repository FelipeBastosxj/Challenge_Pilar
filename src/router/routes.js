
const routes = [
  {
    path: '/',
    component: () => import('pages/LoginInicial.vue'),
    name: 'login'
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'principal' },
    children: [
      {
        path: 'inicio', component: () => import('pages/IndexPage.vue'),
        name: "principal",
        children: [
          {
            path: 'detalhes/:id', component: () => import('pages/DetalhesPessoa.vue'),
            name: "detalhes"
          }
        ]
      },

    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
