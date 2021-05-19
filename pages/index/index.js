// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    showMask: true,
    animationData: {},
    // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  // 事件处理函数
  bindViewTap() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  goToListPage() {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  goToJoinPage() {
    wx.navigateTo({
      url: '../join/join'
    })
  },

  onLoad() {
    app.myLogin = () => {
      wx.login({
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        success: loginRes => {
          console.log("login")
          console.log(loginRes)
          if (!loginRes.code) {
            console.log("login fail")
            // TODO: 获取不到openid的情况跳转错误页面
            return
          }

          wx.request({
            url: 'http://192.168.1.7:8080/user',
            method: 'POST',
            header: {'content-type': 'application/json'},
            data: {
              'code': loginRes.code
            },
            success: userRes => {
              console.log("response data: " + userRes)
              if (!userRes || userRes.data.code != 200) {
                console.log("Get EMPTY userOpenId through userCode. userCode: " + userRes.code)
                return
              }
              app.globalData.userCode = userRes.data.code
              app.globalData.userOpenId = userRes.data.payload

              // clean mask
              var animation = wx.createAnimation({
                duration: 800
              })
              this.animation = animation
              this.setData({
                animationData: animation.opacity(0).step().export()
              })
              this.data.showMask = false
              let myTimeout = setTimeout(() => {
                this.setData({
                  showMask: false
                })
                clearTimeout(myTimeout)
              }, 800)
            },
            fail: userRes => {
              console.log("Get userOpenId through userCode Failed. PATH: [/user]")
            }
          })
        },
        fail: loginRes => {
          console.log("Fail [weixin.login.]")
          console.log(res)
        }
      })
    }
    app.myLogin()

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    this.setData({
      hasUserInfo: true
    })
  },



  /* *************** useless function ***************** */
  myCallback(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
