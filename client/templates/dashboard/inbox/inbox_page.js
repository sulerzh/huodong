Template.inboxPage.helpers({
  hasSelectedThread: function () {
    return Session.get("toUserId");
  },
  fromUserName: function () {
    return Meteor.users.findOne({ _id: Session.get("toUserId") }).profile.firstName;
  },
  userStatus: function () {
    var user = Meteor.users.findOne({ _id: Session.get("toUserId") });
    if (user.status.online)
      return user.status.idle ? "(idle)" : "(online)";
    var lastLoginDate = Meteor.users.findOne({ _id: Session.get("toUserId") }).status.lastLogin.date;
    return lastLoginDate ? "(last logged in on " + moment(lastLoginDate).format("M/D, h:mma") + ")" : "";
  }
});

Template.inboxLeftColumn.onRendered(function () {
  $(".ui.dropdown").dropdown();
});

Template.inboxLeftColumn.helpers({
  selected: function () {
    return Session.get("toUserId") == this._id;
  },
  myContactsForSearch: function () {
    var e = Meteor.user().contacts;
    return Meteor.users.find({ _id: { $in: e } }, {
      field: { "profile.firstName": 1 },
      sort: { "profile.firstName": 1 }
    });
  },
  myContacts: function () {
    var contacts = Meteor.user().contacts;
    contacts.forEach(function(contact) {
      var messages = Inbox.find({
        $or: [{ fromUserId: contact },
          { toUserId: { $in: [contact] } }
        ]
      }, {
        limit: 1,
        sort: { createdAt: -1 }
      });
      if (messages) {
        messages.forEach(function(message) {
          Meteor.users._collection.update({ _id: contact },
          { $set: { msgDate: message.createdAt } });
        });
      }
    });
    return Meteor.users.find({ _id: { $in: contacts } },
    {
      field: { "profile.firstName": 1 },
      sort: {
        "status.online": -1,
        msgDate: -1
      }
    });
  },
  unreadCount: function () {
    return Inbox.find({
      fromUserId: this._id,
      toUserId: { $in: [Meteor.userId()] },
      readBy: { $nin: [Meteor.userId()] }
    }).count();
  }
});

Template.inboxLeftColumn.events({
  "click .user": function () {
    Session.set("toUserId", this._id);
  },
  "click #user-db-update-button": function () {
    Meteor.call("updateUserDbForInbox");
  }
});

Template.inboxRightColumn.helpers({
  userName: function () {
    return Meteor.users.findOne({ _id: Session.get("toUserId") }).profile.firstName;
  },
  cloudinaryPublicId: function () {
    return Meteor.users.findOne(
    { _id: Session.get("toUserId") }).profile.thumbnail.cloudinaryPublicId;
  },
  eventsMet: function () {
    Meteor.call("getCommonEvents", Session.get("toUserId"), function (error, result) {
      if (error)
        throw new Error("Cannot get common events");
      Session.set("commonEvents", result);
    });
    return Meals.find({
       _id: { $in: Session.get("commonEvents") }
    },
    {
      sort: { "time.startAt": -1 },
      limit: 3
    });
  }
});

Template.inboxEventsMet.helpers({
  timeAgo: function () {
    return moment(this.time.startAt).fromNow();
  }
});

Template.input.events = {
  "click #send-message-button": function () {
    if (Meteor.user()) {
      var message = $("#message").val();
      if ("" !== message.value && 0 != message.length) {
        Meteor.call("sendIndividualMessage", Session.get("toUserId"), message);
        $("#message").val("");
      }
    } else {
      alert("login to chat");
    }
  }
};

Template.messages.helpers({
  selectedAThread: function () {
    return Session.get("toUserId");
  },
  hasMessage: function () {
    return Inbox.find({
        toUserId: { $in: [Meteor.userId()] },
        fromUserId: Session.get("toUserId")
      }).count() > 0 ||
      Inbox.find({
        fromUserId: Meteor.userId(),
        toUserId: { $in: [Session.get("toUserId")] }
      }).count() > 0;
  },
  fromUserName: function () {
    return Meteor.users.findOne({ _id: Session.get("toUserId") }).profile.firstName;
  },
  messages: function () {
    return Inbox.find({
      $or: [
        {
          $and: [
            { toUserId: { $in: [Meteor.userId()] } },
            { fromUserId: Session.get("toUserId") }
          ]
        },
        {
          $and: [
            { toUserId: { $in: [Session.get("toUserId")] } },
            { fromUserId: Meteor.userId() }
          ]
        }
      ]
    },
    { sort: { createdAt: -1 } });
  },
  idle: function () {
    return Meteor.user().status.idle;
  },
  checkRead: function () {
    if (this.data.toUserId.indexOf(Meteor.userId()) > -1 &&
      this.data.readBy.indexOf(Meteor.userId()) < 0)
      Meteor.call("messageRead", this.data._id);
  }
});


Template.message.helpers({
  myMsg: function () {
    return Meteor.userId() == this.fromUserId;
  },
  content: function () {
    return this.content;
  },
  timestamp: function () {
    return moment(new Date(this.createdAt)).format("M/D, h:mma");
  },
  hasRead: function () {
    return this.readBy;
  },
  cloudinaryPublicId: function () {
    return Meteor.users.findOne({ _id: this.fromUserId }).profile.thumbnail.cloudinaryPublicId;
  }
});

Template.readMessage.onRendered(function () {
  if (this.data.toUserId.indexOf(Meteor.userId()) > -1 &&
    this.data.readBy.indexOf(Meteor.userId()) < 0)
    Meteor.call("messageRead", this.data._id);
});
