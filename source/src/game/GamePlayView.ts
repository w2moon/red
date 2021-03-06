/**
 * Created by Channing on 2014/10/9.
 */
class GamePlayView extends egret.Sprite{

    private thisContainer:egret.Bitmap;
    private ready:StarlingSwfMovieClip;
    private target:GameFightView;
    private optionView:OptionView;
    private sp:egret.Sprite;

    constructor()
    {
        super();
        this.sp = new egret.Sprite();
        this.sp.touchEnabled = true;
        this.addChild(this.sp);
    }
    public showGame(index:number):void
    {
        GameData.isStartClickOption = true;
        GameData.isStart = false;
        var optionBtn:egret.Sprite = new egret.Sprite();
        var optionBmp:egret.Bitmap = ResourceUtils.createBitmapByName("optionBtnImage");
        optionBtn.addChild(optionBmp);
        optionBtn.touchEnabled = true;
        optionBtn.x = Const.SCENT_WIDTH-optionBtn.width;
        optionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showOptionView,this);

        this.sp.removeChildren();
        switch (index) {
            case 1:
                var game1:GameFightOneView = new GameFightOneView();
                this.sp.addChild(game1);
                this.target = game1;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_1_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 2:
                var game2:GameFightTwoView = new GameFightTwoView();
                this.sp.addChild(game2);
                this.target = game2;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_2_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 3:
                var game3:GameFightThreeView = new GameFightThreeView();
                this.sp.addChild(game3);
                this.target = game3;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_3_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 4:
                var game4:GameFightFourView = new GameFightFourView();
                this.sp.addChild(game4);
                this.target = game4;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_4_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 5:
                var game5:GameFightFiveView = new GameFightFiveView();
                this.sp.addChild(game5);
                this.target = game5;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_5_Image");
                this.sp.addChild(this.thisContainer);
                break;
        }

        this.addChild(optionBtn);

        this.optionView = new OptionView();
        this.addChild(this.optionView);
        this.optionView.visible = false;

        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startHandler, this);
    }
    private startHandler(e:egret.TouchEvent):void
    {
        if(this.optionView.visible == true) return;
        if(GameData.isClickBtn) return;
        GameData.isStart = true;
        this.sp.removeChild(this.thisContainer);
        this.sp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startHandler, this);
        this.thisContainer = null;
        this.sp.touchEnabled = false;
        this.ready = StarlingSwfFactory.getInstance().makeMc("go");
        this.ready.x = Const.SCENT_WIDTH/2;
        this.ready.y = Const.SCENT_HEIGHT/2;
        this.addChild(this.ready);
        this.ready.goToPlay("1");
        SoundUtils.instance().playNum();

        GameData.isStartClickOption = false;
        this.ready.setCompleteAction(this.complete1,this);
    }
    private showOptionView():void
    {
        if(GameData.isStartClickOption)
        {
            this.optionView.visible = true;
            GameData.isPause = true;
        }
    }
    private complete1():void
    {
        this.ready.goToPlay("2");
        SoundUtils.instance().playGo();
        egret.setTimeout(this.complete2.bind(this), this,300);
    }
    private complete2():void {
        GameData.isStartClickOption = true;
        GameData.isStart = true;
        GameData.isPause = false;
        SoundUtils.instance().playBg();
        this.target.redGirl.run();
        this.removeChild(this.ready);
    }
}