Template.mealReserve.onRendered(function () {
  this.$(".has-popup").popup();
  Session.set("Reserve error", false);
  Session.set("numberOfGuest", 1);
  this.$(".ui.dropdown").dropdown();
  Meteor.call("getClientToken", function(error, result) {
    if (error) {
      console.log("There was an error", error);
    } else {
      var setup = {
        container: "dropin",
        paymentMethodNonceReceived: function(e, t) {
          var r = {
            mealId: Router.current().params.mealId,
            numberOfGuest: $("#request-number").val(),
            donationPerGuest: Session.get("Donation"),
            messageToHost: $("#hello-to-host").val(),
            nonce: t 
          };
          $(".pusher").dimmer("show");

          Meteor.call("createTransaction", r, function(error, t) {
            if (error) {
              Logger.log(JSON.stringify(error));
              var reasons = error.reason.split(",");
              var errors = [];
              for (var i = 0; i < reasons.length; i++) {
                errors.push({ reason: reasons[i] });
              }
              Session.set("Reserve errors", errors);
              Session.set("Reserve error", true);
              $(".pusher").dimmer("hide");
            } else
              $(".pusher").dimmer("hide");
            if (Meals.findOne({ _id: r.mealId }).autoAccept) {
              Meteor.call("acceptGuest",
                Orders.findOne({
                  userId: Meteor.userId(),
                  mealId: r.mealId,
                  status: 0
                })._id);
              Router.go("/events/" + r.mealId);
            } else {
              Router.go("/users/me/reservations");
            }
          });
        }
      };
      braintree.setup(result, "dropin", setup);
    }
  });
});

Template.mealReserve.events({
  "click #join-event": function () {
    $(".pusher").dimmer("show");
    var e = {
      messageToHost: $("#hello-to-host").val(),
      mealId: Router.current().params.mealId,
      numberOfGuest: $("#request-number").val(),
      donationPerGuest: 0
    };

    Meteor.call("createTransaction", e, function(error, r) {
      if (error) {
        Logger.log(JSON.stringify(error));
        var reasons = error.reason.split(",");
        var errs = [];
        for (var i = 0; i < reasons.length; i++)
          errs.push({ reason: reasons[i] });
        Session.set("Reserve errors", errs);
        Session.set("Reserve error", true);
        $(".pusher").dimmer("hide");
      } else
        $(".pusher").dimmer("hide");
      if (Meals.findOne({ _id: e.mealId }).autoAccept) {
        Meteor.call("acceptGuest", Orders.findOne({
          userId: Meteor.userId(),
          mealId: e.mealId,
          status: 0
        })._id);
        Router.go("/events/" + e.mealId);
      } else {
        Router.go("/users/me/reservations");
      }
    });
  }
});

Template.mealReserve.helpers({
  mealDate: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM DD, YYYY ddd");
  },
  mealStartTime: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("hh:mmA");
  },
  mealEndTime: function () {
    return moment(this.time.endAt).utcOffset(this.time.zone).format("hh:mmA");
  },
  donationWithService: function () {
    return (Session.get("Donation") + .15 * this.pricePerGuest).toFixed(2);
  },
  totalService: function () {
    return (.15 * this.pricePerGuest * Session.get("numberOfGuest")).toFixed(2);
  },
  donation: function () {
    return Session.get("Donation").toFixed(2);
  },
  numberOfGuest: function () {
    return Session.get("numberOfGuest");
  },
  requestNumber: function () {
    return parseInt(Session.get("numberOfGuest"));
  },
  totalDonation: function () {
    return (Session.get("numberOfGuest") * (Session.get("Donation") + .15 * this.pricePerGuest)).toFixed(2);
  },
  service: function () {
    return (.15 * this.pricePerGuest).toFixed(2);
  },
  hasError: function() {
    return Session.get("Reserve error");
  },
  errors: function() {
    return Session.get("Reserve errors");
  },
  noCharge: function () {
    return Session.get("numberOfGuest") * (Session.get("Donation") + .15 * this.pricePerGuest) == 0;
  },
  hasEndTime: function () {
    return this.time.endAt;
  },
  hostCloudinaryPublicId: function () {
    return Meteor.users.findOne({ _id: this.hostId }).profile.thumbnail.cloudinaryPublicId;
  },
  reserveOptions: function () {
    var options = [];
    for (var i = 1; i <= this.spotsLeft; i++)
      options.push(1 == i ? { value: 1, text: "Only You" } :
        { value: i, text: "You + " + (i - 1) + " Guest(s)" });
    return options;
  },
  hostName: function () {
    return Meteor.users.findOne({ _id: this.hostId }).profile.firstName;
  },
  questionForGuest: function () {
    return this.questionForGuest;
  }
});

Template.mealReserve.events({
  "click #add-donation": function () {
    Session.set("Donation", Session.get("Donation") + 1);
  },
  "click #minus-donation": function () {
    if (Session.get("Donation") > 0 &&
      !this.autoAccept) {
      Session.set("Donation", Session.get("Donation") - 1);
    }
  },
  "change #request-number": function (e) {
    Session.set("numberOfGuest", $("#request-number").val());
  }
});