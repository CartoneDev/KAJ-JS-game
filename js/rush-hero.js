var rush = rush || {};

function jump() {
  if (this.onGround) {
    this.velocity.y = -10;
  }
}

function tick() {
  this.MovableGameObject_tick();
  this.velocity.x = 3;
}

function init() {
  this.MovableGameObject_initialize();

  this.category = 'hero';
  this.width = 10;
  this.height = 16;
  this.regX = this.width/2;
  this.regY = this.height;

  var spritesheetData = {"images": ["images/running.png"], "frames": [[0, 0, 16, 16, 0, 0, 0], [16, 0, 16, 16, 0, 0, 0], [32, 0, 16, 16, 0, 0, 0], [48, 0, 16, 16, 0, 0, 0]], "animations": {"all": {"frames": [0, 1, 2, 3], frequency:4}}}
  var spritesheet = new createjs.SpriteSheet(spritesheetData);

  this.animation = new createjs.Sprite(spritesheet);
  this.animation.gotoAndPlay('all');
  this.animation.y = 2;
  this.addChild(this.animation);

  this.collisionPoints = [
    new createjs.Point(this.width/2, this.height),
    new createjs.Point(this.width, this.height/2),
  ];
}

function createHero() {
  function Hero() {
    this.initialize();
  };

  var p = Hero.prototype = new rush.MovableGameObject();

  p.MovableGameObject_initialize = p.initialize;
  p.initialize = init;
  p.jump = jump;
  p.MovableGameObject_tick = p.tick;
  p.tick = tick;

  return Hero;
}

rush.Hero = createHero();