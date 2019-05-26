const app = getApp();
const globalData = app.globalData;

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
    },
    onLoad: function() {
        // 获取用户信息
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            globalData.userInfo = res.userInfo;
                        }
                    });
                }
            }
        });
    },
});
