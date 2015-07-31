// base controller
ApplicationController = RouteController.extend({
  layoutTemplate: "AppLayout",
  onBeforeAction: function () {
    this.next();
  },
  fastRender: true
});

// ---------------home---------------
HomeController = ApplicationController.extend({
  show: function () {
    this.render(Meteor.user() ? "home" : "landing");
  }
});

Router.route("/", {
  controller: "HomeController",
  action: "show",
  waitOn: function () {
    return Meteor.subscribe("featureEvents");
  },
  name: "home",
  onAfterAction: function () {
    if (Meteor.isClient) {
      var prefix = "";
      var unreadMessageCount = Inbox.find({
        toUserId: { $in: [Meteor.userId()] },
        readBy: { $nin: [Meteor.userId()] }
      }).count();

      if (unreadMessageCount > 0)
        prefix = "(" + unreadMessageCount + ") ";
      SEO.set({
        title: prefix + "Plenry",
        meta: { description: "Socialize with Neighbors" },
        og: {
          description: "Socialize with Neighbors",
          image: "https://res.cloudinary.com/plenry/image/upload/c_scale,w_1920/v1432001726/iStock_000038412272_XXXLarge_gmgkyz.jpg",
          title: "Plenry",
          url: "https://plenry.com/"
        },
        ignore: {
          meta: ["fragment", "viewport"],
          link: ["stylesheet", "icon", "apple-touch-icon"]
        }
      });
    }
  }
});

// ---------------dashboard---------------
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

Router.route("/users/me/dashboard", {
  controller: "DashboardController",
  action: "main",
  name: "dashboard"
});

Router.route("/users/me/listings", {
  controller: "DashboardController",
  waitOn: function () {
    return [
      Meteor.subscribe("hostOrders"),
      Meteor.subscribe("selfMeals")
    ];
  },
  action: "listing",
  name: "listings"
});

Router.route("/users/me/reservations", {
  controller: "DashboardController",
  action: "reservations",
  waitOn: function () {
    return Meteor.subscribe("selfOrders");
  },
  name: "reservations"
});

Router.route("/users/me/profile", {
  controller: "DashboardController",
  action: "profile",
  name: "profile"
});

Router.route("/users/me/inbox", {
  controller: "DashboardController",
  waitOn: function () {
    return [
      Meteor.subscribe("selfMessages"),
      Meteor.subscribe("myContacts"), Meteor.subscribe("eventsParticipated")
    ];
  },
  onAfterAction: function () {
    if (Meteor.isClient) {
      var prefix = "";
      var unreadMessageCount = Inbox.find({
        toUserId: { $in: [Meteor.userId()] },
        readBy: { $nin: [Meteor.userId()] }
      }).count();
      if (unreadMessageCount)
        prefix = "(" + unreadMessageCount + ") ";
      SEO.set({
        title: prefix + "Inbox",
        meta: { description: "" },
        og: { title: "Plenry - Inbox", description: "Plenry - Inbox" }
      });
    }
  },
  action: "inbox",
  name: "inbox"
});

Router.route("/users/me/settings", {
  controller: "DashboardController",
  action: "settings",
  name: "settings"
});

// ---------------search---------------

SearchController = ApplicationController.extend({
  search: function () {
    return this.render("Search");
  }
});

Router.route("/search", {
  controller: "SearchController",
  action: "search",
  name: "search"
});



// ---------------order---------------
OrderController = ApplicationController.extend({
  show: function () {
    return this.render("bookingDetails", { data: Orders.findOne({ _id: this.params.orderId }) });
  },
  showByMealId: function () {
    return this.render("bookingDetails", { data: Orders.findOne({ mealId: this.params.mealId }) });
  }
});

Router.route("/orders/:orderId", {
  controller: "OrderController",
  action: "show",
  waitOn: function () {
    return Meteor.subscribe("oneOrder", this.params.orderId);
  }
});

Router.route("/orders/events/:mealId", {
  controller: "OrderController",
  action: "showByMealId",
  waitOn: function () {
    return Meteor.subscribe("oneOrderByMealId", this.params.mealId);
  },
  name: "orderByMealId"
});

// ---------------meal---------------
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

Router.route("/events/:mealId/guests", {
  controller: "MealController",
  action: "guests",
  name: "mealGuestsList",
  waitOn: function () {
    return Meteor.subscribe("oneMeal", this.params.mealId);
  }
});

Router.route("/events/new", {
  controller: "MealController",
  waitOn: function () {
    return [Meteor.subscribe("selfMeals")];
  },
  action: "new",
  name: "mealNew"
});


Router.route("/events/:mealId/edit", {
  controller: "MealController",
  waitOn: function () {
    return [Meteor.subscribe("oneMeal", this.params.mealId)];
  },
  action: "edit",
  name: "mealEdit"
});

Router.route("/events/:mealId", {
  controller: "MealController",
  waitOn: function () {
    return [
      Meteor.subscribe("oneMeal", this.params.mealId),
      Meteor.subscribe("mealComments", this.params.mealId),
      Meteor.subscribe("publicGuestList", this.params.mealId)
    ];
  },
  action: "show",
  name: "mealShow",
  data: function () {
    return Meals.findOne({ _id: this.params.mealId });
  },
  onAfterAction: function () {
    if (Meteor.isClient) {
      var prefix = "";
      var unreadMessageCount = Inbox.find({
        toUserId: { $in: [Meteor.userId()] },
        readBy: { $nin: [Meteor.userId()] }
      }).count();
      if (unreadMessageCount)
        prefix = "(" + unreadMessageCount + ") ";
      if (this.data()) {
        SEO.set({
          title: prefix + this.data().title,
          meta: { description: this.data().summary },
          og: {
            title: this.data().title,
            description: this.data().summary,
            image: this.data().cover.org
          }
        });
      }
    }
  }
});

Router.route("/events/:mealId/reserve", {
  controller: "MealController",
  waitOn: function () {
    return [
      Meteor.subscribe("oneMeal", this.params.mealId),
      Meteor.subscribe("oneOrderByMealId", this.params.mealId)
    ];
  },
  action: "reserve",
  name: "reserve"
});

// ---------------reviews---------------
ReviewsController = ApplicationController.extend({
  postReviewForHost: function () {
    return this.render("reviewForHost", { data: Meals.findOne({ _id: this.params.mealId }) });
  },
  postReviewForGuest: function () {
    return this.render("reviewForGuest", { data: Meals.findOne({ _id: this.params.mealId }) });
  }
});

Router.route("/events/:mealId/review_for_host", {
  controller: "ReviewsController",
  waitOn: function () {
    return Meteor.subscribe("oneMeal", this.params.mealId);
  },
  action: "postReviewForHost",
  name: "postReviewForHost"
});

Router.route("/events/:mealId/users/:userId/review_for_guest", {
  controller: "ReviewsController",
  waitOn: function () {
    return [
      Meteor.subscribe("oneMeal", this.params.mealId),
      Meteor.subscribe("oneUser", this.params.userId)
    ];
  },
  action: "postReviewForGuest"
});

// ---------------user---------------
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

Router.route("/users/:userId", {
  controller: "UserController",
  action: "show",
  waitOn: function () {
    return Meteor.subscribe("oneUser", this.params.userId);
  }
});

// ---------------static---------------
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

Router.route("/about_us", {
  controller: "StaticPageController",
  action: "aboutUs"
});

Router.route("/help", {
  controller: "StaticPageController",
  action: "help"
});

Router.route("/contact_us", {
  controller: "StaticPageController",
  action: "contactUs"
});

Router.route("/privacy", {
  controller: "StaticPageController",
  action: "privacy"
});

// ---------------dashboard profile---------------
DashboardProfileController = ApplicationController.extend({
  layoutTemplate: "DashboardProfileLayout",
  trustAndVerification: function () {
    this.render("TrustAndVerification");
  },
  editProfile: function () {
    this.render("EditProfile");
  }
});

Router.route("/users/me/profile/trust_and_verification", {
  controller: "DashboardProfileController",
  action: "trustAndVerification",
  name: "trustAndVerification"
});

Router.route("/users/me/profile/edit_profile", {
  controller: "DashboardProfileController",
  action: "editProfile",
  name: "editProfile"
});


GuestController = ApplicationController.extend({
  show: function () {
    return this.render("guestList");
  }
});

Router.route("/rest/events",
  {
    waitOn: function () {
      return Meteor.subscribe("featureEvents");
    },
    where: "server"
  })
  .get(function () {
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(Meals.find().fetch()));
  });

Router.route("/rest/events/:eventId", {
  waitOn: function () {
    return Meteor.subscribe("featureEvents");
  },
  where: "server"
})
  .get(function () {
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(Meals.findOne({ _id: this.params.eventId })));
  });

Router.route("/rest/events/:eventId/:attribute", {
  waitOn: function () {
    return Meteor.subscribe("featureEvents");
  },
  where: "server"
})
  .get(function () {
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    eval("var attribute = " + this.params.attribute);
    var meal = Meals.findOne({ _id: this.params.eventId });
    console.log(meal);
    console.log(attribute);
    console.log(meal.attribute);
    this.response.end(JSON.stringify(meal.attribute));
  });

Router.route("/jumio_call_back", { where: "server" })
  .get(function () {
    Meteor.call("updateJumioScan",
      this.params.query.merchantIdScanReference,
      this.params.query.jumioIdScanReference);
    this.response.writeHead(301, { Location: "http://plenry.com" });
    this.response.end();
  });

Router.route("/idv", { name: "idVerification" });

Router.route("/695C7AFT.html", {
  action: function () {
    this.render("domainValidationCode");
  }
});

Router.onAfterAction(function () {
  if (this.params.hash) {
    Tracker.afterFlush(function () {
      $("html,body").animate({ scrollTop: $("#" + this.params.hash).offset().top })
    });
  }
});







