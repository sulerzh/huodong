Template.pastListing.events({
  "click .upcoming-listing-link": function () {
    Session.set("Listings section", 1);
  },
  "click .cancelled-listing-link": function() {
    Session.set("Listings section", 3);
  }
});

Template.pastListing.helpers({
  listings: function () {
    return Meals.find({
      hostId: Meteor.userId(),
      "time.startAt": { $lt: new Date },
      status: 1
    });
  }
});

