fileName: index.js
---
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
  {{#boundedContexts}}
    {{#aggregates}}
        {
          path: '/{{namePlural}}',
          component: () => import('../ui/{{namePascalCase}}Grid.vue'),
        },
    {{/aggregates}}
    {{#views}}
      {{#ifEquals dataProjection "cqrs"}}
        {
          path: '/{{namePlural}}',
          component: () => import('../views/{{namePascalCase}}View.vue'),
        },
      {{/ifEquals}}
    {{/views}}
  {{/boundedContexts}}
      ]
    },
  ],
})

export default router;
