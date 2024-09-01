<template>
  <div class="pa-4 text-center">
    <v-dialog
      :model-value="open"
      max-width="600"
      @update:model-value="closeDialog"
    >
      <v-card
        prepend-icon="mdi:folder-wrench"
        :title="title"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="currentAttribute.name"
                label="Nombre*"
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-select
                v-model="currentAttribute.type"
                :items="['Texto', 'Número', 'Fecha']"
                label="Tipo*"
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-checkbox
                v-model="currentAttribute.required"
                label="Obligatorio"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Close"
            variant="plain"
            @click="closeDialog"
          />

          <v-btn
            v-if="templateStore.editMode"
            color="primary"
            text="Editar"
            variant="tonal"
            @click="editAttribute"
          />
          <v-btn
            v-else
            color="primary"
            text="Guardar"
            variant="tonal"
            @click="attachAttributesFromTemplate"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})
const templateStore = useTemplateStore()

const { currentAttribute } = storeToRefs(templateStore)

const emit = defineEmits(['dialog:close'])

const closeDialog = () => {
  emit('dialog:close', false)
}

const attachAttributesFromTemplate = () => {
  templateStore.attachAttributesFromTemplate(currentAttribute.value)
  closeDialog()
}
const editAttribute = () => {
  templateStore.attachAttributeToTemplate()
  closeDialog()
}
</script>
