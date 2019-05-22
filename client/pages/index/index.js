const app = getApp();

Page({
  data: {
    userInfo: {},
  },
  onLoad: function () {
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
      console.log("up:", this.data.userInfo);
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        });
      }
      console.log("down:", this.data.userInfo);
    }
  },
})
