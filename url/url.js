//请在这里修改图片路径
let  url = require('./api.js');
let urls={
  getHomePage: url.host+"/api/getHomePage",
  getCategoryPage: url.host +'/members/getCategoryPage',
  login: url.host +'/api/login',
  getUserInfo: url.host +'/api/getUserInfo',
  setUserInfo: url.host +'/api/setUserInfo',
  setOrder: url.host +'/members/setRepairOrder'             
}
let image = {
  welcome:'http://xcx01.yiyuncloud.com/static/admin/static/picbox/images/shenhe.jpg'
}
module.exports = {
  images: image,
   url: urls
}  