// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    works: []
  },
  goToItem(e){
    console.log(e)
    wx.navigateTo({
      url: '../item/item?id=' + e.currentTarget.id,
    })
  },
  onLoad() {
    this.setData({
      hrNode: [{
        name: 'hr',
        attrs: {
          style: 'line-height: 2px;'
        }
      }],
      works: [{
        competitor: "A",
        roseEntries: {
          name: "EarthAngle",
          url: "./img/EarthAngle/EarthAngle10.jpg"
        }
      }, {
        url: "./img/Novalis/Novalis1.jpg",
        roseName: "Novalis",
        competitor: "B"
      }, {
        url: "./img/Florentina/Florentina1.jpg",
        roseName: "Florentina",
        competitor: "C"
      }, {
        url: "./img/SunnySky/SunnySky1.jpg",
        roseName: "SunnySky",
        competitor: "D"
      }, {
        url: "./img/Rosanna/Rosanna1.jpg",
        roseName: "Rosanna",
        competitor: "E"
      }]
    })
  }
})