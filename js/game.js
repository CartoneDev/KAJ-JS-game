// window/global scope
var rush = rush || {};

function startButtonClicked() {
    var menuScene = document.getElementById('menu');
    menuScene.classList.add('hidden');
    rush.game.initGame();
}

function restartButtonClicked() {
    var gameoverScene = document.getElementById('gameover');
    gameoverScene.classList.add('hidden');
    rush.game.initGame();
    createjs.Ticker.setPaused(false);
}

function startGame() {
    rush.game = new rush.Game();

    document.getElementById('start-btn').onclick = startButtonClicked;
    document.getElementById('restart-btn').onclick = restartButtonClicked;
    document.getElementById('top-scores-board').innerHTML = (new rush.TopScores()).toHTML();

}

window.onload = startGame;
