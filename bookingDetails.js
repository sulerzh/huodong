// JavaScript source code
!function () {
    Template.bookingDetails.created = function () {
        Meteor.subscribe("oneMeal", this.data.mealId),
        Meteor.subscribe("oneUser", this.data.hostId)
    },
    Template.bookingDetails.events({
        "click #print-btn": function () {
            window.print()
        }
    }),
    Template.bookingDetails.helpers({
        createdDate: function () {
            return moment(this.createdAt).format("MMM DD, YYYY")
        }, braintreeTransactionId: function () {
            return this.authNet.transactionId.toUpperCase()
        }, statusText: function () {
            return 0 == this.status ? "Pending" : 1 == this.status ?
                "Confirmed" : -1 == this.status ? "Declined" : -2 == this.status ?
                "Cancelled" : -3 == this.status ? "Event cancelled" :
                -4 == this.status ? "Expired" : void 0
        }, otherGuests: function () {
            return 2 == this.numberOfGuests ? "+ 1 Guest" :
                this.numberOfGuests > 2 ? "+ " + (this.numberOfGuests - 1) + " Guests" : ""
        }, eventTitle: function () {
            var t = Meals.findOne({ _id: this.mealId }); return t.title
        }, eventDate: function () {
            var t = Meals.findOne({ _id: this.mealId });
            return moment(t.time.startAt).utcOffset(t.time.zone).format("HH:mm MMM DD,YYYY")
        }, eventAddress: function () {
            var t = Meals.findOne({ _id: this.mealId }); return 1 == this.status ? t.address.full ?
                t.address.full : t.address.city + ", " + t.address.state : t.address.city
        }, eventHost: function () {
            var t = Meteor.users.findOne({ _id: this.hostId }); return t.profile.firstName
        }, donationWithoutFee: function () {
            return this.status >= 0 ? (this.donationPerGuest / 1.15).toFixed(2) : 0
        }, totalDonationWithoutFee: function () {
            return this.status >= 0 ? (this.donationPerGuest * this.numberOfGuests).toFixed(2) : 0
        }, serviceFee: function () {
            if (this.status >= 0) {
                var t = Meals.findOne({ _id: this.mealId });
                return (.15 * t.pricePerGuest * this.numberOfGuests).toFixed(2)
            } return 0
        }, totalFixed: function () {
            return this.status >= 0 ? this.total.toFixed(2) : 0
        }, donationFixed: function () {
            return this.status >= 0 ? this.donationPerGuest.toFixed(2) : 0
        }, isPending: function () {
            return 0 == this.status
        }
    })
}();
