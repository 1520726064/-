var dateTimePicker = require('../../../utils/dateTimePicker.js');
var url=require('../../../url/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    del: "../../../images/images/del.png",
    src: '../../../images/images/add_1.png',
    index_name: "",
    name: "",
    di_address: '',
    imgs: [],
    active: '',
    weixiu_name: '请填写您的姓名',
    weixiu_tel: '请填写您的手机号',
    door: '例如：xx小区x单元xxx室',
    dateTimeArray1: null,
    dateTime1: null,
    price:20,
  },

  //选择照片
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 3,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imgs: that.data.imgs.concat(res.tempFilePaths)
        })
        var imgs = that.data.imgs;
        if (imgs.length ==3) {
          that.setData({
            active: 'active',
          })
        }
      }
    })
  },

  //预约时间的日期
  

  //上传照片
  upload: function() {
    var path = this.data.imgs;
    var i = 0;
    for (i in path) {
      wx.uploadFile({
        url: 'http://xcx01.yiyuncloud.com/api/members/uploadFile',
        filePath: path[i],
        name: 'file',
        formData: {
          'order_id': wx.getStorageSync('order_id')
        },
        success: function(res) {
              console.log(res);
        },
        fail: function(res) {}
      })
    }
  },

//删除照片
  deleteImg: function(e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs,
    })
    if (imgs.length < 3) {
      this.setData({
        active: '',
      })
    }
  },

  onLoad: function(options) {
    var index_name = options.index_name;
    var name = options.name;
    var problem_describe = options.name + '-' + options.index_name
    wx.setStorageSync('problem_describe', problem_describe)
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      index_name: index_name,
      name: name,
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    })
  },

  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
    var time = e.currentTarget.dataset.time;
    wx.setStorageSync('appointment_time', time)
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },

//获取用户当前地理位置
  map: function() {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.chooseLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28,
          success: function(res) {
            console.log(res);
            var di_address = res.address;
            var di_name = res.name;
            that.setData({
              di_address: di_address + di_name,
            })
            wx.setStorageSync('address', di_address + di_name)
          },
        })
      }
    })
  },

//表单提交
  formSubmit: function(e) {
    var imgs=this.data.imgs;
    var warn = ""; //弹框时提示的内容
    var flag = true; //判断信息输入是否完整
    //判断的顺序依次是：姓名-手机号-地址-具体地址-预约日期-预约时间-开荒面积
    if (e.detail.value.weixiu_name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.weixiu_tel == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.weixiu_tel))) {
      warn = "手机号格式不正确";
    } else if (wx.getStorageSync('address') == '') {
      warn = "请填写正确的地址！";
    } else if (e.detail.value.door == "") {
      warn = "请输入您的街道门牌";
    } else if (imgs.length == 0) {
      warn = "请上传图片！";
    } else {
      flag = false; //若必要信息都填写，则不用弹框，且页面可以进行跳转
      var that = this;
      var openid = wx.getStorageSync('openid');
      var problem_describe = wx.getStorageSync('problem_describe');
      var contact = e.detail.value.weixiu_name;
      var contact_phone = e.detail.value.weixiu_tel;
      var contact_address = wx.getStorageSync('address') + e.detail.value.door;
      var appointment_time = wx.getStorageSync('appointment_time');
      var remark = e.detail.value.beizhu;
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
      wx.request({
        url: url.url.setOrder,
        data:{
          openid: openid,
          problem_describe: problem_describe,
          contact: contact,
          contact_phone: contact_phone,
          contact_address: contact_address,
          appointment_time: appointment_time,
          remark: remark
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          var order_id = res.data.order_id;
          wx.setStorageSync('order_id', order_id);
          that.upload();
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (res) {
              console.log(res)
              wx.redirectTo({
                url: '/pages/person/person',
              })
            },
            'fail': function (res) {
              console.log(res)
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
     
    }

    // wx.request({
    //   url: 'http://xcx01.yiyuncloud.com/api/members/setRepairOrder',
    //   data:{
        
    //   }
      
    // })
    //如果信息填写不完整，弹出输入框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  }
})