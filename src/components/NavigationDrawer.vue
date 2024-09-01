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
    title: 'Crear documento',
    icon: 'mdi:folder-wrench',
    href: '/templates/create',
  },
  {
    title: 'Mis documento',
    icon: 'mdi:documents',
    href: '/templates',
  },
  {
    title: 'Formularios',
    icon: 'mdi:file-documents',
    href: '/documents',
  },
  {
    title: 'Suscripciones',
    icon: 'mdi:money',
    href: '/subscriptions',
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

<style>

</style>
