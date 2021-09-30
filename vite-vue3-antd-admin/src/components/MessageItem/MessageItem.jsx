import classes from './MessageItem.module.css'
import { defineComponent, markRaw } from 'vue'
import VideoCall from './VideoCall/VideoCall'
import TextMessage from './TextMessage/TextMessage'

export default defineComponent({
  props: {
    options: {
      type: Object,
      default: () => { }
    },
    userID: {
      type: String,
      default: ''
    }
  },
  components: {
    VideoCall,
    TextMessage
  },
  setup (props) {
    let from = props.options.from, payload = markRaw(props.options.payload)
    switch (props.options.type) {
      case "TIMCustomElem":
        let info = JSON.parse(payload.data)
        let infoData = JSON.parse(info.data)
        switch (infoData.businessID) {
          case "av_call":
            if (props.userID == from) {
              return () => (
                <div className={classes['message-item']}>
                  <VideoCall to={false} />
                </div>
              )
            }
            return () => (
              <div className={classes['message-item']}>
                <VideoCall to={true} />
              </div>
            )
          default:
            return
        }
      case "TIMTextElem":
        if (props.userID == from) {
          return () => (
            <div className={classes['message-item']}>
              <TextMessage to={false} payload={payload} />
            </div>
          )
        }
        return () => (
          <div className={classes['message-item']}>
            <TextMessage to={true} payload={payload} />
          </div>
        )
      default:
        return
    }
  }
})