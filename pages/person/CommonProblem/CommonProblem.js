Page({
  data: {
    content: [
      {
        id: '01',
        title: '1、那些城市可以下单？',
        contents: '目前平台可以下单的城市包括合肥和芜湖',
        shows: false
      },
      {
        id: '02',
        title: '2、如何联系到客服？',
        contents: '联系我们平台的客服人员，点击右下角“我的”按钮，可以看到“联系客服”入口。如特殊情况可以致电极速维修平台。客服电话：0551-62845266',
        shows: false
      },
      {
        id: '03',
        title: '3、平台是否都是专业师傅？',
        contents: '发猜数包的人设置问题和答案，只有提交的答案和出题答案一致才可以得到红包',
        shows: false
      },
      {
        id: '04',
        title: '4、发猜数红包会收取服务费吗？',
        contents: '发猜数包的人设置问题和答案，只有提交的答案和出题答案一致才可以得到红包',
         shows: false
      }
  ]
  },
  onLoad() {

  },
  showHide(e) {
    var contentFor = this.data.content;
    for(var i = 0; i<contentFor.length; i++) {
  　　if (e.currentTarget.dataset.changeid == contentFor[i].id) {
    　　　　var printPrice = "content[" + i + "].shows";
    　　　　if (this.data.content[i].shows) {
      　　　　　　this.setData({
        　　　　　　　　[printPrice]: false
      　　　　　　});
    　　　　} else {
      　　　　　　this.setData({
        　　　　　　　　[printPrice]: true
      　　　　　　});
    　　　　}
  　　} else {
    　　　　　　var printPrice1 = "content[" + i + "].shows";
    　　　　　　this.setData({
      　　　　　　　　[printPrice1]: false
    　　　　　　});
  　　　　    }
　　}
}
})