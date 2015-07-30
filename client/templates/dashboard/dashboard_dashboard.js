Template.dashboardDashboard.helpers({
  notifications: function () {
    return Notifications.find({ toUserId: Meteor.userId() }, { sort: { createdAt: -1 } });
  },
  emailVerified: function () {
    for (var i = 0; i < Meteor.user().emails.length; i++)
      if (Meteor.user().emails[i].verified) {
        return true;
      }
    return false;
  },
  phoneVerified: function () {
    return Meteor.user().phoneVerification && 1 == Meteor.user().phoneVerification.status;
  },
  facebookLinked: function () {
    return Meteor.user().services.facebook;
  },
  facebookNumberOfFriends: function () {
    if (Meteor.user().services.facebook) {
      return Meteor.user().services.facebook.numberOfFriends;
    }
    return false;
  },
  googleLinked: function () {
    return Meteor.user().services.google;
  },
  idVerified: function () {
    return Meteor.user().idVerification && 1 == Meteor.user().idVerification.status;
  },
  eduVerified: function () {
    for (var i = 0; i < Meteor.user().emails.length; i++)
      if (Meteor.user().emails[i].verified &&
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/
        .test(Meteor.user().emails[i].address))
        return true;
    return false;
  },
  reviewed: function () { },
  hasSchool: function () {
    return Meteor.user().profile.school && Meteor.user().profile.school.length > 0;
  },
  hasWork: function () {
    return Meteor.user().profile.work && Meteor.user().profile.work.length > 0;
  },
  hasLanguage: function () {
    return Meteor.user().profile.language && Meteor.user().profile.language.length > 0;
  },
  hasCity: function () {
    return Meteor.user().profile.city && Meteor.user().profile.city.length > 0;
  },
  joinDate: function () {
    return moment(Meteor.user().createdAt).format("MMM, YYYY");
  },
  hasDescription: function () {
    return Meteor.user().profile.description &&
      Meteor.user().profile.description.length > 0;
  },
  hasNotifications: function () {
    return Notifications.find({ toUserId: Meteor.userId() }).count() > 0;
  }
});


Template.reviewCard.onCreated(function () {
  var userId = this.data.userToHost ? this.data.userId : this.data.hostId;
  Meteor.subscribe("oneUser", userId);
  Meteor.subscribe("oneMeal", this.data.mealId);
});

Template.reviewCard.helpers({
  userCloudinaryPublicId: function () {
    var userId = this.userToHost ? this.userId : this.hostId;
    var user = Meteor.users.findOne({ _id: userId });
    return user.profile.thumbnail.cloudinaryPublicId;
  },
  userName: function () {
    var userId = this.userToHost ? this.userId : this.hostId;
    var user = Meteor.users.findOne({ _id: userId });
    return user.profile.firstName;
  },
  mealTitle: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return meal.title;
  },
  mealDate: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return moment(meal.time.startAt).utcOffset(meal.time.zone).format("MMM YY");
  },
  reviewContent: function () {
    return this.content;
  }
});

Template.dashboardListings.onRendered(function () {
  Session.setDefault("Listings section", 1);
  if (Router.current().params.query.section) {
    Session.set("Listings section", parseInt(Router.current().params.query.section));
  }
});

Template.dashboardListings.helpers({
  isSection: function (ls) {
    return ls == Session.get("Listings section");
  }
});


emailVerified = function (user) {
  for (var i = 0; i < user.emails.length; i++) {
    if (user.emails[i].verified)
      return true;
  }
  return false;
};


phoneVerified = function (user) {
  return user.phoneVerification && 1 == user.phoneVerification.status;
};

Template.dashboardListings.events({
  "click .dashboard-listings-link": function (event) {
    if ($(event.target).index() == 0) {
      Session.set("Listings section", 1);
    } else {
      Session.set("Listings section", 4);
    }
  },
  "click .host-event-btn": function (e) {
    Logger.log("Host an event");
    if (phoneVerified(Meteor.user()) && emailVerified(Meteor.user())) {
      Router.go("mealNew");
      Session.set("New meal section one valid", false);
      Session.set("New meal section two valid", false);
      Session.set("New meal section three valid", false);
    } else {
      Session.set("Verification warning", true);
      Session.set("Verification warning header",
        "Your must verify your email and phone before hosting an Event");
      Router.go("trustAndVerification");
    }
  }
});

Template.cancelledListingsRow.helpers({
  mealDate: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D YYYY");
  },
  mealTime: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("ddd @ hh:mma");
  }
});

Template.stars.helpers({
  getStar: function (pos) {
    if (this.rating < pos - 1 + .25) {
      return "yellow empty star icon";
    } else if (this.rating < pos - 1 + .75) {
      return "yellow half empty star icon";
    }
    return "yellow star icon";
  }
});

Template.reviewSection.onCreated(function () {
  Meteor.subscribe("oneUser", Template.instance().data.userId);
  Meteor.subscribe("oneMeal", Template.instance().data.mealId);
});

Template.reviewSection.helpers({
  userName: function () {
    var user = Meteor.users.findOne({ _id: this.userId });
    return user.profile.firstName;
  },
  timeAgo: function () {
    return moment(this.createdAt).fromNow();
  },
  mealTitle: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return meal.title;
  },
  mealDate: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return moment(meal.time.startAt).utcOffset(meal.time.zone).format("MMM YY");
  },
  userCloudinaryPublicId: function () {
    var user = Meteor.users.findOne({ _id: this.userId });
    return user.profile.thumbnail.cloudinaryPublicId;
  }
});

Template.dashboardReservations.onRendered(function () {
  Session.set("Reservation section", 1);
  if (Router.current().params.query.section) {
    Session.set("Reservation section", parseInt(Router.current().params.query.section));
  }
});

Template.dashboardReservations.helpers({
  isSection: function (section) {
    return section == Session.get("Reservation section");
  }
});

Template.dashboardReservations.events({
  "click .dashboard-reservation-link": function (event) {
    Session.set("Reservation section", $(event.target).index() + 1);
  }
});

Template.dashboardProfile.onRendered(function () {
  if (Router.current().params.query.section) {
    Session.set("Profile section", parseInt(Router.current().params.query.section));
  } else {
    Session.set("Verification warning", false);
    Session.set("Profile section", 1);
  }
  window.scrollTo(0, 0);
});

Template.dashboardProfile.helpers({
  isSection: function (section) {
    return section == Session.get("Profile section");
  }
});

Template.dashboardProfile.events({
  "click .dashboard-profile-link": function (event) {
    Session.set("Profile section", $(event.target).index() + 1);
  }
});

Template.PhotosAndVideo.helpers({
  photo: function () {
    return Session.get("photo");
  }
});

Template.PhotosAndVideo.events({
  "click #photo-taking-button": function () {
    MeteorCamera.getPicture({ width: 800, height: 600 }, function (error, data) {
      Session.set("photo", data);
      if (data) {
        Meteor.call("base64tos3", data);
      }
    });
  }
});


Template.phoneVerification.onCreated(function () {
  this.newVerify = new ReactiveVar(true);
  this.hasError = new ReactiveVar(false);
  this.errors = new ReactiveVar;
});

Template.phoneVerification.helpers({
  hasError: function () {
    return Template.instance().hasError.get();
  },
  newVerify: function () {
    return Template.instance().newVerify.get();
  },
  errors: function () {
    return Template.instance().errors.get();
  }
});

Template.phoneVerification.events({
  "click .send-verify-code": function () {
    var  phoneNumber = $("#phone-verify-number").val().replace(/-/g, "").replace(/\//g, "");
    Meteor.call("verifyPhone", phoneNumber, function(error, result) {
      if (error) {
        Template.instance().hasError.set(true);
        var reasons = error.reason.split(",");
        var errs = [];
        for (var i = 0; i < reasons.length; i++)
          errs.push({ reason: reasons[i] });
        Template.instance().errors.set(errs);
      } else
        Template.instance().hasError.set(false);
      Template.instance().newVerify.set(false);
    });
  },
  "click .close.icon": function () {
    Template.instance().hasError.set(false);
    Template.instance().newVerify.set(true);
  },
  "click .verify-code-btn": function () {
    var code = $("#verify-code").val();
    Meteor.call("verifyCode", code, function(error, result) {
      if (error) {
        Template.instance().hasError.set(true);
        var reasons = error.reason.split(",");
        var errs = [];
        for (var i = 0; i < reasons.length; i++)
          errs.push({ reason: reasons[i] });
        Template.instance().errors.set(errs);
      } else {
        Template.instance().hasError.set(false);
      }
      Template.instance().newVerify.set(true);
      if (Session.get("Verification redirect")) {
        Router.go("reserve",
        { mealId: Session.get("Verification redirect")[0] },
        { query: "number=" + Session.get("Verification redirect")[1] });
        Session.set("Verification redirect", null);
      }
      $("#phone-verification-modal").modal("hide");
    });
  }
});

Template.idVerification.onCreated(function () {
  this.token = new ReactiveVar;
  this.hasError = new ReactiveVar(false);
  Meteor.call("getJumioUrl",
    function(error, result) {
      window.location.replace(result);
    });
});


Template.showUserIcons.helpers({
  spots: function () {
    var result = [];
    if (this.maxParty > 30) {
      this.maxParty = 30;
      this.spotsLeft = parseInt(this.spotsLeft / this.maxParty * 30);
    }
    for (var i = 0; i < this.maxParty - this.spotsLeft; i++)
      result.push({ taken: true });
    for (var j = 0; j < this.spotsLeft; j++)
      result.push({ taken: false });
    return result;
  }
});

Template.birthdayYearOptions.helpers({
  years: function () {
    var currYear = (new Date).getFullYear();
    var result = [];
    for (var i = e; i > currYear - 90; i--)
      result.push({ year: i });
    return result;
  }
});


Template.cardYearOptions.helpers({
  years: function () {
    var currYear = (new Date).getFullYear();
    var result = []; 
    for (var i = currYear; i > currYear + 21; i++)
      result.push({ year: i });
    return result;
  }
});

Template.dishPhotoUpload.events({
  "click #ss": function () {
    var t = new Slingshot.Upload("dishPhotoUpload", { mealId: "y4bDwSsNos88vpLHb" });
    t.send(document.getElementById("dish-photo").files[0], function (error, downloadUrl) { });
  }
});
