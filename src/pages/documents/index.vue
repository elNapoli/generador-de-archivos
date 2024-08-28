<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <v-data-table
      :headers="headers"
      :hide-default-footer="true"
      :items="documents.data"
      :sort-by="[{ key: 'name', order: 'asc' }]"
    >
      <template #top>
        <v-toolbar>
          <v-toolbar-title>Documentos</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-btn
            class="text-none font-weight-regular"
            prepend-icon="mdi:file-plus"
            text="Crear formulario"
            variant="tonal"
            to="/documents/create"
          />
          <templates-new-item-dialog
            :item="currentAttribute"
            :title="formTitle"
            :open="dialog"
            @dialog:close="dialog=false"
            @update:item="templateStore.createOrEditAttribute($event)"
          />

          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                ¿Seguro que deseas eliminar este documento?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="closeDelete"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                >
                  Eliminar
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #item.actions="{ item }">
        <v-icon
          class="mr-2"
          icon="mdi:pencil"
          @click="editItem(item)"
        />
        <v-icon
          class="mr-2"
          icon="bxs:file-export"
          color="blue"
          :disabled="!item.document_templates.content"
          @click="llenar(item)"
        />
        <v-icon
          icon="mdi:delete"
          color="red"
          @click="deleteItem(item)"
        />
      </template>
      <template #item.required="{ value }">
        <v-chip :color="getColor(value)">
          <v-icon
            :icon="value? 'mdi:check':'mdi:close'"
          />
        </v-chip>
      </template>
      <template #no-data>
        <p>No hay atributos en el documento actual</p>
      </template>
    </v-data-table>
    <quill-editor
      id="quill-editor"
      ref="quillDescr"
      v-model:content="quillContent"
      toolbar="#false"
      read-only
      theme="snow"
    >
      <template #toolbar>
        <div id="false">
          <p>Preview del documento</p>
        </div>
      </template>
    </quill-editor>
    <v-btn @click="exportToPDF">
      exportar
    </v-btn>
  </basic-container>
</template>

<script setup>
import Delta from 'quill-delta'
import { saveAs } from 'file-saver'

const dialog = ref(false)
const dialogDelete = ref(false)
defineProps({
  data: {
    type: Array,
    required: true,
  },
})
const templateStore = useTemplateStore()
const documentStore = useDocumentStore()
const { documents } = storeToRefs(documentStore)
const quillDescr = ref(null)

const quillContent = ref('')
const headers = [
  {
    title: 'Nombre',
    align: 'start',
    key: 'name',
  },
  { title: 'Estado', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]
const replaceTemplatePlaceholders = (delta, attributes) => {
  // Recorre todos los objetos en el array "ops"
  return delta.ops.map((op) => {
    if (typeof op.insert === 'string') {
      // Si "insert" es un string, realiza el reemplazo
      return {
        ...op,
        insert: op.insert.replace(/{{(\w+)}}/g, (_, key) => attributes[key] || ''),
      }
    }
    // Si "insert" no es un string, lo dejamos como está
    return op
  })
}

const llenar = async (doc) => {
  const temp = replaceTemplatePlaceholders(doc.document_templates.content, doc.attributes)
  quillContent.value = new Delta(temp)
}
const exportToPDF = async () => {
  const { pdfExporter } = await import('quill-to-pdf')
  const delta = quillDescr.value.getContents()
  const deltaString = JSON.stringify(delta)
  const finalData = JSON.parse(deltaString)
  const blob = await pdfExporter.generatePdf(finalData)
  saveAs(blob, 'documento-ejemplo.pdf') // downloads from the browser
}
const editItem = async (item) => {
  await documentStore.setCurrentDocument(item)
  await templateStore.setCurrentTemplateById(item.template_id)
  await navigateTo({
    path: `/documents/${item.id}`,
  })
}
const deleteItem = (item) => {
  documentStore.setCurrentDocument(item)
  dialogDelete.value = true
}
const deleteItemConfirm = () => {
  documentStore.deleteDocument()
  closeDelete()
}
const closeDelete = () => {
  dialogDelete.value = false
}
onMounted(() => {
  documentStore.fetchMyDocuments()
  templateStore.fetchMyTemplates()
})
</script>
