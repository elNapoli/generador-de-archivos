import 'vuetify/styles'
import type { IconSet, IconProps, IconAliases, ThemeDefinition } from 'vuetify'
import { createVuetify } from 'vuetify'
import { Icon } from '@iconify/vue'

const iconify: (set: string) => IconSet = set => ({
  component: (props: IconProps) =>
    h(Icon, {
      icon: `${set}:${props.icon}`,
      disabled: props.disabled,
    }),
})

// Colores para el proyecto
const myTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#0058A4',
    secondary: '#b0bec5',
    accent: '#A8B7C7',
    error: '#fe6565',
    success: '#69b32f',
    headerAux: '#0e68b2',
    cardBG: '#f8f9fa',
  },
}

// Iconos para vuetify
const aliases: IconAliases = {
  collapse: 'chevron-up',
  complete: 'check',
  cancel: 'close-circle',
  close: 'close',
  delete: 'close-circle',
  // delete (e.g. v-chip close)
  clear: 'close-circle',
  success: 'check-circle',
  info: 'information',
  warning: 'alert-circle',
  error: 'close-circle',
  prev: 'chevron-left',
  next: 'chevron-right',
  checkboxOn: 'checkbox-marked',
  checkboxOff: 'checkbox-blank-outline',
  checkboxIndeterminate: 'minus-box',
  delimiter: 'circle',
  // for carousel
  sortAsc: 'arrow-up',
  sortDesc: 'arrow-down',
  expand: 'chevron-down',
  menu: 'menu',
  subgroup: 'menu-down',
  dropdown: 'menu-down',
  radioOn: 'radiobox-marked',
  radioOff: 'radiobox-blank',
  edit: 'pencil',
  ratingEmpty: 'star-outline',
  ratingFull: 'star',
  ratingHalf: 'star-half-full',
  loading: 'cached',
  first: 'page-first',
  last: 'page-last',
  unfold: 'unfold-more-horizontal',
  file: 'paperclip',
  plus: 'plus',
  minus: 'minus',
  calendar: 'calendar',
  treeviewCollapse: 'menu-down',
  treeviewExpand: 'menu-right',
  eyeDropper: 'eyedropper',
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: false,
    theme: {
      defaultTheme: 'myTheme',
      themes: {
        myTheme,
      },
    },
    icons: {
      aliases,
      sets: {
        mdi: iconify('mdi'),
      },
    },
    defaults: {
      VTextField: { variant: 'outlined' },

    },
  })
  app.vueApp.use(vuetify)
})
