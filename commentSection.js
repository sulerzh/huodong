
Template.commentSection.OnCreated(function () {
  Meteor.subscribe("oneUser", Template.instance().data.userId);
});

Template.commentSection.helpers({
  userName: function () {
    var user = Meteor.users.findOne({ _id: this.userId });
    return user.profile.firstName;
  },
  timeAgo: function () {
    return moment(this.createdAt).fromNow();
  },
  replyContent: function () {
    var comment = Comments.findOne({ replyToId: this._id });
    return comment.content;
  },
  replyUserId: function () {
    var comment = Comments.findOne({ replyToId: this._id });
    return comment.userId;
  },
  replyCreatedAt: function () {
    var comment = Comments.findOne({ replyToId: this._id });
    return comment.createdAt;
  },
  isHostOfMeal: function () {
    var meal = Meals.findOne({ _id: this.mealId });
    return meal.hostId == Meteor.userId();
  },
  userThumbnail: function () {
    var user = Meteor.users.findOne({ _id: this.userId });
    return user.profile.thumbnail.cloudinaryPublicId;
  }
});

