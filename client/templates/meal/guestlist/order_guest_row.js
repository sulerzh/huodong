Template.orderGuestRow.onCreated(function () {
  Meteor.subscribe("oneUser", Template.instance().data.userId);
});

Template.orderGuestRow.helpers({
  requesterName: function () {
    return Meteor.users.findOne({ _id: this.userId }).profile.firstName;
  },
  totalDonationToHost: function () {
    if (this.status == -2) {
      return "cancelled";
    }
    return "$" + (this.total / 1.15).toFixed();
  },
  requesterPhone: function () {
    var user = Meteor.users.findOne({ _id: this.userId });
    return "(" +
      user.profile.phone.substring(0, 3) + ")" +
      user.profile.phone.substring(3, 6) + "-" +
      user.profile.phone.substring(6, 10);
  },
  requesterEmail: function () {
    return Meteor.users.findOne({ _id: this.userId }).emails[0].address;
  },
  mealPassed: function () {
    return this.mealEndAt < new Date;
  },
  reviewed: function () {
    return this.hostReviewed;
  },
  reviewDeadlinePassed: function () {
    var endDate = new Date(this.mealEndAt);
    endDate.setDate(endDate.getDate() + 14);
    return endDate < new Date;
  },
  guestCancelled: function () {
    return this.status == -2;
  }
});

