  thin.define("ShapeTypes", ["shape.Circle", "shape.Rectangle"], function (Circle, Rectangle) {
    return {
      CIRCLE: Circle,
      RECTANGLE: Rectangle
    };
  });