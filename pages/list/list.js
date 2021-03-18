// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    competitors: [],
    hrNode: []
  },
  goToDetail(e){
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
          style: 'line-height: 2rpx;'
        }
      }],
      competitors: [{
        competitorId: "A",
        competitor: "person a",
        roseEntries: [{
          name: "EarthAngle",
          url: "./img/EarthAngle/EarthAngle10.jpg"
        }, {
          name: "Novalis",
          url: "./img/Novalis/Novalis1.jpg"
        }]
      }, {
        competitorId: "B",
        competitor: "person b",
        roseEntries: [{
          name: "Florentina",
          url: "./img/Florentina/Florentina1.jpg"
        }, {
          name: "SunnySky",
          url: "./img/SunnySky/SunnySky1.jpg"
        }]
      }, {
        competitorId: "C",
        competitor: "person c",
        roseEntries: [{
          name: "Rosanna",
          url: "./img/Rosanna/Rosanna1.jpg"
        }]
      }]
    })
  }
})