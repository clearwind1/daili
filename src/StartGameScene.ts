/**
 * Created by pior on 16/9/9.
 */

class StartGameScene extends GameUtil.BassPanel {

    private bottombtn: GameUtil.Menu[];
    private bottomselectbtn: GameUtil.Menu = null;
    private otherpagecon: egret.DisplayObjectContainer;

    public constructor() {
        super();
    }

    public init() {

        // var param: Object = {
        //     id: '0000',
        //     agentParentId:'123431'
        // }
        // GameUtil.Http.getinstance().send(param, '/api/AgentUser/updateAgentUserOne', (data) => { console.log(data); }, this);        

        // return;

        this.bottombtn = [];

        document.title = '来一局助手';

        var covshap: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0xffffff);
        this.addChild(covshap);

        this.showhomepage();

        this.otherpagecon = new egret.DisplayObjectContainer;
        this.addChild(this.otherpagecon);


        //底部导航栏        
        var bottomshap: egret.Shape = GameUtil.createRect(0, this.mStageH, this.mStageW, 160, 1, 0x9e9b9b);
        bottomshap.$setAnchorOffsetY(160);
        this.addChild(bottomshap);
        var btntext: string[] = ['首页', '代理', '玩家', '房卡', '我的'];
        for (var i: number = 0; i < 5; i++) {
            this.bottombtn[i] = new GameUtil.Menu(this, 'img_png', 'img_png', this.showpage, [i]);
            this.bottombtn[i].x = this.mStageW / 2 + (i - 2) * 100;
            this.bottombtn[i].y = this.mStageH - 110;
            this.bottombtn[i].addButtonText(btntext[i], 25,0,50);
            this.addChild(this.bottombtn[i]);
        }
        this.bottomselectbtn = this.bottombtn[0];
        this.bottomselectbtn.getBtnText().textColor = 0xff0000;
        this.showpage(0);

    }
    private showpage(btnid: number) {
        this.bottomselectbtn.getBtnText().textColor = 0x000000;
        this.bottombtn[btnid].getBtnText().textColor = 0xff0000;
        this.bottomselectbtn = this.bottombtn[btnid];

        if (btnid == 0) {
            this.otherpagecon.removeChildren();
        }
        
    }
    /**
     *主页
     */
    private showhomepage() {

        var topshap: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, 300, 1, 0x9e9b9b);
        this.addChild(topshap);        

        var mptextbtn: GameUtil.Menu = new GameUtil.Menu(this, '', '', this.showmingpian);
        mptextbtn.addButtonText('名片', 35);
        mptextbtn.x = 50;
        mptextbtn.y = 70;
        this.addChild(mptextbtn);

        var mrtextbtn: GameUtil.Menu = new GameUtil.Menu(this, '', '', this.showmoneyrecord);
        mrtextbtn.addButtonText('收入记录', 35);
        mrtextbtn.x = this.mStageW - 30;
        mrtextbtn.y = 70;
        this.addChild(mrtextbtn);
        mrtextbtn.$setAnchorOffsetX(mrtextbtn.width / 2);
        
        var totalget: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW / 2, 110, 40);
        totalget.setText('累积收入');
        this.addChild(totalget);
        var incometext: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW / 2, 155, 40);
        incometext.setText(GameData._i().TotalIncome + '元');
        this.addChild(incometext);

        var todayincomtip: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW / 2 - 200, 200, 30);
        todayincomtip.setText('今日收入');
        this.addChild(todayincomtip);
        var todayincomtip: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW / 2 - 200, 235, 30);
        todayincomtip.setText(GameData._i().TodayIncome+'元');
        this.addChild(todayincomtip);

        var cangettip: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW / 2 + 200, 200, 30);
        cangettip.setText('可提现');
        this.addChild(cangettip);
        var cangettip: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW / 2 + 200, 235, 30);
        cangettip.setText(GameData._i().TotalIncome+'元');
        this.addChild(cangettip);
    }
    //名片显示
    private showmingpian() {
        this.otherpagecon.addChild(new MPPageShow());
    }
    //收入记录显示
    private showmoneyrecord() {
        
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