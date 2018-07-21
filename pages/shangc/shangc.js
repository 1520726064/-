// pages/Product/Product.js
var app = getApp();
let url = require('./../../url/url.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 14,
    goodsList: [],
    animationData: {},
    opacity: 0,
    top: 250,
    hidden: true
  },

  tapClassify: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.id;
    that.setData({
      id: e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: url.url.productList,
      method: "GET",
      header: { },
      success: function (res) {
        console.log(res);
        // for (var i = 0; i < res.data.length; i++) {
        //   var list = res.data[i].PriceSheetList
        //   // for (var j = 0; j < list.length; j++) {
        //   //   // var q = list[j].ImageUrl.substring(25, 50);
        //   //   // var w = list[j].ImageUrl.substring(0, 22);
        //   //   list[j].ImageUrl = w + q;
        //   // }
        // }
        that.data.goodsList = res.data;
        that.setData({
          goodsList: that.data.goodsList,
          hidden: false
        })
        wx.hideLoading();
        var animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        })
        animation.top(0).opacity(1).step()
        that.setData({
          animationData: animation.export()
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})