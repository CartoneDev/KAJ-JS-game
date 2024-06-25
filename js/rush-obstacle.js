var rush = rush || {};

function init() {
  this.GameObject_initialize();
  var spritesheetData = {
    "images": ["images/obstacle.png"], 
    "frames": [[0, 0, 32, 16, 0, 0, 0], [32, 0, 32, 16, 0, 0, 0]], 
    "animations": {
      "all": {
        "frames": [0, 1], 
        "frequency": 5
      }
    }
  };

  var spritesheet = new createjs.SpriteSheet(spritesheetData);

  this.animation = new createjs.Sprite(spritesheet);
  this.animation.gotoAndPlay("all");
  this.addChild(this.animation);
}

function createObstacle() {
  function Obstacle() {
    this.initialize();
  }
  var p = Obstacle.prototype = new rush.GameObject();

  p.category = 'obstacle';
  p.width = 20;
  p.height = 10;
  p.regX = p.width / 2;
  p.regY = p.height;
  p.GameObject_initialize = p.initialize;
  p.initialize = init;

  return Obstacle;
}

rush.Obstacle = createObstacle();