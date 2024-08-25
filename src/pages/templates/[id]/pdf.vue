<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <quill-editor
      id="quill-editor"
      ref="quillDescr"
      v-model:content="currentTemplate.content"
      content-type="html"
      toolbar="#my"
      theme="snow"
    >
      <template #toolbar>
        <quill-toolbar
          :custom-buttoms="currentTemplate.document_attributes"
          @click="insertText($event)"
        />
      </template>
    </quill-editor>
    <v-btn
      class="mt-3"
      :loading="loading"
      size="large"
      block
      @click="savePdfTemplate"
    >
      Guardar contenido
    </v-btn>
  </basic-container>
</template>

<script setup>
const quillDescr = ref(null)

const documentStore = useDocumentStore()
const { currentTemplate, loading } = storeToRefs(documentStore)

const insertText = (newText) => {
  const quill = quillDescr.value.getQuill()
  const selection = quill.getSelection()
  quill.insertText(selection.index, `{{${newText}}}`, 'bold', true)
}
const savePdfTemplate = async () => {
  await documentStore.savePdfContent()
  documentStore.resetapiResponse()
  await navigateTo({
    path: `/templates`,
  })
}
</script>

<style lang="">
/* Add any custom styles here */
</style>
