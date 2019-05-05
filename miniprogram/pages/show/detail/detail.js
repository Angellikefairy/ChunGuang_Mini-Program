// pages/wo/client/pages/wo/ziliaoxiazai/ziliaoxiazai.js
var app = getApp();

Page({
  data: {
    One: [],
    date: '',
    imageUrl:'',
    likes:'',
    type:'',
    tags:'',
    userImageURL:'',
    user:'' 
  },
  onLoad(e) {
    let detail=app.data.detail;
    let localhost = app.data.localhost === undefined ? 'localhost' : app.data.localhost;
    this.setData({
      imageUrl: detail.webformatURL,
      likes: detail.likes,
      type: detail.type,
      tags: detail.tags,
      userImageURL: detail.userImageURL,
      user: detail.user 
      });
      let k=app.data.sheying;
        if(app.data.boolean){
        k = k.slice(10);
        }
        else{
          k=k.slice(0,10);
        }
        console.log(k);
        this.setData({
          One: k
        });

  },
  toDetail(e) {
    let id = e.currentTarget.id;
    /*let imageUrl = this.data.One[id].webformatURL;
    let likes = this.data.One[id].likes;
    let type = this.data.One[id].type;
    let tags = this.data.One[id].tags;
    let user = this.data.One[id].user;
    let userImageURL = this.data.One[id].userImageURL;
    wx.navigateTo({
      url: `detail?imageUrl=${imageUrl}&likes=${likes}&type=${type}&tags=${tags}&userImageURL=${userImageURL}&user=${user}`
    })*/
    app.data.detail=this.data.One[id];
    app.data.boolean = !app.data.boolean;
    this.onLoad();
  }

})