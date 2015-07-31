Template.TransactionHistory.onCreated(function () {
  Meteor.subscribe("hostOrders"), Meteor.subscribe("selfMeals");
});
Template.TransactionHistory.helpers({
  transactions: function () {
    return Meals.find({
      hostId: Meteor.userId(),
      "time.startAt": { $lt: new Date },
      status: 1
    },
    { sort: { "time.startAt": -1 } });
  }
});

