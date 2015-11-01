
var e = function (e) {
  for (var t = 0; t < e.emails.length; t++)
    if (e.emails[t].verified)
      return true;
  return false
};
phoneVerified = function (user) {
  return user.phoneVerification && 1 == user.phoneVerification.status;
};
i = function () {
  return Meteor.user().idVerification && 1 == Meteor.user().idVerification.status
};


Template.mealShow.onCreated(function () {
  Meteor.subscribe("oneUser", this.data.hostId);
  Meteor.subscribe("hostReviews", this.data.hostId);
  this.guestList = new ReactiveVar([]);
  this.autorun(function () {
    if (Meteor.userId()) {
      Meteor.subscribe("mealOrderCheck", this.data._id);
    }
    var orders = Orders.find({ mealId: this.data._id, status: { $gte: 0 } });
    var guests = [];
    orders.forEach(function (order) {
      Meteor.subscribe("oneUser", order.userId);
      var guest = Meteor.users.findOne({ _id: order.userId });
      if (guest) {
          if (order.numberOfGuests > 1) {
            guest.numberOfExtraGuest = " + " + (order.numberOfGuests - 1);
          }
          if (0 == order.status) {
            guest.profile.thumbnail.org = "http://plenry.meteor.com/images/defaultAvatar.jpg";
            guest.profile.thumbnail.cloudinaryPublicId = "default_avatar";
            guest.isPending = true;
          }
          guests.push(guest);
          this.guestList.set(guests);
        }
      });
    });
});

Template.mealShow.onRendered(function() {
  Session.set("mealId", Template.instance().data._id);
  $(window).resize(function() {
    if ($(window).width() > 768) {
      GoogleMaps.get(Template.instance().data._id).instance.set("draggable", true);
    } else {
      GoogleMaps.get(Template.instance().data._id).instance.set("draggable", false);
    }
  });
  if ($(window).width() > 768) {
    var css = function() {
      var mapContainerTopOffset = 0;
      if ($(".map-container").length > 0) {
        mapContainerTopOffset = $(".map-container").offset().top;
      }
      $(".ui.sticky").css(n > $(this).scrollTop() + 88 ?
        $("#meal-cover-image").height() > $(this).scrollTop() ?
        { "margin-top": $("#meal-cover-image").height() - $(this).scrollTop() + 88 } :
        { "margin-top": 88 } :
        { "margin-top": mapContainerTopOffset - $(this).scrollTop() });
    };
    $("#meal-cover-image").load(css);
    $(window).scroll(css);
  }
  this.$(".ui.dropdown").dropdown();
  this.$(".has-popup").popup();
});

slide = function () {
  var windowHeight = .8 * $(window).height();
  var windowWidth = .7 * $(window).width();
  $(".gallery-modal .frame").css("height", .8 * $(window).height() + "px");
  $(".gallery-modal .frame ul").css("height", .8 * $(window).height() + "px");
  $(".gallery-modal").modal("show");
  var n = $(".gallery-modal .gallery-navigation").height();
  var s = $(".gallery-modal").height();
  $(".gallery-modal .frame ul li").each(function(e) {
    var  img = new Image;
    img.src = $(this).find("img").attr("src");
    var d = n.naturalWidth;
    if (n.naturalWidth > windowWidth) {
      d = windowWidth;
    }
    var u = img.naturalHeight;
    var imgHeight = img.naturalHeight;
    if (imgHeight > windowHeight) {
      d = windowHeight / imgHeight * d;
      u = windowHeight;
    }
    $(this).css("width", (d + 80).toFixed(2) + "px");
    $(this).find("img").css("top", ((s - u) / 2).toFixed(2) + "px");
    Logger.log("Image #" + e + " width: " + d.toFixed(2));
  });
  $(".gallery-modal .gallery-navigation").css("top", ((s - n) / 2).toFixed(2) + "px");
  var slide = $("#effects");
  Logger.log("Current window height: " + $(window).height());
  slide.sly({
    horizontal: 1,
    itemNav: "forceCentered",
    itemSelector: ".frame li",
    smart: 1,
    activateMiddle: 1,
    activateOn: "click",
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 2,
    scrollBar: slide.parent().find(".scrollbar"),
    scrollBy: 1,
    speed: 650,
    elasticBounds: 1,
    easing: "swing",
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1,
    prev: slide.parent().find(".left-nav"),
    next: slide.parent().find(".right-nav")
  }, {
    active: function(e, t) {
      Logger.log("Sly active index: " + t);
      var i = slide.find("li:nth-child(" + (t + 1) + ") .hidden.caption").html();
      slide.parent().find(".ui.caption").html(i);
    }
  });
  $(".clearfix").css("width", "50000px");
  return slide;
};

Template.mealShow.events({
  "click #comment-button": function() {
    Logger.log("Comment: " + $("#comment-fields").val());
    Meteor.call("newComment", {
      mealId: this._id,
      content: $("#comment-fields").val()
    });
    $("#comment-fields").val("");
  },
  "click .reply-button": function(e) {
    Logger.log("Reply Comment: " + $("#comment-fields").val());
    Meteor.call("newComment", {
      mealId: this.mealId,
      content: $(e.target).parent().find(".reply-field").val(),
      replyToId: this._id
    });
    $(e.target).parent().find(".reply-field").val("");
  },
  "click #book-now-btn": function() {
    if (phoneVerified(Meteor.user())) {
      Router.go("reserve", { mealId: Template.instance().data._id });
    } else {
      Session.set("Verification warning", true);
      Session.set("Verification warning header", "Your must verify your phone before reserving");
      Session.set("Verification redirect", [Template.instance().data._id]);
      Router.go("trustAndVerification");
    }
  },
  "click .login-link-btn": function(e) {
    $(".login.modal").modal("show");
  },
  "click .environment-photo": function() {
    slide();
    frame.sly("activate", 0);
  },
  "click .dish-name": function(e) {
    if (Template.instance().data.dishes[$(e.target).parent().parent().index()].photo) {
      var t = slide();
      for (var i = 0, n = 0; n < $(e.target).parent().parent().index(); n++) {
        if (Template.instance().data.dishes[n].photo) {
          i++;
        }
      }
      t.sly("activate", $(e.target).parent().parent().index() + 1 - i);
    }
  },
  "click .cancel-reservation": function(e) {
    var orderId = Orders.findOne({ mealId: this._id, userId: Meteor.userId() })._id;
    $(".ui.small.modal").modal("show"), $(".cancel-reservation-confirm").click(function() {
      Meteor.call("cancelReservation", orderId);
    });
  }
});

Template.mealShow.helpers({
  exampleMapOptions: function() {
    if (GoogleMaps.loaded()) {
      var e = new google.maps.LatLng(this.location.latApprox, this.location.lngApprox);
      return GoogleMaps.ready(this._id, function(t) {
        var i = new google.maps.Circle({
          strokeColor: "#d95c5c",
          strokeOpacity: .2,
          strokeWeight: 1,
          fillColor: "#d95c5c",
          fillOpacity: .4,
          radius: 500,
          map: t.instance,
          center: e
        });
      }), { center: e, zoom: 14, scrollwheel: false }
    }
  },
  hostName: function() {
    var e = Meteor.users.findOne({ _id: this.hostId });
    return e.profile.firstName;
  },
  hostFirstName: function() {
    var e = Meteor.users.findOne({ _id: this.hostId });
    return e.profile.firstName;
  },
  hostOverallRating: function() {
    var e = Meteor.users.findOne({ _id: this.hostId });
    return e.host.overallRating;
  },
  hostCommunicationRating: function() {
    var e = Meteor.users.findOne({ _id: this.hostId });
    return e.host.communicationRating;
  },
  hostReviewsCount: function() {
    var e = Meteor.users.findOne({ _id: this.hostId });
    return e.host.reviewsCount;
  },
  hostCloudinaryPublicId: function() {
    var e = Meteor.users.findOne({ _id: this.hostId });
    return e.profile.thumbnail.cloudinaryPublicId;
  },
  pricePerGuestWithService: function() {
    return (1.15 * this.pricePerGuest).toFixed(2);
  },
  pricePerGuestWithoutService: function() {
    return this.pricePerGuest.toFixed(2);
  },
  isFree: function() {
    return 0 == this.pricePerGuest;
  },
  mealStartDate: function() {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D ddd");
  },
  mealEndDate: function() {
    return moment(this.time.endAt).utcOffset(this.time.zone).format("MMM D ddd");
  },
  mealStartTime: function() {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("hh:mmA");
  },
  mealEndTime: function () {
    if (this.time.endAt) {
      return moment(this.time.endAt).utcOffset(this.time.zone).format("hh:mmA");
    }
  },
  timeLeft: function() {
    var timeLeftHours = moment(this.time.deadline).diff(new Date, "hours");
    if (timeLeftHours > 23)
      return moment(this.time.deadline).fromNow(true);
    var timeLeftMinutes = moment(this.time.deadline).subtract(timeLeftHours, "hours").diff(new Date, "minutes");
    return timeLeftHours + "hrs " + timeLeftMinutes + "min";
  },
  isSeparateDate: function () {
    if (this.time.endAt) {
      return moment(this.time.endAt).utcOffset(this.time.zone).format("MMM D, YYYY ddd") !=
             moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D, YYYY ddd");
    }
    return false;
  },
  mealPlaceType: function() {
    return GType.placeType[this.placeType];
  },
  mealHostingStyle: function() {
    return GType.hostingStyle[this.hostingStyle];
  },
  mealKidsRule: function() {
    return 1 == parseInt(this.rules.kids);
  },
  mealShoesRule: function() {
    return 1 == parseInt(this.rules.shoes);
  },
  mealPets: function() {
    var pets = this.pets && this.pets.length > 0 ?
      this.pets : "No pet";
    return pets + " live on property";
  },
  hostResgisterYear: function() {
    return moment(Meteor.users.findOne({ _id: this.hostId }).createdAt).format("YYYY");
  },
  hostResponseTime: function() {
    var hostUser = Meteor.users.findOne({ _id: this.hostId });
    var totalResponds = hostUser.host.totalResponds;
    if (totalResponds == 0) {
      totalResponds = 1;
    }
    var totalResponseTime = hostUser.host.totalResponseTime;
    var averageResponseTime = totalResponseTime / totalResponds;
    return 60 > averageResponseTime ? "< 1 hour" : "~ " + parseInt(r / 60) + " hours";
  },
  hostDescription: function() {
    return Meteor.users.findOne({ _id: this.hostId }).profile.description;
  },
  hostLanguage: function() {
    return Meteor.users.findOne({ _id: this.hostId }).profile.language;
  },
  hostSchool: function() {
    return Meteor.users.findOne({ _id: this.hostId }).profile.school;
  },
  comments: function() {
    return Comments.find({
      mealId: this._id,
      replyToId: { $exists: false }
    },
    { sort: { createdAt: -1 } });
  },
  isHostOfMeal: function() {
    return this.hostId == Meteor.userId();
  },
  reviews: function() {
    return Reviews.find(
    {
      hostId: this.hostId,
      userToHost: true
    }, {
      limit: 6,
      sort: { createdAt: -1 }
    });
  },
  reserved: function () {
    if (Meteor.userId()) {
      return Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
    }
    return false;
  },
  pending: function() {
    if (Meteor.userId()) {
      var order = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
      return 0 == order.status;
    }
  },
  confirmed: function() {
    if (Meteor.userId()) {
      var order = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
      if (order) {
        return order.status == 1;
      }
      return false;
    }
  },
  declined: function() {
    if (Meteor.userId()) {
      var order = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
      return -1 == order.status;
    }
  },
  cancelled: function() {
    if (Meteor.userId()) {
      var order = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
      return -1 == this.status || -2 == order.status;
    }
  },
  passed: function() {
    return this.time.deadline < new Date;
  },
  guestList: function() {
    return Template.instance().guestList.get();
  },
  noGuest: function() {
    return 0 == Template.instance().guestList.get().length;
  },
  reserveOptions: function() {
    var options = [];
    for (var t = 1; t <= this.spotsLeft; t++) {
      options.push(1 == t ?
        { value: 1, text: "Only You" } :
        { value: t, text: "You + " + (t - 1) + " Guest(s)" });
    }
    return options;
  },
  isFull: function() {
    return this.spotsLeft <= 0;
  },
  reviewDeadlinePassed: function() {
    var startDate = new Date(this.time.endAt || this.time.startAt);
    var deadline = startDate.setDate(startDate.getDate() + 14);
    return deadline < new Date;
  },
  reviewed: function() {
    return Orders.findOne({ mealId: this._id, userId: Meteor.userId() }).guestReviewed;
  },
  cancellable: function() {
    return this.status >= 0;
  },
  orderId: function() {
    return Orders.findOne({ mealId: this._id, userId: Meteor.userId() })._id;
  }
});

