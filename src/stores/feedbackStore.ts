import { defineStore } from 'pinia';

export enum FeedbackState {
  NOT_STARTED = 'not_started',
  ERROR = 'error',
  SUCCESS = 'success',
  LOADING = 'loading'
}


export const useFeedbackStore = defineStore('feedbackStore', {
  state: () => ({
    status: FeedbackState.NOT_STARTED,
    message: '',
  }),
  actions: {
    setLoading() {
      this.status = FeedbackState.LOADING
    },
    isLoading(): boolean {
      return this.status === FeedbackState.LOADING;
    },
    isError(): boolean {
      return this.status === FeedbackState.ERROR;
    },
    isSuccess(): boolean {
      return this.status === FeedbackState.SUCCESS;
    },
    setError(message: string) {
      this.status = FeedbackState.ERROR
      this.message = message;
    },
    setSuccess(message: string) {
      this.status = FeedbackState.SUCCESS
      this.message = message;
    },
    resetState() {
      this.status = FeedbackState.NOT_STARTED;
      this.message = '';
    },
  },
});
