// JavaScript source code
!function () {
    var e = function (e) {
        for (var t = 0; t < e.emails.length; t++)
            if (e.emails[t].verified)
                return true;
        return false
    },
    t = function (e) {
        return e.phoneVerification && 1 == e.phoneVerification.status
    },
    i = function () {
        return Meteor.user().idVerification && 1 == Meteor.user().idVerification.status
    };
    Template.mealShow.created = function () {
        var e = this;
        Meteor.subscribe("oneUser",
            e.data.hostId), Meteor.subscribe("hostReviews", e.data.hostId),
        e.guestList = new ReactiveVar([]), this.autorun(function () {
            Meteor.userId() && Meteor.subscribe("mealOrderCheck", e.data._id);
            var t = Orders.find({ mealId: e.data._id, status: { $gte: 0 } }), i = [];
            t.forEach(function (t) {
                Meteor.subscribe("oneUser", t.userId);
                var r = Meteor.users.findOne({ _id: t.userId });
                r && (t.numberOfGuests > 1 &&
                (r.numberOfExtraGuest = " + " + (t.numberOfGuests - 1)),
                0 == t.status &&
                (r.profile.thumbnail.org = "http://plenry.meteor.com/images/defaultAvatar.jpg",
                r.profile.thumbnail.cloudinaryPublicId = "default_avatar", r.isPending = true),
                i.push(r), e.guestList.set(i))
            })
        })
    },
    Template.mealShow.rendered = function () {
        var e = Template.instance().data._id;
        if (Session.set("mealId", e),
            $(window).resize(function () {
            $(window).width() > 768 ?
            GoogleMaps.get(e).instance.set("draggable", true) :
            GoogleMaps.get(e).instance.set("draggable", false)
        }), $(window).width() > 768) {
            var t = function () {
                var e = $(this).scrollTop(), t = $("#meal-cover-image").height(),
                    i = 88, r = e + i, n = 0; $(".map-container").length > 0 &&
                (n = $(".map-container").offset().top),
                $(".ui.sticky").css(n > r ? t > e ? { "margin-top": t - e + i } :
                        { "margin-top": i } : { "margin-top": n - e })
            };
            $("#meal-cover-image").load(t), $(window).scroll(t)
        }
        this.$(".ui.dropdown").dropdown(),
        this.$(".has-popup").popup()
    };
    var r = function () {
        var e = $(window).height(), t = .8 * e, i = $(window).width(),
            r = .7 * i;
        $(".gallery-modal .frame").css("height", .8 * e + "px"),
        $(".gallery-modal .frame ul").css("height", .8 * e + "px"),
        $(".gallery-modal").modal("show");
        var n = $(".gallery-modal .gallery-navigation").height(),
            s = $(".gallery-modal").height();
        $(".gallery-modal .frame ul li").each(function (e) {
            var i = $(this).find("img").attr("src"),
                n = new Image; n.src = i;
            var o = n.naturalWidth, a = n.naturalHeight, d = o; o > r && (d = r);
            var u = a, a = n.naturalHeight; a > t && (d = t / a * d, u = t),
        $(this).css("width", (d + 80).toFixed(2) + "px"),
        $(this).find("img").css("top", ((s - u) / 2).toFixed(2) + "px"),
        Logger.log("Image #" + e + " width: " + d.toFixed(2))
        }), $(".gallery-modal .gallery-navigation").css("top", ((s - n) / 2).toFixed(2) + "px");
        var o = $("#effects"), a = o.parent();
        return Logger.log("Current window height: " + $(window).height()),
            o.sly({
                horizontal: 1, itemNav: "forceCentered",
                itemSelector: ".frame li", smart: 1, activateMiddle: 1,
                activateOn: "click", mouseDragging: 1, touchDragging: 1,
                releaseSwing: 1, startAt: 2, scrollBar: a.find(".scrollbar"),
                scrollBy: 1, speed: 650, elasticBounds: 1, easing: "swing",
                dragHandle: 1, dynamicHandle: 1, clickBar: 1,
                prev: a.find(".left-nav"), next: a.find(".right-nav")
            }, {
                active: function (e, t) {
                    Logger.log("Sly active index: " + t);
                    var i = o.find("li:nth-child(" + (t + 1) + ") .hidden.caption").html();
                    o.parent().find(".ui.caption").html(i)
                }
            }), $(".clearfix").css("width", "50000px"), o
    }; Template.mealShow.events({
        "click #comment-button": function () {
            Logger.log("Comment: " + $("#comment-fields").val()),
            Meteor.call("newComment", {
                mealId: this._id,
                content: $("#comment-fields").val()
            }), $("#comment-fields").val("")
        }, "click .reply-button": function (e) {
            Logger.log("Reply Comment: " + $("#comment-fields").val()),
            Meteor.call("newComment", {
                mealId: this.mealId, content: $(e.target).parent().find(".reply-field").val(),
                replyToId: this._id
            }), $(e.target).parent().find(".reply-field").val("")
        }, "click #book-now-btn": function () {
            t(Meteor.user()) ?
            Router.go("reserve", { mealId: Template.instance().data._id }) :
            (Session.set("Verification warning", true),
            Session.set("Verification warning header",
                "Your must verify your phone before reserving"),
            Session.set("Verification redirect",
                [Template.instance().data._id]),
            Router.go("trustAndVerification"))
        }, "click .login-link-btn": function (e) {
            $(".login.modal").modal("show")
        }, "click .environment-photo": function () {
            r(), frame.sly("activate", 0)
        }, "click .dish-name": function (e) {
            if (Template.instance().data.dishes[$(e.target).parent().parent().index()].photo) {
                for (var t = r(), i = 0, n = 0; n < $(e.target).parent().parent().index() ; n++)
                    Template.instance().data.dishes[n].photo || i++;
                t.sly("activate", $(e.target).parent().parent().index() + 1 - i)
            }
        }, "click .cancel-reservation": function (e) {
            var t = Orders.findOne({ mealId: this._id, userId: Meteor.userId() })._id;
            $(".ui.small.modal").modal("show"), $(".cancel-reservation-confirm").click(function () {
                Meteor.call("cancelReservation", t)
            })
        }
    }),
    Template.mealShow.helpers({
        exampleMapOptions: function () {
            if (GoogleMaps.loaded()) {
                var e = new google.maps.LatLng(this.location.latApprox, this.location.lngApprox);
                return GoogleMaps.ready(this._id, function (t) {
                    var i = new google.maps.Circle({
                        strokeColor: "#d95c5c",
                        strokeOpacity: .2, strokeWeight: 1, fillColor: "#d95c5c",
                        fillOpacity: .4, radius: 500, map: t.instance, center: e
                    })
                }), { center: e, zoom: 14, scrollwheel: false }
            }
        }, hostName: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.profile.firstName
        }, hostFirstName: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.profile.firstName
        }, hostOverallRating: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.host.overallRating
        }, hostCommunicationRating: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.host.communicationRating
        }, hostReviewsCount: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.host.reviewsCount
        }, hostCloudinaryPublicId: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.profile.thumbnail.cloudinaryPublicId
        }, pricePerGuestWithService: function () {
            return (1.15 * this.pricePerGuest).toFixed(2)
        }, pricePerGuestWithoutService: function () {
            return this.pricePerGuest.toFixed(2)
        }, isFree: function () {
            return 0 == this.pricePerGuest
        }, mealStartDate: function () {
            return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D ddd")
        }, mealEndDate: function () {
            return moment(this.time.endAt).utcOffset(this.time.zone).format("MMM D ddd")
        }, mealStartTime: function () {
            return moment(this.time.startAt).utcOffset(this.time.zone).format("hh:mmA")
        }, mealEndTime: function () {
            return this.time.endAt ?
                moment(this.time.endAt).utcOffset(this.time.zone).format("hh:mmA") : void 0
        }, timeLeft: function () {
            var e = moment(this.time.deadline).diff(new Date, "hours");
            if (e > 23)
                return moment(this.time.deadline).fromNow(true);
            var t = moment(this.time.deadline).subtract(e, "hours").diff(new Date, "minutes");
            return e + "hrs " + t + "min"
        }, isSeparateDate: function () {
            return this.time.endAt ? moment(this.time.endAt).utcOffset(this.time.zone).
                format("MMM D, YYYY ddd") !=
                moment(this.time.startAt).utcOffset(this.time.zone).
                format("MMM D, YYYY ddd") : false
        }, mealPlaceType: function () {
            return GType.placeType[this.placeType]
        }, mealHostingStyle: function () {
            return GType.hostingStyle[this.hostingStyle]
        }, mealKidsRule: function () {
            return 1 == parseInt(this.rules.kids)
        }, mealShoesRule: function () {
            return 1 == parseInt(this.rules.shoes)
        }, mealPets: function () {
            var e = "";
            return e = this.pets && this.pets.length > 0 ?
                this.pets : "No pet", e + " live on property"
        }, hostResgisterYear: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return moment(e.createdAt).format("YYYY")
        }, hostResponseTime: function () {
            var e = Meteor.users.findOne({ _id: this.hostId }),
                t = e.host.totalResponds; 0 == t && (t = 1);
            var i = e.host.totalResponseTime, r = i / t;
            return 60 > r ? "< 1 hour" : "~ " + parseInt(r / 60) + " hours"
        }, hostDescription: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.profile.description
        }, hostLanguage: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.profile.language
        }, hostSchool: function () {
            var e = Meteor.users.findOne({ _id: this.hostId });
            return e.profile.school
        }, comments: function () {
            var e = Comments.find({ mealId: this._id, replyToId: { $exists: false } },
                { sort: { createdAt: -1 } }); return e
        }, isHostOfMeal: function () {
            return this.hostId == Meteor.userId()
        }, reviews: function () {
            var e = Reviews.find({ hostId: this.hostId, userToHost: true },
                { limit: 6, sort: { createdAt: -1 } });
            return e
        }, reserved: function () {
            return Meteor.userId() ?
                Orders.findOne({ mealId: this._id, userId: Meteor.userId() }) : false
        }, pending: function () {
            if (Meteor.userId()) {
                var e = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
                return 0 == e.status
            }
        }, confirmed: function () {
            if (Meteor.userId()) {
                var e = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
                return e ? 1 == e.status : false
            }
        }, declined: function () {
            if (Meteor.userId()) {
                var e = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
                return -1 == e.status
            }
        }, cancelled: function () {
            if (Meteor.userId()) {
                var e = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
                return -1 == this.status || -2 == e.status
            }
        }, passed: function () {
            return this.time.deadline < new Date
        }, guestList: function () {
            return Template.instance().guestList.get()
        },
        noGuest: function () {
            return 0 == Template.instance().guestList.get().length
        }, reserveOptions: function () {
            for (var e = [], t = 1; t <= this.spotsLeft; t++)
                e.push(1 == t ? { value: 1, text: "Only You" } : { value: t, text: "You + " + (t - 1) + " Guest(s)" }); return e
        }, isFull: function () {
            return this.spotsLeft <= 0 ? true : false
        }, reviewDeadlinePassed: function () {
            var e = new Date(this.time.endAt || this.time.startAt);
            return e.setDate(e.getDate() + 14), e < new Date
        }, reviewed: function () {
            var e = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
            return e.guestReviewed
        }, cancellable: function () {
            return this.status >= 0
        }, orderId: function () {
            var e = Orders.findOne({ mealId: this._id, userId: Meteor.userId() });
            return e._id
        }
    })
}();
