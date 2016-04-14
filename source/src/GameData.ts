/**
 * Created by Channing on 2014/9/17.
 */

class GameData{

    public static closeMusic:Boolean = false;
    public static closeBgMusic:Boolean = false;
    public static isClickBtn:Boolean = false;
    public static isStart:Boolean = false;
    public static num:Array<any> = ["1","0",".","0",".","4",".","1","8","0",":","3","0","0","0"];
    public static curScene:number = 1;
    public static isPause:Boolean = true;
    public static redGirlDistance:number = 0;
    public static sorce:number =0;
    public static blod:number = 5;
    public static enemySpeed:number = 0;
    public static stopCreateEnemy:number = 0;
    public static stopEnemyBoo:Boolean = false;
    public static count:number = 0;
    public static bgSpeed:number = 0;
    public static profectNum:number = 0;
    public static langNum:number = 0
    public static huliNum:number = 0
    public static bianfuNum:number = 0
    public static dazhaoTime:number = 50;
    public static isWin:Boolean = false;
    public static isStartClickOption:Boolean = false;
    public static dubleSorce:Boolean = false;
    public static curTimeNum:number = 0;
    public static sheDie:Boolean = false;
    public static sheTimeNum:number = 0;
    
    private static appId:string = "";
    private static timestamp:number = 0;
    private static nonceStr:string = "";
    private static signature:string = "";
    public static shareInfo:any;
    private static preparing:Boolean = false;
    
    public static prepareShare():void{
        if(GameData.preparing){
            return;
        }
        GameData.preparing = true;
        
       
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://www.lovigame.com/",egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,GameData.onGetComplete,GameData);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,GameData.onGetIOError,GameData);
        
    }
    
    private static onGetComplete(event:egret.Event):void{
        var request = <egret.HttpRequest>event.currentTarget;
        GameData.shareInfo = JSON.parse(request.response);
        
        var bodyConfig: BodyConfig = new BodyConfig();
        bodyConfig.appId = GameData.shareInfo.appId;
        bodyConfig.timestamp = GameData.shareInfo.timestamp;
        bodyConfig.nonceStr = GameData.shareInfo.nonceStr;
        //bodyConfig.signature = GameData.shareInfo.signature;
        bodyConfig.debug = true;
        bodyConfig.jsApiList = [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ];
        /// ... 其他的配置属性赋值
        /// 通过config接口注入权限验证配置
        if(wx) {
            wx.config(bodyConfig);
            wx.ready(function() {
                /// 在这里调用微信相关功能的 API
                console.log("read");
                GameData.onShareAPPMessage();
                GameData.preparing = false;
            });
            wx.error(function(res) {

                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log(res);
                GameData.preparing = false;
            });
        }
        
        
    }
    
    private static onGetIOError(event:egret.IOErrorEvent):void{
        console.log(event);
        GameData.preparing = false;
    }
    
    private static onShareAPPMessage(): void {
        var shareAppMessage = new BodyMenuShareAppMessage();
        shareAppMessage.title = '发送给朋友';
        shareAppMessage.desc = '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。';
        shareAppMessage.link = 'http://movie.douban.com/subject/25785114/';
        shareAppMessage.imgUrl = 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg';
        console.log("app");
        shareAppMessage.trigger = function(res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            console.log('用户点击发送给朋友');
        }
        shareAppMessage.success = function(res) {
            console.log('已分享');
        };
        shareAppMessage.fail = function(res) {
            console.log('已取消');
        };
        shareAppMessage.cancel = function(res) {
            console.log("cancel");
            console.log(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(shareAppMessage);
    }
}