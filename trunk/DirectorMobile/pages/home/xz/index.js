var network = require('../../../utils/network.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    index:0,
    model: {},
    year:2018
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var array = [];
    var year = new Date().getFullYear();
    for(var i=4; i>=0; i--){
      array.push(year-i);
    }
    this.setData({
      array: array,
      index: array.length-1,
      year: new Date().getFullYear()
    })
    this.getData();
  },

  getData: function() {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getXingZhengInfo', 
      {
        year: that.data.year,
        welfareCentreId: app.globalData.welfareCentreId 
      },
      function(res) {
        var model = res.Entity;
        that.setData({
          model:model
        })

      },
      function(msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

  bindChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      year: this.data.array[e.detail.value],
    })

    this.getData();

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})