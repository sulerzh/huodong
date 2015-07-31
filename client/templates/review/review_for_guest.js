Template.reviewForGuest.onCreated(function () {
  Meteor.subscribe("oneUser", Template.instance().data.hostId);
  this.hasError = new ReactiveVar(false);
  this.errors = new ReactiveVar;
});

Template.reviewForGuest.onRendered(function () {
  $(".rating").rating({ initialRating: 0, maxRating: 5 });
});

Template.reviewForGuest.events({
  "click #review-for-guest-submit": function () {
    Logger.log("Impression: " + $("#hostReviewForGuest").val());
    Logger.log("Private Feedback: " + $("#hostReviewForPlenry").val());
    Logger.log("Overall rating: " + $("#guestOverallRating").rating("get rating"));
    var review = {
      mealId: Router.current().params.mealId,
      userId: Router.current().params.userId,
      overallRating: parseInt($("#guestOverallRating").rating("get rating")),
      userToHost: false,
      content: $("#hostReviewForGuest").val(),
      privateFeedback: $("#hostReviewForPlenry").val()
    };

    Meteor.call("newReview", review, function (error, result) {
      if (error) {
        Logger.log("New Review Error: " + JSON.stringify(error));
        var reasons = error.reason.split(",");
        var errs = [];
        for (var o = 0; o < reasons.length; o++)
          errs.push({ reason: reasons[o] });
        Template.instance().hasError.set(true);
        Template.instance().errors.set(errs);
        window.scrollTo(0, 0);
      } else
        Router.go("mealGuestsList", { mealId: Router.current().params.mealId });
    });
  }
});

Template.reviewForGuest.helpers({
  guestName: function () {
    var user = Meteor.users.findOne({ _id: Router.current().params.userId });
    return user.profile.firstName;
  },
  mealDate: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D, YYYY (ddd)");
  },
  userCloudinaryPublicId: function () {
    var user = Meteor.users.findOne({ _id: Router.current().params.userId });
    return user.profile.thumbnail.cloudinaryPublicId;
  },
  hasError: function () {
    return Template.instance().hasError.get();
  },
  errors: function () {
    return Template.instance().errors.get();
  }
});

