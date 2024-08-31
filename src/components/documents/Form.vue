<template>
  <form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="currentDocument.data.name"
      :disabled="documentStore.editMode"
      :counter="50"
      label="Nombre del documento"
      placeholder="Ej: Contrato de arriendo entre ANA (17536925) y PEDRO (17536925)"
    />
    <v-select
      v-model="currentTemplate"
      :model-value="currentTemplate"
      label="Plantilla"
      :items="templates"
      return-object
      item-title="name"
      item-value="id"
      @update:model-value="documentStore.resetAttributesValue()"
    />
    <v-text-field
      v-for="i in currentTemplate.document_attributes"
      :key="i.id"

      v-model="currentDocument.data.attributes[i.code_name]"
      :label="i.name"
    />
    <v-btn
      :loading="loading"
      size="large"
      type="submit"
      block
    >
      {{ documentStore.editMode ? 'Actualizar formularios' : 'Crear formularios' }}
    </v-btn>
  </form>
</template>

<script setup>
const templateStore = useTemplateStore()
const documentStore = useDocumentStore()
const { currentDocument } = storeToRefs(documentStore)
const { templates, currentTemplate } = storeToRefs(templateStore)
const handleSubmit = async () => {
  if (documentStore.editMode) {
    await documentStore.updateDocument(currentTemplate.value.data.id)
  }
  else {
    await documentStore.createDocument(currentTemplate.value.data.id)
  }
  await navigateTo({
    path: `/documents`,
  })
}
</script>

<style>

</style>
