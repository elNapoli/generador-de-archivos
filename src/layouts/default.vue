<template>
  <v-app>
    <v-layout>
      <header-app @toggle-drawer="openDrawer = !openDrawer" />
      <navigation-drawer
        :open="openDrawer"
        @drawer:close="openDrawer=false"
      />
      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
const openDrawer = ref(false)
</script>
