Template.upcomingReservationRow.onCreated(function() {
  Meteor.subscribe("oneMeal", Template.instance().data.mealId),
    Meteor.subscribe("oneUser", Template.instance().data.hostId)
});

Template.upcomingReservationRow.events({
  "click .cancel-reservation-btn": function(t) {
    $("#cancel-" + Template.instance().data._id).modal("show");
    $(".cancel-reservation-confirm").click(function() {
      Meteor.call("cancelReservation", Template.instance().data._id);
    });
  }
});

Template.upcomingReservationRow.helpers({
  statusColor: function () {
    if (0 == this.status) {
      return "grey";
    }
    if (1 == this.status) {
      return "green";
    }
    if (-1 == this.status || -2 == this.status || -3 == this.status) {
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
    return moment(meal.time.startAt).format("h:mm A");
  },
  title: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    return meal.title;
  },
  city: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    return meal.address.city;
  },
  host: function() {
    var user = Meteor.users.findOne({ _id: this.hostId });
    return user.profile.firstName;
  },
  cancellable: function() {
    return this.status >= 0;
  }
});

