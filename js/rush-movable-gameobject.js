var rush = rush || {};

function init() {
  this.GameObject_initialize();
  this.velocity = new createjs.Point(0, 0);
  this.dropSpeed = 1;
  this.onGround = false;
  this.addEventListener('tick', this.tick.bind(this));
}

function tick(timeElapsed) {
  if (createjs.Ticker.getPaused()) return;

  // apply gravity
  this.velocity.y += this.dropSpeed;
  this.velocity.y = Math.min(this.velocity.y, 5);
}

function createMovableGameObject() {
  function MovableGameObject() {
    this.initialize();
  };

  var p = MovableGameObject.prototype = new rush.GameObject();

  p.GameObject_initialize = p.initialize;
  p.initialize = init;
  p.tick = tick;

  return MovableGameObject;
}

rush.MovableGameObject = createMovableGameObject();