
Template.home.OnRendered(function () {
  if ("default_avatar" == Meteor.user().profile.thumbnail.cloudinaryPublicId &&
    ($("#upload-profile-pic-popup-window").modal("show"),
      $("#upload-profile-pic-popup-window").modal("show"),
      $("#upload-profile-pic").click(function () {
        Router.go("/users/me/profile/edit_profile");
  })),
    this.$("#homepage-search-date").datepicker({ autoclose: true }),
    this.$(".ui.dropdown").dropdown(),
    Session.set("Homepage rendered", true),
    Session.set("homePage number of events show", 12),
    Logger.log("Homepage rendered"),
    GoogleMaps.loaded() &&
      Session.get("Homepage rendered")) {
    var o = new google.maps.places.Autocomplete(document.getElementById("homepage-search-city"), {
      types: ["geocode"]
    });
    google.maps.event.addListener(o, "place_changed", function () {
    });
  }
});

Template.home.helpers({
  featureEvents: function () {
    return Meals.find({ status: 1 }, {
      sort: { "time.startAt": -1 },
      limit: Session.get("homePage number of events show")
    });
  },
  autoComplete: function () {
    if (GoogleMaps.loaded() && Session.get("Homepage rendered")) {
      var o = new google.maps.places.Autocomplete(document.getElementById("homepage-search-city"),
      { types: ["geocode"] });
      google.maps.event.addListener(o, "place_changed", function () {
      });
    };
  }
});

Template.home.OnDestroyed(function () {
  Session.set("Homepage rendered", false),
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
    var e = Session.get("homePage number of events show");
    Session.set("homePage number of events show", e + 12);
  },
  "click #homepage-search-btn": function () {
    var e = $("#homepage-search-city").val(),
      o = $("#homepage-search-date").val(),
      t = $("#homepage-search-number").val(),
      n = "";
    e && e.length > 0 && (n += "city=" + e), o && o.length > 0
        && (n += "&date=" + o), t && t.length > 0 && (n += "&number=" + t),
      Router.go("search", {}, { query: n });
  }
});

