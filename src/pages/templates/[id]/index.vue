<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <templates-form />
    <div class="text-center pa-4">
      <v-dialog
        v-model="apiResponse.success"
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
const templateStore = useTemplateStore()
const { apiResponse } = storeToRefs(templateStore)

const handleSuccess = async () => {
  templateStore.resetapiResponse()
  await navigateTo({
    path: `/templates`,
  })
}
</script>

<style scoped>
</style>
