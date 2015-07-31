Template.ReviewToWriteItem.onCreated(function () {
  var userId = this.data.hostId == Meteor.userId() ? this.data.userId : this.data.hostId;
  Meteor.subscribe("oneUser", userId);
  Meteor.subscribe("oneMeal", this.data.mealId);
});

Template.ReviewToWriteItem.helpers({
  userCloudinaryPublicId: function () {
    var userId = this.hostId == Meteor.userId() ? this.userId : this.hostId;
    var user = Meteor.users.findOne({ _id: userId });
    return user.profile.thumbnail.cloudinaryPublicId;
  },
  userName: function () {
    var userId = this.hostId == Meteor.userId() ? this.userId : this.hostId;
    var user = Meteor.users.findOne({ _id: userId });
    return user.profile.firstName;
  },
  mealTitle: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return meal.title;
  },
  mealDate: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return moment(meal.time.startAt).utcOffset(meal.time.zone).format("DD MMM YYYY");
  },
  expiredIn: function () {
    var deadline = moment(this.mealEndAt).add(14, "days");
    var leftDays = deadline.diff(new Date, "days");
    if (leftDays > 0)
      return leftDays + " day(s)";
    var leftHours = deadline.diff(new Date, "hours");
    if (leftHours > 0) {
      return deadline.diff(new Date, "hours") + " hour(s)";
    }
    return deadline.diff(new Date, "minutes") + " minute(s)";
  },
  isGuest: function () {
    return this.hostId != Meteor.userId();
  },
  hostId: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return meal.hostId;
  }
});

