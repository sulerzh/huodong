var e = function (e) {
  for (var n = 0; n < e.emails.length; n++)
    if (e.emails[n].verified) return true;
      return false;
    },
n = function (e) {
  return e.phoneVerification && 1 == e.phoneVerification.status;
},
t = function () {
  return Meteor.user().idVerification && 1 == Meteor.user().idVerification.status;
},
o = function () {
  for (var e = 0; e < Meteor.user().emails.length; e++)
    if (Meteor.user().emails[e].verified &&
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.test(Meteor.user().emails[e].address))
      return true;
  return false;
};

Template.loggedInMenu.OnRendered(function () {
  this.$(".ui.dropdown").dropdown({ on: "hover", action: "hide" }),
    $(".logout-btn").click(function() {
      Logger.log("Log out succeeds"),
        Meteor.logout(), Router.go("/");
    }),
  $(".host-event-btn").click(function () {
    Logger.log("Creating a new Event"),
      n(Meteor.user()) && e(Meteor.user()) ? Router.go("mealNew") :
      (Session.set("Verification warning", true),
        Session.set("Verification warning header",
          "Your must verify your email and phone before hosting an Event"),
        Router.go("trustAndVerification"));
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
    return Notifications.find({ toUserId: Meteor.userId() }).count() + Inbox.find({
      toUserId: { $in: [Meteor.userId()] },
      readBy: { $nin: [Meteor.userId()] }
    }).count();
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

