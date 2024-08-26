<template>
  <v-container
    fluid
    max-width="960"
  >
    <slot name="breadcrumbs" />
    <slot />
  </v-container>
</template>

<script setup>
const feedbackStore = useFeedbackStore()

onUnmounted(() => {
  feedbackStore.resetState()
})

</script>

<style scoped>
</style>
