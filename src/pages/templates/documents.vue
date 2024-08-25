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
      Export to PDF
    </v-btn>
    <v-btn @click="prueba">
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

const prueba = async () => {
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

// Function to export content to PDF
const exportToPDF = async () => {
  await nextTick()

  if (contentContainer.value) {
    try {
      const canvas = await html2canvas(contentContainer.value, { useCORS: true })
      const imgData = canvas.toDataURL('image/png')

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      while (heightLeft >= 0) {
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
        position -= pageHeight
        if (heightLeft >= 0) {
          doc.addPage()
        }
      }

      doc.save('document.pdf')
    }
    catch (error) {
      console.error('Error exporting to PDF:', error)
    }
  }
}
</script>

<style lang="">
/* Add any custom styles here */
</style>
