<template>
  <v-breadcrumbs
    :items="breadcrumbs"
    divider="-"
  >
    <template #divider>
      <v-icon icon="mdi:forward" />
    </template>
  </v-breadcrumbs>
</template>

<script setup>
const route = useRoute()

const getBreadcrumbs = (path, params) => {
  // Recorre los patrones definidos en breadcrumbsConfig
  for (const [pattern, breadcrumbItems] of Object.entries(breadcrumbsConfig)) {
    const patternMatches = matchRoute(path, pattern)
    if (patternMatches) {
      if (typeof breadcrumbItems === 'function') {
        // Si breadcrumbItems es una función, llamarla con params
        return breadcrumbItems(params)
      }
      else {
        // Caso normal, devuelve los breadcrumbs
        return breadcrumbItems
      }
    }
  }
  return []
}

// Función para manejar rutas dinámicas
const matchRoute = (path, pattern) => {
  const regex = new RegExp(
    '^' + pattern.replace(/:[^\s/]+/g, '[^/]+') + '$',
  )
  return regex.test(path)
}

const breadcrumbs = computed(() => getBreadcrumbs(route.path, route.params))
</script>
