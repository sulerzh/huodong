// JavaScript source code

!function () {
    Template.receivedRequestApproved.helpers({
        orders: function () {
            return Orders.find({ hostId: Meteor.userId(), status: 1 }, { sort: { createdAt: -1 } })
        }
    }),
    Template.receivedRequestApproved.events({
        "click .pending-request-link": function () {
            Session.set("Listings section", 4)
        }, "click .cancelled-request-link": function () { Session.set("Listings section", 6) }
    })
}();
