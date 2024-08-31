<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <loading-full-screen :loading="loading" />
    <v-alert
      v-if="error"
      color="error"
      icon="mdi:alert-circle"
      :value="true"
    >
      {{ error?.message }}
    </v-alert>
    <templates-form class="my-3" />
    <div class="text-center pa-4">
      <v-dialog
        v-model="showModal"
        max-width="400"
        persistent
      >
        <v-card
          prepend-icon="mdi-map-marker"
          text="Template creado con éxito"
          title="Operación exitosa"
        >
          <template #actions>
            <v-spacer />

            <v-btn @click="handleSuccess">
              Aceptar
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </basic-container>
</template>

<script setup>
import LoadingFullScreen from '~/components/LoadingFullScreen.vue'

const templateStore = useTemplateStore()
const { loading, status, error } = storeToRefs(templateStore)
const showModal = computed(() => status.value === 201)
const handleSuccess = async () => {
  await navigateTo({
    path: `/templates`,
  })
}
onMounted(() => {
  templateStore.resetCurrentTemplate()
})
onUnmounted(() => {
  templateStore.resetFeedback()
})
</script>

<style scoped>
</style>
