// JavaScript source code
!function () {
    Template.pastReservation.helpers({
        pastReservations: function () {
            var e = Orders.find({ userId: Meteor.userId(), mealEndAt: { $lt: new Date } });
            return e
        }
    })
}();
