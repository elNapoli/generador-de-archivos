<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <v-alert
      class="my-4"
      border="start"
      type="info"
    >
      <div v-html="textHelper" />
    </v-alert>
    <loading-full-screen :loading="loading" />
    <v-file-input
      chips
      :model-value="file"
      show-size
      accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      label="Documento a subir en la plataforma"
      @update:model-value="transformDocxToHtml($event)"
    />
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

const route = useRoute()
const file = ref()
const quillDescr = ref(null)
const templateStore = useTemplateStore()
const { currentTemplate } = storeToRefs(templateStore)
const quillContent = ref(new Delta())
const textHelper = `Puedes optar por subir tu propio documento <b>.DOCX</b>, pero ten en cuenta que es posible que algunos
estilos, colores y formatos se pierdan durante la conversión al formato requerido por la plataforma. Además, asegúrate
de reemplazar los tags que configuraste previamente, como`
const loading = ref(false)
const transformDocxToHtml = async (f) => {
  loading.value = true
  file.value = f
  await templateStore.transformDocxToHtmlAndSaveIntoTable(f)
  loadContentIntoQuill()
}

onMounted(async () => {
  await templateStore.getTemplate(route.params.id)

  loadContentIntoQuill()
})
const loadContentIntoQuill = () => {
  try {
    quillContent.value = new Delta(JSON.parse(currentTemplate.value.content))
  }
  catch (e) {
    try {
      console.log('entre', currentTemplate.value.content)
      const quill = quillDescr.value.getQuill()
      const delta = quill.clipboard.convert(currentTemplate.value.content)
      console.log(delta)

      quillContent.value = new Delta(delta)
    }
    catch (innerError) {
      console.error('Error al transformar el contenido:', innerError)
    }
  }
  loading.value = false
}
const insertText = (newText) => {
  const quill = quillDescr.value.getQuill()
  const selection = quill.getSelection()
  quill.insertText(selection.index, `{{${newText}}}`, 'bold', true)
}
const savePdfTemplate = async () => {
  await templateStore.savePdfContent()
  await navigateTo({
    path: '/templates',
  })
}

watch(quillContent, (newValue) => {
  currentTemplate.value.content = newValue
}, { deep: true })
</script>
