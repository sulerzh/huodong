Template.TrustAndVerification.onRendered(function () {
  $("#phone-verification-modal").modal({
    closable: false,
    onShow: function() {
      $("#why-verify").accordion();
      $("#why-verify").accordion("open", 0);
      $("#why-verify").accordion("close", 0);
    }
  });
  $("#phone-verification").click(function() {
    $("#phone-verification-modal").modal("show");
  });
});

Template.TrustAndVerification.helpers({
  currentEmailAddress: function () {
    return Meteor.user().emails[0].address;
  },
  fbFriendsVerified: function () {
    return Template.instance().FBCollection.find().fetch();
  },
  emailVerified:
    function () {
      for (var i = 0; i < Meteor.user().emails.length; i++) {
        if (Meteor.user().emails[i].verified)
          return true;
      }
    },
  phoneVerified: function () {
    return 1 == Meteor.user().phoneVerification.status;
  },
  idVerified: function () {
    return Meteor.user().idVerification &&
      Meteor.user().idVerification.status == 1;
  },
  eduVerified: function () {
    for (var e = 0; e < Meteor.user().emails.length; e++)
      if (Meteor.user().emails[e].verified &&
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.
        test(Meteor.user().emails[e].address))
        return true;
    return false;
  },
  facebookQualified: function () {
    return Meteor.user().facebookQualification &&
      Meteor.user().facebookQualification.status == 1;
  },
  hasWarning: function () {
    return Session.get("Verification warning");
  },
  warningHeader: function () {
    return Session.get("Verification warning header");
  },
  warningMessage: function () {
    Session.get("Verification warning message");
  }
});

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
