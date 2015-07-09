// JavaScript source code

// cancelledOrderRow helper

!function () {
    Template.cancelledOrderRow.created = function () {
        Meteor.subscribe("oneMeal", Template.instance().data.mealId),
        Meteor.subscribe("oneUser", Template.instance().data.userId)
    },
    Template.cancelledOrderRow.helpers({
        statusText: function () {
            return 0 == this.status ? "Pending" : 1 == this.status ? "Confirmed" : -1 == this.status ? "Declined" : -2 == this.status ? "Cancelled" : -3 == this.status ? "Event cancelled" : -4 == this.status ? "Expired" : void 0
        }, requesterName: function () {
            return Meteor.users.findOne({ _id: this.userId }).profile.firstName
        }, plusGuests: function () {
            return 2 == this.numberOfGuests ? " and 1 Guest" : this.numberOfGuests > 2 ? " and " + (this.numberOfGuests - 1).toString() + " Guests" : void 0
        }, date: function () {
            var e = Meals.findOne({ _id: this.mealId });
            return e ? moment(e.time.startAt).utcOffset(e.time.zone).format("MMM DD") : void 0
        }, mealTitle: function () {
            var e = Meals.findOne({ _id: this.mealId });
            return e ? e.title : void 0
        }, startTime: function () {
            var e = Meals.findOne({ _id: this.mealId });
            return e ? moment(e.time.startAt).utcOffset(e.time.zone).format("LT") : void 0
        }
    })
}();
