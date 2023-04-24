import { createApp } from "vue"
import stores from "@stores/index"

import App from "./App.vue"
import router from "./router"

import "@assets/styles/index.scss"

const app = createApp(App)

app.use(stores)
app.use(router)

app.mount("#app")
