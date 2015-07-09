// JavaScript source code

!function () {
    Template.eventCard.created = function () {
        Meteor.subscribe("oneUser", Template.instance().data.hostId);
        var t = new google.maps.Marker({
            position:
                new google.maps.LatLng(this.data.location.latApprox, this.data.location.lngApprox),
            map: GoogleMaps.get("searchMap").instance, opacity: .6
        }); this.marker = t
    },
    Template.eventCard.destroyed = function () {
        this.marker.setMap(null)
    },
    Template.eventCard.rendered = function () {
        this.$(".ui.fluid.card .image").dimmer({ on: "hover" })
    },
    Template.eventCard.events({
        mouseover: function () {
            Template.instance().marker.setOpacity(1)
        }, mouseout: function () {
            Template.instance().marker.setOpacity(.6)
        }, click: function () {
            Router.go("mealShow", { mealId: Template.instance().data._id })
        }
    }),
    Template.eventCard.helpers({
        startTime: function () {
            return moment(this.time.startAt).utcOffset(this.time.zone).format("hh:mmA")
        }, startDate: function () {
            return moment(this.time.startAt).utcOffset(this.time.zone).format("dddd, MMM D")
        }, hostReviewsCount: function () {
            return Meteor.users.findOne({ _id: this.hostId }).host.reviewsCount
        }, priceWithServiceFee: function () {
            return (1.15 * this.pricePerGuest).toFixed(2)
        }, isFree: function () {
            return 0 == this.pricePerGuest
        }, isPast: function () {
            return moment(this.time.startAt).utcOffset(
                this.time.zone) <= moment(this.date()).utcOffset(this.time.zone)
        }, hostCloudinaryPublicId: function () {
            return Meteor.users.findOne({ _id: this.hostId }).profile.thumbnail.cloudinaryPublicId
        }, spotsLeft: function () {
            return this.spotsLeft
        }
    })
}();
