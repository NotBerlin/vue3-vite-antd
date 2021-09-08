# TRTCCalling 生命周期

### createSuccessed
在父组件中创建，可以在父组件中直接处理，所以子组件不会调用该事件

### loginSuccessed
在父组件登录，可以在父组件中直接处理，所以子组件不会调用该事件

### callSuccessed
在父组件拨打，可以在父组件中直接处理，所以子组件不会调用该事件

### acceptSuccessed
在子组件中会返回，使用方法处理用户接受邀请进行通话后的事件
```js
<video-popup :acceptSuccessed="xxx"/>
```

### hanguped
在子组件中会返回，使用方法处理用户挂断电话后的事件
```js
<video-popup :hanguped="xxx"/>
```

# TRTCCalling 触发器

### join
当触发进入房间通话的事件，使用join事件接收emit
使用方式
```js
<video-popup @join="join"/>
```

### leave
当触发进入房间通话的事件，使用leave事件接收emit
使用方式
```js
<video-popup @leave="leave"/>
```