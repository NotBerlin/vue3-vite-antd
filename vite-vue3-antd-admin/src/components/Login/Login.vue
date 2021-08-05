<template>
  <div id="Login">
    <div class="seazi-a-seat"></div>
    <div class="seazi-a-seat"></div>
    <div class="seazi-a-seat"></div>
    <div class="login-iframe">
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="账号：">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">Login</el-button>
    </div>
    <div class="seazi-a-seat"></div>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots, toRefs, ref } from 'vue'
import useInstance from '../../mixins/instance'
import { getUuid } from '../../utils/consts'

const { $bus, $route, $router, $store } = useInstance()

const form = reactive({
  account: '',
  password: ''
})

function login () {
  const arr = [
    {
      name: '导航1',
      id: getUuid('nav-'),
      groups: [
        {
          name: '分组1',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            }
          ]
        },
        {
          name: '分组2',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            },
            {
              name: '选项2',
              id: getUuid('section-'),
              path: '/nav1/group1/section2'
            }
          ]
        },
        {
          name: '分组3',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            },
            {
              name: '选项2',
              id: getUuid('section-'),
              path: '/nav1/group1/section2'
            }
          ]
        }
      ]
    },
    {
      name: '导航1',
      id: getUuid('nav-'),
      groups: [
        {
          name: '分组1',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            }
          ]
        },
        {
          name: '分组2',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            },
            {
              name: '选项2',
              id: getUuid('section-'),
              path: '/nav1/group1/section2'
            }
          ]
        },
        {
          name: '分组3',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            },
            {
              name: '选项2',
              id: getUuid('section-'),
              path: '/nav1/group1/section2'
            }
          ]
        }
      ]
    },
    {
      name: '导航1',
      id: getUuid('nav-'),
      groups: [
        {
          name: '分组1',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            }
          ]
        },
        {
          name: '分组2',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            },
            {
              name: '选项2',
              id: getUuid('section-'),
              path: '/nav1/group1/section2'
            }
          ]
        },
        {
          name: '分组3',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            },
            {
              name: '选项2',
              id: getUuid('section-'),
              path: '/nav1/group1/section2'
            }
          ]
        }
      ]
    },
    {
      name: '导航1',
      id: getUuid('nav-'),
      groups: [
        {
          name: '分组1',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            }
          ]
        },
        {
          name: '分组2',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            },
            {
              name: '选项2',
              id: getUuid('section-'),
              path: '/nav1/group1/section2'
            }
          ]
        },
        {
          name: '分组3',
          id: getUuid('group-'),
          sections: [
            {
              name: '选项1',
              id: getUuid('section-'),
              path: '/nav1/group1/section1'
            },
            {
              name: '选项2',
              id: getUuid('section-'),
              path: '/nav1/group1/section2'
            }
          ]
        }
      ]
    }
  ]

  $store.commit('route/SET_ROUTES', arr)
  $router.push({
    path: '/home'
  })
}

</script>
<style>
#Login {
  position: relative;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, #03a9f4, #8bc34a, #ffc107);
  overflow: auto;
  display: flex;
  align-items: center;
}

.seazi-a-seat {
  flex: 1;
}

.login-iframe {
  height: 450px;
  width: 320px;
  border-radius: 8px;
  box-shadow: 0 2px 3px;
  padding: 26px 13px;
}

.login-iframe > button {
  width: 100%;
}
</style>