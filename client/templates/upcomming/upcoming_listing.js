Template.upcomingListing.events({
  "click .past-listing-link": function () {
    Session.set("Listings section", 2);
  },
  "click .cancelled-listing-link": function () {
    Session.set("Listings section", 3);
  }
});

Template.upcomingListing.helpers({
  listings: function () {
    return Meals.find({
      hostId: Meteor.userId(),
      "time.startAt": { $gt: new Date },
      status: 1
    }, { sort: { "time.startAt": 1 } });
  }
});