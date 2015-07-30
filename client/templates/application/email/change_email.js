Template.ChangeEmail.onCreated(function () {
  this.newVerify = new ReactiveVar(true);
  this.hasError = new ReactiveVar(false);
  this.errors = new ReactiveVar;
});

Template.ChangeEmail.helpers({
  hasError: function () {
    return this.hasError.get();
  },
  newVerify: function () {
    return this.newVerify.get();
  },
  errors: function () {
    return this.errors.get();
  }
});

Template.ChangeEmail.events({
  "click #change-email-confirm-btn": function () {
    var email = $("#new-email").val();
    Meteor.call("changeEmail", email, function (error, result) {
      if (error) {
        this.hasError.set(true);
        var resons = error.reason.split(",");
        var errs = [];
        for (var i = 0; i < resons.length; i++) {
          errs.push({ reason: resons[i] });
        }
        this.errors.set(errs);
      } else {
        this.hasError.set(false);
        this.newVerify.set(false);
        $("#new-email").val("");
        $("#change-email-modal").modal("hide");
      }
    });
  },
  "click .close.icon": function () {
    $("#new-email").val("");
    this.hasError.set(false);
    this.newVerify.set(true);
  }
});

