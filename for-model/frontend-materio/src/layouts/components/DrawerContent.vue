<script setup>
import {
  VerticalNavLink,
  VerticalNavSectionTitle,
} from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
            {{ projectName }}
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <!-- 👉 Pages -->
    {{#boundedContexts}}
    <VerticalNavSectionTitle :item="{ heading: '{{namePascalCase}}' }" />
    {{#aggregates}}
    <VerticalNavLink
      :item="{
        title: '{{namePascalCase}}',
        to: '/{{namePlural}}',
      }"
    />
    {{/aggregates}}
    {{#boundedContexts}}
  </ul>
</template>

<style lang="scss">
.upgrade-banner {
  margin-block-start: auto;
}
</style>