Template.login.helpers({
  hasError: function () {
    return Session.get("Login error");
  },
  errors: function() {
    return Session.get("Login errors");
  }
});