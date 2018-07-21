//请在这里修改图片路径
let  url = require('./api.js');
let urls={
  getHomePage: url.host+"/api/getHomePage",
  getCategoryPage: url.host +'/members/getCategoryPage',
  login: url.host +'/api/login',
  getUserInfo: url.host +'/api/getUserInfo',
  setUserInfo: url.host +'/api/setUserInfo',
  setOrder: url.host +'/members/setRepairOrder', 
  //商品一级列表
  productList: url.host +"/goods/getGoodsCategory"
}


module.exports = {
   url: urls
}  