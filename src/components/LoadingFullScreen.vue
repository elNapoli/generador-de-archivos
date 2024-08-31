<template>
  <v-overlay
    :model-value="loading"
    :persistent="true"
    class="d-flex justify-center align-center mb-6"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-progress-circular
        :width="3"
        color="primary"
        indeterminate
      />
    </v-row>
  </v-overlay>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>

<style scoped>

</style>
