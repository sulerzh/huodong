// JavaScript source code


!function () {
    Template.reviewForHost.created = function () {
        Meteor.subscribe("oneUser", Template.instance().data.hostId);
        var e = this; e.hasError = new ReactiveVar(false), e.errors = new ReactiveVar
    },
    Template.reviewForHost.rendered = function () {
        $(".rating").rating({ initialRating: 0, maxRating: 5 })
    },
    Template.reviewForHost.events({
        "click #review-for-host-submit": function () {
            var e = Template.instance(),
                t = $("#hostOverallRating").rating("get rating"),
                r = $("#hostCommunicationRating").rating("get rating"),
                n = $("#guestExperience").val(),
                o = $("#guestPrivateFeedbackPositive").val(),
                i = $("#guestPrivateFeedbackNegative").val();
            Logger.log("Overall: " + t),
            Logger.log("Communication: " + r),
            Logger.log("Content: " + n),
            Logger.log("Private : " + o),
            Logger.log("Improvement: " + i);
            var a = {};
            a.mealId = Router.current().params.mealId, a.overallRating = parseInt(t),
            a.communicationRating = parseInt(r), a.content = n, a.privateFeedback = o,
            a.improvement = i, a.userToHost = true, Meteor.call("newReview", a, function (t, r) {
                if (t) {
                    Logger.log("New Review Error: " + JSON.stringify(t)),
                        errMsg = t.reason.split(",");
                    for (var n = [], o = 0; o < errMsg.length; o++)
                        n.push({ reason: errMsg[o] });
                    e.hasError.set(true), e.errors.set(n), window.scrollTo(0, 0)
                } else
                    Router.go("dashboard")
            })
        }
    }),
    Template.reviewForHost.helpers({
        mealDate: function () {
            return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D, YYYY (ddd)")
        }, mealStart: function () {
            return moment(this.time.startAt).utcOffset(this.time.zone).format("HH:mm A")
        }, mealEnd: function () {
            return this.time.endAt ? moment(this.time.endAt).utcOffset(this.time.zone).format("HH:mm A") : false
        }, hostName: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.profile.firstName
        }, hostColudinaryId: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.profile.thumbnail.cloudinaryPublicId
        }, hasError: function () {
            return Template.instance().hasError.get()
        }, errors: function () {
            return Template.instance().errors.get()
        }
    })
}();
