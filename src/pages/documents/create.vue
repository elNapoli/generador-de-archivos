<template>
  <basic-container>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        label="Nombre"
      />
      <v-textarea
        v-model="description"
        :counter="500"
        label="Descripción"
      />
      <document-item-attribute-table
        :data="attributes"
      />
      <v-btn
        :loading="loading"
        size="large"
        type="submit"
        block
      >
        Crear template
      </v-btn>
    </form>
  </basic-container>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'

const documentStore = useDocumentStore()
const { attributes } = storeToRefs(documentStore)
const { handleSubmit, _ } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true
      return 'Nombre necesita al menos 2 caracteres.'
    },
  },
})
const name = useField('name')

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<style scoped>
</style>
