var WxParse = require('../wxParse/wxParse.js');

// pages/show/detail/textDetail.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleName:'',
    writerName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let contentId = options.contentId;
    this.setData({
      titleName:options.titleName,
      writerName:options.writerName
    });
    console.log(contentId);
    let that = this;
    wx.request({
      url: 'http://localhost:8080/angelangel_war_exploded/bean/One_Content',
      data: {
        contentId: contentId
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      dataType: 'json',
      success: function (res) {
        let article = res.data;
        article=article.split('');
        for(let i=0;i<article.length;i++){
          if(article[i]==='p'&&article[i-1]==='/'){
            article.splice(i+2,1,"<br>");
          }
        }
        article=article.join('');
        WxParse.wxParse('article', 'html', article, that, 5);
      },
      fail: function () {
        console.log('调用结束');
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})