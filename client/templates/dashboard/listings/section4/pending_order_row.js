Template.pendingOrderRow.onCreated(function() {
  Meteor.subscribe("oneMeal", Template.instance().data.mealId);
  Meteor.subscribe("oneUser", Template.instance().data.userId);
});

Template.pendingOrderRow.onRendered = function() {
  $("#decline-guest-confirm-" + Template.instance().data._id).click(function() {
    Meteor.call("declineGuest", Template.instance().data._id);
  });
};

Template.pendingOrderRow.events({
  "click .accept-button": function() {
    Meteor.call("acceptGuest", this._id);
  },
  "click .reject-button": function() {
    $("#decline-guest-" + this._id).modal("show");
  }
});
Template.pendingOrderRow.helpers({
  requesterName: function() {
    return Meteor.users.findOne({ _id: this.userId }).profile.firstName;
  },
  date: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    if (meal) {
      return moment(meal.time.startAt).utcOffset(meal.time.zone).format("MMM DD");
    }
  },
  mealTitle: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    if (meal) {
      return meal.title;
    }
  },
  startTime: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    if (meal) {
      return moment(meal.time.startAt).utcOffset(meal.time.zone).format("LT");
    }
  },
  plusGuests: function () {
    if (this.numberOfGuests == 2) {
      return " and 1 Guest";
    }
    if (this.numberOfGuests > 2) {
      return " + " + (this.numberOfGuests - 1).toString() + " Guests";
    }
  },
  countDown: function() {
    return moment(this.createdAt).add(1, "day").from(new Date, true);
  },
  expired: function() {
    return new Date > new Date(moment(this.createdAt).add(1, "day"));
  },
  donationPerGuestFixed: function() {
    return this.donationPerGuest.toFixed(2);
  }
});

