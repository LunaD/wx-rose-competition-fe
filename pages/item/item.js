// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    works: []
  },
  showImgDetail(e) {
    wx.previewImage({
      urls: ["http://tiebapic.baidu.com/forum/pic/item/409dea004a90f603d80e8e062e12b31bb151edd2.jpg"],
      showmenu: true
    })
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