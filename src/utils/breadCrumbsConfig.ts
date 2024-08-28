// Definición de items estáticos
const home = {
  title: 'Home',
  disabled: false,
  to: '/',
}

const template = {
  title: 'Plantillas',
  disabled: false,
  to: '/templates',
}
const documents = {
  title: 'Formularios',
  disabled: false,
  to: '/documents',
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
  '/templates/create': [home, template, {
    title: 'Crear',
    disabled: true,
  }],
  '/templates': [home, {
    title: 'Plantillas',
    disabled: true,
  }],
  '/templates/:id': params => [home, template, generateTemplateBreadcrumb(params.id, true)],
  '/templates/:id/pdf': params => [home, template, generateTemplateBreadcrumb(params.id, false), {
    title: 'pdf',
    disabled: true,
  }],
  '/': [{
    title: 'Home',
    disabled: true,
  }],
  '/documents/create': [home, documents, {
    title: 'Crear',
    disabled: true,
  }],
  '/documents': [home, {
    title: 'Formularios',
    disabled: true,
  }],
  '/documents/:id': params => [home, documents, generateDocumentBreadcrumb(params.id, true)],
}
