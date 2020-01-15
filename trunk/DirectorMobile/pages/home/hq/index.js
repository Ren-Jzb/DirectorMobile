var network = require('../../../utils/network.js');
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // date: "2018.10.08",
    hqList: [],
    model:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   date: util.formatDate(new Date())
    // })
    this.getHouQinInfo();
    this.getHouQinWeekWecipeInfo();
  },

  getHouQinInfo: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getHouQinInfo',
      {
        welfareCentreId: app.globalData.welfareCentreId 
      },
      function (res) {
        that.setData({
          hqList: res.Data
        })
      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

  getHouQinWeekWecipeInfo: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getHouQinWeekWecipeInfo',
      {
        welfareCentreId: app.globalData.welfareCentreId 
      },
      function (res) {
        that.setData({
          model: res.Entity
        })
      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})