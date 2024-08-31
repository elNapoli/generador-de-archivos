<template>
  <form @submit.prevent="submit">
    <v-alert
      v-if="currentTemplate.error"
      class="my-4"
      color="error"
      icon="mdi:alert-circle"
    >
      {{ currentTemplate.error?.message }}
    </v-alert>
    <v-text-field
      v-model="currentTemplate.name"
      :counter="50"
      label="Nombre"
    />
    <v-textarea
      v-model="currentTemplate.description"
      :counter="500"
      label="Descripción"
    />
    <templates-item-attribute-table
      class="my-4"
      :enable-edit="templateStore.editMode"
      :template-id="currentTemplate.id"
      :data="currentTemplate.document_attributes"
    />
    <v-btn
      :loading="loading"
      size="large"
      type="submit"
      block
    >
      {{ templateStore.editMode ? 'Actualizar plantilla' : 'Crear plantilla' }}
    </v-btn>
  </form>
</template>

<script setup>
const templateStore = useTemplateStore()
const { currentTemplate } = storeToRefs(templateStore)

const submit = () => {
  if (templateStore.editMode) {
    templateStore.updateTemplate()
  }
  else {
    templateStore.createTemplate()
  }
}
</script>

<style>

</style>
