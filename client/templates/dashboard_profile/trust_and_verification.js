Template.TrustAndVerification.events({
  "click #edu-verify": function () {
    $("#edu-verify-modal").modal("show");
    $("#submit-edu-email").click(function() {
      Meteor.call("verifyEduEmail", $("input[name='edu-email']").val());
    });
  },
  "click #facebook-qualify": function () {
    var user = Meteor.user();
    if (!user.services.facebook) {
      Meteor.linkWithFacebook({
          requestPermissions: [
            "email", "user_friends", "user_birthday",
            "user_education_history",
            "user_work_history", "user_interests"
          ]
        }, function(error) {
          if (error)
            throw new Meteor.Error("Facebook connect failed");
        Meteor.call("updateFromFacebookProfile");
      });
    }
      Meteor.call("facebookQualifying", function(error, result) {
        if (!result) {
          $("#facebookQualificationSegment").append("<p class='ui red text'>Sorry, you are not qualified.</p>");
        }
      });
  },
  "click #facebook-connect-button": function () {
    Meteor.linkWithFacebook({
      requestPermissions: [
        "email", "user_friends",
        "user_birthday", "user_education_history", "user_work_history",
        "user_interests"
      ]
    }, function(error) {
      if (error)
        throw new Meteor.Error("Facebook connect failed");
      Meteor.call("updateFromFacebookProfile");
    });
  },
  "click #google-connect-button": function () {
    Meteor.linkWithGoogle({}, function(error) {
      if (error)
        throw new Meteor.Error("Google+ connect failed");
    });
  },
  "click #resend-email-button": function () {
    Meteor.call("resendVerificationEmail");
    $("#resend-email-button").addClass("green");
    $("#resend-email-button").html("<i class='ui checkmark icon'></i> Email Sent");
  },
  "click #change-email-button": function () {
    $("#change-email-modal").modal("show");
  }
});

Template.TrustAndVerification.helpers({
  currentEmailAddress: function () {
    return Meteor.user().emails[0].address;
  }
});