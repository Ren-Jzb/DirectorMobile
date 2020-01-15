import * as echarts from '../../../ec-canvas/echarts';
var network = require('../../../utils/network.js');
const app = getApp();

function getOption(arrays) {
  var option = {
    title: {
      text: "本月护理情况",
      left: '40%',
      textStyle: {
        align: "center",
        color: "#7b7b7b",
        fontSize: 16
      }
    },
    backgroundColor: "#f8fbfb",
    color: ['#7cb5ec', '#ce7bff', '#f7a35c', '#f15c80', '#8085e9', '#e2cb61', '#ccccff', '#b9e95a', '#68e4a3'],
    legend: {
      orient: 'vertical',
      textStyle: { //图例文字的样式
        color: '#838484',
        fontSize: 10
      },
      top: 'center',
      right: 0,
    },
    series: [{
      label: {
        normal: {
          fontSize: 10,
          formatter: '{c}' + '次'
        }
      },
      type: 'pie',
      center: ['40%', '55%'],
      radius: [0, '60%'],
      data: arrays,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
  return option;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorId:"",
    floorName:"",
    array: [],
    index: 0,
    model:{},
    model2:{},
    ecPie: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFloorList();
  },

  getFloorList: function () {
    var that = this;
    network.requestPost(
      false,
      app.globalData.baseUrl + '/YzMobile/getFloorList',
      {
        welfareCentreId: app.globalData.welfareCentreId
      },
      function (res) {
        var responseList = res.Data == null ? new Array() : res.Data;
        that.setData({
          array: responseList,
          floorId: responseList[0].floorId,
          floorName: responseList[0].floorName,
        })
        that.getPieData();
        that.getHuLiHgInfo();
        that.getHuLiHgHuLiLiangInfo();
      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

  getPieData: function () {
    var that = this;
    // console.log(that.data.floorId)
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getHuLiHgNursList', 
      {
        floorId:that.data.floorId,
        welfareCentreId: app.globalData.welfareCentreId
      },
      function (res) {
        var responseList = res.Data == null ? new Array() : res.Data;
        // console.log(JSON.stringify(responseList))
        var arrays = [];
        for (var i = 0; i < responseList.length; i++) {
          var model = responseList[i];
          arrays.push({
            value: model.TypeNumber,
            name: model.TypeName
          })
        }

        that.initCharts(arrays);
        // setTimeout(function () {
        //   pieChart.setOption({
        //     series: [{
        //       data: arrays,
        //     }]
        //   });
        // }, 500)

      },
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      });
  },

  //初始化图表
  initCharts: function (arrays) {
    this.ecComponent = this.selectComponent('#mychart-dom-pie');
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      //canvas.setChart(chart);
      chart.showLoading(); // 首次显示加载动画
      chart.setOption(getOption(arrays));
      chart.hideLoading(); // 隐藏加载动画

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  getHuLiHgInfo: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getHuLiHgInfo',
      {
        floorId: that.data.floorId,
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

  getHuLiHgHuLiLiangInfo: function () {
    var that = this;
    network.requestPost(
      true,
      app.globalData.baseUrl + '/YzMobile/getHuLiHgHuLiLiangInfo',
      {
        floorId: that.data.floorId,
        welfareCentreId: app.globalData.welfareCentreId
      },
      function (res) {
        that.setData({
          model2: res.Entity
        })
      },
      function (msg) {
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
      floorId: this.data.array[e.detail.value].floorId,
      floorName: this.data.array[e.detail.value].floorName
    })

    this.getPieData();
    this.getHuLiHgInfo();
    this.getHuLiHgHuLiLiangInfo();
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