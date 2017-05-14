/**
 * Created by pior on 16/9/9.
 */

class StartGameScene extends GameUtil.BassPanel {

    public constructor() {
        super();
    }

    public init() {

        var covshap: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0xffffff);
        this.addChild(covshap);

        this.showmingpian();

        // window.location.href = 'weixin://';

        // return;

        //         var param: Object = {
        //             fname: 'yang',
        //             age: 18
        //         }
        //         GameUtil.Http.getinstance().send(param, '', (data) => { console.log(data['a']); }, this,'localhost/test.php');
        // // public send( param:any, file?:string, loaded:Function = null, thisObj:any = null,url:string=GameConfig.IP):
        //         return;

        //   var data: any = {
        //         'code': 1
        //     };
        //     this.show(data);
    }
    /**
     *显示名片
     */
    private textbtn: GameUtil.Menu[];
    private selectbtn: GameUtil.Menu = null;
    private mpcontant: egret.DisplayObjectContainer;

    private showmingpian() {
        this.textbtn = [];
        this.mpcontant = new egret.DisplayObjectContainer();
        this.addChild(this.mpcontant);
        document.title = '二维码名片';

        var btntext: string[] = ['招区域代理', '招一级代理', '招二级代理', '店铺名片'];
        for (var i: number = 0; i < 4; i++) {
            this.textbtn[i] = new GameUtil.Menu(this, '', '', this.showmpcontant, [i]);
            this.textbtn[i].addButtonText(btntext[i], 40);
            this.addChild(this.textbtn[i]);
            this.textbtn[i].x = this.mStageW / 2 - 200 + 400 * (i % 2);
            this.textbtn[i].y = 100 + 70 * Math.floor(i / 2);
        }
        this.selectbtn = this.textbtn[0];
        this.showmpcontant(0);
    }
    
    private showmpcontant(mpid: number) {
        console.log('mpid====', mpid);
        this.selectbtn.getBtnText().textColor = 0x000000;
        this.textbtn[mpid].getBtnText().textColor = 0x2200ff;
        this.selectbtn = this.textbtn[mpid];
        //this.selectbtn = textbtn;

        this.mpcontant.removeChildren();

        var wkuan: egret.Shape = GameUtil.createRect(this.mStageW / 2, this.mStageH / 2, 500, 650, 1, 0x000000);
        wkuan.$setAnchorOffsetX(wkuan.width / 2);
        wkuan.$setAnchorOffsetY(wkuan.height / 2);
        this.mpcontant.addChild(wkuan);

        var nkuan: egret.Shape = GameUtil.createRect(this.mStageW / 2, this.mStageH / 2, 450, 600, 1, 0xffffff);
        nkuan.$setAnchorOffsetX(nkuan.width / 2);
        nkuan.$setAnchorOffsetY(nkuan.height / 2);
        this.mpcontant.addChild(nkuan);

        var texttip: string[] = ['招募来一局区域代理', '招募来一局一级代理', '招募来一局二级代理', '来一局助手房卡直充'];
        var textttf: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW / 2 - 200, this.mStageH / 2 - 250, 30, 0);
        textttf.setText(texttip[mpid]);
        this.mpcontant.addChild(textttf);

        var textttf2: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW / 2, this.mStageH / 2 + 250, 30);
        textttf2.setText('微信扫一扫识别注册');
        this.mpcontant.addChild(textttf2);

        var mpqr = qr.QRCode.create('https://www.baidu.com', 0x000000, 400, 400);
        mpqr.$setAnchorOffsetX(mpqr.width/2);
        mpqr.$setAnchorOffsetY(mpqr.height/2);
        mpqr.x = this.mStageW / 2;
        mpqr.y = this.mStageH / 2;
        this.mpcontant.addChild(mpqr);

    }

    private show(data: any) {
        if (data['code'] == 1) {
            this.showbg();
            //PlayerData._i().UserInfo.ID = data['userid'];
            //console.log('PlayerData._i().UserInfo.ID=========', PlayerData._i().UserInfo.ID);
        }
        else {
            GameUtil.trace(data['msg']);
        }
    }
    /**显示背景界面 */
    private showbg() {

        var bg: MyBitmap = new MyBitmap(RES.getRes('startgamebg_png'), this.mStageW / 2, this.mStageH / 2);
        this.addChild(bg);
        var shap: MyBitmap = new MyBitmap(RES.getRes('startgamebg_png'), 0, 0);
        shap.setanchorOff(0, 0);
        shap.width = this.mStageW;
        shap.height = this.mStageH;
        this.addChild(shap);

        var gametitle: MyBitmap = new MyBitmap(RES.getRes('gametitle_png'), this.mStageW / 2, this.mStageH / 2 - 367);
        this.addChild(gametitle);

        if (!GameConfig.DEBUG) {
            //分享游戏
            if (GameUtil.getQueryString('shareopenid')) {
                this.getshare();
            }
            else {
                SharePage._i().getSignPackage();
                //SharePage._i().setNewUrl('http://' + GameConfig.GAMENAME + '.h5.gamexun.com/?shareopenid=' + PlayerData._i().UserInfo.openid);
            }
        }
    }

    private getshare() {
        var param: Object = {
            shareopenid: GameUtil.getQueryString('shareopenid'),
            //clickopenid: PlayerData._i().UserInfo.openid
        }
        GameUtil.Http.getinstance().send(param, "/" + GameConfig.SERVERNAME + "/updatesharedata", this.setshareresult, this);
    }
    private setshareresult(data: any) {
        if (data['code'] == 1) {
            SharePage._i().getSignPackage();
            //SharePage._i().setNewUrl('http://' + GameConfig.GAMENAME + '.h5.gamexun.com/?shareopenid=' + PlayerData._i().UserInfo.openid);
        }
        else {
            GameUtil.trace(data['msg']);
        }
    }
    /**开始游戏 */
    private startgame() {
        GameUtil.trace('startgame');
        GameUtil.GameScene.runscene(new GameScene());
    }
    /**游戏分享 */
    private share() {
        GameUtil.trace('share');
        if (!GameUtil.isSomeType(GameConfig.WeiXinstr)) {
            this.addChild(new GameUtil.TipsPanel(null, '请在微信中打开', true));
        } else {
            this.addChild(new SharePageShow());
        }
    }
    /**更多游戏 */
    private moregame() {
        //this.addChild(new MoreGamePage());
    }
}