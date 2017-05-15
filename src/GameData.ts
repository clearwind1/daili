/**
 * Created by pior on 16/12/15.
 * 游戏数据
 */

class GameData {

    public isLoadingend: boolean;           //游戏加载进度结束标志
    public gamesound: MySound[] = [];       //游戏声音
    public GameLevel: number;               //代理等级
    public TotalIncome: number;             //累积收入
    public TodayIncome: number;             //今日收入

    public constructor() {
        this.init();
    }

    private init()
    {
        this.isLoadingend = false;
        this.GameLevel = -1;
        this.TotalIncome = 0;
        this.TodayIncome = 0;
    }

    private static _inst:GameData = null;

    public static _i():GameData
    {
        return (this._inst = (this._inst==null ? new GameData():this._inst));
    }
}