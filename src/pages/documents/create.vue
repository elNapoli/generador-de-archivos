<template lang="">
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <v-select
      label="Select"
      :items="templates"
      item-title="name"
      item-value="id"
    />
    {{ templates }}
  </basic-container>
</template>

<script setup>
const templateStore = useTemplateStore()
const { templates } = storeToRefs(templateStore)
onMounted(() => {
  templateStore.fetchMyTemplates()
})
</script>

<style lang="">

</style>
