// pages/wo/client/pages/wo/ziliaoxiazai/ziliaoxiazai.js
var app= getApp();
var code='';
var start=false;
var startId='';
var tapCount=0;

Page({
  data: {
    One: [],
    date: '',
    text:'',
    photo:'',
    songs:[]
  },
  onLoad(e) {
    let app = getApp();
    let localhost = app.data.localhost === undefined ? 'localhost' : app.data.localhost;
    var that = this;
    wx.request({
      url: `https://pixabay.com/api/?key=12377333-284018cd62ef6c21acdc07c45&image_type=photo&editors_choice=true&category=fashion`,
      data: {

      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      dataType: 'json',
      success: function (res) {
        var k = res.data.hits;
        app.data.sheying=k;
        k=k.slice(0,10);
        console.log(k);
        that.setData({
          One: k
        });
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function () {
        console.log('调用结束');
      }
    });
    wx.request({
      url:"https://poem.imoxin.net/api/?encode=json",
      method:"GET",
      header:{'content-type':'application/json'},
      dataType:'json',
      success:function(res){
        console.log(res.data);
        that.setData({
          text:res.data.text,
          photo:res.data.maxphoto
        })
      },
      fail:function(){
        console.log('调用结束');
      }
    });
    wx.request({
      url: "http://localhost:4000/personalized/newsong",
      method: "GET",
      header: { 'content-type': 'application/json' },
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        that.setData({
          songs:res.data.result
        })
      },
      fail: function () {
        console.log('调用结束');
      }
    });
  },
  
  toDetail(e){
    let id=e.currentTarget.id;
    /*let imageUrl = this.data.One[id].webformatURL;
    let likes = this.data.One[id].likes;
    let type = this.data.One[id].type;
    let tags = this.data.One[id].tags;
    let user = this.data.One[id].user;
    let userImageURL = this.data.One[id].userImageURL;
    wx.navigateTo({
      url: `../detail/detail?imageUrl=${imageUrl}&likes=${likes}&type=${type}&tags=${tags}&userImageURL=${userImageURL}&user=${user}`
    })*/
    app.data.detail=this.data.One[id];
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  songStart(e){
    if(tapCount===0){
      startId = e.currentTarget.id - 20;
      tapCount++;
    }
    if((e.currentTarget.id-20)!=startId){
      start=false;
      startId=e.currentTarget.id-20;
    }
    let backgroundAudioManager = wx.getBackgroundAudioManager(); 
    if(start===false){
    start=!start;
      let songsId=e.currentTarget.id-20;
      let songId=this.data.songs[songsId].id;
      let that=this;  
      wx.request({
        url:`http://localhost:4000/song/url?id=${songId}`,
        data:{

        },
        method: "GET",
        header: { 'content-type': 'application/json' },
        dataType: 'json',
        success:function (res){
          console.log(res.data);
           console.log(res.data.data[0].url);
           console.log(`${that.data.songs[`${songsId}`].name}`);
          backgroundAudioManager.title = that.data.songs[songsId].name;
          backgroundAudioManager.src = `${res.data.data[0].url}`         
          backgroundAudioManager.onError(function(){
            
          });
          backgroundAudioManager.onEnded(function(){
               songsId=songsId+1;
               let nextSongId = that.data.songs[songsId].id;
            wx.request({
              url: `http://localhost:4000/song/url?id=${nextSongId}`,
              data:{

              },
              method:'GET',
              header: { 'content-type': 'application/json' },
              dataType: 'json',
              success:function(res){
                backgroundAudioManager.title = that.data.songs[songsId].name;
                backgroundAudioManager.src = `${res.data.data[0].url}`;
              }
            })
          })
        }
      })
    }
    else{
      console.log('pause');
      backgroundAudioManager.pause();
      start=!start;
    }
    }

})