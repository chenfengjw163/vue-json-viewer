import JsonView from './json-viewer'

const install = app => {
  app.component('JsonViewer', JsonView)
}

export default Object.assign(JsonView, { install })
