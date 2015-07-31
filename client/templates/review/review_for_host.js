Template.reviewForHost.onCreated(function () {
  Meteor.subscribe("oneUser", Template.instance().data.hostId);
  this.hasError = new ReactiveVar(false);
  this.errors = new ReactiveVar;
});

Template.reviewForHost.onRendered(function () {
  $(".rating").rating({ initialRating: 0, maxRating: 5 });
});
Template.reviewForHost.events({
  "click #review-for-host-submit": function () {
    Logger.log("Overall: " + $("#hostOverallRating").rating("get rating"));
    Logger.log("Communication: " + $("#hostCommunicationRating").rating("get rating"));
    Logger.log("Content: " + $("#guestExperience").val());
    Logger.log("Private : " + $("#guestPrivateFeedbackPositive").val());
    Logger.log("Improvement: " + $("#guestPrivateFeedbackNegative").val());
    var review = {
      mealId: Router.current().params.mealId,
      overallRating: parseInt($("#hostOverallRating").rating("get rating")),
      communicationRating: parseInt($("#hostCommunicationRating").rating("get rating")),
      content: $("#guestExperience").val(),
      privateFeedback: $("#guestPrivateFeedbackPositive").val(),
      improvement: $("#guestPrivateFeedbackNegative").val(),
      userToHost: true
    };

    Meteor.call("newReview", review, function (error, r) {
      if (error) {
        Logger.log("New Review Error: " + JSON.stringify(error));
        var reasons = error.reason.split(",");
        var errs = [];
        for (var i = 0; i < reasons.length; i++)
          errs.push({ reason: reasons[i] });
        Template.instance().hasError.set(true);
        Template.instance().errors.set(errs);
        window.scrollTo(0, 0);
      } else
        Router.go("dashboard");
    });
  }
});

Template.reviewForHost.helpers({
  mealDate: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D, YYYY (ddd)");
  },
  mealStart: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("HH:mm A");
  },
  mealEnd: function () {
    return this.time.endAt ? moment(this.time.endAt).utcOffset(this.time.zone).format("HH:mm A") : false
  },
  hostName: function () {
    var e = Meteor.users.findOne({ _id: this.hostId });
    return e.profile.firstName;
  },
  hostColudinaryId: function () {
    var e = Meteor.users.findOne({ _id: this.hostId });
    return e.profile.thumbnail.cloudinaryPublicId;
  },
  hasError: function () {
    return Template.instance().hasError.get();
  },
  errors: function () {
    return Template.instance().errors.get();
  }
});

