// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Ignora estos directorios
  ignores: [
    'packages-legacy/**',
    'node_modules/**',
    '.nuxt/**',
    '.output/**',
  ],

  // Define todas las reglas en un solo objeto
  rules: {
    // Desactiva la regla que requiere nombres de componentes con múltiples palabras
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    // Permite modificadores en v-slot
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
  },
})
