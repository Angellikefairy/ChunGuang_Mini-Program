// pages/wo/client/pages/wo/ziliaoxiazai/ziliaoxiazai.js
Page({
  data: {
    One: [],
    date: ''
  },
  onLoad() {
    let app = getApp();
    let localhost = app.data.localhost === undefined ? 'localhost' : app.data.localhost;
    console.log(localhost);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateToday = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    this.setData({
      date: dateToday
    })
    var that = this;
    wx.request({
      url: `http://${localhost}:8080/angelangel_war_exploded/bean/One_Summary`,
      data: {

      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      dataType: 'json',
      success: function (res) {
        var k = res.data;
        console.log(k);
        that.setData({
          One: k
        });
        console.log(that.data.One);
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function () {
        console.log('调用结束');
      }
    });
    wx.request({
      url: "http://localhost:4000/login/cellphone?phone=13777838499&password=zjb13777838499",
      method: "GET",
      header: { 'content-type': 'application/json' },
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
      },
      fail: function () {
        console.log('调用结束');
      }
    })
  },
  toDetail(e){
    let id=e.currentTarget.id;
    let imageUrl=this.data.One[id].picture;
    let title=this.data.One[id].title.split('-');
    let titleName=title[0];
    let writerName=title[1];
    let contentUrl=this.data.One[id].url.split('');
    let contentId='';
    for(let i=0;i<contentUrl.length;i++){
      console.log(typeof parseInt(contentUrl[i]));
      if(!isNaN(Number(contentUrl[i]))){
         contentId+=contentUrl[i];
      }
    }
    console.log(contentId);
    wx.navigateTo({
      url:`../index/index?imageUrl=${imageUrl}&contentId=${contentId}&titleName=${titleName}&writerName=${writerName}`
    })
  }

})