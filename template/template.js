function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/index/index",
      "iconPath": "../../images/images/index_yuan.png",
      "selectedIconPath": "../../images/images/index.png",
      "text": "首页"
    },
    {
      "current": 0,
      "pagePath": "/pages/shangc/shangc",
      "iconPath": "../../images/images/shangcheng.png",
      "selectedIconPath": "../../images/images/index.png",
      "text": "商城"

    },
    {
      "current": 0,
      "pagePath": "/pages/person/person",
      "iconPath": "../../images/images/person.png",
      "selectedIconPath": "../../images/images/person-bg_03.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}