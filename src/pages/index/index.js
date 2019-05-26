const app = getApp();
const globalData = app.globalData;

Page({
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    userInfo: {},
    height: globalData.height,
  },
  onLoad: function() {
    if(globalData.userInfo) {
      this.setData({
        userInfo: globalData.userInfo
      });
    } else {
      app.userInfoReadyCallback = function(res) {
        this.setData({
          userInfo: res.userInfo
        });
      }
    }
  },

  onGetUserInfo: () => {

  }
});
