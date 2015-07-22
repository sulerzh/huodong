Template.approvedOrderRow.OnCreated(function () {
    Meteor.subscribe("oneMeal", Template.instance().data.mealId);
    Meteor.subscribe("oneUser", Template.instance().data.userId);
});

Template.approvedOrderRow.helpers({
    requesterName: function () {
        return Meteor.users.findOne({ _id: this.userId }).profile.firstName;
    },
    phone: function () {
        return Meteor.users.findOne({ _id: this.userId }).profile.phone;
    },
    email: function () {
        return Meteor.users.findOne({ _id: this.userId }).emails[0].address;
    },
    date: function () {
        var meal = Meals.findOne({ _id: this.mealId });
        return meal ? moment(meal.time.startAt).utcOffset(meal.time.zone).format("MMM DD") : void 0;
    },
    mealTitle: function () {
        var meal = Meals.findOne({ _id: this.mealId });
        return meal ? meal.title : void 0;
    },
    startTime: function () {
        var meal = Meals.findOne({ _id: this.mealId });
        return meal ? moment(meal.time.startAt).utcOffset(meal.time.zone).format("LT") : void 0
    },
    plusGuests: function () {
        return 2 == this.numberOfGuests ? " and 1 Guest" : this.numberOfGuests > 2 ? " and " +
        (this.numberOfGuests - 1).toString() + " Guests" : void 0;
    },
    donationPerGuestFixed: function () {
        return this.donationPerGuest.toFixed(2);
    }
});
