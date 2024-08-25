<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <quill-editor
      id="quill-editor"
      ref="quillDescr"
      v-model:content="quillContent"
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
import Delta from 'quill-delta'

const quillDescr = ref(null)
const templateStore = useTemplateStore()
const { currentTemplate, loading } = storeToRefs(templateStore)
const quillContent = ref(new Delta(currentTemplate.value.content))

const insertText = (newText) => {
  const quill = quillDescr.value.getQuill()
  const selection = quill.getSelection()
  quill.insertText(selection.index, `{{${newText}}}`, 'bold', true)
}
const savePdfTemplate = async () => {
  await templateStore.savePdfContent()
  templateStore.resetapiResponse()
  await navigateTo({
    path: `/templates`,
  })
}

watch(quillContent, (newValue) => {
  currentTemplate.value.content = newValue
}, { deep: true })
</script>

<style lang="">
/* Add any custom styles here */
</style>
