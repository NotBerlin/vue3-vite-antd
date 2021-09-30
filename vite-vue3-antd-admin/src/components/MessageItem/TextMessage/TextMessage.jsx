import classes from './textMessage.module.css'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: Boolean,
      default: false,
    },
    payload: {
      type: Object,
      default: () => { }
    }
  },
  setup (props) {
    if (props.to) {
      return () => (
        <div className={classes['left']}>
          <img src="/src/assets/images/portrait.jpeg" alt="" srcset="" />
          <div className={classes['left-content']}>
            <div className={classes['bubble-left']}>{props.payload.text}</div>
          </div>
        </div>
      )
    }
    return () => (
      <div className={classes['right']}>
        <img src="/src/assets/images/portrait.jpeg" alt="" srcset="" />
        <div className={classes['right-content']}>
          <div className={classes['bubble-right']}>{props.payload.text}</div>
        </div>
      </div>
    )
  }
})