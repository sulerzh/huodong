// JavaScript source code

!function () {
    Template.reviewForGuest.created = function () {
        Meteor.subscribe("oneUser", Template.instance().data.hostId);
        var e = this;
        e.hasError = new ReactiveVar(false), e.errors = new ReactiveVar
    },
    Template.reviewForGuest.rendered = function () {
        $(".rating").rating({ initialRating: 0, maxRating: 5 })
    },
    Template.reviewForGuest.events({
        "click #review-for-guest-submit": function () {
            var e = $("#hostReviewForGuest").val(),
                r = $("#hostReviewForPlenry").val(),
                t = $("#guestOverallRating").rating("get rating");
            Logger.log("Impression: " + e),
            Logger.log("Private Feedback: " + r),
            Logger.log("Overall rating: " + t);
            var a = {};
            a.mealId = Router.current().params.mealId,
            a.userId = Router.current().params.userId,
            a.overallRating = parseInt(t), a.userToHost = false,
            a.content = e, a.privateFeedback = r;
            var n = Template.instance(); Meteor.call("newReview", a, function (e, r) {
                if (e) {
                    Logger.log("New Review Error: " + JSON.stringify(e));
                    for (var t = e.reason.split(","), a = [], o = 0; o < t.length; o++)
                        a.push({ reason: t[o] }); n.hasError.set(true), n.errors.set(a),
                        window.scrollTo(0, 0)
                } else
                    Router.go("mealGuestsList", { mealId: Router.current().params.mealId })
            })
        }
    }),
    Template.reviewForGuest.helpers({
        guestName: function () {
            var e = Meteor.users.findOne({ _id: Router.current().params.userId });
            return e.profile.firstName
        }, mealDate: function () {
            return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D, YYYY (ddd)")
        }, userCloudinaryPublicId: function () {
            var e = Meteor.users.findOne({ _id: Router.current().params.userId });
            return e.profile.thumbnail.cloudinaryPublicId
        }, hasError: function () {
            return Template.instance().hasError.get()
        }, errors: function () {
            return Template.instance().errors.get()
        }
    })
}();
