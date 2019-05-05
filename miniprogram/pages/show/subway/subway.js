// pages/wo/client/pages/wo/ziliaoxiazai/ziliaoxiazai.js
Page({
  data: {
    One: [],
    date: ''
  },
  onLoad() {
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
      url: `http://localhost:8080/angelangel_war_exploded/bean/One_Summary`,
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
    })
  },
  toDetail(e) {
    let id = e.currentTarget.id;
    let imageUrl = this.data.One[id].picture;
    wx.navigateTo({
      url: `./detail/detail?imageUrl=${imageUrl}`
    })
  }

})