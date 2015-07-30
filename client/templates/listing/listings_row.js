Template.listingsRow.onRendered(function () {
  $("#cancel-event-" + this.data._id).modal();
  $("#cancel-event-confirm-" + this.data._id).click(function () {
    var cancelReason = $("#cancel-event-" + this.data._id).find(".cancel-reason").val();
    Logger.log("Cancel reason: " + cancelReason);
    if (cancelReason.length > 0) {
      Meteor.call("cancelMeal", this.data._id, t);
      return true;
    }
    $("#cancel-event-" + this.data._id).find(".required.field").addClass("error");
    return false;
  });
});

Template.listingsRow.helpers({
  date: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D YYYY");
  },
  time: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("ddd @ hh:mmA");
  },
  active: function () {
    return 1 == this.status;
  }
});

Template.listingsRow.events({
  "click .cancel-event-button": function (event) {
    $("#cancel-event-" + Template.instance().data._id).modal("show");
  }
});