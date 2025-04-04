var rush = rush || {};

rush.Coin = (function(){
  function Coin() {
    this.initialize();
  }
  var p = Coin.prototype = new rush.GameObject();

  // instance variables
  p.category = 'coin';

  p.width = 16;
  p.height = 16;

  // put registration point to the bottom center.
  p.regX = p.width/2;
  p.regY = p.height;

  p.GameObject_initialize = p.initialize;
  p.initialize = function() {
    this.GameObject_initialize();


    // copy from zoe exported coin.json file.
    // frame: [x, y, width, height, imageIndex, regX, regY]
    var spritesheetData = {"images": ["images/coin.png"], "frames": [[0, 0, 16, 16, 0, 0, 0], [16, 0, 16, 16, 0, 0, 0], [32, 0, 16, 16, 0, 0, 0], [48, 0, 16, 16, 0, 0, 0], [64, 0, 16, 16, 0, 0, 0], [80, 0, 16, 16, 0, 0, 0], [96, 0, 16, 16, 0, 0, 0]], "animations": {"all": {"frames": [0, 1, 2, 3, 4, 5, 6, 1, 0], frequency:18}}}
    var spritesheet = new createjs.SpriteSheet(spritesheetData);
    this.animation = new createjs.Sprite(spritesheet);
    this.animation.gotoAndPlay("all");

    this.addChild(this.animation);
  }

  return Coin;
})();