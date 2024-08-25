<template lang="">
  <form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="currentDocument.name"
      :disabled="editMode"
      :counter="50"
      label="Nombre del documento"
      placeholder="Ej: Contrato de arriendo entre ANA (17536925) y PEDRO (17536925)"
    />
    <v-select
      v-model="currentTemplate"
      label="Plantilla"
      :items="templates"
      return-object
      item-title="name"
      item-value="id"
    />
    <v-text-field
      v-for="i in currentTemplate.document_attributes"
      :key="i.id"
      v-model="currentDocument.attributes[i.code_name]"
      :label="i.name"
    />
    <v-btn
      :loading="loading"
      size="large"
      type="submit"
      block
    >
      {{ editMode ? 'Actualizar documento' : 'Crear documetno' }}
    </v-btn>
  </form>
</template>

<script setup>
const templateStore = useTemplateStore()
const documentStore = useDocumentStore()
const { currentDocument } = storeToRefs(documentStore)
const { templates, currentTemplate } = storeToRefs(templateStore)
const handleSubmit = async () => {
  await documentStore.saveOrUpdateDocument(currentTemplate.value.id)
  await navigateTo({
    path: `/documents`,
  })
}
const editMode = computed(() => currentDocument.value?.id != null)
</script>

<style lang="">

</style>
