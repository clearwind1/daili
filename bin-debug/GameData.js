/**
 * Created by pior on 16/12/15.
 * 游戏数据
 */
var GameData = (function () {
    function GameData() {
        this.gamesound = []; //游戏声音
        this.init();
    }
    var d = __define,c=GameData,p=c.prototype;
    p.init = function () {
        this.isLoadingend = false;
        this.GameLevel = -1;
        this.TotalIncome = 0;
        this.TodayIncome = 0;
    };
    GameData._i = function () {
        return (this._inst = (this._inst == null ? new GameData() : this._inst));
    };
    GameData._inst = null;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
//# sourceMappingURL=GameData.js.map