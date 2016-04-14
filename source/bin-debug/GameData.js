/**
 * Created by Channing on 2014/9/17.
 */
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.prepareShare = function () {
        if (GameData.preparing) {
            return;
        }
        GameData.preparing = true;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://www.lovigame.com/sig", egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, GameData.onGetComplete, GameData);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, GameData.onGetIOError, GameData);
    };
    GameData.onGetComplete = function (event) {
        var request = event.currentTarget;
        GameData.shareInfo = JSON.parse(request.response);
        var bodyConfig = new BodyConfig();
        bodyConfig.appId = GameData.shareInfo.appId;
        bodyConfig.timestamp = GameData.shareInfo.timestamp;
        bodyConfig.nonceStr = GameData.shareInfo.nonceStr;
        bodyConfig.signature = GameData.shareInfo.signature;
        // bodyConfig.debug = true;
        bodyConfig.jsApiList = [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ];
        /// ... 其他的配置属性赋值
        /// 通过config接口注入权限验证配置
        if (wx) {
            wx.config(bodyConfig);
            wx.ready(function () {
                /// 在这里调用微信相关功能的 API
                console.log("read");
                GameData.onShareAPPMessage();
                GameData.preparing = false;
            });
            wx.error(function (res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log(res);
                GameData.preparing = false;
            });
        }
    };
    GameData.onGetIOError = function (event) {
        console.log(event);
        GameData.preparing = false;
    };
    GameData.onShareAPPMessage = function () {
        var shareAppMessage = new BodyMenuShareAppMessage();
        shareAppMessage.title = '历史最高分';
        shareAppMessage.desc = '你获得历史最高分，得到奖励100元优惠券一张。点击领取。';
        shareAppMessage.link = 'http://www.lovigame.com';
        shareAppMessage.imgUrl = 'http://freshbody.lovigame.com/images/logo2.png';
        console.log("app");
        shareAppMessage.trigger = function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            console.log('用户点击发送给朋友');
        };
        shareAppMessage.success = function (res) {
            console.log('已分享');
        };
        shareAppMessage.fail = function (res) {
            console.log('已取消');
        };
        shareAppMessage.cancel = function (res) {
            console.log("cancel");
            console.log(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(shareAppMessage);
    };
    GameData.closeMusic = false;
    GameData.closeBgMusic = false;
    GameData.isClickBtn = false;
    GameData.isStart = false;
    GameData.num = ["1", "0", ".", "0", ".", "4", ".", "1", "8", "0", ":", "3", "0", "0", "0"];
    GameData.curScene = 1;
    GameData.isPause = true;
    GameData.redGirlDistance = 0;
    GameData.sorce = 0;
    GameData.blod = 5;
    GameData.enemySpeed = 0;
    GameData.stopCreateEnemy = 0;
    GameData.stopEnemyBoo = false;
    GameData.count = 0;
    GameData.bgSpeed = 0;
    GameData.profectNum = 0;
    GameData.langNum = 0;
    GameData.huliNum = 0;
    GameData.bianfuNum = 0;
    GameData.dazhaoTime = 50;
    GameData.isWin = false;
    GameData.isStartClickOption = false;
    GameData.dubleSorce = false;
    GameData.curTimeNum = 0;
    GameData.sheDie = false;
    GameData.sheTimeNum = 0;
    GameData.appId = "";
    GameData.timestamp = 0;
    GameData.nonceStr = "";
    GameData.signature = "";
    GameData.preparing = false;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
