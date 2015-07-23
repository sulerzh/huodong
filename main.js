// 初始化全局库
!function () {
  var e = function (e) {
    this.debug = e, this.log = function (e) { this.debug && console.log(e) }
  };
  Logger = new e(Meteor.settings.deubgLog);
  Meals = new Mongo.Collection("meals");
  Orders = new Mongo.Collection("orders");
  Reviews = new Mongo.Collection("reviews");
  Comments = new Mongo.Collection("comments");
  Notifications = new Mongo.Collection("notifications");
  ContactUsMessage = new Mongo.Collection("contactUsMessage");
  Inbox = new Mongo.Collection("inbox");
  GType = {
    placeType: ["Private Residency", "Cafe", "Restaurant", "Other", "Studio", "Outdoor"],
    hostingStyle: ["Plated", "Self-served"],
    gender: ["Male", "Female", "Other", "Prefer Not to Tell"],
    notificationType: ["Review", "Request", "Reminder", "Comment"]
  };
}();

