import { defineComponent } from "@vue/runtime-core"
import { reactive } from 'vue'
import classes from './User.module.css'
import useInstance from '../../mixins/instance'

export default defineComponent({
  name: 'user',
  setup () {
    let state = reactive({
      form: {
        name: '陈陈陈'
      },
    })

    let rules = [
      {}
    ]

    let { $_close } = useInstance()
    return () => (
      <div id="user">
        <div className={classes['user-page']}>
          <div className={classes['left-image']}>
            <img src="/src/assets/images/portrait.jpeg" alt="" srcset="" />
          </div>
          <div className={classes['right-detail']}>
            <el-form label-position="right" label-width="80px" v-model={state.form} rules={rules} ref="ruleForm">
              <el-form-item label="用户名：" prop="account">
                {state.form.name}
              </el-form-item>
              <el-form-item label="账号：" prop="account">
                <el-input v-model={state.form.account}></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <el-input v-model={state.form.password}></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" onClick="login">保存</el-button>
                <el-button onClick={$_close}>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    )
  }
})