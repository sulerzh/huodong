// JavaScript source code

!function () {
    Template.commentSection.created = function () {
        Meteor.subscribe("oneUser", Template.instance().data.userId)
    },
    Template.commentSection.helpers({
        userName: function () {
            var e = Meteor.users.findOne({ _id: this.userId });
            return e.profile.firstName
        }, timeAgo: function () {
            return moment(this.createdAt).fromNow()
        }, replyContent: function () {
            var e = Comments.findOne({ replyToId: this._id });
            return e.content
        }, replyUserId: function () {
            var e = Comments.findOne({ replyToId: this._id });
            return e.userId
        }, replyCreatedAt: function () {
            var e = Comments.findOne({ replyToId: this._id });
            return e.createdAt
        }, isHostOfMeal: function () {
            var e = Meals.findOne({ _id: this.mealId });
            return e.hostId == Meteor.userId()
        }, userThumbnail: function () {
            var e = Meteor.users.findOne({ _id: this.userId });
            return e.profile.thumbnail.cloudinaryPublicId
        }
    })
}();
