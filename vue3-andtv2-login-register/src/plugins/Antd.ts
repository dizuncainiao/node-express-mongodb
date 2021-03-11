import App from '@/plugins/App'
import {
  Button,
  Divider,
  Layout,
  Space,
  Breadcrumb,
  Dropdown,
  Menu,
  Input,
  Form,
  Table,
  Avatar,
  message,
  notification,
  Modal,
  Spin
} from 'ant-design-vue'

notification.config({
  duration: 1
})

const globalProperties = App.config.globalProperties

globalProperties.$message = message
globalProperties.$notification = notification
globalProperties.$info = Modal.info
globalProperties.$success = Modal.success
globalProperties.$error = Modal.error
globalProperties.$warning = Modal.warning
globalProperties.$confirm = Modal.confirm
globalProperties.$destroyAll = Modal.destroyAll

App
  .use(Button)
  .use(Divider)
  .use(Layout)
  .use(Space)
  .use(Breadcrumb)
  .use(Dropdown)
  .use(Menu)
  .use(Input)
  .use(Form)
  .use(Table)
  .use(Avatar)
  .use(Modal)
  .use(Spin)
