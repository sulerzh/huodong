Template.ReviewAboutYouItem.onCreated(function() {
  var userId = this.data.userToHost ? this.data.userId : this.data.hostId;
  Meteor.subscribe("oneUser", userId);
  Meteor.subscribe("oneMeal", this.data.mealId);
});

Template.ReviewAboutYouItem.helpers({
  userCloudinaryPublicId: function() {
    var userId = this.userToHost ? this.userId : this.hostId;
    return Meteor.users.findOne({ _id: userId }).profile.thumbnail.cloudinaryPublicId;
  },
  userName: function() {
    var userId = this.userToHost ? this.userId : this.hostId;
    return Meteor.users.findOne({ _id: userId }).profile.firstName;
  },
  mealTitle: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    return meal.title;
  },
  mealDate: function() {
    var meal = Meals.findOne({ _id: this.mealId });
    return moment(meal.time.startAt).utcOffset(meal.time.zone).format("DD MMM YYYY");
  },

  reviewContent: function() {
    return this.content;
  }
});

