import { defineStore } from 'pinia'
import SubscriptionService from '~/services/subscriptionService'

const initialState = () => ({
  plans: [],
  loading: false,
  status: 0,
  error: null,
})

export const useSubscriptionStore = defineStore('subscriptionStore', {
  state: initialState,
  getters: {},
  actions: {
    async fetchPlans() {
      await handleAsyncAction(
        this,
        async () => {
          const service = new SubscriptionService()
          return await service.fetchPlans()
        },
        (response) => {
          this.plans = response.data
        },
      )
    },
  },
})
