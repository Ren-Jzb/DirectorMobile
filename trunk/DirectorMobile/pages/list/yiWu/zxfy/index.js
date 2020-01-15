var network = require('../../../../utils/network.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    pageSize: 20,
    hasMore: true,
    showLoading: true,
    dataList: [],
    imageUrl: app.globalData.baseUrl + "/upload/ZxfyCns/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  getData: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/SearchListByZxfyCns', {
        currentPage: that.data.currentPage,
        pageSize: that.data.pageSize,
        welfareCentreId: app.globalData.welfareCentreId,
        IsValid: 1   
      },
      function (res) {

        var list = that.data.dataList;
        // console.log(JSON.stringify(res))
        if (that.data.currentPage == 1) {
          list = [];
        }
        if (that.data.currentPage < res.PageCount) { //有更多数据
          that.setData({
            dataList: list.concat(res.Data),
            hasMore: true
          })
        } else {
          that.setData({
            dataList: list.concat(res.Data),
            hasMore: false,
          })
        }

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
    var that = this;
    this.setData({
      currentPage: 1,
      showLoading: true
    });
    setTimeout(function () {
      wx.stopPullDownRefresh() //停止下拉刷新
      that.getData();
    }, 3000);
  },

  /**
   * 上拉加载
   */
  searchScrollLower: function () {
    this.setData({
      currentPage: ++this.data.currentPage,
      showLoading: false
    })
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})