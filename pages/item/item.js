// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    works: []
  },
  onLoad(q) {
    console.log(q)
    this.setData({
      picList: [
        "./img/" + q.id +"/" + q.id + "2.jpg",
        "./img/" + q.id +"/" + q.id + "9.jpg"
      ]
    })
  }
})