Template.bookingDetails.onCreated(function () {
  Meteor.subscribe("oneMeal", this.data.mealId);
  Meteor.subscribe("oneUser", this.data.hostId);
});

Template.bookingDetails.events({
  "click #print-btn": function () {
    window.print();
  }
});

Template.bookingDetails.helpers({
  createdDate: function () {
    return moment(this.createdAt).format("MMM DD, YYYY");
  },
  braintreeTransactionId: function () {
    return this.authNet.transactionId.toUpperCase();
  },
  statusText: function () {
    return 0 == this.status ? "Pending" : 1 == this.status ?
      "Confirmed" : -1 == this.status ? "Declined" : -2 == this.status ?
      "Cancelled" : -3 == this.status ? "Event cancelled" :
      -4 == this.status ? "Expired" : void 0;
  },
  otherGuests: function () {
    return 2 == this.numberOfGuests ? "+ 1 Guest" :
      this.numberOfGuests > 2 ? "+ " + (this.numberOfGuests - 1) + " Guests" : "";
  },
  eventTitle: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return meal.title;
  },
  eventDate: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return moment(meal.time.startAt).utcOffset(meal.time.zone).format("HH:mm MMM DD,YYYY");
  },
  eventAddress: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return 1 == this.status ? meal.address.full ?
      meal.address.full : meal.address.city + ", " + meal.address.state : meal.address.city;
  },
  eventHost: function () {
    var user = Meteor.users.findOne({ _id: this.hostId });
    return user.profile.firstName;
  },
  donationWithoutFee: function () {
    return this.status >= 0 ? (this.donationPerGuest / 1.15).toFixed(2) : 0;
  },
  totalDonationWithoutFee: function () {
    return this.status >= 0 ? (this.donationPerGuest * this.numberOfGuests).toFixed(2) : 0;
  },
  serviceFee: function () {
    if (this.status >= 0) {
      var meal = Meals.findOne({ _id: this.mealId });
      return (.15 * meal.pricePerGuest * this.numberOfGuests).toFixed(2);
    }
    return 0;
  },
  totalFixed: function () {
    return this.status >= 0 ? this.total.toFixed(2) : 0;
  },
  donationFixed: function () {
    return this.status >= 0 ? this.donationPerGuest.toFixed(2) : 0;
  },
  isPending: function () {
    return 0 == this.status;
  }
});
