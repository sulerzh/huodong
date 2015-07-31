Template.transactionRow.onCreated(function () {
  Meteor.subscribe("oneUser", Template.instance().data.userId);
  Meteor.subscribe("hostOrders");
});

Template.transactionRow.helpers({
  date: function () {
    return moment(this.time.startAt).format("ll");
  },
  time: function () {
    return moment(this.time.startAt).format("h:mm A");
  },
  eventTitle: function () {
    return this.title;
  },
  totalForEvent: function () {
    var orders = Orders.find({ mealId: this._id, status: 1 });
    var total = 0;
    orders.forEach(function (order) {
      total += order.donationPerGuest * order.numberOfGuests;
    });
    return "$" + total.toFixed(2);
  },
  mealId: function () {
    return this._id;
  }
});
