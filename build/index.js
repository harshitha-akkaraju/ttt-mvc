"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model");
var View = /** @class */ (function () {
    function View(game, ctrl) {
        this.game = game;
        this.ctrl = ctrl;
    }
    View.prototype.display = function () {
        var _this = this;
        console.log("displaying...");
        var gamebox = $('#game-box');
        gamebox.empty(); //clear old display
        var _loop_1 = function (i) {
            var row = $('<div>'); //a row for the button
            var _loop_2 = function (j) {
                var button = $('<button class="btn btn-outline-secondary">' + model_1.Player[this_1.game.getPiece(i, j)] + '</button>');
                button.click(function (e) { return _this.handleClick(i, j); }); //closure!!
                row.append(button);
            };
            for (var j = 0; j < this_1.game.size; j++) {
                _loop_2(j);
            }
            gamebox.append(row);
        };
        var this_1 = this;
        // make grid of buttons
        for (var i = 0; i < this.game.size; i++) {
            _loop_1(i);
        }
        //show winner, if any
        var winner = game.getWinner();
        if (winner !== model_1.Player[' ']) {
            this.showWinner(winner);
            $('button').attr('disabled', 'disabled'); //disable all the buttons
        }
        else {
            this.showPrompt(); //show prompt for next move
        }
    };
    //callback for clicking
    View.prototype.handleClick = function (row, col) {
        this.ctrl.takeTurn(row, col); //tell controller what to do
    };
    View.prototype.showPrompt = function () {
        $('#message').html('<p class="lead">' + model_1.Player[game.getCurrentPlayer()] + "'s turn. Pick a spot!" + '</p>');
    };
    View.prototype.showWinner = function (winner) {
        $('#message').html('<p class="lead">' + model_1.Player[winner] + " is the winner!" + '</p>');
    };
    //observer
    View.prototype.notify = function () {
        this.display();
    };
    return View;
}());
var Controller = /** @class */ (function () {
    function Controller(game) {
        this.game = game;
        this.view = new View(game, this);
        this.game.register(this.view); //connect game and view
        this.view.display(); //show the initial view
    }
    //when told what to do, pass it along to the game
    Controller.prototype.takeTurn = function (row, col) {
        if (this.game.getWinner() === model_1.Player[' '])
            this.game.makeMove(row, col);
    };
    return Controller;
}());
//run the program!
var game = new model_1.TTTGame();
// game.makeMove(0,0); //x //debugging
// game.makeMove(0,1); //o
// game.makeMove(1,0); //x
// game.makeMove(1,1); //o
// game.makeMove(2,0); //x
var ctrl = new Controller(game); //will create the View
//# sourceMappingURL=index.js.map