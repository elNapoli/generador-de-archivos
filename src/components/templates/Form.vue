<template lang="">
  <form @submit.prevent=" documentStore.saveOrUpdateTemplate()">
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
      class="my-5"
      :data="currentTemplate.document_attributes"
    />
    <v-btn
      :loading="loading"
      size="large"
      type="submit"
      block
    >
      {{ currentTemplate.id ? 'Actualizar template' : 'Crear template' }}
    </v-btn>
  </form>
</template>

<script setup>
const documentStore = useDocumentStore()
const { currentTemplate, loading } = storeToRefs(documentStore)
console.log(currentTemplate.id)
</script>

<style lang="">

</style>
