Template.Account.events({
  "click #change-password-button": function () {
    var oldPassword = $("input[name=old-password]").val();
    var newPassword = $("input[name=new-password]").val();
    var confirmPassword = $("input[name=confirm-password]").val();
    if (newPassword != confirmPassword)
      throw new Meteor.Error("Passwords do not match");
    if (newPassword.length < 8 || !/^(?=.*[a-z])(?=.*[0-9])/.test(newPassword))
      throw new Meteor.Error("Password length must be at least 8 and includes letter and number");
    if (!Meteor.user().services.password) {
      Meteor.call("setPassword", newPassword);
    }
    Accounts.changePassword(oldPassword, newPassword, function (error) {
      if (error) {
        Logger.log("Update Password Error: " + error);
      }
    });
  }
});