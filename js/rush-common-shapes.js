var rush = rush || {};

function createRectangle(rect) {
  rect.strokeThickness = rect.strokeThickness || 0;
  rect.strokeColor     = rect.strokeColor     || "#000";
  rect.fillColor       = rect.fillColor       || "#000";
  rect.x               = rect.x               || 0;
  rect.y               = rect.y               || 0;
  rect.width           = rect.width           || 0;
  rect.height          = rect.height          || 0;

  var shape = new createjs.Shape();
  if (rect.strokeThickness > 0) {
    shape.graphics.setStrokeStyle(rect.strokeThickness);
    shape.graphics.beginStroke(rect.strokeColor);
  }

  shape.graphics.beginFill(rect.fillColor);
  shape.graphics.rect(rect.x, rect.y, rect.width, rect.height);

  return shape;
}

function createCommonShapes() {
  function CommonShapes() {}
  CommonShapes.rectangle = createRectangle;

  return CommonShapes;
}

rush.CommonShapes = createCommonShapes();