// pages/update/index.js
var md5 = require('../../utils/md5.js');
var network = require('../../utils/network.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  update: function(e) {
    var newPassword = e.detail.value.newPassword;
    var confirmPassword = e.detail.value.confirmPassword;
    if (newPassword == "") {
      wx.showToast({
        title: '新密码不能为空',
        icon: "none"
      })
      return;
    }
    if (confirmPassword == "") {
      wx.showToast({
        title: '确认新密码不能为空',
        icon: "none"
      })
      return;
    }
    if (newPassword != confirmPassword) {
      wx.showToast({
        title: '两次密码不相同',
        icon: "none"
      })
      return;
    }
    var userInfo = wx.getStorageSync("userInfo");

    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/ModifyPassword', {
        userName: userInfo.userName,
        NewPassword: md5.md5(newPassword),
      },
      function(res) {
        wx.showToast({
          title: "密码修改成功",
          icon: "success",
          success: function() {
            wx.reLaunch({
              url: '../login/index',
              success: function() {
                wx.removeStorage({
                  key: 'userInfo'
                })
                app.globalData.welfareCentreId = "";
              }
            })
          }
        })
      },
      function(msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

})