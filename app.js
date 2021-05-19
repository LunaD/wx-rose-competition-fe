// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      success: res => {
        if(res.code) {
          this.globalData.userCode = res.code
          wx.request({
            url: 'http://192.168.1.7:8080/user',
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            data: {
              'code': res.code
            },
            success: res => {
              console.log("request success:" + JSON.stringify(res))
              this.userInfo = res
              // TODO: login成功跳转index页面
            },
            fail: res => {
              console.log("request fail")
            }
          })
        } else {
          console.log("login fail")
          // TODO: 获取不到openid的情况跳转错误页面
        }
      }
    })
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
    // wx.getUserProfile({
    //   lang: 'zh_CN',
    //   desc: '登录信息使用',
    //   success: res => {
    //     con
    //     console.log(res.userInfo)
    //   },
    //   fail: res => {
    //     console.log(res)
    //   }
    // }),
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
    userInfo: null,
    userCode: null
  }
})
