import Icon from '../components/Icon/Icon.vue'
import BaseTitle from '../components/BaseTitle/BaseTitle.vue'

const components = [
  Icon,
  BaseTitle
]

export default function useCustomElement (app) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}