// JavaScript source code

// approvedOrderRow helper

!function () {
    Template.approvedOrderRow.created = function () {
        Meteor.subscribe("oneMeal", Template.instance().data.mealId),
        Meteor.subscribe("oneUser", Template.instance().data.userId)
    },
    Template.approvedOrderRow.helpers({
        requesterName: function () {
            return Meteor.users.findOne({ _id: this.userId }).profile.firstName
        }, phone: function () {
            return Meteor.users.findOne({ _id: this.userId }).profile.phone
        }, email: function () {
            return Meteor.users.findOne({ _id: this.userId }).emails[0].address
        }, date: function () {
            var e = Meals.findOne({ _id: this.mealId });
            return e ? moment(e.time.startAt).utcOffset(e.time.zone).format("MMM DD") : void 0
        }, mealTitle: function () {
            var e = Meals.findOne({ _id: this.mealId });
            return e ? e.title : void 0
        }, startTime: function () {
            var e = Meals.findOne({ _id: this.mealId });
            return e ? moment(e.time.startAt).utcOffset(e.time.zone).format("LT") : void 0
        }, plusGuests: function () {
            return 2 == this.numberOfGuests ? " and 1 Guest" : this.numberOfGuests > 2 ? " and " +
                (this.numberOfGuests - 1).toString() + " Guests" : void 0
        }, donationPerGuestFixed: function () { return this.donationPerGuest.toFixed(2) }
    })
}();