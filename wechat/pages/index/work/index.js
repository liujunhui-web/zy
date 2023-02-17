Page({
    data: {
        notice: 77,
        bannerList: [{
            src: '../../../assets/images/13.png'
        }, {
            src: '../../../assets/images/13.png'
        }, {
            src: '../../../assets/images/13.png'
        }, {
            src: '../../../assets/images/13.png'
        }, {
            src: '../../../assets/images/13.png'
        }],
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
        hide: true
    },
    onLoad(options) {
        this.setData({
            activeKey: options.key?options.key:0
        })
    },
    handleTabBar(e) {
        //多个值接收
        const {
            key
        } = e.currentTarget.dataset
        this.setData({
            activeKey: key
        })
        //跳转页面
        wx.reLaunch({
            url: `/pages/index/other/index?key=${key}`,
        })
    },
    handlepb() {
        this.setData({
            hide: false
        })
    },
    hidePopup() {
        this.setData({
            hide: true
        })
    },
    //阻止事件捕获
    nothing() {

    }
})