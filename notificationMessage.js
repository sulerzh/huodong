var e = function (e) {
  if (!$(e.target).hasClass("close") || !$(e.target).hasClass("icon")) {
    var t = Template.instance().data;
    0 == t.type &&
      (0 == t.subType && Router.go("/users/me/profile/reviews/reviews_about_me"),
        1 == t.subType && Router.go("postReviewForHost", { mealId: t.mealId }),
        2 == t.subType && Router.go("mealGuestsList", { mealId: t.mealId })),
      1 == t.type ? 3 == t.subType ? Router.go("/users/me/requests/pending") :
        5 == t.subType ? Router.go("/users/me/requests/cancelled") :
        Router.go("orderByMealId", { mealId: t.mealId }) : 2 == t.type ? 1 == t.subType ?
        Router.go("/users/me/listings/upcoming") : 0 == t.subType || 2 == t.subType ?
        Router.go("orderByMealId", { mealId: t.mealId }) : 3 == t.subType ?
        Router.go("/users/me/requests/cancelled") : 4 == t.subType &&
        Router.go("/users/me/listings/cancelled") : 3 == t.type && (0 == t.subType ?
          Router.go("mealShow", { mealId: t.mealId }) : 1 == t.subType && (
            Router.go("mealShow", { mealId: t.mealId }), Meteor.call("hideNotification", this._id)));
  }
};

Template.notificationMessage.OnCreated(function() {
  Meteor.subscribe("oneMeal",
      Template.instance().data.mealId),
    Meteor.subscribe("oneUser",
      Template.instance().data.fromUserId);
});

Template.notificationMessage.events({
  "click .close.icon": function(e) {
    Meteor.call("hideNotification", this._id);
  },
  click: e
});

Template.notificationMessage.helpers({
  typeName: function() {
    return GType.notificationType[this.type];
  },
  content: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    meal.time.startAt < moment(new Date).subtract(14, "d") &&
      Meteor.call("hideNotification", this._id);
    var t = Meteor.users.findOne({ _id: this.fromUserId }),
      i = t.profile.firstName,
      s = moment(meal.time.startAt).add(14, "d").fromNow(true),
      r = meal.title,
      o = meal.address.city,
      n = moment(meal.time.startAt).format("M/D");
    if (0 == this.type) {
      if (0 == this.subType)
        return i + " wrote a review for " + r + ".";
      if (1 == this.subType)
        return "Please leave a review for " + i + ". You have " + s + " left to leave this review.";
      if (2 == this.subType)
        return "Please leave reviews for guests in your event on " + n + " " + r + " in " + o +
          ". You have " + s + " left to leave this review.";
    }
    if (1 == this.type) {
      if (0 == this.subType)
        return this.createdAt < moment(new Date).subtract(1, "d") &&
            Meteor.call("hideNotification", this._id),
          "Your request is pending for " + n + " " + r + " in " + o + " with " + i + ".";
      if (1 == this.subType)
        return "Your request is accepted for " + n + " " + r + " in " + o + " with " + i + ".";
      if (2 == this.subType)
        return "Your request is declined for " + n + " " + r + " in " + o + " with " + i + ".";
      if (3 == this.subType)
        return this.createdAt < moment(new Date).subtract(1, "d") &&
            Meteor.call("hideNotification", this._id),
          i + " wants to join your event: " + r + " on " + n +
            ". Please accept her to your event within 24 hours.";
      if (4 == this.subType)
        return "Your request is expired for " + n + " " + r + " in " + o + " with " + i + ".";
      if (5 == this.subType)
        return "The request from " + i + " for " + n + " " + r + " has expired";
      if (6 == this.subType)
        return i + " just joined your event (" + r + " on " + n + ")";
    }
    if (2 == this.type) {
      if (0 == this.subType)
        return "You have an event (" + r + ") on " + n + " in " + o + " with " + i + ".";
      if (1 == this.subType) return "Upcoming event: " + n + " " + r + ". Please print your guest list.";
      if (2 == this.subType) return "The event (" + r + ") on " + n + " in " + o + " with " + i + " was cancelled by the host.";
      if (3 == this.subType) return i + " can no longer join " + r + " on " + n + ".";
      if (4 == this.subType) return "You have cancelled the event (" + r + ") on " + n + "."
    }
    if (3 == this.type) {
      if (0 == this.subType)
        return i + " has left a comment to your " + n + " " + r + ".";
      if (1 == this.subType)
        return i + " has replied to your comment for " + n + " " + r + " in " + o + "."
    }
  }
});

