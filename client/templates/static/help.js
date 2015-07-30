Template.help.onRendered(function () {
  this.$("#help-menu").sticky({ context: ".help-content", offset: 20 });
    $(document).scroll(function(e) {});
});

Template.help.events({
  "click #help-menu .item": function (event) {
    $("html, body").animate({ scrollTop: $("#" + "help-content-" + $(event.target).index() + 1).offset().top }, 500);
  }
});