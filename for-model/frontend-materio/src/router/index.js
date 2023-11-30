import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from '~pages'

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
    ...setupLayouts(routes),
  ],
})

export default router;
