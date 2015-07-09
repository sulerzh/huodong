// JavaScript source code

// pendingOrderRow

!function () {
    Template.pendingOrderRow.created = function () {
        Meteor.subscribe("oneMeal", Template.instance().data.mealId),
        Meteor.subscribe("oneUser", Template.instance().data.userId)
    },
    Template.pendingOrderRow.rendered = function () {
        var e = Template.instance();
        $("#decline-guest-confirm-" + Template.instance().data._id).click(function () {
            Meteor.call("declineGuest", e.data._id)
        })
    },
    Template.pendingOrderRow.events({
        "click .accept-button": function () {
            Meteor.call("acceptGuest", this._id)
        }, "click .reject-button": function () { $("#decline-guest-" + this._id).modal("show") }
    }),
    Template.pendingOrderRow.helpers({
        requesterName: function () {
            return Meteor.users.findOne({ _id: this.userId }).profile.firstName
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
            return 2 == this.numberOfGuests ? " and 1 Guest" :
                this.numberOfGuests > 2 ? " + " + (this.numberOfGuests - 1).toString() + " Guests" : void 0
        }, countDown: function () {
            return moment(this.createdAt).add(1, "day").from(new Date, true)
        }, expired: function () {
            return new Date > new Date(moment(this.createdAt).add(1, "day"))
        }, donationPerGuestFixed: function () {
            return this.donationPerGuest.toFixed(2)
        }
    })
}();
