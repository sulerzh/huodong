Template.pastReservationRow.onCreated(function() {
  Meteor.subscribe("oneMeal", Template.instance().data.mealId);
  Meteor.subscribe("oneUser", Template.instance().data.hostId);
});

Template.pastReservationRow.helpers({
  statusColor: function () {
    if (this.status == 0) {
      return "grey";
    }
    if (this.status == 1) {
      return "green";
    }
    if (this.status == -1||this.status == -2|| this.status == -3) {
      return "red";
    }
  },
  statusText: function () {
    if (0 == this.status) {
      return "Pending";
    }
    if (1 == this.status) {
      return "Confirmed";
    }
    if (-1 == this.status) {
      return "Declined";
    }
    if (-2 == this.status) {
      return "Cancelled";
    }
    if (-3 == this.status) {
      return "Event cancelled";
    }
    if (-4 == this.status) {
      return "Expired";
    }
  },
  date: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    return moment(meal.time.startAt).format("MMM D, YY ddd");
  },
  time: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    return moment(meal.time.startAt).format("h:mm");
  },
  title: function() {
    return Meals.findOne({ _id: this.mealId }).title;
  },
  city: function() {
    return Meals.findOne({ _id: this.mealId }).address.city;
  },
  host: function() {
    return Meteor.users.findOne({ _id: this.hostId }).profile.firstName;
  },
  attended: function() {
    return 1 == this.status;
  },
  reviewed: function() {
    return this.guestReviewed;
  },
  deadlinePassed: function() {
    var deadline = new Date(this.mealEndAt);
    deadline.setDate(deadline.getDate() + 14);
    return t < new Date;
  }
});

