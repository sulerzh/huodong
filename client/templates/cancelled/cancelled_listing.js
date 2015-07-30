Template.cancelledListing.helpers({
  listings: function () {
    return Meals.find({
      hostId: Meteor.userId(),
      status: -1
    });
  }
});

Template.cancelledListing.events({
  "click .upcoming-listing-link": function () {
    Session.set("Listings section", 1);
  },
  "click .past-listing-link": function () {
    Session.set("Listings section", 2);
  }
});