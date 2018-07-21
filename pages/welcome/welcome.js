// pages/welcome/welcome.js
const app = getApp()
let url = require('../../url/url.js')
let urls = url.url;
// let  request=require("../../request.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
      welcome:url.images.welcome,
      content:'51急修'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

// console.log(request.request())


    var that=this;
    wx.login({
      //登录成功
      success: function (res) {
        wx.request({
          url: urls.login,
          data: {
            code: res.code
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          //获取用户openid,存入缓存
          success: function (res) {
            wx.setStorageSync('openid', res.data['openid'])
            wx.getSetting({
              success: function (res) {
                //判断用户是否授权
console.log("1");

                if (res.authSetting['scope.userInfo']) {
                  console.log(2)
                  //如果用户已授权
                  var openid = wx.getStorageSync('openid');
                  wx.request({
                    url: urls.getUserInfo,    
                    data: {
                      openid: openid
                    },
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: function (res) {
                      console.log(3)
                      if (res.data.status == 0) {
                        //没有找到数据，需要将用户数据写入数据库
                        wx.getUserInfo({
                          withCredentials: true,
                          lang: 'zh_CN',
                          success: function (res) {
                            wx.request({
                              url: urls.setUserInfo,
                              data: {
                                openid: wx.getStorageSync('openid'),
                                nickName: res.userInfo.nickName,
                                avatarUrl: res.userInfo.avatarUrl,
                                gender: res.userInfo.gender,
                                city: res.userInfo.city,
                                province: res.userInfo.province,
                                country:res.userInfo.country
                              },
                              method: 'GET',
                              dataType: 'json',
                              responseType: 'text',
                              //如果数据写入成功,
                              success: function (res) {
                                  
                              },
                            })
                          },
                        })
                      }
                      if (res.data.status == 1) {
                        // 当前为用户
                        that.setData({
                          status:1,
                          content: '亲爱的用户，欢迎！'
                        })
                        wx.redirectTo({
                          url: '/pages/index/index',
                        })
                      }
                      if (res.data.status == 2) {
                        //当前为管理员
                        that.setData({
                          status: 2,
                           content: '亲爱的管理员，欢迎！'
                        })
                        wx.redirectTo({
                          url: '/pages/admin/admin',
                        })
                      }
                     
                    },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                } else {
                  // wx.redirectTo({
                  //   url: '/pages/welcome/welcome',
                  // })
                }
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
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
  },
  user_login:function(){

 //如果用户未授权，跳转授权界面             
    var that = this;
    wx.login({
      //登录成功
      success: function (res) {
      
        wx.request({
          url: urls.login,
          data: {
            code: res.code
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          //获取用户openid,存入缓存
          success: function (res) {
            console.log(res);
            wx.setStorageSync('openid', res.data['openid'])
            wx.getSetting({
              success: function (res) {
                console.log(res.authSetting['scope.userInfo'])
                //判断用户是否授权
                if (res.authSetting['scope.userInfo']) {
                  //如果用户已授权
                  var openid = wx.getStorageSync('openid')
                  wx.request({
                    url: urls.getUserInfo,
                    data: {
                      openid: openid
                    },
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: function (res) {
                      console.log(res.data)
                      if (res.data.status == 0) {
                        //没有找到数据，需要将用户数据写入数据库
                        wx.getUserInfo({
                          withCredentials: true,
                          lang: 'zh_CN',
                          success: function (res) {
                            wx.request({
                              url: urls.setUserInfo,
                              data: {
                                openid: wx.getStorageSync('openid'),
                                nickName: res.userInfo.nickName,
                                avatarUrl: res.userInfo.avatarUrl,
                                gender: res.userInfo.gender,
                                city: res.userInfo.city,
                                province: res.userInfo.province,
                                country: res.userInfo.country
                              },
                              method: 'GET',
                              dataType: 'json',
                              responseType: 'text',
                              //如果数据写入成功,
                              success: function (res) {
                                console.log(res.data)
                                wx.redirectTo({
                                  url: '/pages/index/index',
                                })
                              },
                            })
                          },
                        })
                      }
                      if (res.data.status == 1) {
                        // 当前为用户
                        that.setData({
                          status: 1,
                          content: '亲爱的用户，欢迎！'
                        })
                        wx.redirectTo({
                          url: '/pages/index/index',
                        })
                      }
                      if (res.data.status == 2) {
                        //当前为管理员
                        that.setData({
                          status: 2,
                          content: '亲爱的管理员，欢迎！'
                        })
                        wx.redirectTo({
                          url: '/pages/admin/admin',
                        })
                      }
                    },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                } else {
                  // wx.redirectTo({
                  //   url: '/pages/welcome/welcome',
                  // })
                }
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })   
            
           

        
  }
 
})