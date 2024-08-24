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
export const breadcrumbsConfig = {
  '/templates/create': [home, template, {
    title: 'Crear',
    disabled: true,
  }],
  '/templates': [home, {
    title: 'Plantillas',
    disabled: true,
  }],
  '/templates/:id': params => [home, template, {
    title: `${params.id}`,
    disabled: true,
  }],
  '/': [{
    title: 'Home',
    disabled: true,
  }],
}
