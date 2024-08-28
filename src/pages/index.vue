<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    {{ supabaseUser.email }}
  </basic-container>
</template>

<script setup>
const supabaseUser = useSupabaseUser()
</script>

<style>

</style>
