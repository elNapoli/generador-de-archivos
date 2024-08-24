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
        <document-new-item-dialog
          :title="formTitle"
        />

        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this item?
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
                OK
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <v-btn
        class="me-2"
        icon="mdi:pencil"
        @click="editItem(item)"
      />
      <v-btn
        class="me-2"
        icon="mdi:delete"
        @click="deleteItem(item)"
      />
    </template>
    <template #no-data>
      <p>No hay atributos en el documento actual</p>
    </template>
  </v-data-table>
</template>

<script setup>
const dialog = ref(false)
const dialogDelete = ref(false)
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})
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

const editedIndex = ref(-1)

const editedItem = ref({
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
})

const defaultItem = {
  name: '',
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
}

const formTitle = computed(() => (editedIndex.value === -1 ? 'Agregar atributo' : 'Editar atributo'))

const editItem = (item) => {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = { ...item }
  dialog.value = true
}

const deleteItem = (item) => {
  editedIndex.value = desserts.value.indexOf(item)
  editedItem.value = { ...item }
  dialogDelete.value = true
}

const deleteItemConfirm = () => {
  desserts.value.splice(editedIndex.value, 1)
  closeDelete()
}

const close = () => {
  dialog.value = false
  nextTick(() => {
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
  })
}

const closeDelete = () => {
  dialogDelete.value = false
  nextTick(() => {
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
  })
}

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(desserts.value[editedIndex.value], editedItem.value)
  }
  else {
    desserts.value.push(editedItem.value)
  }
  close()
}

watch(dialog, (val) => {
  if (!val) close()
})

watch(dialogDelete, (val) => {
  if (!val) closeDelete()
})
</script>
