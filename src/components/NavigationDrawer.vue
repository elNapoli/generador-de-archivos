<template>
  <v-navigation-drawer
    :model-value="open"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <v-list
      density="compact"
      nav
    >
      <v-list-item
        v-for="i in items"
        :key="i.page"
        prepend-icon="mdi:folder"
        :title="i.title"
        :href="i.href"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const items = [
  {
    title: 'Crear Template',
    page: 'foo',
    href: 'documents/create',
  },
  {
    title: 'Documentos generados',
    page: 'foo',
    href: 'folder',
  },
]

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})
</script>

<style lang="">

</style>
