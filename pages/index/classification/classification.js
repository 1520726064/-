var url = require('../../../url/url.js');
Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    curIndex: 0
  },
  onLoad: function (options) {
    var id=options.id;
    wx.setStorageSync('category_id', id)
    console.log(options)
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象
    var that = this
    var arr = []
    wx.request({
      url: url.url.getCategoryPage,
      method: 'GET',
      data: {
        id:id
      },
      header: {},
      success: function (res) {
        console.log(res)
        var Second = res.data.Second[0];
        var name = res.data.Second[0].name;
        var name_id = res.data.Second[0].id;
        var Third = res.data.Third;
        wx.setStorageSync('name', name)
        wx.setStorageSync('name_id', name_id)
        var i = 0;
        for (i in Third) {
          if (Second.id == Third[i].pid) {
            arr.push(Third[i])
          }
          console.log(arr)
          that.setData({
            id: Second.id,
            curNav: Second.id,
            navRightItems: arr,
            navLeftItems: res.data.Second,
          })
        }
      }
    })
  },

  //事件处理函数
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值
    var id = e.target.dataset.id;
    var name = e.target.dataset.name;
    var name_id = e.target.dataset.id;
    wx.setStorageSync('name_id', name_id)
    var that = this;
    var index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index
    wx.request({
      url: url.url.getCategoryPage,
      method: 'GET',
      data: {
        id: wx.getStorageSync('category_id'),
      },
      header: {},
      success: function (res) {
        var array = [];
        var Third = res.data.Third
        console.log(Third);
        var i = 0;
        for (i in Third) {
          if (id == Third[i].pid) {
            array.push(Third[i])
          }
          that.setData({
            navRightItems: array
          })
        }
      }
    })
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  tiaozhuan:function(e){
    console.log(e);
    var index_name = e.currentTarget.dataset.name;
    var index_id = e.currentTarget.dataset.id;
    var name = wx.getStorageSync('name');
    var name_id = wx.getStorageSync('name_id');
    wx.navigateTo({
      url: '../FillInOrders/FillInOrders?name=' + name + '&index_name=' + index_name + '&index_id' + index_id + '&name_id' + name_id,
    })
  },
})