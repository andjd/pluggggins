$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$images = $(this.$el.find(".gutter-images img"))
  this.gutterIdx = 0;
  this.fillGutterImages();

  this.$el.on("click", "img", function(e){
    this.activate($(e.currentTarget));
    this.$activeImg = $(e.currentTarget);
  }.bind(this));

  this.$el.on("mouseenter", "img", function(e){
    this.activate($(e.currentTarget));
  }.bind(this));

  this.$el.on("mouseleave", "img", function(e){
    this.activate(this.$activeImg);
  }.bind(this));

  this.$el.on("click", ".left", function(e){
    e.preventDefault();

    this.gutterIdx -= 1;
    if (this.gutterIdx < 0 ){
      this.gutterIdx = 0;
    }
    this.fillGutterImages()

  }.bind(this));

  this.$el.on("click", ".right", function(e){
    e.preventDefault();
    this.gutterIdx += 1;
    if (this.gutterIdx > this.$images.length - 4 ){
      this.gutterIdx = this.$images.length - 4 ;
    }
    this.fillGutterImages()
  }.bind(this));

  this.activate($(this.$images.eq(0)));
  this.$activeImg = $(this.$images.eq(0));

}

$.Thumbnails.prototype.activate = function ($img) {
  this.$el.find(".active").empty().append($img.clone());
}

$.Thumbnails.prototype.fillGutterImages = function () {
  var $gutterImages = this.$images.slice(this.gutterIdx, this.gutterIdx + 4);
  this.$images.removeClass("thumb");
  $gutterImages.addClass("thumb");
}



$.fn.thumbnails = function() {
  return this.each(function () {
    new $.Thumbnails(this);
  });
}
