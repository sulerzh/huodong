Template.signUp.helpers({
  hasError: function() {
    return Session.get("Sign up error");
  },
  errors: function() {
    return Session.get("Sign up errors");
  }
});
