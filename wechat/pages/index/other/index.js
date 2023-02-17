// pages/index/other/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabBarList: [{
            key: 0,
            image: "../../../assets/images/9.png",
            //无图片，只有字体会变
            activeImage: "../../../assets/images/9.png",
            text: "工作"
        }, {
            key: 1,
            image: "../../../assets/images/10.png",
            activeImage: "../../../assets/images/10.png",
            text: "助手"
        }, {
            key: 2,
            image: "../../../assets/images/8.png",
            activeImage: "../../../assets/images/8.png",
            text: "常用"
        }, {
            key: 3,
            image: "../../../assets/images/11.png",
            activeImage: "../../../assets/images/11.png",
            text: "分析"
        }, {
            key: 4,
            image: "../../../assets/images/12.png",
            activeImage: "../../../assets/images/12.png",
            text: "我"
        }],
        activeKey: 0,

    },
    handleTabBar(e) {
        //多个值接收
        const {
            key
        } = e.currentTarget.dataset
        this.setData({
            activeKey: key
        })
        console.log(key)
        //跳转页面
        switch (key) {
            case 0:
                wx.reLaunch({
                    url: `/pages/index/work/index?key=${key}`,
                })
                break;
            case 1:
                wx.reLaunch({
                    url: `/pages/index/other/index?key=${key}`,
                })
                break;
            default:
                wx.reLaunch({
                    url: `/pages/index/other/index?key=${key}`,
                })
                break;
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.setData({
            activeKey: options.key
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})