/**
 * Created by Channing on 2014/10/13.
 */
var GameFightTwoView = (function (_super) {
    __extends(GameFightTwoView, _super);
    function GameFightTwoView() {
        _super.call(this);
        this.showXin = 0;
        this.shandian = 0;
        GameData.bgSpeed = 3;
        this.totalEnemyNum = 80; //
        this.boshu = 1;
        this.oneToTwo = 14; //
        this.curScene = 2;
        GameData.enemySpeed = 8;
        this.timeBoo = 0;
        this.showEnemyTime = 30;
        this.showResizeBtn = 30;
        this.totalEnemy = 0;
        this.freeTime = 3;
        this.showXin = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.shandian = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        if (this.showXin == this.shandian) {
            this.shandian = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        }
        egret.Ticker.getInstance().register(this.showEnemyFun, this);
    }
    var d = __define,c=GameFightTwoView,p=c.prototype;
    p.showEnemyFun = function () {
        if (this.isShowTwoEnemy) {
            this.showEnemyFunNum++;
            if (this.showEnemyFunNum == 10) {
                this.showEnemyFunNum = 0;
                GameData.enemySpeed = 8;
                this.showEnemyTime = Math.floor(Math.random() * 20 + 25);
            }
        }
    };
    //第二波怪物出现频率
    p.showTime = function () {
        this.isShowTwoEnemy = true;
        GameData.enemySpeed = 8;
    };
    p.hitOver = function (e, arr, index) {
        if (arr === void 0) { arr = []; }
        if (index === void 0) { index = 0; }
        if (e.type == 1) {
            e.gotoDie();
            e.stopMove = true;
            GameData.langNum++;
        }
        else if (e.type == 2) {
            e.gotoDie();
            e.stopMove = true;
            this.shanBoo = true;
            GameData.blod--;
            this.blodBar.scaleBlodX();
        }
        else if (e.type == 6) {
            e.alphaToZero();
            e.stopMove = true;
            GameData.blod += 3;
            if (GameData.blod > 5)
                GameData.blod = 5;
            this.blodBar.scaleBlodX();
        }
        else if (e.type == 7) {
            e.alphaToZero();
            GameData.profectNum += 10;
            e.stopMove = true;
        }
    };
    //创建怪
    p.createEnemy = function () {
        if (this.boshu == 1) {
            this.initEnemy(2);
        }
        else if (this.boshu == 2) {
            this.initEnemy(1);
        }
    };
    p.initEnemy = function (type) {
        if (type == 1) {
            this.typeOne(type);
        }
        else if (type == 2) {
            this.typeTwo(type);
        }
    };
    p.isShowDaoJu = function (enemy2, enemy1) {
        if (enemy2 === void 0) { enemy2 = null; }
        if (enemy1 === void 0) { enemy1 = null; }
        var nn = enemy1.row;
        var b = 0;
        if (nn == 1) {
            b = Math.floor(Math.random() * 3 + 2);
            enemy2.row = b;
            enemy2.x = this.btnArr[b - 1].x + this.widthPoint;
        }
        else if (nn == 2) {
            b = Math.floor(Math.random() * 2 + 3);
            enemy2.row = b;
            enemy2.x = this.btnArr[b - 1].x + this.widthPoint;
        }
        else if (nn == 3) {
            b = Math.floor(Math.random() * 2 + 1);
            enemy2.row = b;
            enemy2.x = this.btnArr[b - 1].x + this.widthPoint;
        }
        else if (nn == 4) {
            b = Math.floor(Math.random() * 3 + 1);
            enemy2.row = b;
            enemy2.x = this.btnArr[b - 1].x + this.widthPoint;
        }
        this.pushEnemy(b, enemy2);
    };
    p.pushEnemy = function (row, enemy) {
        if (row === void 0) { row = 0; }
        if (enemy === void 0) { enemy = null; }
        if (row == 1) {
            this.oneEnemyArr.push(enemy);
        }
        else if (row == 2) {
            this.twoEnemyArr.push(enemy);
        }
        else if (row == 3) {
            this.threeEnemyArr.push(enemy);
        }
        else if (row == 4) {
            this.fourEnemyArr.push(enemy);
        }
    };
    p.over = function () {
        egret.Ticker.getInstance().unregister(this.showEnemyFun, this);
        this.isStart = false;
        GameData.curScene = 3;
        egret.Tween.removeAllTweens();
        this.dispose();
        GameSceneView._gameScene.play();
    };
    p.initBoShu = function () {
        this.timeBoo = 0;
        if (this.totalEnemy >= this.totalEnemyNum) {
            this.stopGame = true;
            if (GameFightView.allArr[0].length == 0 && GameFightView.allArr[1].length == 0 &&
                GameFightView.allArr[2].length == 0 && GameFightView.allArr[3].length == 0) {
                this.gameWin();
            }
            return;
        }
        else if (this.totalEnemy == this.oneToTwo) {
            GameData.stopCreateEnemy = 1;
            GameData.count++;
            GameData.redGirlDistance++;
            if (GameData.count > this.freeTime) {
                this.boshu = 2;
                GameData.count = 0;
                GameData.stopCreateEnemy = 0;
                this.showTime();
            }
        }
    };
    p.typeOne = function (type) {
        if (type === void 0) { type = 0; }
        var enemy1 = new Enemy(type);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(enemy1);
        var ab = Math.floor(Math.random() * 4 + 1);
        enemy1.row = ab;
        enemy1.x = this.btnArr[enemy1.row - 1].x + this.widthPoint;
        enemy1.name = "enemy1_1" + this.totalEnemy;
        this.pushEnemy(ab, enemy1);
        if (this.isShowTwoEnemy) {
            var enemy2;
            if (this.totalEnemy == this.showXin) {
                enemy2 = new Enemy(6);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_21" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
                return;
            }
            else if (this.totalEnemy == this.shandian) {
                enemy2 = new Enemy(7);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_12" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
                return;
            }
            var n = Math.floor(Math.random() * 6 + 1);
            if (n == 1 || n == 2 || n == 3 || n == 4) {
                var enemy2 = new Enemy(2);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_23" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
            }
            else if (n == 6) {
                var enemy2 = new Enemy(1);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_14" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
            }
        }
    };
    p.typeTwo = function (type) {
        if (type === void 0) { type = 0; }
        var n = Math.floor(Math.random() * 2 + 1);
        //        var enemy1:Enemy = new Enemy(type);
        //        this.enemySp.addChild(enemy1);
        if (n == 1 || n == 4) {
            var enemy3 = new Enemy(type);
            this.enemySp.addChild(enemy3);
        }
        else {
            var enemy3 = new Enemy(1);
            this.enemySp.addChild(enemy3);
        }
        var b = Math.floor(Math.random() * 4 + 1);
        enemy3.row = b;
        enemy3.x = this.btnArr[b - 1].x + this.widthPoint;
        enemy3.name = "enemy1_2" + this.totalEnemy;
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.pushEnemy(enemy3.row, enemy3);
        if (this.isShowTwoEnemy) {
            var enemy1;
            if (this.totalEnemy == this.showXin) {
                enemy1 = new Enemy(6);
                this.enemySp.addChild(enemy1);
                enemy1.name = "enemy1_d_1" + this.totalEnemy;
                this.isShowDaoJu(enemy1, enemy3);
                return;
            }
            else if (this.totalEnemy == this.shandian) {
                enemy1 = new Enemy(7);
                this.enemySp.addChild(enemy1);
                enemy1.name = "enemy1_d_2" + this.totalEnemy;
                this.isShowDaoJu(enemy1, enemy3);
                return;
            }
            var n = Math.floor(Math.random() * 6 + 1);
            if (n == 1 || n == 2 || n == 3 || n == 4) {
                var enemy2 = new Enemy(2);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_2" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
            }
            else if (n == 6) {
                var enemy2 = new Enemy(1);
                this.enemySp.addChild(enemy2);
                enemy2.name = "enemy2_1" + this.totalEnemy;
                this.isShowDaoJu(enemy2, enemy1);
            }
        }
    };
    return GameFightTwoView;
}(GameFightView));
egret.registerClass(GameFightTwoView,'GameFightTwoView');
