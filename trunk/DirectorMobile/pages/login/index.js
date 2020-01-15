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
  onLoad: function(options) {

  },

  login: function(e) {
    var name = e.detail.value.username;
    var password = e.detail.value.password;
    if (name == "") {
      wx.showToast({
        title: '用户名不能为空',
        icon: "none"
      })
      return;
    }
    if (password == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: "none"
      })
      return;
    }

    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/Login',
      {
        userName: name,
        userPwd: md5.md5(password)
      },
      function (res) {
        var model = res.Entity;

        wx.setStorageSync('userInfo', model);
        wx.switchTab({
          url: '../index/index'
        })

      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });

  },
})