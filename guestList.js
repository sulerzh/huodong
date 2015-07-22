Template.guestList.OnCreated(function () {
  Meteor.subscribe("mealOrders", Template.instance().data._id);
});

Template.guestList.events({
  "click #print-btn": function () {
    $("#navbar").css({ display: "none" });
    $("#footer").css({ display: "none" });
    window.print();
    $("#navbar").css({ display: "block" });
    $("#footer").css({ display: "block" });
  }
});

Template.guestList.helpers({
  eventDate: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM DD, YYYY");
  },
  eventTime: function () {
    return moment(this.time.startAt).utcOffset(this.time.zone).format("hh:mmA");
  },
  orders: function () {
    return Orders.find({ mealId: this._id, $or: [{ status: -2 }, { status: 1 }] });
  },
  passed: function () {
    return (this.time.endAt || this.time.startAt) < new Date;
  }
});

