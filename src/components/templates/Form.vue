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
      v-model="currentTemplate.data.name"
      :counter="50"
      label="Nombre"
    />
    <v-textarea
      v-model="currentTemplate.data.description"
      :counter="500"
      label="Descripción"
    />
    <templates-item-attribute-table
      class="my-4"
      :enable-edit="templateStore.editMode"
      :template-id="currentTemplate.data.id"
      :data="currentTemplate.data.document_attributes"
    />
    <v-btn
      :loading="loading"
      size="large"
      type="submit"
      block
    >
      {{ templateStore.editMode ? 'Actualizar template' : 'Crear template' }}
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
