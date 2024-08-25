<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>

    <quill-editor
      id="quill-editor"
      ref="quillDescr"
      v-model:content="hola"
      toolbar="full"
      theme="snow"
    />

    <!-- Contenedor para renderizar el contenido HTML -->
    <div
      ref="contentContainer"
      v-html="hola"
    />

    <v-btn @click="exportToPDF">
      Export to otro
    </v-btn>
  </basic-container>
</template>

<script setup>
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { ref, nextTick } from 'vue'
import { saveAs } from 'file-saver'

const quillDescr = ref(null)
// Reactive variable for editor content
const hola = ref('')

const contentContainer = ref(null)

const exportToPDF = async () => {
  const { pdfExporter } = await import('quill-to-pdf')
  const delta = quillDescr.value.getContents()
  const deltaString = JSON.stringify(delta)
  const jajajaj = JSON.parse(deltaString)
  console.log(deltaString)
  console.log(jajajaj)

  const blob = await pdfExporter.generatePdf(jajajaj)
  saveAs(blob, 'pdf-export.pdf') // downloads from the browser
  console.log(blob)
}
</script>

<style lang="">
/* Add any custom styles here */
</style>
