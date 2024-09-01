<template>
  <basic-container>
    <template #breadcrumbs>
      <Breadcrumb />
    </template>
    <v-row
      align="center"
      justify="center"
    >
      <pricing-card
        v-for="d in plans"
        :key="d.id"
        :plan="d"
        @click="navigate($event)"
      />
    </v-row>
  </basic-container>
</template>

<script setup>
const subscriptionStore = useSubscriptionStore()
const { plans } = storeToRefs(subscriptionStore)
const navigate = async (id) => {
  await navigateTo(`subscriptions/${id}`)
}
onMounted(async () => {
  await subscriptionStore.fetchPlans()
})
</script>

<style>

</style>
