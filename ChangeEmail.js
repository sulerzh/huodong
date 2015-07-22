Template.ChangeEmail.OnCreated(function () {
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
    var r = $("#new-email").val();
    Meteor.call("changeEmail", r,
      function (r, a) {
        if (r) {
          this.hasError.set(true);
          for (var n = r.reason.split(","), t = [], i = 0; i < n.length; i++) {
            t.push({ reason: n[i] });
          }
          this.errors.set(t);
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

