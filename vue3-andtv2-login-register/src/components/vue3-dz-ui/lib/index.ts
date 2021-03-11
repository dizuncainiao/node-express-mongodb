import { App } from 'vue'
import DInput from './d-input/DInput.vue'
import DInputJSX from './d-input-jsx'
import DTable from './d-table/DTable.vue'

const components = [DInput, DInputJSX, DTable]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

export default install
