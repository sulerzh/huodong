// JavaScript source code
!function () {
    Template.receivedRequestPending.events({
        "click .approved-request-link": function () {
            Session.set("Listings section", 5)
        }, "click .cancelled-request-link": function () { Session.set("Listings section", 6) }
    }),
    Template.receivedRequestPending.helpers({
        orders: function () {
            return Orders.find({ hostId: Meteor.userId(), status: 0 }, { sort: { createdAt: -1 } })
        }
    })
}();
