
Template.userProfile.onCreated(function () {
  var userId = Router.current().url.substring(
    Router.current().url.indexOf("/users/") + 7,
      Router.current().url.indexOf("/reviews/"));
  this.user = new ReactiveVar;
  var pThis = this;
  this.autorun(function () {
    if (Meteor.subscribe("oneUser", userId).ready()) {
      pThis.user.set(Meteor.users.findOne(userId));
    }
  });
});

Template.userProfile.helpers({
  id: function () {
    return Template.instance().user.get()._id;
  },
  thumbnail: function () {
    return Template.instance().user.get().profile.thumbnail.cloudinaryPublicId;
  },
  firstName: function () {
    return Template.instance().user.get().profile.firstName;
  },
  name: function () {
    return Template.instance().user.get().profile.firstName;
  },
  emailVerified: function () {
    for (var e = 0; e < Template.instance().user.get().emails.length; e++)
      if (Template.instance().user.get().emails[e].verified)
        return true;
  },
  phoneVerified: function () {
    return Template.instance().user.get().phoneVerification &&
      1 == Template.instance().user.get().phoneVerification.status;
  },
  facebookLinked: function () {
    return Template.instance().user.get().services.facebook;
  },
  facebookNumberOfFriends: function () {
    if (Template.instance().user.get().services.facebook) {
      return Template.instance().user.get().services.facebook.numberOfFriends;
    }
    return false;
  },
  googleLinked: function () {
    return Template.instance().user.get().services.google;
  },
  idVerified: function () {
    return Template.instance().user.get().idVerification &&
      1 == Template.instance().user.get().idVerification.status;
  },
  eduVerified: function () {
    for (var e = 0; e < Template.instance().user.get().emails.length; e++)
      if (Template.instance().user.get().emails[e].verified &&
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.test(Template.instance().user.get().emails[e].address))
        return true;
    return false;
  },
  reviewed: function () { },
  hasSchool: function () {
    return Template.instance().user.get().profile.school &&
      Template.instance().user.get().profile.school.length > 0;
  },
  school: function () {
    return Template.instance().user.get().profile.school;
  },
  hasWork: function () {
    return Template.instance().user.get().profile.work &&
      Template.instance().user.get().profile.work.length > 0;
  },
  work: function () {
    return Template.instance().user.get().profile.work;
  },
  hasLanguage: function () {
    return Template.instance().user.get().profile.language &&
      Template.instance().user.get().profile.language.length > 0;
  },
  language: function () {
    return Template.instance().user.get().profile.language;
  },
  hasCity: function () {
    return Template.instance().user.get().profile.city &&
      Template.instance().user.get().profile.city.length > 0;
  },
  city: function () {
    return Template.instance().user.get().profile.city;
  },
  joinDate: function () {
    return moment(Template.instance().user.get().createdAt).format("YYYY");
  },
  hasDescription: function () {
    return Template.instance().user.get().profile.description &&
      Template.instance().user.get().profile.description.length > 0;
  },
  description: function () {
    return Template.instance().user.get().profile.description;
  }
});

