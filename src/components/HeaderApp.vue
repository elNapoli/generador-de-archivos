<template lang="">
  <v-app-bar :elevation="2">
    <template #prepend>
      <v-app-bar-nav-icon @click="toggleDrawer" />
    </template>
    <template #append>
      <v-btn
        icon="mdi:logout"
        @click="signOut"
      />
    </template>
    <v-app-bar-title>Generador de documentos</v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
const authStore = useAuthStore()
const signOut = async () => {
  try {
    await authStore.signOut()
    await navigateTo('/login')
  }
  catch (err) {
    console.error('Error al iniciar sesión:', err)
  }
}

const emit = defineEmits(['toggle-drawer'])

const toggleDrawer = () => {
  emit('toggle-drawer')
}
</script>

<style lang="">

</style>
