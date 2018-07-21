//index.js
//获取应用实例
const app = getApp()
let url=require('../../url/url.js');
let template = require('../../template/template.js');
Page({
  data: {
    tjsp_price: 80,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showModalStatus: true,
    nocancel: false,
    isScroll: true
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            isScroll: true
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  draw: function (e) {
    wx.showToast({
      title: '领取成功',
      icon: 'success',
      duration: 2000
    })  
  },
  detail: function (e) {
   var id=e.currentTarget.dataset.id;
   wx.navigateTo({
     url:'./classification/classification?id='+id,
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
  },
  tiaozhuan:function(e){
   var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './classification/classification?id=' + id,
    })
  },
  onLoad: function () {
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar'
    var that=this;
    wx.request({
      url: url.url.getHomePage,
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res.data)
        that.setData({
          Banners:res.data.Banners,
          RepairCategory: res.data.RepairCategory,
          SecondCategory: res.data.SecondCategory,
          TuiGoods: res.data.TuiGoods
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  
})