Router.route("/", {
  controller: "HomeController",
  action: "show",
  waitOn: function() {
    return Meteor.subscribe("featureEvents")
  },
  name: "home",
  onAfterAction: function() {
    if (Meteor.isClient) {
      var e = Inbox.find({
        toUserId: { $in: [Meteor.userId()] },
        readBy: { $nin: [Meteor.userId()] }
      }).count();
      if (e)
        var t = "(" + e + ") ";
      else
        var t = "";
      SEO.set({
        title: t + "Plenry",
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
      })
    }
  }
});
Router.route("/rest/events",
{
  waitOn: function() {
    return Meteor.subscribe("featureEvents")
  },
  where: "server"
}).get(function() {
  this.response.statusCode = 200,
    this.response.setHeader("Content-Type", "application/json"),
    this.response.setHeader("Access-Control-Allow-Origin", "*"),
    this.response.setHeader("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  var e = Meals.find();
  this.response.end(JSON.stringify(e.fetch()))
}).post(function () { }).put(function () { });

Router.route("/rest/events/:eventId", {
  waitOn: function() {
    return Meteor.subscribe("featureEvents")
  },
  where: "server"
}).get(function() {
  this.response.statusCode = 200,
    this.response.setHeader("Content-Type", "application/json"),
    this.response.setHeader("Access-Control-Allow-Origin", "*"),
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var e = Meals.findOne({ _id: this.params.eventId });
  this.response.end(JSON.stringify(e))
}).post(function () { }).put(function () { });

Router.route("/rest/events/:eventId/:attribute", {
  waitOn: function() {
    return Meteor.subscribe("featureEvents")
  },
  where: "server"
}).get(function() {
  this.response.statusCode = 200,
    this.response.setHeader("Content-Type", "application/json"),
    this.response.setHeader("Access-Control-Allow-Origin", "*"),
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    eval("var attribute = " + this.params.attribute);
  var meal = Meals.findOne({ _id: this.params.eventId });
  console.log(meal), console.log(attribute), console.log(meal.attribute);
  var result = meal.attribute;
  this.response.end(JSON.stringify(result))
}).post(function () { }).put(function () { });

Router.route("/users/me/dashboard", {
  controller: "DashboardController",
  action: "main",
  name: "dashboard"
});

Router.route("/users/me/listings", {
  controller: "DashboardController",
  waitOn: function() {
    return [
      Meteor.subscribe("hostOrders"),
      Meteor.subscribe("selfMeals")
    ]
  },
  action: "listing",
  name: "listings"
});

Router.route("/users/me/reservations", {
  controller: "DashboardController",
  action: "reservations",
  waitOn: function() { return Meteor.subscribe("selfOrders") },
  name: "reservations"
});

Router.route("/users/me/profile", {
  controller: "DashboardController",
  action: "profile",
  name: "profile"
});

Router.route("/users/me/inbox", {
  controller: "DashboardController",
  waitOn: function() {
    return [
      Meteor.subscribe("selfMessages"),
      Meteor.subscribe("myContacts"), Meteor.subscribe("eventsParticipated")
    ]
  },
  onAfterAction: function() {
    if (Meteor.isClient) {
      var e = Inbox.find({
        toUserId: { $in: [Meteor.userId()] },
        readBy: { $nin: [Meteor.userId()] }
      }).count();
      if (e)
        var t = "(" + e + ") ";
      else
        var t = "";
      SEO.set({
        title: t + "Inbox",
        meta: { description: "" },
        og: { title: "Plenry - Inbox", description: "Plenry - Inbox" }
      })
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

Router.route("/search", {
  controller: "SearchController",
  action: "search",
  name: "search"
});

Router.route("/about_us", {
  controller: "StaticPageController",
  action: "aboutUs"
});

Router.route("/help", { controller: "StaticPageController", action: "help" });

Router.route("/contact_us", { controller: "StaticPageController", action: "contactUs" });

Router.route("/orders/:orderId", {
  controller: "OrderController",
  action: "show",
  waitOn: function() { return Meteor.subscribe("oneOrder", this.params.orderId) }
});

Router.route("/orders/events/:mealId", {
  controller: "OrderController",
  action: "showByMealId",
  waitOn: function() { return Meteor.subscribe("oneOrderByMealId", this.params.mealId) },
  name: "orderByMealId"
});

Router.route("/events/:mealId/guests", {
  controller: "MealController",
  action: "guests",
  name: "mealGuestsList",
  waitOn: function() { return Meteor.subscribe("oneMeal", this.params.mealId) }
});

Router.route("/events/:mealId/review_for_host", {
  controller: "ReviewsController",
  waitOn: function() {
    return Meteor.subscribe("oneMeal", this.params.mealId)
  },
  action: "postReviewForHost",
  name: "postReviewForHost"
});

Router.route("/events/:mealId/users/:userId/review_for_guest", {
  controller: "ReviewsController",
  waitOn: function() {
    return [
      Meteor.subscribe("oneMeal", this.params.mealId),
      Meteor.subscribe("oneUser", this.params.userId)
    ]
  },
  action: "postReviewForGuest"
});

Router.route("/users/:userId", {
  controller: "UserController",
  action: "show",
  waitOn: function() { return Meteor.subscribe("oneUser", this.params.userId) }
});

Router.route("/events/new", {
  controller: "MealController",
  waitOn: function() {
    return [Meteor.subscribe("selfMeals")]
  },
  action: "new",
  name: "mealNew"
});


Router.route("/events/:mealId/edit", {
  controller: "MealController",
  waitOn: function() {
    return [Meteor.subscribe("oneMeal", this.params.mealId)]
  },
  action: "edit",
  name: "mealEdit"
});

Router.route("/events/:mealId", {
  controller: "MealController",
  waitOn: function() {
    return [Meteor.subscribe("oneMeal", this.params.mealId), Meteor.subscribe("mealComments", this.params.mealId), Meteor.subscribe("publicGuestList", this.params.mealId)]
  },
  action: "show",
  name: "mealShow",
  data: function() {
    return Meals.findOne({ _id: this.params.mealId })
  },
  onAfterAction: function() {
    if (Meteor.isClient) {
      var e = Inbox.find({
        toUserId: { $in: [Meteor.userId()] },
        readBy: { $nin: [Meteor.userId()] }
      }).count();
      if (e) var t = "(" + e + ") ";
      else var t = "";
      var r = this.data();
      r && SEO.set({
        title: t + r.title,
        meta: { description: r.summary },
        og: { title: r.title, description: r.summary, image: r.cover.org }
      })
    }
  }
});

Router.route("/events/:mealId/reserve", {
  controller: "MealController",
  waitOn: function() {
    return [
      Meteor.subscribe("oneMeal", this.params.mealId),
      Meteor.subscribe("oneOrderByMealId", this.params.mealId)
    ]
  },
  action: "reserve",
  name: "reserve"
});

Router.route("/jumio_call_back", { where: "server" }).get(function() {
  var e = this.params.query.merchantIdScanReference,
    t = this.params.query.jumioIdScanReference;
  Meteor.call("updateJumioScan", e, t),
    this.response.writeHead(301, { Location: "http://plenry.com" }),
    this.response.end()
});

Router.route("/idv", { name: "idVerification" });

Router.route("/privacy", {
  controller: "StaticPageController",
  action: "privacy"
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

Router.route("/695C7AFT.html", {
  action: function() {
    this.render("domainValidationCode")
  }
});

Router.onAfterAction(function() {
  var e = this.params.hash;
  e && Tracker.afterFlush(function() {
    var t = $("#" + e),
      r = t.offset().top;
    $("html,body").animate({ scrollTop: r })
  })
});

