<template>
  <v-data-table
    :headers="headers"
    :hide-default-footer="true"
    :items="data"
    :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <template #top>
      <v-toolbar>
        <v-toolbar-title>Atributos del documento</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-spacer />
        <v-btn
          v-if="templateId"
          class="text-none font-weight-regular mr-2"
          prepend-icon="bxs:file-pdf"
          text="PDF"
          variant="tonal"
          @click="createPdf"
        />
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi:folder-wrench"
          text="Agregar atributo"
          variant="tonal"
          @click="dialog=true"
        />
        <templates-new-item-dialog
          :item="currentAttribute.data"
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
              ¿Seguro que deseas eliminar este atributo?
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
</template>

<script setup>
import { number } from '~~/node_modules/@intlify/core-base/dist/core-base'

const dialog = ref(false)
const dialogDelete = ref(false)
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  templateId: {
    type: number,
    default: null,
  },
})
const templateStore = useTemplateStore()
const { currentAttribute } = storeToRefs(templateStore)
const headers = [
  {
    title: 'Nombre',
    align: 'start',
    key: 'name',
  },
  { title: 'Tipo', key: 'type' },
  { title: 'Requerido', key: 'required' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const formTitle = computed(() => (currentAttribute.data?.value.name === null ? 'Agregar atributo' : 'Editar atributo'))

const editItem = (item) => {
  templateStore.setCurrentAttribute(item)
  dialog.value = true
}
const getColor = (value) => {
  if (value) return 'green'
  else return 'red'
}

const deleteItem = (item) => {
  templateStore.setCurrentAttribute(item)
  dialogDelete.value = true
}
const deleteItemConfirm = () => {
  templateStore.deleteAttribute()
  closeDelete()
}

const closeDelete = () => {
  dialogDelete.value = false
}
const createPdf = async () => {
  await navigateTo({
    path: `/templates/${props.templateId}/pdf`,
  })
}
</script>
