// Definición de items estáticos
const home = (disabled) => {
  return {
    title: 'home',
    disabled: disabled,
    to: '/',
  }
}

const template = (disabled) => {
  return {
    title: 'Plantillas',
    disabled: disabled,
    to: '/templates',
  }
}
const documents = (disabled) => {
  return {
    title: 'Formularios',
    disabled: disabled,
    to: '/documents',
  }
}
const subscription = (disabled) => {
  return {
    title: 'Planes',
    disabled: disabled,
    to: '/subscriptions',
  }
}

// Función para generar un breadcrumb dinámico basado en el ID del template
function generateTemplateBreadcrumb(id, disabled: boolean) {
  return {
    title: `${id}`,
    disabled: disabled,
    to: `/templates/${id}`,
  }
}

function generateDocumentBreadcrumb(id, disabled: boolean) {
  return {
    title: `${id}`,
    disabled: disabled,
    to: `/documents/${id}`,
  }
}

// Configuración de breadcrumbs
export const breadcrumbsConfig = {
  '/templates/create': [home(false), template(false), {
    title: 'Crear',
    disabled: true,
  }],
  '/templates': [home(false), template(true)],
  '/templates/:id': params => [home(false), template(false), generateTemplateBreadcrumb(params.id, true)],
  '/templates/:id/pdf': params => [home(false), template(false), generateTemplateBreadcrumb(params.id, false), {
    title: 'pdf',
    disabled: true,
  }],
  '/': [home(true)],
  '/documents/create': [home(false), documents(false), {
    title: 'Crear',
    disabled: true,
  }],
  '/subscriptions': [home(false), {
    title: 'Planes',
    disabled: true,
  }],
  '/subscriptions/:id': params => [home(false), subscription(false), generateTemplateBreadcrumb(params.id, true)],
  '/documents': [home(false), documents(true)],
  '/documents/:id': params => [home(false), documents(false), generateDocumentBreadcrumb(params.id, true)],
}
