<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <quill-editor
      id="quill-editor"
      ref="quillDescr"
      toolbar="full"
      theme="snow"
    />
    <v-btn
      class="mt-3"
      :loading="loading"
      size="large"
      block
      @click="savePdfTemplate"
    >
      Guardar Pdf
    </v-btn>
  </basic-container>
</template>

<script setup>
const quillDescr = ref(null)
const documentStore = useDocumentStore()
const { apiResponse, loading } = storeToRefs(documentStore)

const savePdfTemplate = async () => {
  const deltaContent = quillDescr.value.getContents()
  const jsonContent = JSON.stringify(deltaContent)

  documentStore.savePdfContent(jsonContent)
}
</script>

<style lang="">
/* Add any custom styles here */
</style>
