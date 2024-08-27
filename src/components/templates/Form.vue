<template>
  <form @submit.prevent="templateStore.createOrUpdateTemplate()">
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
      :template-id="currentTemplate.data.id"
      :data="currentTemplate.data.document_attributes"
    />
    <v-btn
      :loading="loading"
      size="large"
      type="submit"
      block
    >
      {{ currentTemplate.data.id ? 'Actualizar template' : 'Crear template' }}
    </v-btn>
  </form>
</template>

<script setup>
const templateStore = useTemplateStore()
const { currentTemplate } = storeToRefs(templateStore)
</script>

<style>

</style>
