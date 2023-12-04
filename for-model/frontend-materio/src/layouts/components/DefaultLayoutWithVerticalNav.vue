<script setup>
import { VerticalNavLayout } from '@layouts'

// Components
import DrawerContent from '@/layouts/components/DrawerContent.vue'
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar>
      <VSpacer />

      <NavbarThemeSwitcher class="me-2" />

      <UserProfile />
    </template>

    <template #navigation-drawer-content>
      <DrawerContent />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <!-- <Footer /> -->
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
</style>