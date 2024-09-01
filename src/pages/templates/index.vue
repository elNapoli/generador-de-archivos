<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <v-alert
      v-if="error"
      type="error"
      :value="true"
    >
      {{ error?.message }}
    </v-alert>
    <v-row class="my-3">
      <v-data-table
        :headers="headers"
        :hide-default-footer="true"
        :items="templates"
        :loading="loading"
        :sort-by="[{ key: 'name', order: 'asc' }]"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10" />
        </template>
        <template #top>
          <v-toolbar>
            <v-toolbar-title>Mis documentos</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi:file-plus"
              text="Crear documento"
              variant="tonal"
              to="/templates/create"
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
            icon="bxs:file-pdf"
            @click="createPdf(item)"
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
const { templates, loading, error, status } = storeToRefs(templateStore)

const headers = [
  {
    title: 'Nombre',
    align: 'start',
    key: 'name',
  },
  { title: 'Descripción', key: 'description' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const editItem = async (item) => {
  templateStore.setCurrentTemplate(item)
  await navigateTo({
    path: `/templates/${item.id}`,
  })
}
const createPdf = async (item) => {
  templateStore.setCurrentTemplate(item)
  await navigateTo({
    path: `/templates/${item.id}/pdf`,
  })
}
const deleteItem = (item) => {
  templateStore.setCurrentTemplate(item)
  dialogDelete.value = true
}
const deleteItemConfirm = () => {
  templateStore.deleteTemplate()
  closeDelete()
}
const closeDelete = () => {
  dialogDelete.value = false
}
onMounted(() => {
  templateStore.fetchMyTemplates()
})
onUnmounted(() => {
  templateStore.resetFeedback()
})
</script>
