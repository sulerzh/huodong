// JavaScript source code

!function () {
    Template.transactionRow.created = function () {
        Meteor.subscribe("oneUser", Template.instance().data.userId),
        Meteor.subscribe("hostOrders")
    },
    Template.transactionRow.helpers({
        date: function () {
            return moment(this.time.startAt).format("ll")
        }, time: function () {
            return moment(this.time.startAt).format("h:mm A")
        }, eventTitle: function () {
            return this.title
        }, totalForEvent: function () {
            var t = Orders.find({ mealId: this._id, status: 1 }), e = 0;
            return t.forEach(function (t) {
                e += t.donationPerGuest * t.numberOfGuests
            }), "$" + e.toFixed(2)
        }, mealId: function () {
            return this._id
        }
    })
}();
