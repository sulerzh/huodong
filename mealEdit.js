// JavaScript source code

!function () {
    var e = function (e) {
        return e.length > 0
    },
        t = function (e) {
            return e.length > 0
        }, a = function (e) {
            return parseInt(e) >= 1
        }, r = function (e) {
            return !isNaN(new Date(e))
        }, n = function (e) {
            return parseInt(e) > 0 && parseInt(e) < 74
        }, o = function (e) {
            return parseInt(e) >= 0 && parseInt(e) < 9
        }, i = function (e) {
            return e && e.length > 0
        }, m = function (e) {
            return e.length > 0
        };
    Template.mealEdit.rendered = function () {
        function e() { } if (Date.parseDate = function (e, t) {
            return moment(e, t).toDate()
        }, Date.prototype.dateFormat = function (e) {
            return moment(this).format(e)
        }, $(".has-popup").popup(),
            $("#meal-edit-start-time").datetimepicker({
            format: "MM/DD/YYYY h:mm a",
            formatTime: "h:mm a", formatDate: "MM/DD/YYYY",
            step: 15, defaultTime: "12:00"
        }),
            $("#meal-edit-end-time").datetimepicker({
            format: "MM/DD/YYYY h:mm a",
            formatTime: "h:mm a",
            formatDate: "MM/DD/YYYY", step: 15, defaultTime: "12:00"
        }),
            $(".ui.accordion").accordion(), $("#update-cover-btn").click(function () {
            $("#current-cover-file").click()
        }), $(".meal-edit-form .ui.checkbox").checkbox(),
            $(".meal-edit-form .ui.dropdown").dropdown(), GoogleMaps.loaded()) {
            var t = new google.maps.places.Autocomplete(document.getElementById("address-update"),
                { types: ["geocode"] });
            google.maps.event.addListener(t, "place_changed", function () {
                e()
            })
        } Session.set("Edit meal error", false)
    },
    Template.mealEdit.events({
        "change input[type='file']": function (e) {
            var t = new Slingshot.Upload("mealPhotoUpload");
            t.send(e.target.files[0], function (e, t) {
                $("#current-cover-url").val(t),
                $("#preview-current-cover-picture").attr("src", t)
            })
        }, "click #meal-edit-button": function () {
            $(".pusher").dimmer("show"),
            $(".ui.loader").css("position", "fixed").css("top", "70%");
            var o = {}, s = [],
                l = $("#event-edit-auto-accept-toggle").is(":checked"); o.autoAccept = l;
            var d = $(".meal-edit-form input[name='title']").val();
            e(d) ? o.title = d : s.push("Title cannot be empty");
            var u = $(".meal-edit-form #meal-edit-summary").val();
            t(u) ? o.summary = u : s.push("Summary cannot be empty");
            var c = $(".meal-edit-form input[name='maxParty']").val();
            a(c) ? o.maxParty = parseInt(c) : s.push("Max party is invalid/empty");
            var p = $(".meal-edit-form #meal-edit-start-time").val(); r(p) ||
        s.push("Event start time is invalid/empty");
            var p = new Date(p), f = $(".meal-edit-form #meal-edit-end-time").val();
            if (f)
                var f = new Date(f);
            f && p && p >= f && s.push("End time of the event cannot be earlier than the start time - 2");
            var h = $(".meal-edit-form input[name='deadline']").val();
            n(h) ? o.time = {
                startAt: p, endAt: f,
                deadline: new Date(moment(new Date(p)).subtract(parseInt(h), "h"))
            } : s.push("Deadline is invalid"),
        o.placeType = parseInt($(".meal-edit-form input[name='placeType']").val());
            var v = $(".meal-edit-form #current-cover-url").val() ||
                $("#preview-current-cover-picture").attr("src"); i(v) ?
        o.cover = { org: v } : s.push("You must upload a photo as your cover photo");
            var g = $(".meal-edit-form #meal-edit-interaction").val();
            g.length > 0 && (o.interaction = g);
            var y = $(".meal-edit-form #meal-edit-note").val();
            y.length > 0 && (o.note = y);
            var Y = $("#meal-edit-question-for-guest").val();
            Y.length > 0 && (o.questionForGuest = Y);
            var D = $(".meal-edit-form input[name='address']").val(),
                M = $("[name='notify-guest-checkbox']").is(":checked");
            if (m(D) ? (o.address = {}, o.address.full = D) :
                s.push("Your address is not compete"), s.length > 0) {
                $(".pusher").dimmer("hide"), $("html, body").animate({ scrollTop: 0 },
                    "fast");
                for (var E = [], T = 0; T < s.length; T++)
                    E.push({ reason: s[T] }); Session.set("Edit meal errors", E),
                    Session.set("Edit meal error", true)
            }
            else Meteor.call("editMeal", Session.get("editMealId"), o,
                function (e, t) {
                    if (e) {
                        $(".pusher").dimmer("hide"), $("html, body").animate({ scrollTop: 0 },
                            "fast"), s = e.reason.split(",");
                        for (var a = [], r = 0; r < s.length; r++) a.push({ reason: s[r] });
                        Session.set("Edit meal errors", a), Session.set("Edit meal error", true)
                    } else $(".pusher").dimmer("hide"), M && Meteor.call("notifyGuestEventUpdated", Session.get("editMealId")), Session.set("Edit meal error", false), Router.go("/events/" + Session.get("editMealId"))
                })
        },
        "click .cancel.button": function () { parent.history.back() }
    }),
    Template.mealEdit.helpers({
        placeTypeName: function () {
            return GType.placeType[Number(this.placeType)]
        }, address: function () { return this.address.full },
        coverPhoto: function () { return this.cover.org }, mealStartAt: function () {
            return moment(this.time.startAt).format("MM/DD/YYYY h:mm a")
        }, mealEndAt: function () {
            return moment(this.time.endAt).format("MM/DD/YYYY h:mm a")
        }, deadlineDiff: function () {
            var e = moment(this.time.startAt), t = moment(this.time.deadline);
            return e.diff(t, "hours")
        }, hasError: function () {
            return Session.get("Edit meal error")
        }, errors: function () {
            return Session.get("Edit meal errors")
        }, mapOptions: function () {
            function e() { }
            if (GoogleMaps.loaded()) {
                var t = new google.maps.places.Autocomplete(document.getElementById("address-update"),
                    {
                        types: ["geocode"], open: function (e, t) {
                            var a = $(e.target), r = a.autocomplete("widget"),
                                n = r.position().top, o = r.height(), i = a.height(),
                                m = n - o - i; r.css("top", m + "px")
                        }
                    }); google.maps.event.addListener(t, "place_changed", function () { e() })
            }
        }
    })
}();
