import App from '@/plugins/App'
import router from './router'
import store from './store'
import '@/plugins/Antd'
import vueDzUi from '@/components/vue3-dz-ui/lib'
import '@/assets/css/common.less'

App.use(store).use(router).use(vueDzUi).mount('#app')
