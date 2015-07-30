Template.featureEventCard.onCreated(function() {
  Meteor.subscribe("oneUser", Template.instance().data.hostId);
});

Template.featureEventCard.onRendered(function() {
  this.$(".ui.fluid.card .image").dimmer({ on: "hover" });
});

Template.featureEventCard.helpers({
  startTime: function() {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("hh:mmA");
  },
  startDate: function() {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("dddd, MMM D");
  },
  priceWithServiceFee: function() {
    return (1.15 * this.pricePerGuest).toFixed(2);
  },
  isFree: function() {
    return 0 == this.pricePerGuest;
  },
  isPast: function() {
    return moment(this.time.startAt).utcOffset(this.time.zone) <= moment(Date()).utcOffset(this.time.zone);
  },
  hostCloudinaryPublicId: function() {
    return Meteor.users.findOne({ _id: this.hostId }).profile.thumbnail.cloudinaryPublicId;
  },
  numberOfGuests: function() {
    return this.numberOfGuests;
  },
  hasGuest: function() {
    return this.numberOfGuests >= 1;
  }
});

Template.featureEventCard.events({
  "click .ui.fluid.card.event-card": function() {
    Router.go("mealShow", { mealId: Template.instance().data._id });
  }
});

