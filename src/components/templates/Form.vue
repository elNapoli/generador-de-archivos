<template lang="">
  <form @submit.prevent="templateStore.createOrUpdateTemplate()">
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
      :template-id="currentTemplate.id"
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
const templateStore = useTemplateStore()
const { currentTemplate } = storeToRefs(templateStore)
</script>

<style lang="">

</style>
