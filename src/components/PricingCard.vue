<template>
  <v-card
    :color="plan.description.main? 'primary':'white'"
    align="center"
    width="300"
    :height="plan.description.main?550:500"
  >
    <template #title>
      <v-icon
        size="70"
        :class="plan.description.main? 'my-6':'my-4'"
        :icon="plan.description.main?'mdi:lightning-bolt-outline':'mdi:shield-check-outline'"
      />
      <v-row
        align="center"
      >
        <v-col>
          <span>{{ plan.price }}</span><span
            v-if="plan.duration"
            class="text-caption"
          >/{{ plan.duration }}</span>
        </v-col>
      </v-row>
    </template>
    <template #subtitle>
      <h1>{{ plan.name }}</h1>
    </template>

    <v-card-text class="pt-4">
      <div>
        <v-row
          align="center"
          class="d-flex align-start flex-column mb-6"
          height="285"
        >
          <v-sheet
            :color="plan.description.main? 'primary':'white'"
            class="d-flex align-center flex-column"
            height="285"
          >
            <v-list :bg-color="plan.description.main? 'primary':'white'">
              <v-list-item
                v-for="item in plan.description.features"
                :key="item"
                :title="item"
              />
            </v-list>
            <v-btn
              :color="plan.description.main? 'white':'primary'"
              class="mt-auto"
              @click="$emit('click', plan.id)"
            >
              comenzar
            </v-btn>
          </v-sheet>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  plan: {
    type: Object,
    required: true,
  },
})
defineEmits(['click'])
</script>

<style>

</style>
