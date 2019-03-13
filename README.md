###  PWA解决了什么问题？
```
    1.不能离线使用，每次都加载资源，用户体验不好
    2.不能在桌面保留入口，用户粘度低
    3.不能接受推送消息
```

###  PWA用到了哪些API或者技术栈？
```
    1.Web App Manifest: 将webapp添加到桌面，类似原生app图标的作用
    2.serviceWorker: 提供了弱网下的离线缓存机制和与页面的通信(postmessage)机制
      Service Worker有一个非常重要的特性：你可以在Service Worker中监听所有客户端（Web）发出的请求，然后通过Service Worker来代理，向后端服务发起请求。通过监听用户请求信息，Service Worker可以决定是否使用缓存来作为Web请求的返回。
    3.Notification API:使用Notification API来进行消息提醒
      Push API: 使用Push API 来进行消息推送
    4.
```

###  这个项目能学会什么？？
```
    1.从service-worker开始学习，了解API 
    2.初步了解下workbox的使用
```

### 操作流程
```
    1.先爬到图片路径，写入data.json
    2.起一个express服务
    3.发一个请求将图片都添加到页面
    4.利用manifinest将应用放到桌面上
    5.在index.html中注册serviceWorker
    这样就能使用桌面图标了
    6.serviceWorker在的代码流程在代码中又体现，如果是要查看缓存效果的话，在network中点击offline关闭网络，刷新，在network中查看all，可以看出缓存来自与两部份，serviceWorker和catche
```

### 注意点

```
manifinest:
     1.manifinest的兼容性（ios 和 window）
     2.manifinest的常用四个属性
     3.manifinest的icon的size大小限制
     4.manifinest能脱离serviceWorker使用吗

serviceWorker:
     5.不能访问/操作dom,全局对象是self，没有window
     6.会自动休眠，不会随浏览器关闭而失效（必须手动卸载）
     7.https和locahost下可用
     8.所有api都是基于promise
     9.离线缓存内容开发者可控
     10.在所有元素加载完成之后注册，保证缓存完整内容

```
