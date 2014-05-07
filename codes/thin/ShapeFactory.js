debugger;
thin.define("ShapeFactory", ["ShapeTypes"], function (ShapeTypes) {
  return {
    getShape: function (type) {
      var shape;

      switch (type) {
        case "CIRCLE":
        {
          shape = new ShapeTypes[type](arguments[1]);
          break;
        }
        case "RECTANGLE":
        {
          shape = new ShapeTypes[type](arguments[1], arguments[2]);
          break;
        }
      }

      return shape;
    }
  };
});