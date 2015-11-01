Template.home.onRendered(function () {
  if ("default_avatar" == Meteor.user().profile.thumbnail.cloudinaryPublicId) {
    $("#upload-profile-pic-popup-window").modal("show");
    $("#upload-profile-pic-popup-window").modal("show");
    $("#upload-profile-pic").click(function () {
      Router.go("/users/me/profile/edit_profile");
    });
  }
  this.$("#homepage-search-date").datepicker({ autoclose: true });
  this.$(".ui.dropdown").dropdown();
  Session.set("Homepage rendered", true);
  Session.set("homePage number of events show", 12);
  Logger.log("Homepage rendered");
  if (GoogleMaps.loaded() && Session.get("Homepage rendered")) {
    var geocode = new google.maps.places.Autocomplete(
      document.getElementById("homepage-search-city"), {
        types: ["geocode"]
      });
    google.maps.event.addListener(geocode, "place_changed", function () {
    });
  }
});

Template.home.helpers({
  featureEvents: function () {
    return Meals.find({
      status: 1
    }, {
      sort: { "time.startAt": -1 },
      limit: Session.get("homePage number of events show")
    });
  },
  autoComplete: function () {
    if (GoogleMaps.loaded() && Session.get("Homepage rendered")) {
      var geocode = new google.maps.places.Autocomplete(document.getElementById("homepage-search-city"),
      { types: ["geocode"] });
      google.maps.event.addListener(geocode, "place_changed", function () {
      });
    };
  }
});

Template.home.onDestroyed(function () {
  Session.set("Homepage rendered", false);
  Logger.log("Home page destroyed");
});

Template.home.events({
  "click .how-it-works-for-host": function () {
    $(".how-it-works-for-host.modal").modal("show");
  },
  "click .how-it-works-for-guest": function () {
    $(".how-it-works-for-guest.modal").modal("show");
  },
  "click #moreEvents-home-btn": function () {
    var eventCount = Session.get("homePage number of events show");
    Session.set("homePage number of events show", eventCount + 12);
  },
  "click #homepage-search-btn": function () {
    var city = $("#homepage-search-city").val();
    var date = $("#homepage-search-date").val();
    var number = $("#homepage-search-number").val();
    var query = "";
    if (city && city.length > 0) {
      query += "city=" + city;
    }
    if (date && date.length > 0) {
      query += "&date=" + date;
    }
    if (number && number.length > 0) {
      query += "&number=" + number;
    }
    Router.go("search", {}, { query: query });
  }
});

