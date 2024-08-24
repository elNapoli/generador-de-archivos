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
                v-model="localItem.name"
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
                v-model="localItem.type"
                :items="['String', 'Int']"
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
                v-model="localItem.required"
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
            color="primary"
            text="Save"
            variant="tonal"
            @click="saveItem"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:item', 'dialog:close'])

const localItem = ref({ ...props.item })

// Watch for changes in props.item and update localItem
watch(() => props.item, (newVal) => {
  localItem.value = { ...newVal }
})

const closeDialog = () => {
  emit('dialog:close', false)
}

const saveItem = () => {
  emit('update:item', localItem.value)
  closeDialog()
}
</script>
