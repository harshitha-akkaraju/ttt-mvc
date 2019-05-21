"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//differentiates between players (Player[' '] is "none")
var Player;
(function (Player) {
    Player[Player["X"] = 0] = "X";
    Player[Player["O"] = 1] = "O";
    Player[" "] = " ";
})(Player = exports.Player || (exports.Player = {}));
/**
 * Represents a game of Tic Tac Toe.
 * Board size is hard-coded at 3.
 */
var TTTGame = /** @class */ (function () {
    function TTTGame() {
        this.gameBoard = [];
        this.currentPlayer = Player.X;
        this.winner = Player[' '];
        this.size = 3; //hard-coded for simplicity
        /* Subject methods */
        this.observers = [];
        this.resetBoard(); //initialize board
    }
    TTTGame.prototype.resetBoard = function () {
        this.gameBoard = [
            [Player[' '], Player[' '], Player[' ']],
            [Player[' '], Player[' '], Player[' ']],
            [Player[' '], Player[' '], Player[' ']],
        ];
    };
    //returns if successful or not
    TTTGame.prototype.makeMove = function (x, y) {
        if (this.winner !== Player[' '])
            return false; //don't move if won
        if (x < 0 || x > 2 || y < 0 || y > 2)
            return false; //out of bounds
        if (this.gameBoard[x][y] !== Player[' '])
            return false; //don't move if occupied
        this.gameBoard[x][y] = this.currentPlayer; //make move
        /*check if we now have a winner*/
        var gb = this.gameBoard; //shortcut alias
        //check row
        if (gb[x][0] === gb[x][1] && gb[x][1] === gb[x][2])
            this.winner = this.currentPlayer;
        //check col
        if (gb[0][y] === gb[1][y] && gb[1][y] === gb[2][y])
            this.winner = this.currentPlayer;
        //check diag
        if (gb[1][1] !== Player[' '] && ((gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) ||
            (gb[2][0] === gb[1][1] && gb[1][1] === gb[0][2])))
            this.winner = this.currentPlayer;
        this.currentPlayer = (Number(this.currentPlayer) + 1) % 2; //toggle
        this.notifyAll();
        return true; //valid move
    };
    TTTGame.prototype.getPiece = function (x, y) {
        if (x < 0 || x > 2 || y < 0 || y > 2)
            return Player[' ']; //out of bounds
        return this.gameBoard[x][y];
    };
    TTTGame.prototype.getBoard = function () {
        return this.gameBoard;
    };
    TTTGame.prototype.getCurrentPlayer = function () {
        return this.currentPlayer;
    };
    TTTGame.prototype.getWinner = function () {
        return this.winner;
    };
    TTTGame.prototype.register = function (obs) {
        this.observers.push(obs);
    };
    TTTGame.prototype.unregister = function (obs) {
        var index = this.observers.indexOf(obs);
        this.observers.splice(index, 1);
    };
    TTTGame.prototype.notifyAll = function () {
        this.observers.forEach(function (obs) { return obs.notify(); });
    };
    return TTTGame;
}());
exports.TTTGame = TTTGame;
//# sourceMappingURL=model.js.map