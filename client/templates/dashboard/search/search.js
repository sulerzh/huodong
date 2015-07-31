
Template.Search.onRendered(function () {
  $("#navbar").css({ position: "fixed", "z-index": "10000", width: "100%", top: "0" });
  $(".pusher").css({ "margin-top": "5.2rem" });
  this.$(".ui.dropdown").dropdown();
  this.$("#event-date").datepicker({ autoclose: true });
  Router.current().params.query.keywords && Template.instance().keywords.set();
  if (Router.current().params.query.date) {
    Template.instance().date.set(new Date(Router.current().params.query.date));
  }
  if (Router.current().params.query.city) {
    Template.instance().city.set(Router.current().params.query.city);
  }
  if (Router.current().params.query.number) {
    Template.instance().number.set(parseInt(Router.current().params.query.number));
  }
});

Template.Search.events({
  "click #redo-search-btn": function () {
    Template.instance().date.set($("#event-date").val().length > 0 ?
      new Date($("#event-date").val()) : null);
    if ($("#search-spots").val().length > 0) {
      Template.instance().number.set(parseInt($("#search-spots").val()));
    }

    Session.set("Search nel",
      GoogleMaps.get("searchMap").instance.getBounds().getNorthEast().lat());
    Session.set("Search neg",
      GoogleMaps.get("searchMap").instance.getBounds().getNorthEast().lng());
    Session.set("Search swl",
      GoogleMaps.get("searchMap").instance.getBounds().getSouthWest().lat());
    Session.set("Search swg",
      GoogleMaps.get("searchMap").instance.getBounds().getSouthWest().lng());
  }
});

Template.Search.helpers({
  mapOptions: function () {
    if (GoogleMaps.loaded()) {
      var certerLatLng = new google.maps.LatLng(37.691, -122.3108);
      GoogleMaps.ready("searchMap", function (map) {
        var googleMapsGeocoder = new google.maps.Geocoder;
        if (Router.current().params.query.city) {
          googleMapsGeocoder.geocode({ address: Router.current().params.query.city }, function (result, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              map.instance.setCenter(result[0].geometry.location);
              map.instance.setZoom(12);
              Session.set("Search nel", map.instance.getBounds().getNorthEast().lat());
              Session.set("Search neg", map.instance.getBounds().getNorthEast().lng());
              Session.set("Search swl", map.instance.getBounds().getSouthWest().lat());
              Session.set("Search swg", map.instance.getBounds().getSouthWest().lng());
              Session.set("Search map ready", true);
            }
          });
        } else {
          Session.set("Search map ready", true);
        }
      });
      return { center: certerLatLng, zoom: 8 }
    }
  },
  searchResults: function () {
    return Template.instance().results().map(function (item, step) {
      item.index = step + 1;
      return item;
    });
  },
  isReady: function () {
    return Template.instance().ready.get();
  },
  queryDate: function () {
    if (Router.current().params.query.date) {
      return Router.current().params.query.date.replace(/-/g, "/");
    }
  },
  queryNumber: function () {
    return Router.current().params.query.number;
  },
  totalEventsFound: function () {
    if (Template.instance().results &&
      Template.instance().results().count) {
      return Template.instance().results().count();
    }
    return 0;
  }
});

Template.Search.onCreated(function () {
  Session.set("Search map ready", false);
  this.keywords = new ReactiveVar("");
  this.city = new ReactiveVar("");
  this.date = new ReactiveVar;
  this.number = new ReactiveVar(1);
  this.loaded = new ReactiveVar(0);
  this.limit = new ReactiveVar(50);
  this.offset = new ReactiveVar(0);
  this.ready = new ReactiveVar(false);
  this.criteria = new ReactiveVar({});
  this.autorun(function () {
    var limit = this.limit.get();
    var date = this.date.get();
    var number = this.number.get();
    var keywords = this.keywords.get();
    var nel = Session.get("Search nel");
    var neg = Session.get("Search neg");
    var swl = Session.get("Search swl");
    var swg = Session.get("Search swg");
    var query = {};
    if (keywords && keywords.length > 1) {
      query.$text = { $search: keywords };
    }
    if (date) {
      var l = new Date(date);
      l.setDate(l.getDate() + 1);
      query["time.startAt"] = { $gte: date, $lt: l };
    }
    if (number) {
      query.spotsLeft = { $gte: number };
    }

    if (nel && neg && swl && swg) {
      query["location.lat"] = { $gt: parseFloat(swl), $lt: parseFloat(nel) };
      query["location.lng"] = { $gt: parseFloat(swg), $lt: parseFloat(neg) };
    }

    query.status = 1;
    this.criteria.set(query);
    var g = Meteor.subscribe("searchMeals", query, this.offset.get());
    if (g.ready()) {
      console.log("Received meals. \n\n");
      this.loaded.set(limit);
      this.ready.set(true);
    } else {
      this.ready.set(false);
      console.log("Search meal subscription is not ready yet. \n\n");
    }
  }),
this.results = function () {
  if (Session.get("Search map ready")) {
    return Meals.find(this.criteria.get(), { limit: this.loaded.get() });
  }
  return [];
}
});

