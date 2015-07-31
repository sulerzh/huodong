var e = function(e) {
  return e.length > 0
};
t = function(e) {
  return e.length > 0
};
n = function(e) {
  return parseFloat(e) >= 0
};
o = function(e) {
  return parseInt(e) >= 1
};
a = function(e) {
  return !isNaN(new Date(e))
};
r = function(e) {
  return parseInt(e) > 0 && parseInt(e) < 74
};
i = function(e) {
  return parseInt(e) >= 0 && parseInt(e) < 9
};
l = function(e) {
  return e && e.length > 0
};
s = function(e) {
  return e.length > 0
};
u = function(e) {
  return e.replace(/\w\S*/g, function(e) {
    return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
  });
};
c = function() {
  var u = 0, c = $("#past-events-option").val();
  Logger.log("autoFillMealId: " + c), c && (Session.set("autoFillMealId", c),
    Session.set("New meal section one valid", true));
  var m = $(".meal-new-form input[name='title']").val();
  Logger.log("Title: " + m),
    e(m) && (u += 1);
  var g = $(".meal-new-form #meal-new-summary").val();
  Logger.log("Summary: " + g), t(g) && (u += 1);
  var d = $(".meal-new-form input[name='price']").val();
  Logger.log("Price per Guest: " + d),
    n(d) && (u += 1);
  var p = $(".meal-new-form input[name='maxParty']").val();
  Logger.log("Max Party: " + p), o(p) && (u += 1);
  var f = $(".meal-new-form #meal-new-start-time").val();
  Logger.log("Start Time: " + f), a(f) && (u += 1);
  var v = $(".meal-new-form input[name='deadline']").val();
  Logger.log("Deadline: " + v), r(v) && (u += 1);
  var w = parseInt($(".meal-new-form input[name='placeType']").val());
  Logger.log("Environment: " + w), i(w) && (u += 1);
  var h = $("#cover-url").val() || $("#preview-cover-picture").attr("src");
  Logger.log("Cover url: " + h), l(h) && (u += 1),
    e(m) && t(g) && n(d) && o(p) && a(f) && r(v) && l(h) && i(w) ?
      Session.set("New meal section two valid", true) :
      Session.set("New meal section two valid", false);
  var S = $(".meal-new-form input[name='address']").val();
  return Logger.log("Address: " + S), s(S) ? (u += 1,
      Session.set("New meal section three valid", true)) :
    Session.set("New meal section three valid", false), 9 == u ?
    Session.set("New meal full progress", true) :
    Session.set("New meal full progress", false), u
};
m = function() {
  var e = c();
  $(".meal-new-progress").progress({ percent: e / 9 * 100 });
};
g = function(e) {
  var t = $(e.target).html();
  return $("#meal-new-start-time").val(t), m(), "default";;
};

Template.mealNew.onCreated(function() {
  this.noDishAdded = new ReactiveVar(true);
});

Template.mealNew.onRendered(function() {
  if (Session.set("New meal section", 1), Date.parseDate = function(e, t) {
      return moment(e, t).toDate()
    }, Date.prototype.dateFormat = function(e) {
      return moment(this).format(e)
    },
    this.$(".has-popup").popup(),
    $("#meal-new-start-time").datetimepicker({
      format: "MM/DD/YYYY h:mm a",
      formatTime: "h:mm a",
      formatDate: "MM/DD/YYYY",
      step: 15,
      defaultTime: "12:00"
    }), $("#meal-new-end-time").datetimepicker({
      format: "MM/DD/YYYY h:mm a",
      formatTime: "h:mm a",
      formatDate: "MM/DD/YYYY",
      step: 15,
      defaultTime: "12:00"
    }), $(".ui.accordion").accordion(), $("#upload-cover-btn").click(function() {
      $("#cover-file").click()
    }), $(".event-form-one .ui.dropdown").dropdown(),
    $(".meal-new-form .ui.checkbox").checkbox(),
    $(".meal-new-form .ui.dropdown").dropdown({ onChange: m, onShow: m, onHide: m }),
    GoogleMaps.loaded()) {
    var t = new google.maps.places.Autocomplete(document.getElementById("address-search"),
    { types: ["geocode"] });
    google.maps.event.addListener(t, "place_changed",
      function() { })
  }
  Session.set("New meal error", false);
  var n = $(".ui.buttons .button"),
    o = $(".main .ui.toggle.button"),
    a = $(".ui.button").not(n).not(o),
    r = {
      activate: function() {
        $(this).addClass("active").siblings().removeClass("active")
      }
    };
  n.on("click", r.activate),
    o.state({ text: { inactive: "Vote", active: "Voted" } })
});

Template.mealNew.events({
  "click #how-it-works-for-host": function() {
    $(".how-it-works-for-host.modal").modal("show");
  },
  "click .meal-new-menu .item": function(e) {
    var t = $(e.target).index();
    $(e.target).hasClass("icon") &&
      (t = $(e.target).parent().index()),
      Session.set("New meal section", t + 1);
  },
  "change input[type='file']": function(e) {
    Logger.log("Filetype: " + e.target.files);
    var t = new Slingshot.Upload("mealPhotoUpload");
    t.send(e.target.files[0],
      function(e, t) {
        $("#cover-url").val(t), $("#preview-cover-picture").attr("src", t), m()
      });
  },
  "change input": function(e) {
    Logger.log("Input value changed" + e.target.value), m();
  },
  "click .newMeal": function(e) {
    Session.set("autoFillMealId", ""),
      Session.set("New meal section one valid", true),
      Session.set("New meal section two valid", false),
      Session.set("New meal section three valid", false),
      $("#event-information-section").click();
  },
  "click #jump-to-section2": function(e) {
    $("#event-information-section").click();
  },
  "click #jump-to-section3": function(e) {
    $("#location-section").click();
  },
  "change textarea": function(e) {
    Logger.log("Textarea value changed" + e.target.value), m();
  },
  "click #meal-publish-button": function() {
    $(".pusher").dimmer("show"),
      $(".ui.loader").css("position", "fixed").css("top", "50%");
    var i = {}, u = [], c = $("#auto-accept-toggle").is(":checked");
    Logger.log("Auto Accept Guests: " + c), i.autoAccept = c;
    var m = $(".meal-new-form input[name='title']").val();
    Logger.log("Title: " + m), e(m) ? i.title = m : u.push("Title cannot be empty");
    var g = $(".meal-new-form #meal-new-summary").val();
    Logger.log("Summary: " + g), t(g) ? i.summary = g : u.push("Summary cannot be empty");
    var d = $(".meal-new-form input[name='price']").val();
    Logger.log("Price per Guest: " + d), n(d) ? i.pricePerGuest = parseFloat(d) :
      u.push("Price per guest is invalid/empty");
    var p = $(".meal-new-form input[name='maxParty']").val();
    Logger.log("Max Party: " + p), o(p) ? i.maxParty = parseInt(p) :
      u.push("Max party is invalid/empty");
    var f = $(".meal-new-form #meal-new-start-time").val();
    Logger.log("Start Time: " + f), a(f) || u.push("Event start time is invalid/empty");
    var f = new Date(f), v = $(".meal-new-form #meal-new-end-time").val();
    if (Logger.log("End Time: " + v), v)
      var v = new Date(v);
    v && f && f >= v &&
      u.push("End time of the event cannot be earlier than the start time - 2");
    var w = $(".meal-new-form input[name='deadline']").val();
    Logger.log("Deadline: " + w), r(w) ? (i.time = {
            startAt: f,
            endAt: v,
            deadline: new Date(moment(new Date(f)).subtract(parseInt(w), "h"))
          }, Logger.log("Meal Start At: " + f),
          Logger.log("Meal End At: " + v),
          Logger.log("Meal deadline: " + i.time.deadline)) :
        u.push("Deadline is invalid"),
      i.placeType = parseInt($(".meal-new-form input[name='placeType']").val());
    var h = $(".meal-new-form #cover-url").val() ||
      $("#preview-cover-picture").attr("src");
    Logger.log("Cover url: " + h), l(h) ? i.cover = { org: h } :
      u.push("You must upload a photo of your environment");
    var S = $(".meal-new-form #meal-new-interaction").val();
    Logger.log("Interaction: " + S), S.length > 0 && (i.interaction = S);
    var M = $(".meal-new-form #meal-new-note").val();
    Logger.log("Note: " + M),
      M.length > 0 && (i.note = M);
    var y = $("#question-for-guest").val();
    Logger.log("Question for guest: " + y), y.length > 0 && (i.questionForGuest = y);
    var N = $(".meal-new-form input[name='address']").val();
    if (Logger.log("Address: " + N), s(N) ? (i.address = {}, i.address.full = N) :
      u.push("Your address is not compete"), u.length > 0) {
      Logger.log(u);
      for (var L = [], I = 0; I < u.length; I++) L.push({ reason: u[I] });
      Session.set("New meal errors", L), Session.set("New meal error", true);
    } else
      Meteor.call("newMeal", i, function(e, t) {
        if (e) {
          $(".pusher").dimmer("hide"), $("html, body").animate({ scrollTop: 0 },
            "fast"), Logger.log(JSON.stringify(e)), u = e.reason.split(",");
          for (var n = [], o = 0; o < u.length; o++) n.push({ reason: u[o] });
          Session.set("New meal errors", n), Session.set("New meal error", true);
        } else
          $(".pusher").dimmer("hide"), Session.set("New meal error", false),
            Router.go("/events/" + t);
      });
  },
  "click #meal-discard-button": function() {
    Router.go("/users/me/listings");
  }
});

Template.mealNew.helpers({
  mealTitle: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).title;
  },
  description: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).summary;
  },
  costPerPerson: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).pricePerGuest;
  },
  isSection: function(e) {
    return Session.get("New meal section") == e;
  },
  maxParty: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).maxParty;
  },
  placeType: function() {
    return Number(Meals.findOne({ _id: Session.get("autoFillMealId") }).placeType);
  },
  placeTypeName: function() {
    return GType.placeType[Number(Meals.findOne({
      _id: Session.get("autoFillMealId")
    }).placeType)];
  },
  address: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).address.full;
  },
  note: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).note;
  },
  questionForGuest: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).questionForGuest;
  },
  interaction: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).interaction;
  },
  coverPhoto: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).cover.org;
  },
  hasError: function() {
    return Session.get("New meal error");
  },
  errors: function() {
    return Session.get("New meal errors");
  },
  sectionOneValid: function() {
    return Session.get("New meal section one valid");
  },
  sectionTwoValid: function() {
    return Session.get("New meal section two valid");
  },
  sectionThreeValid: function() {
    return Session.get("New meal section three valid");
  },
  fullProgress: function() {
    return Session.get("New meal full progress");
  },
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      var t =
        new google.maps.places.Autocomplete(document.getElementById("address-search"),
        {
          types: ["geocode"],
          open: function(e, t) {
            var n = $(e.target),
              o = n.autocomplete("widget"),
              a = o.position().top,
              r = o.height(),
              i = n.height(),
              l = a - r - i;
            o.css("top", l + "px");
          }
        });
      google.maps.event.addListener(t, "place_changed", function() { });
    }
  },
  pastEvents: function() {
    return Meals.find({ hostId: Meteor.userId() });
  },
  autoFill: function() {
    return Session.get("autoFillMealId");
  },
  autoAccept: function() {
    return Meals.findOne({ _id: Session.get("autoFillMealId") }).autoAccept ? "checked" :
      void 0;
  }
});



Template.pastEventsOption.helpers({
  mealTitle: function () {
    return this.title;
  },
  mealId: function() {
    return this._id;
  }
});