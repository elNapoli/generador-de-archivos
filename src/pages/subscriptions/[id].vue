<template>
  <v-container
    fluid
    class="fill-height pa-0"
  >
    <v-row class="fill-height">
      <v-spacer />
      <v-col cols="5">
        <Breadcrumb />
        <p class="text-h5">
          Información de pago
        </p>
        <p class="text-body-1 mb-10 mt-3">
          Todas las transacciones son seguras y encriptadas
        </p>
        <v-expansion-panels v-model="selected">
          <v-expansion-panel
            v-for="i in 3"
            :key="i"
            :mandatory="true"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            title="Item"
          />
        </v-expansion-panels>
      </v-col>
      <v-col
        class="bg-primary"

        cols="4"
      >
        <h1>Plan Expert</h1>
        <p>Suscripción anual para 1 estudiante</p>
        <v-row no-gutters>
          <v-col>
            <p>Total a pagar</p>
            <p>Precio por mes $ 16.659</p>
          </v-col>
          <v-col class="text-end">
            <p>$ 199.900/año</p>
          </v-col>
        </v-row>
        <v-divider color="white" />
        <v-row no-gutters>
          <v-list bg-color="primary">
            <v-list-subheader>Lo que obtienes con el plan</v-list-subheader>
            <v-list-item
              title="item"
            >
              <template #prepend>
                <v-icon icon="mdi:check" />
              </template>
            </v-list-item>
            <v-list-item
              title="item"
            >
              <template #prepend>
                <v-icon icon="mdi:check" />
              </template>
            </v-list-item>
            <v-list-item
              title="item"
            >
              <template #prepend>
                <v-icon icon="mdi:check" />
              </template>
            </v-list-item>
            <v-list-item
              title="item"
            >
              <template #prepend>
                <v-icon icon="mdi:check" />
              </template>
            </v-list-item>
          </v-list>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const selected = ref(0)
</script>

<style scoped>
.v-expansion-panels {
  max-width: 500px
}
</style>
