forEach: Model
fileName: DrawerContent.vue
---
<template>
    <div class="nav-header">
        <RouterLink
            to="/"
            class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
        >
            <Transition name="vertical-nav-app-title">
                <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
                Home
                </h1>
            </Transition>
        </RouterLink>
    </div>
    <ul>
        <v-list :opened="open" style="background-color: #F4F5FA;">
            <template v-slot:activator="{ props }">
                <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-account-circle"
                    title="Users"
                >
                </v-list-item>
            </template>
            {{#boundedContexts}}
            <v-list-group value="{{namePascalCase}}">        
                <template v-slot:activator="{ props }">
                    <v-list-item
                    style="margin-left: 10px;"
                    v-bind="props"
                    title="{{#ifNotNull displayName namePascalCase}}{{/ifNotNull}}"
                    ></v-list-item>
                </template>
                <v-list-item
                    v-for="item in {{nameCamelCase}}"
                    :key="item.key"
                    :title="item.name"
                    :value="item.name"
                    :to="item.url"
                ></v-list-item>
            </v-list-group>
            {{/boundedContexts}}
        </v-list>
    </ul>
</template>

<script>
import { useTheme } from 'vuetify';

export default {
    name:'DrawerContent',
    components:{
    },
    data: () => ({
        drawer: true,
        sideBar: true,
        urlPath: null,
        open: ['Users'],
        {{#boundedContexts}}
        {{nameCamelCase}}: [
            {{#aggregates}}
            { key: '{{namePlural}}', url: '/{{namePlural}}', name: '{{#ifNotNull displayName namePascalCase}}{{/ifNotNull}}'},
            {{/aggregates}}
        ],
        {{/boundedContexts}}
    }),
    created(){
    },
    computed:{
    },
    methods: {
        changeUrl(){
            const path = document.location.href.split("#/");
            urlPath.value = path[1];
        },
        goHome(){
            urlPath.value = null;
        }
    },
}
</script>
<function>
window.$HandleBars.registerHelper('ifNotNull', function (displayName, name) {
    if(displayName){
        return displayName;
    }else{
        return name;
    }
})
</function>