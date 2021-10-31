import { createApp, h } from 'vue'
import JsonViewer from '../lib'
import App from './App.vue'

const app = createApp({
  render() {
    return h(App)
  }
})

app.use(JsonViewer)

app.mount("#app")
