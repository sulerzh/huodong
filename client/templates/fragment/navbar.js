Template.navbar.onCreated(function () {
  Meteor.subscribe("selfNotifications");
  Meteor.subscribe("selfMessages");
});

Template.navbar.onRendered(function () {
  $("#user-menu").click(function () {
    $(".sidebar").sidebar("toggle");
  });
  var n = false;
  if (GoogleMaps.loaded()) {
    var o = new google.maps.places.Autocomplete(
      document.getElementById("location-search"), { types: ["geocode"] });
    google.maps.event.addListener(o, "place_changed", function () { });
  }
});

Template.navbar.events({
  "click .login-link-btn": function (e) {
    $(".login.modal").modal("show");
  },
  "click .sign-up-link-btn": function (e) {
    $(".signUp.modal").modal("show");
  },
  "click .navbar-search-icon": function (e) {
    Router.go("search", {}, { query: "city=" + $("#location-search").val() });
  }
});

Template.navbar.helpers({
  mapOptions: function () {
    if (GoogleMaps.loaded()) {
      var n = new google.maps.places.Autocomplete(
        document.getElementById("location-search"),
        {
          types: ["geocode"],
          open: function (e, n) {
            var topPos = $(e.target).autocomplete("widget").position().top -
              $(e.target).autocomplete("widget").height() - $(e.target).height();
            $(e.target).autocomplete("widget").css("top", topPos + "px");
          }
        });
      google.maps.event.addListener(n, "place_changed", function () { });
    }
  },
  onLandingPage: function () {
    return "landing" == Router.current().route.getName();
  },
  onHomePage: function () {
    return "/" == Router.current().route._path;
  }
});

