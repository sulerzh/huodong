// email, password, confirmPassword, firstName, lastName
var t = function (email, password, confirmPassword, firstName, lastName) {
  var failLoginReasons = [];
   var emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailExp.test(email))
    failLoginReasons.push("Email is not valid");
  if (password.length < 8 || !/^(?=.*[a-z])(?=.*[0-9])/.test(password)) {
    failLoginReasons.push("Password length must be at least 8 and includes letter and number");
  } else {
    if (password != confirmPassword) {
      failLoginReasons.push("Passwords do not match");
    }
  }
  if (0 == firstName.length || 0 == lastName.length)
    failLoginReasons.push("First name/last name cannot be empty");
  if (0 == firstName.length || 0 == lastName.length || /^[a-zA-Z \-]+$/.test(firstName)) {
    if (!/^[a-zA-Z \-]+$/.test(lastName))
      failLoginReasons.push("First name/last name should only contains alphabets/dashes");
  }
  return failLoginReasons;
};

s = function (e) {
  return e.replace(/\w\S*/g, function (e) {
    return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
  })
};

createUser = function (email, password, confirmPassword, firstName, lastName, func) {
  var failLoginReasons = t(email, password, confirmPassword, firstName, lastName);
  if (failLoginReasons.length > 0) {
    Logger.log(failLoginReasons);
    s(new Meteor.Error("invalid-params", failLoginReasons.toString()));
  } else {
    firstName = firstName.substr(0, 1).toUpperCase() + firstName.substr(1);
    lastName = lastName.substr(0, 1).toUpperCase() + lastName.substr(1);
    Accounts.createUser({
        email: email,
        password: password,
        profile: {
          firstName: firstName,
          lastName: lastName
        }
      },
      func);
  }
  return void 0;
};

r = function (e) {
  var t = [];
  var r = new Date;
  if (!e.title || 0 == e.title.length) {
    t.push("Meal title cannot be empty");
  }
  if (!e.summary) {
    t.push("Summary cannot be empty");
  }
  if (isNaN(parseFloat(e.pricePerGuest)) || parseFloat(e.pricePerGuest) < 0) {
    t.push("Price is invalid or too low");
  }

  0 == e.pricePerGuest || e.pricePerGuest || t.push("Price cannot be empty");
  (isNaN(parseInt(e.maxParty)) || parseInt(e.maxParty) < 1) &&
    t.push("Max number of guests is invalid");
  e.maxParty ||
    t.push("Max number of guests cannot be empty");
  e.time && e.time.deadline || t.push("Deadline cannot be empty");
  (!e.time || e.time.deadline < r) &&
    t.push("Users cannot reserve your event because the deadline has already passed");
  e.time && e.time.startAt || t.push("Start time of event cannot be empty");
  e.time.startAt < e.time.deadline &&
    t.push("Deadline should not be later than the start time");
  e.time && e.time.endAt && e.time.startAt &&
    e.time.endAt <= e.time.startAt &&
    t.push("End time of the event cannot be earlier than the start time - 1");
  (parseInt(e.placeType) < 0 || parseInt(e.placeType) > 8) &&
    t.push("Event place is invalid");
  e.address && e.address.full ||
    t.push("Address cannot be empty");
  return t;
};

loginWithPassword = function (email, password, func) {
  Meteor.loginWithPassword(email, password, function (error) {
    if (error) {
      Logger.log(JSON.stringify(error));
      return func(error);
    }
    return void func();
  });
};

Template.loggedOutMenu.onRendered(function () {
  this.$(".login.modal").modal();
  this.$(".signUp.modal").modal();
  $(".sign-up-btn").click(function () {
    Logger.log("Signing in user...");
    var email = $("#sign-up-email").val();
    Logger.log("Signing up with email: " + email);
    var firstName = $("#sign-up-first-name").val();
    Logger.log("Signing up with first name: " + firstName);
    var lastName = $("#sign-up-last-name").val();
    Logger.log("Signing up with last name: " + lastName);
    var password = $("#sign-up-password").val();
    Logger.log("Signing up with password: " + password);
    var confirmPassword = $("#sign-up-confirm-password").val();
    Logger.log("Signing up with confirm password: " + confirmPassword);
    createUser(email, password, confirmPassword, firstName, lastName, function (error) {
      if (error) {
        Logger.log(error);
        var reasons = error.reason.split(",");
        var errs = [];
        for (var n = 0; n < reasons.length; n++)
          errs.push({ reason: reasons[n] });
        Session.set("Sign up errors", errs);
        Session.set("Sign up error", true);
      } else {
        Logger.log("Sign up succeeds");
      }
      Session.set("Sign up error", false);
      $("#sign-up-email").val("");
      $("#sign-up-password").val("");
      $("#sign-up-first-name").val("");
      $("#sign-up-last-name").val("");
      $("#sign-up-confirm-password").val("");
      $(".signUp.modal").modal("hide");
    });
  });
  $(".login-btn").click(function () {
    Logger.log("Logging in user...");
    var email = $("#login-email").val();
    var password = $("#login-password").val();
    loginWithPassword(email, password, function (error) {
      if (error) {
        Logger.log(error);
        Session.set("Login errors", [{ reason: "Incorrect email/password" }]);
        Session.set("Login error", true);
      } else {
        Logger.log("Log in succeeds");
        Session.set("Login error", false);
        $("#login-email").val("");
        $("#login-password").val("");
        $(".login.modal").modal("hide");
      }
    });
  });
  $(".ui.facebook.login.button").click(function () {
    Logger.log("Logging in using Facebook...");
    Meteor.loginWithFacebook({
      requestPermissions:
      [
        "email", "user_friends", "user_birthday", "user_education_history",
        "user_work_history", "user_interests"
      ]
    }, function (err) {
      $(".login.modal").modal("hide");
      $(".signUp.modal").modal("hide");
      if (err)
        throw err;
    });
  });
  $(".ui.google.login.button").click(function () {
    Logger.log("Loggin in using Google..."),
      Meteor.loginWithGoogle({}, function (err) {
        $(".login.modal").modal("hide");
        $(".signUp.modal").modal("hide");
        if (err)
          throw err;
      });
  });
  $(".forgot-password-button").click(function () {
    Logger.log("Forgot password");
    $(".forgot-password").modal("show");
    $("#forgot-password-send").click(function () {
      var email = $("#forgot-password-email").val();
      if (email.length > 0) {
        Accounts.forgotPassword({ email: email });
        $(".forgot-password").modal("hide");
      }
    });
  });
});