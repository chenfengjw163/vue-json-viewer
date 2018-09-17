import JsonView from './json-viewer'

const install = Vue => {
  Vue.component('JsonViewer', JsonView)
}

export default Object.assign(JsonView, {install})
