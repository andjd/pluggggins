$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  $(this.$el.find("ul.items > li:first-child")).addClass("active");
  this.images = $(this.$el.find("li"))
  $(".slide-right").on("click", this.slideRight.bind(this))
  $(".slide-left").on("click", this.slideLeft.bind(this))
}

$.Carousel.prototype.slide = function (dir) {
  var newIdx = (this.activeIdx + dir) % this.images.length;
  this.images.removeClass("active right left");
  this.activeIdx = newIdx;
  this.images.eq(this.activeIdx).addClass("active");
  this.images.eq(this.activeIdx - 1).addClass("right");
  this.images.eq(this.activeIdx + 1).addClass("left");
};

$.Carousel.prototype.slideLeft = function () {
  this.slide(-1);
};


$.Carousel.prototype.slideRight = function () {
  this.slide(1);
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
}
