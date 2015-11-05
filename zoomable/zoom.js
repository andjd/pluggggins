$.Zoom = function (el) {
  this.$el = $(el);
  this.focusBoxX = 75;
  this.focusBoxY = 75;

  this.$el.on("mousemove", function (e) {

    this.showFocusBox(e);
    this.showZoom(e);
  }.bind(this));

  this.$el.on("mouseleave", function (e) {
    this.removeFocusBox();
  }.bind(this));
}
$.Zoom.prototype.showFocusBox = function (e) {


  if (this.$el.find(".focusBox").length === 0) {
    this.$el.append($('<div class="focusBox"></div>')
      .css("height", this.focusBoxY)
      .css("width", this.focusBoxX))

  }
  var newY = e.clientY - this.$el[0].offsetTop;
  var newX = e.clientX - this.$el[0].offsetLeft;
  var coords = this.inBounds(newX, newY)

    this.$el.find(".focusBox")
      .css("top", (coords[1]))
      .css("left", (coords[0]))

};

$.Zoom.prototype.inBounds = function (x, y) {
  if (x < (this.focusBoxX / 2)) {
    x = (this.focusBoxX / 2);
  } else if (x > (this.$el.find("img:first-child").width() - (this.focusBoxX / 2))) {
    x = (this.$el.find("img:first-child").width() - (this.focusBoxX / 2));
  }

  if (y < (this.focusBoxY / 2)) {
    y = (this.focusBoxY / 2);
  } else if (y > (this.$el.find("img:first-child").height() - (this.focusBoxY / 2))) {
    y = (this.$el.find("img:first-child").height()  - (this.focusBoxY / 2));
  }
  console.log(this.$el[0].height);
  return [x, y];
};

$.Zoom.prototype.removeFocusBox = function () {

    this.$el.find("div.focusBox").remove();

};

$.Zoom.prototype.showZoom = function (e) {
    var newY = e.clientY - this.$el[0].offsetTop;
    var newX = e.clientX - this.$el[0].offsetLeft;
    var zimg = $(".zoomed-image")
    var smallImg = this.$el.find("img:first-child")
    var pointerPercentageY = (newY / smallImg.height())
    var pointerPercentageX = (newX / smallImg.width())


    zimg.css("width", $(window).height() + "px")
      .css("background-image", "url(" + smallImg.attr("src") + ")")
      .css("background-position", ((-1 *pointerPercentageX * smallImg[0].naturalWidth)
           + "px " + (-1 * pointerPercentageY * smallImg[0].naturalHeight) + "px"))
}


$.fn.zoom = function() {
  return this.each(function () {
    new $.Zoom(this);
  });
}
