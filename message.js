// JavaScript source code

// message helper

!function () {
    Template.messages.rendered = function () { },
    Template.messages.events({}),
    Template.messages.helpers({
        selectedAThread: function () {
            return Session.get("toUserId")
        },
        hasMessage: function () {
            return Inbox.find({
                toUserId: { $in: [Meteor.userId()] },
                fromUserId: Session.get("toUserId")
            }).count() > 0 || Inbox.find({
                fromUserId: Meteor.userId(),
                toUserId: { $in: [Session.get("toUserId")] }
            }).count() > 0
        },
        fromUserName: function () {
            return Meteor.users.findOne({ _id: Session.get("toUserId") }).profile.firstName
        },
        messages: function () {
            return Inbox.find({
                $or: [{
                    $and: [{ toUserId: { $in: [Meteor.userId()] } },
                        { fromUserId: Session.get("toUserId") }]
                }, {
                    $and: [{ toUserId: { $in: [Session.get("toUserId")] } },
                        { fromUserId: Meteor.userId() }]
                }]
            }, { sort: { createdAt: -1 } })
        },
        idle: function () { return Meteor.user().status.idle },
        checkRead: function () {
            this.data.toUserId.indexOf(Meteor.userId()) > -1 &&
           this.data.readBy.indexOf(Meteor.userId()) < 0 && Meteor.call("messageRead",
                this.data._id)
        }
    }),
    Template.inboxLeftColumn.helpers({
        unreadCount: function () {
            return Inbox.find({
                fromUserId: this._id, toUserId: { $in: [Meteor.userId()] },
                readBy: { $nin: [Meteor.userId()] }
            }).count()
        }
    }),
    Template.message.rendered = function () { },
    Template.message.events({}), Template.message.helpers({
        myMsg: function () {
            return Meteor.userId() == this.fromUserId
        }, content: function () {
            return this.content
        }, timestamp: function () {
            return moment(new Date(this.createdAt)).format("M/D, h:mma")
        }, hasRead: function () {
            return this.readBy
        }, cloudinaryPublicId: function () {
            return Meteor.users.findOne({ _id: this.fromUserId }).profile.thumbnail.cloudinaryPublicId
        }
    }),
    Template.readMessage.rendered = function () {
        this.data.toUserId.indexOf(Meteor.userId()) > -1 &&
        this.data.readBy.indexOf(Meteor.userId()) < 0 && Meteor.call("messageRead", this.data._id)
    }
}();