var emailVerified = function (user) {
  for (var i = 0; i < user.emails.length; i++)
    if (user.emails[i].verified)
      return true;
      return false;
    },
phoneVerified = function (user) {
  return user.phoneVerification && 1 == user.phoneVerification.status;
},
idVerified = function () {
  return Meteor.user().idVerification && 1 == Meteor.user().idVerification.status;
},
currentUserEmailVerified = function () {
  for (var i = 0; i < Meteor.user().emails.length; i++)
    if (Meteor.user().emails[i].verified &&
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.
      test(Meteor.user().emails[i].address))
      return true;
  return false;
};

Template.loggedInMenu.onRendered(function () {
  this.$(".ui.dropdown").dropdown({ on: "hover", action: "hide" });
  $(".logout-btn").click(function() {
    Logger.log("Log out succeeds");
    Meteor.logout(), Router.go("/");
  });
  $(".host-event-btn").click(function () {
    Logger.log("Creating a new Event");
    if (phoneVerified(Meteor.user()) && emailVerified(Meteor.user())) {
      Router.go("mealNew");
    } else {
      Session.set("Verification warning", true);
      Session.set("Verification warning header",
        "Your must verify your email and phone before hosting an Event");
      Router.go("trustAndVerification");
    }
  });
});

Template.loggedInMenu.helpers({
  isHostOfEvent: function () {
    return "mealShow" == Router.current().route.getName() &&
      Meteor.userId() == Meals.findOne({ _id: Session.get("mealId") }).hostId;
  },
  mealId: function () {
    return Session.get("mealId");
  },
  hasNotification: function () {
    return Notifications.find({ toUserId: Meteor.userId() }).count() > 0 || Inbox.find({
      toUserId: { $in: [Meteor.userId()] },
      readBy: { $nin: [Meteor.userId()] }
    }).count() > 0;
  },
  notificationsCount: function () {
    return Notifications.find({ toUserId: Meteor.userId() }).count() +
      Inbox.find({
      toUserId: { $in: [Meteor.userId()] },
      readBy: { $nin: [Meteor.userId()] } }).count();
  },
  hasDashboardNotification: function () {
    return Notifications.find({ toUserId: Meteor.userId() }).count() > 0;
  },
  dashboardNotificationsCount: function () {
    return Notifications.find({ toUserId: Meteor.userId() }).count();
  },
  hasUnreadMessage: function () {
    return Inbox.find({
      toUserId: { $in: [Meteor.userId()] },
      readBy: { $nin: [Meteor.userId()] }
    }).count() > 0;
  },
  unreadMessageCount: function () {
    return Inbox.find({
      toUserId: { $in: [Meteor.userId()] },
      readBy: { $nin: [Meteor.userId()] }
    }).count();
  }
});

