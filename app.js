// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录以前是在这里的，现在搬家去 index.js 了

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("getSetting")
        console.log(res)
        // if (res.authSetting['scope.userInfo']) {
        //   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //   wx.getUserInfo({
        //     success: res => {
        //       // 可以将 res 发送给后台解码出 unionId
        //       this.globalData.userInfo = res.userInfo

        //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //       // 所以此处加入 callback 以防止这种情况
        //       if (this.userInfoReadyCallback) {
        //         this.userInfoReadyCallback(res)
        //       }
        //     }
        //   })
        // }
      }
    }),

    /* wx.getUserProfile({
      lang: 'zh_CN',
      desc: '登录信息使用',
      success: res => {
        con
        console.log(res.userInfo)
      },
      fail: res => {
        console.log(res)
      }
    }), */

    wx.authorize({
      scope: 'scope.userInfo',
      success: res => {
        console.log("authorize.success")
      },
      fail: res => {
        console.log("authorize.fail")
        console.log(res)
      }
    })
  },

  

  globalData: {
    userCode: null,
    userOpenId: null,
    userInfo: null
  }
})
