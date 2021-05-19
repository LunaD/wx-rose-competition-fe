// join.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    potPhotoPaths: [],
    potPhotos: [],
    potPhotoIds: [],
    earthPhotoPaths: [],
    earthPhotos: [],
    earthPhotoIds: []
  },

  /* choosePotImg() {
    wx.chooseImage({
      success: (arg) => {
        let filePaths = this.data.potPhotoPaths.concat(arg.tempFilePaths)
        let files = this.data.potPhotos.concat(arg.tempFiles)
        this.data.potPhotoPaths = filePaths
        this.data.potPhotos = files

        this.setData({
          potPhotoPaths:  filePaths
        })
        console.log(this.data)
      }
    })
  }, */

  choosePotImg() {
    wx.chooseImage({
      success: (arg) => {
        if(!arg.tempFilePaths || arg.tempFilePaths.length < 1) {
          return
        }
        console.log(arg)

        arg.tempFilePaths.forEach((v, i) => {
          console.log(v + "," + i)
          wx.uploadFile({
            filePath: v,
            name: 'file',
            url: 'http://192.168.1.7:8080/attachment',
            success: res => {
              console.log(res.data)
              let filePaths = this.data.potPhotoPaths.concat(v)
              let files = this.data.potPhotos.concat(arg.tempFiles[i])
              let fileIds = this.data.potPhotoIds.concat(JSON.parse(res.data).payload)
              this.data.potPhotoPaths = filePaths
              this.data.potPhotos = files
              this.data.potPhotoIds = fileIds
  
              this.setData({
                potPhotoPaths: filePaths,
                potPhotoIds: fileIds
              })
              console.log(this.data)
            },
            fail: res => {
              console.log("upload fail")
              console.log(res)
            }
          })
        })
    }
  })
},
  chooseEarthImg() {
      wx.chooseImage({
        success: (arg) => {
          if(!arg.tempFilePaths || arg.tempFilePaths.length < 1) {
            return
          }
          console.log(arg)

          arg.tempFilePaths.forEach((v, i) => {
            console.log(v + "," + i)
            wx.uploadFile({
              filePath: v,
              name: 'file',
              url: 'http://192.168.1.7:8080/attachment',
              success: res => {
                let filePaths = this.data.earthPhotoPaths.concat(v)
                let files = this.data.earthPhotos.concat(arg.tempFiles[i])
                let fileIds = this.data.earthPhotoIds.concat(JSON.parse(res.data).payload)
                this.data.earthPhotoPaths = filePaths
                this.data.earthPhotos = files
                this.data.earthPhotoIds = fileIds
    
                this.setData({
                  earthPhotoPaths: filePaths,
                  earthPhotoIds: fileIds
                })
                console.log(this.data)
              },
              fail: res => {
                console.log("upload fail")
                console.log(res)
              }
            })
          })
      }
    })
  },

  previewPotImg(e) {
    console.log(e.currentTarget.dataset)
    wx.previewImage({
      current: this.data.potPhotoPaths[e.currentTarget.dataset.idx],
      urls: this.data.potPhotoPaths
    })
  },
  previewEarthImg(e) {
    console.log(this.data)
    wx.previewImage({
      current: this.data.earthPhotoPaths[e.currentTarget.dataset.idx],
      urls: this.data.earthPhotoPaths
    })
  },

  delPotImg(e) {
    console.log(this.data)
    wx.request({
      url: 'http://192.168.1.7:8080/attachment/' + e.currentTarget.dataset.id,
      method: 'DELETE',
      success: res => {
        let photoPaths = this.data.potPhotoPaths
        let photo = this.data.potPhotos
        photoPaths.splice(e.currentTarget.dataset.idx, 1)
        photo.splice(e.currentTarget.dataset.idx, 1)
        this.setData({
          potPhotoPaths: photoPaths,
          potPhotos: photo
        })
        console.log(this.data)
      },
      fail: res => {
        console.log('Delete file fail.')
        console.log(res)
      }
    })
  },
  delEarthImg(e) {
    console.log(this.data)
    wx.request({
      url: 'http://192.168.1.7:8080/attachment/' + e.currentTarget.dataset.id,
      method: 'DELETE',
      success: res => {
        let photoPaths = this.data.earthPhotoPaths
        let photo = this.data.earthPhotos
        photoPaths.splice(e.currentTarget.dataset.idx, 1)
        photo.splice(e.currentTarget.dataset.idx, 1)
        this.setData({
          earthPhotoPaths: photoPaths,
          earthPhotos: photo
        })
        console.log(this.data)
      },
      fail: res => {
        console.log('Delete file fail.')
        console.log(res)
      }
    })
  },
  /* delEarthImg(e) {
    console.log(this.data)
    let photoPaths = this.data.earthPhotoPaths
    let photo = this.data.earthPhotos
    photoPaths.splice(e.currentTarget.dataset.idx, 1)
    photo.splice(e.currentTarget.dataset.idx, 1)
    this.setData({
      earthPhotoPaths: photoPaths,
      earthPhotos: photo
    })
    console.log(this.data)
  }, */

  joinCompetition() {
    wx.request({
      url: 'http://192.168.100.59:8080/competition',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'name': '尘世天使'
      },
      success: res => {
        console.log("request success")
        this.userInfo = res
        // TODO: login成功跳转index页面
      },
      fail: res => {
        console.log("request fail")
      }
    })
  },

  onLoad() {}
})