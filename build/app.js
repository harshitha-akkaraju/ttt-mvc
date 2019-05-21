"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
//for CLI interactiv
var readline = require('readline');
var io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Controller = /** @class */ (function () {
    function Controller(game, view) {
        this.game = game;
        this.view = view;
    }
    Controller.prototype.start = function () {
        this.view.display();
        this.takeTurn();
    };
    Controller.prototype.takeTurn = function () {
        var _this = this;
        this.view.showPrompt();
        io.question('> ', function (input) {
            try {
                var cell = input.split(',');
                var wasLegal = game.makeMove(Number(cell[0]), Number(cell[1]));
                if (wasLegal) {
                    _this.view.display();
                    if (game.getWinner() !== model_1.Player[' ']) {
                        _this.view.showWinner(game.getWinner());
                        io.close();
                        return; //end
                    }
                }
            }
            catch (e) { } //for parsing errors
            _this.takeTurn(); //recurse!
        });
    };
    return Controller;
}());
var View = /** @class */ (function () {
    function View(game) {
        this.game = game;
    }
    //draw the game board
    View.prototype.display = function () {
        console.log("    0   1   2");
        for (var i = 0; i < this.game.size; i++) {
            var row = i + "   ";
            for (var j = 0; j < this.game.size; j++) {
                row += model_1.Player[this.game.getPiece(i, j)];
                if (j < this.game.size - 1)
                    row += " | ";
            }
            console.log(row);
            if (i < this.game.size - 1)
                console.log("   -----------");
        }
        console.log("");
    };
    View.prototype.showPrompt = function () {
        console.log(model_1.Player[game.getCurrentPlayer()] + "'s turn. Pick a spot [row, col]");
    };
    View.prototype.showWinner = function (winner) {
        console.log(model_1.Player[winner] + " is the winner!");
    };
    return View;
}());
//run the program!
var game = new model_1.TTTGame();
var view = new View(game);
var ctrl = new Controller(game, view);
ctrl.start();
//# sourceMappingURL=app.js.map