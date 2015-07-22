Template.upcomingReservationRow.events({
  "click .cancel-reservation-btn": function(t) {
    var e = Template.instance().data._id;
    $("#cancel-" + e).modal("show"),
      $(".cancel-reservation-confirm").click(function() {
        Meteor.call("cancelReservation", e)
      })
  }
});

Template.upcomingReservationRow.OnCreated(function() {
  Meteor.subscribe("oneMeal", Template.instance().data.mealId),
    Meteor.subscribe("oneUser", Template.instance().data.hostId)
});

Template.upcomingReservationRow.helpers({
  statusColor: function() {
    return 0 == this.status ? "grey" : 1 == this.status ?
      "green" : -1 == this.status ? "red" : -2 == this.status ?
      "red" : -3 == this.status ? "red" : void 0
  },
  statusText: function() {
    return 0 == this.status ? "Pending" : 1 == this.status ?
      "Confirmed" : -1 == this.status ? "Declined" : -2 == this.status ?
      "Cancelled" : -3 == this.status ? "Event cancelled" : -4 == this.status ? "Expired" : void 0
  },
  date: function() {
    var t = Meals.findOne({ _id: this.mealId });
    return moment(t.time.startAt).format("MMM D, YY ddd")
  },
  time: function() {
    var t = Meals.findOne({ _id: this.mealId });
    return moment(t.time.startAt).format("h:mm A")
  },
  title: function() {
    var t = Meals.findOne({ _id: this.mealId });
    return t.title
  },
  city: function() {
    var t = Meals.findOne({ _id: this.mealId });
    return t.address.city
  },
  host: function() {
    var t = Meteor.users.findOne({ _id: this.hostId });
    return t.profile.firstName
  },
  cancellable: function() {
    return this.status >= 0
  }
});

