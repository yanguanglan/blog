  thin.define("shape.Rectangle", [], function () {
    var Rectangle = function (l, w) {
      this.l = l;
      this.w = w;
    };

    Rectangle.prototype = {
      area: function () {
        return this.l * this.w;
      }
    };

    return Rectangle;
  });