Template.ReviewAboutYouItem.OnCreated(function() {
  var e;
  e = this.data.userToHost ? this.data.userId : this.data.hostId,
    Meteor.subscribe("oneUser", e), Meteor.subscribe("oneMeal", this.data.mealId);
});

Template.ReviewAboutYouItem.helpers({
  userCloudinaryPublicId: function() {
    var e;
    e = this.userToHost ? this.userId : this.hostId;
    var t = Meteor.users.findOne({ _id: e });
    return t.profile.thumbnail.cloudinaryPublicId;
  },
  userName: function() {
    var e;
    e = this.userToHost ? this.userId : this.hostId;
    var t = Meteor.users.findOne({ _id: e });
    return t.profile.firstName;
  },
  mealTitle: function() {
    var e = Meals.findOne({ _id: this.mealId });
    return e.title;
  },
  mealDate: function() {
    var e = Meals.findOne({ _id: this.mealId });
    return moment(e.time.startAt).utcOffset(e.time.zone).format("DD MMM YYYY");
  },

  reviewContent: function() {
    return this.content;
  }
});

