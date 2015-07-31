var checkPayout = function (payout) {
  var errors = [];
  if (!payout.name) {
    errors.push("Name on the bank account cannot be empty");
  }
  if (!payout.recipient) {
    errors.push("Recipient cannot be empty");
  }
  if (!payout.line1) {
    errors.push("Address cannot be empty");
   }
  if (!payout.city) {
    errors.push("City cannot be empty");
  }
  if (!payout.state) {
    errors.push("State cannot be empty");
  }
  if (!payout.zipCode) {
    errors.push("Zip Code cannot be empty");
  }
  if (!payout.country) {
    errors.push("Country cannot be empty");
  }

  return errors;
};

Template.PayoutPreference.onRendered(function () {
  this.$(".ui.dropdown").dropdown();
  Session.set("payout section", 1);
  $("#to-payout-section-2").click(function() {
    var payout = {
      name: $(".payout.modal input[name=name]").val(),
      recipient: $(".payout.modal input[name=recipient]").val(),
      line1: $(".payout.modal input[name=line1]").val(),
      line2: $(".payout.modal input[name=line2]").val(),
      city: $(".payout.modal input[name=city]").val(),
      state: $(".payout.modal input[name=state]").val(),
      zipCode: $(".payout.modal input[name=zip-code]").val(),
      country: $(".payout.modal input[name=country]").val()
    };
    var errors = checkPayout(payout);
    if (0 != errors.length) {
      $("#payout-method-window :input").map(function () {
        if (!$(this).val()) {
          $(this).parent(".required.field").addClass("error");
        }
      });
    } else {
      $(".payout.modal input[name=line1]").val("");
      $(".payout.modal input[name=line2]").val("");
      $(".payout.modal input[name=city]").val("");
      $(".payout.modal input[name=zip-code]").val("");
      $("#payout-method-window").find(".required.field").removeClass("error");
      Session.set("payoutAddress", payout);
      Session.set("payout section", 2);
    }
  });
  $("#add-payout-method-done").click(function() {
    Meteor.call("addPayoutAddress", Session.get("payoutAddress"));
  });
});

Template.PayoutPreference.helpers({
  lastFourAccNumber: function() {
    return Meteor.user().bank.accountNumber.substr(e.length - 4)
  },
  isSection: function(e) {
    return Session.get("payout section") == e;
  },
  hasPaymentMethod: function() {
    if (Meteor.user().payout.method == 0) {
      return true;
    }
    return false;
  },
  name: function() {
    return Meteor.user().payout.address.name;
  },
  address: function() {
    var fullAddress = Meteor.user().payout.address.line1;
    if (Meteor.user().payout.address.line2)
      fullAddress += " " + Meteor.user().payout.address.line2;

    return Meteor.user().payout.address.recipient + ", " +
      fullAddress + ", " +
      Meteor.user().payout.address.city + ", " +
      Meteor.user().payout.address.state + " " +
      Meteor.user().payout.address.zipCode;
  }
});

Template.PayoutPreference.events({
  "click #add-payout-method-button": function () {
    Session.set("payout section", 1);
    $("#payout-method-window").modal("show").modal({
      onHide: function() {
        Meteor.setTimeout(function() {
          Session.set("payout section", 1);
        }, 500);
      }
    });
  }
});