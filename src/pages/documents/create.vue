<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <documents-form />
  </basic-container>
</template>

<script setup>
const templateStore = useTemplateStore()

onMounted(() => {
  templateStore.fetchMyTemplates()
})
</script>

<style>

</style>
