import Icon from '../components/Icon/Icon.vue'

const components = [
  Icon
]

export default function useCustomElement (app) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}