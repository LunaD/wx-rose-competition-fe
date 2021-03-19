// join.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    uploadedPhotoPaths: [],
    uploadedPhotos: []
  },

  chooseImage() {
    wx.chooseImage({
      success: (arg) => {
        var filePaths = this.data.uploadedPhotoPaths.concat(arg.tempFilePaths)
        var files = this.data.uploadedPhotos.concat(arg.tempFiles)
        this.data.uploadedPhotoPaths = filePaths
        this.data.uploadedPhotos = files

        this.setData({
          uploadedPhotoPaths:  filePaths
        })
        console.log(this.data)
      }
    })
  },

  previewImg: (e) => {
    console.log(this.data)
    wx.previewImage({
      current: this.data.uploadedPhotos[e.currentTarget.dataset.idx],
      urls: this.data.uploadedPhotos
    })
  },
  onLoad() {}
})