/**
 * Created by Administrator on 2014/10/9.
 */
var GameOverView = (function (_super) {
    __extends(GameOverView, _super);
    function GameOverView() {
        _super.call(this);
        this.thisNum = 0;
        this.num = 0;
        this.t1Num = 0;
        this.t2Num = 0;
        this.t3Num = 0;
        this.huliW = 0;
        this.langW = 0;
        this.bianfuW = 0;
        this.ttNum = 0;
        this.tNum = 0;
        this.boo1 = false;
        this.boo3 = false;
        this.boo2 = false;
        this.initView();
    }
    var d = __define,c=GameOverView,p=c.prototype;
    p.initView = function () {
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        this.bg = ResourceUtils.createBitmapByName("overBgImage");
        this.thisContainer.addChild(this.bg);
        this.initEnemy(GameData.curScene);
        this.sorce = new SpecialNumber("number-0");
        this.thisContainer.addChild(this.sorce);
        this.sorce.setValue(0 + "");
        this.sorce.x = Const.SCENT_WIDTH / 2 - this.sorce.width / 2;
        this.sorce.y = Const.SCENT_HEIGHT / 6;
        egret.Ticker.getInstance().register(this.showSorce, this);
        this.tt = new egret.TextField();
        this.addChild(this.tt);
        if (GameData.isWin) {
            var b = Math.floor(Math.random() * 15 + 80);
        }
        else {
            var b = Math.floor(Math.random() * 40 + 40);
        }
        this.ttNum = b;
        this.tt.text = "超越了丛林中" + 0 + "%的小伙伴";
        this.tt.textColor = 0x000000;
        this.tt.bold = true;
        this.tt.size = 32;
        this.tt.x = this.thisContainer.width / 2 - this.tt.width / 2 - 10;
        this.tt.y = 505;
        this.spGengduo = new egret.Sprite();
        this.thisContainer.addChild(this.spGengduo);
        var gengduo = ResourceUtils.createBitmapByName("btngengduoyouxi");
        this.spGengduo.addChild(gengduo);
        this.spGengduo.touchEnabled = true;
        this.spGengduo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
        //EgretShare.setShareContent("我的小红帽干掉了"+(GameData.langNum+GameData.huliNum+GameData.bianfuNum)+"只色狼,获得了"+GameData.sorce+"分,超越了"+b+"%的小伙伴.");
        this.spZaiLai = new egret.Sprite();
        this.thisContainer.addChild(this.spZaiLai);
        var zailai = ResourceUtils.createBitmapByName("btnzailaiyici");
        this.spZaiLai.addChild(zailai);
        this.spZaiLai.touchEnabled = true;
        this.spZaiLai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStartView, this);
        this.spFenXiang = new egret.Sprite();
        this.thisContainer.addChild(this.spFenXiang);
        var fenxiang = ResourceUtils.createBitmapByName("btnfenxiang");
        this.spFenXiang.addChild(fenxiang);
        this.spFenXiang.touchEnabled = true;
        this.spFenXiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShareView, this);
        this.spGengduo.y = this.spFenXiang.y = this.spZaiLai.y = 600;
        this.spGengduo.x = 12;
        this.spZaiLai.x = 170;
        this.spFenXiang.x = 330;
        //        if(!EgretShare.canShare){
        if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            //            this.spGengduo.x = 82;
            //            this.spZaiLai.x = 260;
            this.thisContainer.removeChild(this.spGengduo);
            this.thisContainer.removeChild(this.spFenXiang);
        }
        this.sp = new egret.Sprite();
        this.addChild(this.sp);
        var bg = ResourceUtils.createBitmapByName("shareImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.sp.addChild(bg);
        this.sp.visible = false;
        this.sp.touchEnabled = true;
        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShare, this);
        this.thisContainer.scaleX = this.thisContainer.scaleY = 0.9;
        this.thisContainer.x = Const.SCENT_WIDTH / 2 - this.thisContainer.width / 2 + 30;
        this.thisContainer.y = Const.SCENT_HEIGHT / 2 - this.thisContainer.height / 2 + 30;
    };
    p.showSorce = function (e) {
        this.num++;
        if (this.thisNum < GameData.sorce) {
            this.thisNum += this.num;
            if (this.thisNum > GameData.sorce) {
                this.thisNum = GameData.sorce;
            }
            this.sorce.setValue(this.thisNum + "");
            this.sorce.x = Const.SCENT_WIDTH / 2 - this.sorce.width / 2;
        }
        if (this.boo1) {
            if (this.t1Num < GameData.langNum) {
                this.t1Num += 3;
                if (this.t1Num > GameData.langNum) {
                    this.t1Num = GameData.langNum;
                }
                this.t1.setValue(this.t1Num + "");
                this.t1.x = this.langW - this.t1.width / 2;
            }
        }
        if (this.boo2) {
            if (this.t2Num < GameData.huliNum) {
                this.t2Num += 3;
                if (this.t2Num > GameData.huliNum) {
                    this.t2Num = GameData.huliNum;
                }
                this.t2.setValue(this.t2Num + "");
                this.t2.x = this.huliW - this.t2.width / 2;
            }
        }
        if (this.boo3) {
            if (this.t3Num < GameData.bianfuNum) {
                this.t3Num += 3;
                if (this.t3Num > GameData.bianfuNum) {
                    this.t3Num = GameData.bianfuNum;
                }
                this.t3.setValue(this.t3Num + "");
                this.t3.x = this.bianfuW - this.t3.width / 2;
            }
        }
        if (this.tNum < this.ttNum) {
            this.tNum += 2;
            if (this.tNum > this.ttNum) {
                this.tNum = this.ttNum;
            }
            this.tt.text = "超越了丛林中" + this.tNum + "%的小伙伴";
            this.tt.x = this.thisContainer.width / 2 - this.tt.width / 2 - 10;
        }
    };
    p.toShareView = function (e) {
        //EgretShare.share();
    };
    p.toGengDuoView = function (e) {
        //EgretShare.moreGame();
        this.spGengduo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
    };
    p.toGameStartView = function (e) {
        GameData.curScene = 1;
        GameData.sorce = 0;
        GameData.langNum = 0;
        GameData.huliNum = 0;
        GameData.bianfuNum = 0;
        GameData.isPause = true;
        GameData.count = 0;
        GameData.profectNum = 0;
        GameData.stopCreateEnemy = 0;
        GameData.redGirlDistance = 0;
        GameData.blod = 5;
        this.spGengduo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
        this.spFenXiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toShareView, this);
        this.spZaiLai.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStartView, this);
        this.removeChildren();
        if (this.parent)
            this.parent.removeChild(this);
        GameSceneView._gameScene.start();
    };
    p.touchShare = function (e) {
        this.sp.visible = false;
    };
    p.initEnemy = function (num) {
        if (num === void 0) { num = 0; }
        if (num == 1 || num == 2) {
            this.boo1 = true;
            var lang = StarlingSwfFactory.getInstance().makeMc("lang");
            this.thisContainer.addChild(lang);
            lang.goToPlay("run");
            lang.y = 340;
            lang.x = 140 + lang.width;
            this.langW = lang.x;
            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue(0 + "");
            this.t1.x = lang.x - this.t1.width / 2;
            this.t1.y = lang.y + lang.height * 0.6 - 20;
        }
        else if (num == 3 || num == 4) {
            this.boo1 = true;
            this.boo2 = true;
            var lang = StarlingSwfFactory.getInstance().makeMc("lang");
            var huli = StarlingSwfFactory.getInstance().makeMc("huli");
            this.thisContainer.addChild(lang);
            this.thisContainer.addChild(huli);
            lang.goToPlay("run");
            huli.goToPlay("run");
            huli.y = 320;
            lang.y = 340;
            lang.x = (220 + lang.width) / 2;
            huli.x = lang.x + lang.width + 60;
            this.langW = lang.x;
            this.huliW = huli.x;
            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue(0 + "");
            this.t1.x = lang.x - this.t1.width / 2;
            this.t1.y = lang.y + lang.height * 0.6 - 20;
            this.t2 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t2);
            this.t2.setValue(0 + "");
            this.t2.x = huli.x - this.t2.width / 2;
            this.t2.y = huli.y + lang.height * 0.6;
        }
        else if (num == 5 || num == 6) {
            this.boo1 = true;
            this.boo2 = true;
            this.boo3 = true;
            var lang = StarlingSwfFactory.getInstance().makeMc("lang");
            var huli = StarlingSwfFactory.getInstance().makeMc("huli");
            var bianfu = StarlingSwfFactory.getInstance().makeMc("bianfu");
            this.thisContainer.addChild(lang);
            this.thisContainer.addChild(huli);
            this.thisContainer.addChild(bianfu);
            lang.goToPlay("run");
            huli.goToPlay("run");
            bianfu.goToPlay("run");
            huli.y = 320;
            bianfu.y = 335;
            lang.y = 340;
            lang.x = 90;
            huli.x = lang.x + lang.width + 60;
            this.huliW = huli.x;
            this.langW = lang.x;
            bianfu.x = huli.x + huli.width + 70;
            this.bianfuW = bianfu.x;
            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue(0 + "");
            this.t1.x = lang.x - this.t1.width / 2;
            this.t1.y = lang.y + lang.height * 0.6 - 20;
            this.t2 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t2);
            this.t2.setValue(0 + "");
            this.t2.x = huli.x - this.t2.width / 2;
            this.t2.y = huli.y + lang.height * 0.6;
            this.t3 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t3);
            this.t3.setValue(0 + "");
            this.t3.x = bianfu.x - this.t3.width / 2;
            this.t3.y = bianfu.y + lang.height * 0.6 - 15;
        }
    };
    return GameOverView;
}(egret.Sprite));
egret.registerClass(GameOverView,'GameOverView');
