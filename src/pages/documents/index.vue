<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <v-row>
      <v-alert
        class="my-4"
        type="info"
        :text="textHelper"
      />

      <v-data-table
        :headers="headers"
        :hide-default-footer="true"
        :items="documents"
        :loading="loading"
        :sort-by="[{ key: 'name', order: 'asc' }]"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10" />
        </template>
        <template #top>
          <v-toolbar>
            <v-toolbar-title>Formularios contestado por usuarioss</v-toolbar-title>
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

            <v-dialog
              v-model="dialogDelete"
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  ¿Seguro que deseas eliminar este formulario?
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
        <template #item.path="{ item }">
          <v-chip
            v-if="item.path"
            @click="downloadDocument(item.id)"
          >
            Documento
          </v-chip>
        </template>
        <template #item.actions="{ item }">
          <v-icon
            class="mr-2"
            icon="mdi:pencil"
            @click="editItem(item)"
          />
          <v-icon
            v-if="!item.path"
            class="mr-2"
            icon="bxs:file-export"
            color="blue"
            @click="documentStore.generatePdf(item.id)"
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
    </v-row>
  </basic-container>
</template>

<script setup>
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
const { documents, loading, error } = storeToRefs(documentStore)
const textHelper = `En esta sección, podrá visualizar todos los formularios con sus respuestas y generar el documento
en formato PDF según sus necesidades. Tenga en cuenta que los usuarios Free tienen un límite de hasta 5 documentos que
 pueden generar. ¡Esperamos que esta funcionalidad le sea de gran utilidad!`
const headers = [
  {
    title: 'Nombre',
    align: 'start',
    key: 'name',
  },
  {
    title: 'Archivo',
    align: 'center',
    key: 'path',
  },
  { title: 'Estado', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

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
const deleteItemConfirm = async () => {
  await documentStore.deleteDocument()
  closeDelete()
}
const closeDelete = () => {
  dialogDelete.value = false
}
onMounted(() => {
  documentStore.fetchMyDocuments()
  templateStore.fetchMyTemplates()
})
const downloadDocument = async (id) => {
  const response = await documentStore.getPublicUrl(id)
  if (response.error) {
    console.log(response.error)
  }
  else {
    await navigateTo(response.data.signedUrl, { external: true, open: { target: '_blank' } })
  }
}
</script>
