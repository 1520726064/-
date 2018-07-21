var formdara={
  name:'',
  phone:'',
  region:''
};
Page({
  data: {
    hidden: true,
    nocancel: true,
    goodslist: [
      {
        id: "001",
        name: "",
        phoneNumber: "",
        address: "浙江省杭州市上城区",
        number: '0',
        selected: false,
        street: "",
        RegionId: ''
      }
    ],
    // 省市区三级联动初始化
    region: ["请选择", "请选择", "请选择"],
  },
  // 选择省市区函数
  changeRegin(e) {
    console.log(e.detail.value)
    formdara.region = e.detail.value
    this.setData(
      { region: e.detail.value }
    );
  },
//获取姓名
  setname:function(e){
    console.log(e.detail.value);
    formdara.name=e.detail.value
  },
  bindChange: function (e) {
    var val = e.detail.value;
    var t = this.data.values;
    var cityData = this.data.cityData;
    if (val[0] != t[0]) {
      var citys = [];
      var countys = [];
      var countyscode = [];

      for (var i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name);
      }
      for (var i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name);
        countyscode.push(cityData[val[0]].sub[0].sub[i].code);
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        countyscode: countyscode,
        countycode: cityData[val[0]].sub[0].sub[0].code,
        'goodslist[0].RegionId': cityData[val[0]].sub[0].sub[0].code,
        values: val,
        value: [val[0], 0, 0]
      })
      return;
    }
    if (val[1] != t[1]) {
      var countys = [];
      var countyscode = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name);
        countyscode.push(cityData[val[0]].sub[val[1]].sub[i].code);
      }
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countycode: cityData[val[0]].sub[val[1]].sub[0].code,
        'goodslist[0].RegionId': cityData[val[0]].sub[val[1]].sub[0].code,
        countys: countys,
        countyscode: countyscode,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      this.setData({
        county: this.data.countys[val[2]],
        countycode: this.data.countyscode[val[2]],
        'goodslist[0].RegionId': this.data.countyscode[val[2]],
        values: val
      })
      return;
    }
  },

  sure: function () {
    this.setData({
      condition: !this.data.condition
    })
  },


  bindname: function (e) {

  },

  bindaddress: function () {
    this.setData({
      condition: !this.data.condition,
    })
  },

  bindnumber: function (e) {
    var phone = e.detail.value;
    this.data.goodslist[0].phoneNumber = phone
    this.setData({
      goodslist: this.data.goodslist
    })
  },

  bindinformation: function (e) {
    var street = e.detail.value;
    this.data.goodslist[0].street = street
    this.setData({
      goodslist: this.data.goodslist
    })
  },

  confirm: function () {
    this.setData({
      hidden: true
    });
  },

  // 加入地址列表
  addaddress: function (e) {
    if (formdara.name&&formdara.region){
      console.log(e);
      console.log(this.data)
      var data = this.data;
      wx.request({
        url: '', //接口地址
        method: 'POST',
        data: formdara,//数据
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }else{
      this.setData({
        hidden:false
      })
    }
 
  },

  onShow: function () {
    wx.hideLoading()
  }
})