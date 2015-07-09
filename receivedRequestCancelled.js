// JavaScript source code

!function () {
    Template.receivedRequestCancelled.helpers({
        orders: function () {
            return Orders.find({ hostId: Meteor.userId(), status: { $lte: -1 } }, {
                sort: {
                    createdAt: -1
                }
            })
        }
    }),
    Template.receivedRequestCancelled.events({
        "click .pending-request-link": function () {
            Session.set("Listings section", 4)
        },
        "click .approved-request-link": function () {
            Session.set("Listings section", 5)
        }
    })
}();
