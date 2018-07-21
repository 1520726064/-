Page({
  /**
   * 页面的初始数据
   */
  data: {
    starFlag: 0
  },
  changeOne: function () {
    var that = this;
    that.setData({
      starFlag: 1
    });
  },
  changeTwo: function () {
    var that = this;
    that.setData({
      starFlag: 2
    });
  },
  changeThree: function () {
    var that = this;
    that.setData({
      starFlag: 3
    });
  },
  changeFour: function () {
    var that = this;
    that.setData({
      starFlag: 4
    });
  },
  changeFive: function () {
    var that = this;
    that.setData({
      starFlag: 5
    });
  }
})