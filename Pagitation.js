// JavaScript source code
// …Ë÷√∑÷“≥

!function () {
    var e = new Meteor.Pagination(Reviews,
        {
            perPage: 5,
            sort: { createdAt: -1 },
            router: "iron-router",
            routerTemplate: "ReviewsAboutYou",
            itemTemplate: "ReviewAboutYouItem",
            routerLayout: "DashboardProfileLayout",
            route: "/users/me/profile/reviews/reviews_about_me",
            homeRoute: "/users/me/profile/reviews/reviews_about_me",
            templateName: "ReviewsAboutYou",
            auth: function (e, t) {
                return [{
                    $or: [{ hostId: t.userId, userToHost: true },
                        { userId: t.userId, userToHost: false }]
                },
                { skip: e, limit: 5, sort: { createdAt: -1 } }]
            }
        }),
        t = new Meteor.Pagination(Reviews,
        {
            perPage: 5, sort: { createdAt: -1 },
            router: "iron-router",
            routerTemplate: "ReviewsByYou",
            itemTemplate: "ReviewByYouItem",
            routerLayout: "DashboardProfileLayout",
            route: "/users/me/profile/reviews/reviews_by_me",
            homeRoute: "/users/me/profile/reviews/reviews_by_me",
            templateName: "ReviewsByYou",
            auth: function (e, t) {
                return
                [
                    {
                        $or: [{ hostId: t.userId, userToHost: false },
                              { userId: t.userId, userToHost: true }]
                    },
                    { skip: e, limit: 5, sort: { createdAt: -1 } }
                ]
            }
        }),
        r = new Meteor.Pagination(Orders,
        {
            perPage: 5, sort: { createdAt: -1 },
            router: "iron-router",
            routerTemplate: "ReviewsToWrite",
            itemTemplate: "ReviewToWriteItem",
            routerLayout: "DashboardProfileLayout",
            route: "/users/me/profile/reviews/reviews_to_write",
            homeRoute: "/users/me/profile/reviews/reviews_to_write",
            templateName: "ReviewsToWrite",
            auth: function (e, t) {
                var r = new Date;
                return r.setDate(r.getDate() - 14),
                    [{
                        status: 1, mealEndAt: { $lt: new Date, $gt: r },
                        $or: [{ userId: t.userId, guestReviewed: { $exists: false } },
                            { hostId: t.userId, hostReviewed: { $exists: false } }]
                    },
                    { skip: e, limit: 5, sort: { createdAt: -1 } }]
            }
        }),
        s = new Meteor.Pagination(Orders, {
            perPage: 10, sort: { createdAt: -1 },
            router: "iron-router",
            routerTemplate: "receivedRequestPending",
            itemTemplate: "pendingOrderRow",
            routerLayout: "DashboardListingLayout",
            route: "/users/me/requests/pending",
            homeRoute: "/users/me/requests/pending",
            templateName: "receivedRequestPending",
            divWrapper: false, auth: function (e, t) {
                return [{ hostId: t.userId, status: 0 }, {
                    skip: e, limit: 10, sort: { createdAt: -1 }
                }]
            }
        }),
        o = new Meteor.Pagination(Orders, {
            perPage: 10, sort: { createdAt: -1 },
            router: "iron-router",
            routerTemplate: "receivedRequestApproved",
            itemTemplate: "approvedOrderRow",
            routerLayout: "DashboardListingLayout",
            route: "/users/me/requests/approved",
            homeRoute: "/users/me/requests/approved",
            templateName: "receivedRequestApproved",
            divWrapper: false,
            auth: function (e, t) {
                return [{ hostId: t.userId, status: 1 },
                    { skip: e, limit: 10, sort: { createdAt: -1 } }]
            }
        }),
        i = new Meteor.Pagination(Orders, {
            perPage: 10,
            sort: { createdAt: -1 },
            router: "iron-router", routerTemplate: "receivedRequestCancelled",
            itemTemplate: "cancelledOrderRow",
            routerLayout: "DashboardListingLayout",
            route: "/users/me/requests/cancelled",
            homeRoute: "/users/me/requests/cancelled",
            templateName: "receivedRequestCancelled",
            divWrapper: false, auth: function (e, t) {
                return [{ hostId: t.userId, status: { $lte: -1 } },
                    { skip: e, limit: 10, sort: { createdAt: -1 } }]
            }
        }),
        a = new Meteor.Pagination(Meals, {
            perPage: 10,
            sort: { "time.startAt": 1 },
            router: "iron-router",
            routerTemplate: "upcomingListing",
            itemTemplate: "listingsRow",
            routerLayout: "DashboardListingLayout",
            route: "/users/me/listings/upcoming",
            homeRoute: "/users/me/listings/upcoming",
            templateName: "upcomingListing",
            divWrapper: false, auth: function (e, t) {
                return [{
                    hostId: t.userId,
                    "time.startAt": { $gt: new Date }, status: 1
                },
                { skip: e, limit: 10, sort: { "time.startAt": 1 } }]
            }
        }),
        u = new Meteor.Pagination(Meals,
        {
            perPage: 10, sort: { "time.startAt": 1 },
            router: "iron-router",
            routerTemplate: "pastListing",
            itemTemplate: "pastListingsRow",
            routerLayout: "DashboardListingLayout",
            route: "/users/me/listings/past",
            homeRoute: "/users/me/listings/past",
            templateName: "pastListing",
            divWrapper: false, auth: function (e, t) {
                return [{
                    hostId: t.userId,
                    "time.startAt": { $lt: new Date }, status: 1
                },
                { skip: e, limit: 10, sort: { "time.startAt": -1 } }]
            }
        }),
        n = new Meteor.Pagination(Meals, {
            perPage: 20, sort: { "time.startAt": 1 },
            router: "iron-router", routerTemplate: "cancelledListing",
            itemTemplate: "cancelledListingsRow",
            routerLayout: "DashboardListingLayout",
            route: "/users/me/listings/cancelled",
            homeRoute: "/users/me/listings/cancelled",
            templateName: "cancelledListing",
            divWrapper: false,
            auth: function (e, t) {
                return [{ hostId: t.userId, status: -1 },
                    { skip: e, limit: 20, sort: { "time.startAt": -1 } }]
            }
        }),
        m = new Meteor.Pagination(Orders, {
            perPage: 10, sort: { mealEndAt: -1 },
            router: "iron-router",
            routerTemplate: "upcomingReservation",
            itemTemplate: "upcomingReservationRow",
            routerLayout: "DashboardReservationLayout",
            route: "/users/me/reservations/upcoming",
            homeRoute: "/users/me/reservations/upcoming", templateName: "upcomingReservation", divWrapper: false, auth: function (e, t) { return [{ userId: t.userId, mealEndAt: { $gt: new Date } }, { skip: e, limit: 10, sort: { mealEndAt: -1 } }] }
        }),
        p = new Meteor.Pagination(Orders, {
            perPage: 10, sort: { mealEndAt: -1 },
            router: "iron-router",
            routerTemplate: "pastReservation",
            itemTemplate: "pastReservationRow",
            routerLayout: "DashboardReservationLayout",
            route: "/users/me/reservations/past", homeRoute: "/users/me/reservations/past", templateName: "pastReservation", divWrapper: false, auth: function (e, t) { return [{ userId: t.userId, mealEndAt: { $lt: new Date } }, { skip: e, limit: 10, sort: { mealEndAt: -1 } }] }
        }),
        d = new Meteor.Pagination(Reviews, {
            perPage: 5, sort: { createdAt: -1 },
            router: "iron-router", routerTemplate: "userProfile", itemTemplate: "ReviewAboutYouItem", routerLayout: "AppLayout", route: "/users/:userId/reviews/guest", homeRoute: "/users/:userId/reviews/guest", templateName: "userProfile", availableSettings: { filters: true }, routeSettings: function (e) { this.set("filters", { hostId: e.params.userId, userToHost: true }) }
        }),
        l = new Meteor.Pagination(Reviews, {
            perPage: 5,
            sort: { createdAt: -1 },
            router: "iron-router",
            routerTemplate: "userProfileReviewsFromHost",
            itemTemplate: "ReviewAboutYouItem",
            routerLayout: "AppLayout", route: "/users/:userId/reviews/host",
            homeRoute: "/users/:userId/reviews/host",
            templateName: "userProfileReviewsFromHost",
            availableSettings: { filters: true },
            routeSettings: function (e) {
                this.set("filters", { userId: e.params.userId, userToHost: false })
            }
        })
}();
