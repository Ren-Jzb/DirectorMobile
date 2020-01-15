var network = require('../../../utils/network.js');
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"2018.10.08",
    model: {},
    ywList:[],
    ywUserList:[],
    tag:0,
    title:'',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: util.formatDate(new Date())
    })
    this.getCustomerInfo();
    this.getYeWuInfo();
    this.getYeWuUserInfo();
  },

  getCustomerInfo: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getYeWuCustomerInfo',
      {
        welfareCentreId: app.globalData.welfareCentreId 
      },
      function (res) {
        var model = res.Entity;
        that.setData({
          model: model
        })

      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

  getYeWuInfo: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getYeWuInfo',
      {
        welfareCentreId: app.globalData.welfareCentreId
      },
      function (res) {
        that.setData({
          ywList: res.Data
        })
      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

  getYeWuUserInfo: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getYeWuUserInfo',
      {
        welfareCentreId: app.globalData.welfareCentreId
      },
      function (res) {
        that.setData({
          ywUserList: res.Data,
          title: res.Data[0].userType,
          list: res.Data[0].dataList
        })
      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

  checkTag:function(e){
    var tag = e.currentTarget.dataset.tag;
    this.setData({
      tag:tag,
      title: this.data.ywUserList[tag].userType,
      list: this.data.ywUserList[tag].dataList
    })
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