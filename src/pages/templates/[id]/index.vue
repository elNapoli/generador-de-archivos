<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <templates-form />
    <div class="text-center pa-4">
      <v-dialog
        v-model="showModal"
        max-width="400"
        persistent
      >
        <v-card
          prepend-icon="mdi-map-marker"
          text="Template actualizado con éxito"
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
const templateStore = useTemplateStore()
const { currentTemplate } = storeToRefs(templateStore)
const showModal = computed(() => currentTemplate.value.status === 200)

const handleSuccess = async () => {
  await navigateTo({
    path: `/templates`,
  })
}
onUnmounted(() => {
  templateStore.resetCurrentTemplate()
})
</script>

<style scoped>
</style>
