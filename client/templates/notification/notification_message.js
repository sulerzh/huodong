Template.notificationMessage.onCreated(function() {
  Meteor.subscribe("oneMeal", Template.instance().data.mealId);
    Meteor.subscribe("oneUser", Template.instance().data.fromUserId);
});

Template.notificationMessage.events({
  "click .close.icon": function(e) {
    Meteor.call("hideNotification", this._id);
  },
  click: function (event) {
    if ($(event.target).hasClass("close") && $(event.target).hasClass("icon"))
      return;
  
    var t = Template.instance().data;
    if (0 == t.type) {
      if (0 == t.subType)
        Router.go("/users/me/profile/reviews/reviews_about_me");
      if (1 == t.subType)
        Router.go("postReviewForHost", { mealId: t.mealId });
      if (2 == t.subType)
        Router.go("mealGuestsList", { mealId: t.mealId });
    }
    if (1 == t.type) {
      if (3 == t.subType) {
        Router.go("/users/me/requests/pending");
      } else if (5 == t.subType) {
        Router.go("/users/me/requests/cancelled");
      } else {
        Router.go("orderByMealId", { mealId: t.mealId });
      }
    }
    if (2 == t.type) {
      if (1 == t.subType) {
        Router.go("/users/me/listings/upcoming");
      }else if (0 == t.subType || 2 == t.subType) {
        Router.go("orderByMealId", { mealId: t.mealId });
      }else if (3 == t.subType) {
        Router.go("/users/me/requests/cancelled");
      }else if (4 == t.subType) {
        Router.go("/users/me/listings/cancelled");
      }
    }
    if (3 == t.type) {
      if (0 == t.subType) {
        Router.go("mealShow", { mealId: t.mealId });
      }
      if (1 == t.subType) {
        Router.go("mealShow", { mealId: t.mealId });
        Meteor.call("hideNotification", this._id);
      }
    }
  }
});

Template.notificationMessage.helpers({
  typeName: function() {
    return GType.notificationType[this.type];
  },
  content: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    if(meal.time.startAt < moment(new Date).subtract(14, "d"))
      Meteor.call("hideNotification", this._id);
    var firstName = Meteor.users.findOne({ _id: this.fromUserId }).profile.firstName;
    var deadline = moment(meal.time.startAt).add(14, "d").fromNow(true);
    var title = meal.title;
    var city = meal.address.city;
     var startTime = moment(meal.time.startAt).format("M/D");
    if (0 == this.type) {
      if (0 == this.subType)
        return firstName + " wrote a review for " + title + ".";
      if (1 == this.subType)
        return "Please leave a review for " + firstName + ". You have " + deadline + " left to leave this review.";
      if (2 == this.subType)
        return "Please leave reviews for guests in your event on " + startTime + " " + title + " in " + city +
          ". You have " + deadline + " left to leave this review.";
    }
    if (1 == this.type) {
      if (0 == this.subType) {
        if (this.createdAt < moment(new Date).subtract(1, "d")) {
          Meteor.call("hideNotification", this._id);
        }
        return "Your request is pending for " + startTime + " " + title + " in " + city + " with " + firstName + "."; 
      }
      if (1 == this.subType)
        return "Your request is accepted for " + startTime + " " + title + " in " + city + " with " + firstName + ".";
      if (2 == this.subType)
        return "Your request is declined for " + startTime + " " + title + " in " + city + " with " + firstName + ".";
      if (3 == this.subType) {
        if (this.createdAt < moment(new Date).subtract(1, "d")) {
          Meteor.call("hideNotification", this._id);
        }
        return firstName + " wants to join your event: " + title + " on " + startTime +
            ". Please accept her to your event within 24 hours.";
      }
      if (4 == this.subType)
        return "Your request is expired for " + startTime + " " + title + " in " + city + " with " + firstName + ".";
      if (5 == this.subType)
        return "The request from " + firstName + " for " + startTime + " " + title + " has expired";
      if (6 == this.subType)
        return firstName + " just joined your event (" + title + " on " + startTime + ")";
    }
    if (2 == this.type) {
      if (0 == this.subType)
        return "You have an event (" + title + ") on " + startTime + " in " + city + " with " + firstName + ".";
      if (1 == this.subType) return "Upcoming event: " + startTime + " " + title + ". Please print your guest list.";
      if (2 == this.subType) return "The event (" + title + ") on " + startTime + " in " + city + " with " + firstName + " was cancelled by the host.";
      if (3 == this.subType) return firstName + " can no longer join " + title + " on " + startTime + ".";
      if (4 == this.subType) return "You have cancelled the event (" + title + ") on " + startTime + ".";
    }
    if (3 == this.type) {
      if (0 == this.subType)
        return firstName + " has left a comment to your " + startTime + " " + title + ".";
      if (1 == this.subType)
        return firstName + " has replied to your comment for " + startTime + " " + title + " in " + city + ".";
    }
  }
});

