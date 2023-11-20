forEach: Model
fileName: index.js
path: frontend-materio/javascript-version/src/router
---
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from '~pages'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Index.vue'),
    },
    {{#boundedContexts}}
    {{#aggregates}}
    {
        path: '/{{namePlural}}',
        name: '{{nameCamelCase}}',
        component: () => import('../views/components/ui/{{namePascalCase}}Grid.vue'),
    },
    {{/aggregates}}
    {{#views}}
        {{#ifEquals dataProjection "cqrs"}}

            {{/ifEquals}}
        {{/views}}
    {{/boundedContexts}}
    ...setupLayouts(routes),
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
export default router
