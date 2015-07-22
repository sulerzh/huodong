Template.ReviewToWriteItem.OnCreated(function () {
  var e;
  e = this.data.hostId == Meteor.userId() ? this.data.userId : this.data.hostId,
    Meteor.subscribe("oneUser", e), Meteor.subscribe("oneMeal", this.data.mealId)
});

Template.ReviewToWriteItem.helpers({
  userCloudinaryPublicId: function () {
    var e;
    e = this.hostId == Meteor.userId() ? this.userId : this.hostId;
    var t = Meteor.users.findOne({ _id: e });
    return t.profile.thumbnail.cloudinaryPublicId
  },
  userName: function () {
    var e;
    e = this.hostId == Meteor.userId() ? this.userId : this.hostId;
    var t = Meteor.users.findOne({ _id: e });
    return t.profile.firstName
  },
  mealTitle: function () {
    var e = Meals.findOne({ _id: this.mealId });
    return e.title
  },
  mealDate: function () {
    var e = Meals.findOne({ _id: this.mealId });
    return moment(e.time.startAt).utcOffset(e.time.zone).format("DD MMM YYYY")
  },
  expiredIn: function () {
    var e = moment(this.mealEndAt).add(14, "days"), t = e.diff(new Date, "days");
    if (t > 0) return t + " day(s)";
    var r = e.diff(new Date, "hours");
    return r > 0 ? e.diff(new Date, "hours") + " hour(s)" : e.diff(new Date, "minutes") + " minute(s)"
  },
  isGuest: function () {
    return this.hostId != Meteor.userId()
  },
  hostId: function () {
    var e = Meals.findOne({ _id: this.mealId });
    return e.hostId
  }
});

