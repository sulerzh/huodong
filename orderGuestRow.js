// JavaScript source code

!function () {
    Template.orderGuestRow.created = function () {
        Meteor.subscribe("oneUser", Template.instance().data.userId)
    },
    Template.orderGuestRow.helpers({
        requesterName: function () {
            var e = Meteor.users.findOne({ _id: this.userId });
            return e.profile.firstName
        }, totalDonationToHost: function () {
            return -2 == this.status ? "cancelled" : "$" + (this.total / 1.15).toFixed()
        }, requesterPhone: function () {
            var e = Meteor.users.findOne({ _id: this.userId });
            return "(" + e.profile.phone.substring(0, 3) + ")" +
                e.profile.phone.substring(3, 6) + "-" +
                e.profile.phone.substring(6, 10)
        }, requesterEmail: function () {
            var e = Meteor.users.findOne({ _id: this.userId });
            return e.emails[0].address
        }, mealPassed: function () {
            return this.mealEndAt < new Date
        }, reviewed: function () {
            return this.hostReviewed
        }, reviewDeadlinePassed: function () {
            var e = new Date(this.mealEndAt);
            return e.setDate(e.getDate() + 14), e < new Date
        }, guestCancelled: function () { return -2 == this.status }
    })
}();
