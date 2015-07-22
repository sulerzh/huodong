Template.sidebarMenu.OnRendered(function () {
  $(".login-link-btn").click(function (o) {
    $(".login.modal").modal("show");
  }),
  $(".sign-up-link-btn").click(function (o) {
    $(".signUp.modal").modal("show");
  }),
  $(".logout-btn").click(function () {
    Logger.log("Log out succeeds"),
      Meteor.logout(), Router.go("/");
  })
});

