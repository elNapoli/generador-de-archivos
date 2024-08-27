import type ErrorUI from '~/models/domain /ErrorUI'

export default interface BaseUI<T> {
  status: number
  data: T
  error?: ErrorUI
  description?: string
}
