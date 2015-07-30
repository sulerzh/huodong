Template.dashboardSettings.onRendered(function () {
  if (Router.current().params.query.section) {
    Session.set("Dashboard section", parseInt(Router.current().params.query.section));
  } else {
    Session.set("Dashboard section", 1);
  } 
});

Template.dashboardSettings.helpers({
  isSection: function (section) {
    return Session.get("Dashboard section") == section;
  }
});

Template.dashboardSettings.events({
  "click .dashboard-settings-link": function (event) {
    Session.set("Dashboard section", $(event.target).index() + 1);
  }
});
