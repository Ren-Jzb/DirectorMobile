// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        var userInfo = res.data;
        that.setData({
          username: userInfo.realName
        });
      },
    })

  },

  updatePwd: function () {
    wx.navigateTo({
      url: '../update/index',
    })
  },

  logout: function () {
    wx.reLaunch({
      url: '../login/index',
      success: function () {
        wx.removeStorage({
          key: 'userInfo'
        })
        app.globalData.welfareCentreId = "";
      }
    })
  }

})