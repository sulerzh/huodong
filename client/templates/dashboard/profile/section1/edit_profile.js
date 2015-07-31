Template.EditProfile.onRendered(function () {
  Session.set("Edit profile success", false);
  Template.instance().autorun(function() {
    if (Meteor.user()) {
      Template.instance().$(".ui.dropdown").dropdown();
    }
  });
  $("#profile-photo-file-btn").click(function() {
    $("#profile-photo-file").click();
  });
  this.$(".has-popup").popup();
});

Template.EditProfile.events({
  "click #update-profile-button": function () {
    var user = { profile: {}, emergency: {} };
    Logger.log("First Name: " + $("input[name='first-name']").val());
    user.profile.firstName = $("input[name='first-name']").val();
    Logger.log("Last Name: " + $("input[name='last-name']").val());
    user.profile.lastName = $("input[name='last-name']").val();
    Logger.log("Profile Picture: " + $("#profile-photo-url").val());
    if ($("#profile-photo-url").val().length > 0) {
      user.profile.thumbnail = { org: $("#profile-photo-url").val() };
    }
    Logger.log("Gender: " + $("input[name='gender']").val());
    if ($("input[name='gender']").val().length > 0) {
      user.profile.gender = parseInt($("input[name='gender']").val());
    }
    if ($("input[name='year']").val().length > 0 &&
      $("input[name='month']").val().length > 0 &&
      $("input[name='day']").val().length > 0) {
      Logger.log("Birthday: " +
        new Date(moment(new Date($("input[name='year']").val() +
          "-" +
          $("input[name='month']").val() +
          "-" +
          $("input[name='day']").val())).zone(0).format("l")));
      user.profile.birthday = new Date(moment(new Date($("input[name='year']").val() +
        "-" +
        $("input[name='month']").val() +
        "-" +
        $("input[name='day']").val())).zone(0).format("l"));
    } else {
      Logger.log("Birthday: ");
    }
    Logger.log("City: " + $("input[name='profile-city']").val());
    user.profile.city = $("input[name='profile-city']").val();
    Logger.log("Description: " + $("#user-description").val());
    user.profile.description = $("#user-description").val();
    Logger.log("School: " + $("input[name='school']").val());
    user.profile.school = $("input[name='school']").val();
    Logger.log("Work: " + $("input[name='work']").val());
    user.profile.work = $("input[name='work']").val();
    Logger.log("Language: " + $("input[name='language']").val());
    user.profile.language = $("input[name='language']").val();
    Logger.log("Emergency Contact's Name: " + $("input[name='emergency-contact-name']").val());
    user.emergency.name = $("input[name='emergency-contact-name']").val();
    Logger.log("Emergency Contact's Phone: " + $("input[name='emergency-contact-phone']").val());
    user.emergency.phone = $("input[name='emergency-contact-phone']").val();
    Logger.log("Emergency Contact's Email: " + $("input[name='emergency-contact-email']").val());
    user.emergency.email = $("input[name='emergency-contact-email']").val();
    Logger.log("Emergency Contact's Relationship: " + $("input[name='emergency-contact-relationship']").val());
    user.emergency.relationship = $("input[name='emergency-contact-relationship']").val();
    return Meteor.call("editProfile", user, function(error) {
      if (error) {
        Logger.log(JSON.stringify(error));
      }
      Session.set("Edit profile success", true);
      $("html, body").animate({ scrollTop: 0 }, 500);
    });
  },
  "keyup input": function () {
    Session.set("Edit profile success", false);
  },
  "change input[type='file']": function (e) {
    Logger.log("Filetype: " + e.target.files);
    var uploader = new Slingshot.Upload("profilePhotoUpload");
    uploader.send(e.target.files[0], function (error, downloadUrl) {
      Meteor.call("updateProfilePicture", downloadUrl);
    });
  }
});

Template.EditProfile.helpers({
  currentUserEmail: function () {
    return Meteor.user().emails[0].address;
  },
  currentUserBirthdayMonth: function () {
    return Meteor.user().profile.birthday ?
      moment(Meteor.user().profile.birthday).format("MM") : void 0;
  },
  currentUserBirthdayDay: function () {
    return Meteor.user().profile.birthday ?
      moment(Meteor.user().profile.birthday).format("DD") : void 0;
  },
  currentUserBirthdayYear: function () {
    return Meteor.user().profile.birthday ?
      moment(Meteor.user().profile.birthday).format("YYYY") : void 0;
  },
  saved: function () {
    return Session.get("Edit profile success");
  }
});