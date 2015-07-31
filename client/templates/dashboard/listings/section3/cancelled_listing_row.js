Template.cancelledListingsRow.helpers({
  mealDate: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D YYYY");
  },
  mealTime: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("ddd @ hh:mma");
  }
});