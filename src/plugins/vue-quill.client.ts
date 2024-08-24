// plugins/vue-quill.client.ts
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('quill-editor', QuillEditor)
})
