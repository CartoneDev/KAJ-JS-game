var rush = rush || {};

function hitPoint(point) {
  if (point.x >= 0 && point.x <= this.width && point.y >= 0 && point.y <= this.height) {
    return true;
  }
  return false;
}

function init() {
  this.Container_initialize();
}

function createGameObject() {
  function GameObject() {
    this.initialize();
  };

  var p = GameObject.prototype = new createjs.Container();

  p.category = 'object';
  p.width = 0;
  p.height = 0;
  p.isOutsideOfScreen = false;
  p.Container_initialize = p.initialize;
  p.initialize = init;
  p.hitPoint = hitPoint;

  return GameObject;
}

rush.GameObject = createGameObject();