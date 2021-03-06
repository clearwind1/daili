// TypeScript file
//名片
class MPPageShow extends Othercontainer{

    /**
     *显示名片
     */
    private textbtn: GameUtil.Menu[];
    private selectbtn: GameUtil.Menu = null;
    private mpcontant: egret.DisplayObjectContainer;
    
    public constructor() {
        super();
    }

    protected show() {
        this.showmingpian();
    }

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
            if (i < GameData._i().GameLevel) {
                this.textbtn[i].getBtnText().textColor = 0xff0000;
            }
        }
        this.selectbtn = this.textbtn[GameData._i().GameLevel];
        this.showmpcontant(GameData._i().GameLevel);
    }

    private showmpcontant(mpid: number) {

        if (mpid < GameData._i().GameLevel) {
            var tip: GameUtil.TipsPanel = new GameUtil.TipsPanel(null, '等级不够',true);
            this.addChild(tip);
            return;
        }        

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
        mpqr.$setAnchorOffsetX(mpqr.width / 2);
        mpqr.$setAnchorOffsetY(mpqr.height / 2);
        mpqr.x = this.mStageW / 2;
        mpqr.y = this.mStageH / 2;
        this.mpcontant.addChild(mpqr);

    }

}