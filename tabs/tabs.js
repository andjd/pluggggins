$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));

  this.$activeTab = $(this.$el.find(".active"));
  this.$activeBody = $(this.$contentTabs.find(".active"));

  this.$el.on("click", "a", this.clickTab.bind(this));

};

$.Tabs.prototype.clickTab = function (e) {
  e.preventDefault()
  // fade out active tab
  this.$activeTab.addClass("transitioning");
  this.$activeBody.addClass("transitioning");

  this.$activeTab.on("transitionend", function () {
    this.$activeTab.removeClass("active");
    this.$activeBody.removeClass("active");
    this.$activeTab.removeClass("transitioning");
    this.$activeBody.removeClass("transitioning");

    this.$activeTab = $(e.currentTarget);
    var activeBodyId = this.$activeTab.attr("href");
    this.$activeBody = this.$contentTabs.find(activeBodyId);

    this.$activeTab.addClass("transitioning");
    this.$activeBody.addClass("transitioning");
    this.$activeTab.addClass("active");
    this.$activeBody.addClass("active");
    setTimeout(function(){
      this.$activeTab.removeClass("transitioning");
      this.$activeBody.removeClass("transitioning");
    }.bind(this), 0);

  }.bind(this));

  // this.$activeTab.on("transitionend", function () {
  // }.bind(this));


}

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
