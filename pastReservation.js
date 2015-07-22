Template.pastReservation.helpers({
  pastReservations: function() {
    return Orders.find({
      userId: Meteor.userId(),
      mealEndAt: { $lt: new Date }
    });
  }
});

