const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var item = JSON.parse(decodeURIComponent(options.info));
    item.AOverview = item.AOverview.replace(/\img/g,'img style="max-width:100%;height:auto"');
    //item.AOverview = item.AOverview.replace(/(src=")/g, '$1' + app.globalData.requestUrl);
    item.AOverview = item.AOverview.replace(/(<img .*?src=")/g, '$1' + app.globalData.baseUrl)
    this.setData({
      item: item
    })
  },

})