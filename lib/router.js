
ApplicationController = RouteController.extend({
  layoutTemplate: "AppLayout",
  onBeforeAction: function () {
    this.next();
  },
  fastRender: true
});

// static templates
StaticPageController = ApplicationController.extend({
  privacy: function () {
    return this.render("termsAndPrivacy");
  },
  aboutUs: function () {
    return this.render("aboutUs");
  },
  contactUs: function () {
    return this.render("contactUs");
  },
  help: function () {
    return this.render("help");
  }
});

// dashboard templates
DashboardController = ApplicationController.extend({
  layoutTemplate: "dashboardLayout",
  main: function () {
    this.render("dashboardDashboard");
  },
  inbox: function () {
    this.render("inboxPage");
  },
  listing: function () {
    this.render("dashboardListings");
  },
  reservations: function () {
    this.render("dashboardReservations");
  },
  profile: function () {
    this.render("dashboardProfile");
  },
  settings: function () {
    this.render("dashboardSettings");
  },
  search: function () {
    this.render("Search");
  }
});

DashboardProfileController = ApplicationController.extend({
  layoutTemplate: "DashboardProfileLayout",
  trustAndVerification: function () {
    this.render("TrustAndVerification");
  },
  editProfile: function () {
    this.render("EditProfile");
  }
});

MealController = ApplicationController.extend({
  "new": function () {
    if (Meteor.user()) {
      this.render("mealNew");
    } else {
      this.redirect("/");
    }
  },
  edit: function () {
    var meal = Meals.findOne({
      _id: this.params.mealId,
      "time.startAt": { $gt: new Date }
    });
    if (meal && meal.hostId == Meteor.userId()) {
      Session.set("editMealId", this.params.mealId);
      this.render("mealEdit", { data: meal });
    } else {
      this.redirect("/events/" + meal._id);
    }
  },
  show: function () {
    var meal = Meals.findOne({ _id: this.params.mealId });
    if (meal) {
      Meteor.subscribe("selfOrders");
      this.render("mealShow", { data: e });
    } else {
      this.redirect("/");
    }
  },
  reserve: function () {
    var meal = Meals.findOne({ _id: this.params.mealId });
    if (meal) {
      Session.set("Donation", e.pricePerGuest);
      this.render("mealReserve", { data: e });
    } else {
      this.redirect("/");
    }
  },
  guests: function () {
    var meal = Meals.findOne({ _id: this.params.mealId });
    this.render("guestList", { data: meal });
  }
});

HomeController = ApplicationController.extend({
  show: function () {
    this.render(Meteor.user() ? "home" : "landing");
  }
});

GuestController = ApplicationController.extend({
  show: function () {
    return this.render("guestList");
  }
});


UserController = ApplicationController.extend({
  show: function () {
    if (this.params.userId == "me" || this.params.userId == Meteor.userId()) {
      this.redirect("/users/me/dashboard");
    } else if (this.params.userId != "me") {
      this.redirect("/users/" + this.params.userId + "/reviews/guest");
    } else {
      this.redirect("/");
    }
  }
});


SearchController = ApplicationController.extend({
  search: function () {
    return this.render("Search");
  }
});

OrderController = ApplicationController.extend({
  show: function () {
    return this.render("bookingDetails", { data: Orders.findOne({ _id: this.params.orderId }) });
  },
  showByMealId: function () {
    return this.render("bookingDetails", { data: Orders.findOne({ mealId: this.params.mealId }) });
  }
});


ReviewsController = ApplicationController.extend({
  postReviewForHost: function () {
    return this.render("reviewForHost", { data: Meals.findOne({ _id: this.params.mealId }) });
  },
  postReviewForGuest: function () {
    return this.render("reviewForGuest", { data: Meals.findOne({ _id: this.params.mealId }) });
  }
});

