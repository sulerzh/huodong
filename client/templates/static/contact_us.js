Template.contactUs.onRendered(function () {
  Session.set("Contact us success", false);
  Session.set("Contact us fail", false);
});

Template.contactUs.events({
  "click #contact-us-submit": function () {
    var name = $("#contact-us-name").val();
    var email = $("#contact-us-email").val();
    var message = $("#contact-us-message").val();
    if (name.length > 0 && email.length > 0 && message.length > 0) {
      Meteor.call("newContactUsMessage", name, email, message);
      Session.set("Contact us success", true);
      Session.set("Contact us fail", false);
      $("#contact-us-name").val("");
      $("#contact-us-email").val("");
      $("#contact-us-message").val("");
    } else {
      Session.set("Contact us success", false);
      Session.set("Contact us fail", true);
    }
  }
});

Template.contactUs.helpers({
  success: function () {
    return Session.get("Contact us success");
  },
  error: function () {
    return Session.get("Contact us fail");
  }
});