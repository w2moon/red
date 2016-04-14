/**
 * Created by FCX on 3/14/2016.
 */
class SoundBase extends egret.DisplayObjectContainer{

    public constructor (url?:string) {
        super();
        if(url)
            this._soundURL = url;

        this._sound = new egret.Sound();
        this._loadSound();

    }

    private _sound:egret.Sound;

    private _soundURL:string = "bgSound";

    private _soundChannel:egret.SoundChannel;
    //ĬÈϲ¥·ÅλÖã¬´Óͷ¿ªʼµÄ
    private _positon:number = 0;
    //ĬÈϲ»ѭ»·£¬ÉèÖÃΪ¸ºÊýѭ»·
    private _loop:number = 1;
    //µ±ǰ״̬0λ¿գ¬1λ²¥·ţ¬2λÔÝͣ, 3±íʾ¼ÓÔØÍê³É,4±íʾ¼ÓÔØʧ°Ü
    private _status:number = 0;
    //¼ÓÔØÒôƵ
    private _loadSound() {
        /*
        if(RES.getRes(this._soundURL)){
            this._sound = RES.getRes(this._soundURL);
        }else{
            //Èç¹ûRESÖÐδ¼ÓÔظÃ×ÊԴ£¬³¢ÊԾø¶Ô·¾¶¼ÓÔØ֮¡£
            this._sound.once(egret.Event.COMPLETE,this.loadComplete,this);
            this._sound.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
            this._sound.load(this._soundURL);
        }
        */
    }
    //¼ÓÔØÒôƵÍê³É
    private loadComplete (e:egret.Event) {
        this._status = 3;
        var waring:string = "¼ÓÔØÍê³É";
        egret.log(waring);
        //ɾ³ý¼ÓÔØʧ°ܵļàÌý
        this._sound.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this)
        this.dispatchEventWith(egret.Event.COMPLETE,false,waring);
    }
    //¼ÓÔØÒôƵʧ°Ü
    private onLoadErr (e:egret.IOErrorEvent) {
        this._status = 4;
        var waring:string = "¼ÓÔØʧ°Ü"+this._soundURL;
        egret.log(waring);
        //ɾ³ý¼ÓÔسɹ¦µļàÌý
        this._sound.removeEventListener(egret.Event.COMPLETE,this.loadComplete,this);
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR,false,waring);
    }
    //ÉèÖÃurl²¢ÖØÐ¼ÓÔØ
    public setUrl(url:string) {
        this._soundURL = url;
        this._loadSound();
    }
    //ÉèÖÃѭ»·
    private looped(e:egret.Event){
        console.log("looped");
        this._soundChannel = null;
        this._positon = 0;
        this._status = 0;
        var waring: string = "²¥·ÅÍê³É";
        if(this._loop >= 0) {
            this.dispatchEventWith(egret.Event.SOUND_COMPLETE,false,waring);
        } else {
            this.play();
        }
    }
    //»ñȡ״̬
    public getStatus() {
        return this._status;
    }
    //ÉèÖÃÒôÁ¿
    public setVolume (volume:number) {
        console.log(this._status);
        if(1 === this._status)
            this._soundChannel.volume = volume / 100;
    }
    //ÏÔʾ²¥·Åʱ¼ä
    public showPosition ():number {

        if(1 === this._status)
            this._positon = this._soundChannel.position;
        return this._positon;
    }
    //²¥·ÅÒôƵ
    public play() {
        return;
        if(4 === this._status){
            this._loadSound();
            return;
        }
        this._status = 1;
        if(this._soundChannel)
            this._soundChannel.stop();

        this._soundChannel = this._sound.play(this._positon,1);

        this._soundChannel.once(egret.Event.SOUND_COMPLETE,this.looped,this);

        return this._status;
    }
    //ÉèÖÃѭ»·
    public setLoop(loop:number = 1):number{
        this._loop = loop;

        return loop;
    }
    //ÉèÖÃÔÝͣ
    public pause () {
        var temp = this._status;
        if(1 === temp){
            this._positon = this._soundChannel.position;
            this._soundChannel.stop();
            this._status = 2;
        }
        egret.log(this._positon);
        return temp;
    }
    //»ָ´
    public resume () {
        var temp = this._status;
        if(2 === temp) {
            this.play();

        }
        egret.log(this._positon);
        return temp;
    }
    //ֹͣ
    public stop () {
        this._status = 0;
        this._positon = 0;
        this._soundChannel.stop();
        this._soundChannel = null;
    }
}