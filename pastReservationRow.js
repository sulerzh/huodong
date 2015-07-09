// JavaScript source code

!function () {
    Template.pastReservationRow.created = function () {
        Meteor.subscribe("oneMeal", Template.instance().data.mealId),
        Meteor.subscribe("oneUser", Template.instance().data.hostId)
    },
    Template.pastReservationRow.helpers({
        statusColor: function () {
            return 0 == this.status ? "grey" : 1 == this.status ? "green" : -1 == this.status ? "red" : -2 == this.status ? "red" : -3 == this.status ? "red" : void 0
        }, statusText: function () {
            return 0 == this.status ? "Pending" : 1 == this.status ? "Confirmed" : -1 == this.status ? "Declined" : -2 == this.status ? "Cancelled" : -3 == this.status ? "Event cancelled" : -4 == this.status ? "Expired" : void 0
        }, date: function () {
            var t = Meals.findOne({ _id: this.mealId });
            return moment(t.time.startAt).format("MMM D, YY ddd")
        }, time: function () {
            var t = Meals.findOne({ _id: this.mealId });
            return moment(t.time.startAt).format("h:mm")
        }, title: function () {
            var t = Meals.findOne({ _id: this.mealId });
            return t.title
        }, city: function () {
            var t = Meals.findOne({ _id: this.mealId }); return t.address.city
        }, host: function () {
            var t = Meteor.users.findOne({ _id: this.hostId });
            return t.profile.firstName
        }, attended: function () {
            return 1 == this.status
        }, reviewed: function () { return this.guestReviewed }, deadlinePassed: function () {
            var t = new Date(this.mealEndAt); return t.setDate(t.getDate() + 14), t < new Date
        }
    })
}();

