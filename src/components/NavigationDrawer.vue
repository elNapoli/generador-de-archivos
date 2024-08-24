<template>
  <v-navigation-drawer
    :model-value="open"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
    @update:model-value="closeDrawer"
  >
    <v-list
      density="compact"
      nav
    >
      <v-list-item
        v-for="i in items"
        :key="i.page"
        :prepend-icon="i.icon"
      >
        <NuxtLink :to="i.href">
          {{ i.title }}
        </NuxtLink>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const items = [
  {
    title: 'Crear plantillas',
    icon: 'mdi:folder-wrench',
    href: '/templates/create',
  },
  {
    title: 'Mis plantillas',
    icon: 'mdi:document',
    href: '/templates',
  },
  {
    title: 'Documentos generados',
    icon: 'mdi:file-document-arrow-right-outline',
    href: '/documents',
  },
]
const emit = defineEmits(['drawer:close'])
const closeDrawer = () => {
  emit('drawer:close')
}
defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})
</script>

<style lang="">

</style>
