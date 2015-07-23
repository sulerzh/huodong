
var e = function (e) {
  var t = [],
    r = e.name,
    n = e.recipient,
    o = e.line1,
    i = e.city,
    s = e.state,
    a = e.zipCode,
    u = e.country;
  return r ||
      t.push("Name on the bank account cannot be empty"),
    n || t.push("Recipient cannot be empty"), o ||
      t.push("Address cannot be empty"), i || t.push("City cannot be empty"),
    s || t.push("State cannot be empty"), a || t.push("Zip Code cannot be empty"),
    u || t.push("Country cannot be empty"), t
};

var t = function (e, t, r, n, o) {
  var i = [],
    s = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return s.test(e) || i.push("Email is not valid"),
    t.length < 8 || !/^(?=.*[a-z])(?=.*[0-9])/.test(t) ?
      i.push("Password length must be at least 8 and includes letter and number") :
      t != r && i.push("Passwords do not match"),
    (0 == n.length || 0 == o.length) &&
      i.push("First name/last name cannot be empty"),
    0 == n.length || 0 == o.length || /^[a-zA-Z \-]+$/.test(n) &&
      /^[a-zA-Z \-]+$/.test(o) ||
      i.push("First name/last name should only contains alphabets/dashes"), i
};

r = function (e) {
  var t = [], r = new Date;
  return e.title && 0 != e.title.length ||
      t.push("Meal title cannot be empty"), e.summary ||
      t.push("Summary cannot be empty"), (isNaN(parseFloat(e.pricePerGuest)) ||
      parseFloat(e.pricePerGuest) < 0) && t.push("Price is invalid or too low"),
    0 == e.pricePerGuest || e.pricePerGuest || t.push("Price cannot be empty"),
    (isNaN(parseInt(e.maxParty)) || parseInt(e.maxParty) < 1) &&
      t.push("Max number of guests is invalid"), e.maxParty ||
      t.push("Max number of guests cannot be empty"),
    e.time && e.time.deadline || t.push("Deadline cannot be empty"),
    (!e.time || e.time.deadline < r) &&
      t.push("Users cannot reserve your event because the deadline has already passed"),
    e.time && e.time.startAt || t.push("Start time of event cannot be empty"),
    e.time.startAt < e.time.deadline &&
      t.push("Deadline should not be later than the start time"),
    e.time && e.time.endAt && e.time.startAt &&
      e.time.endAt <= e.time.startAt &&
      t.push("End time of the event cannot be earlier than the start time - 1"),
    (parseInt(e.placeType) < 0 || parseInt(e.placeType) > 8) &&
      t.push("Event place is invalid"), e.address && e.address.full ||
      t.push("Address cannot be empty"), t
};


n = function (e) {
  var t = [], r = e.profile, n = e.emergency;
  if (r.lastName ? /^[a-zA-Z \-]+$/.test(r.lastName) ||
    t.push("Last Name must be alphabet characters only") :
    t.push("Last Name cannot be empty"), r.firstName ?
    /^[a-zA-Z \-]+$/.test(r.firstName) ||
    t.push("First Name must be alphabet characters only") :
    t.push("First Name cannot be empty"), r.gender && (/^[0-3]+$/.test(r.gender) ||
    t.push("Gender input error")), r.birthday) {
    var o = new Date(r.birthday);
    isNaN(o) ? t.push("Birthday input error") :
      o > new Date && t.push("Birthday must be in the past")
  }
  return r.phone && !/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(r.phone) &&
    t.push("Phone Number input error"), n.name && !/^[a-zA-Z ]+$/.test(n.name) &&
    t.push("Emergency Contact's Name must be alphabet characters only"), n.email &&
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.
    test(n.email) &&
    t.push("Emergency Contact's Email is not a valid email"), t
};


o = function (e, t) {
  var r = [];
  t || r.push("Login is required to comment"),
    e.content && 0 != e.content.length || r.push("Comment cannot be empty");
  var n = Meals.findOne({ _id: e.mealId });
  if (n || r.push("Meal cannot be found"), e.replyToId) {
    n && n.hostId != t && r.push("Must be a host to reply a comment");
    var o = Comments.findOne({ _id: e.replyToId });
    o ? o.replied &&
      r.push("Comment has been replied") : r.push("Comment cannot be found")
  } else
    n.hostId == t && r.push("Host can only reply");
  return r
};


i = function (e, t) {
  var r = [],
    n = Meals.findOne({ _id: e.mealId }),
    o = n.hostId,
    i = e.mealId,
    s = new Date;
  n ||
    r.push("Meal cannot be found"), (n.time.startAt > s ||
    n.time.endAt && n.time.endAt > s) && r.push("Event has not ended yet");
  var a = new Date(n.time.endAt || n.time.startAt);
  if (a.setDate(a.getDate() + 14), s > a && r.push("The review deadline has passed"),
    n.status < 1 && r.push("Event has not published yet"),
    e.content && 0 != e.content.length ||
      r.push("Experience/impression cannot be empty"),
    e.userToHost) {
    t == o && r.push("You cannot review yourself");
    var u = Orders.findOne({ status: 1, mealId: i, userId: t });
    u || r.push("You can only review if you attends the event");
    var d = Reviews.findOne({ mealId: i, userId: t, userToHost: true });
    d && r.push("You can only review once"), (!e.overallRating ||
        "number" != typeof e.overallRating || e.overallRating > 5 ||
        e.overallRating < 1) && r.push("Overall Rating cannot be found/format is wrong"),
      (!e.communicationRating || "number" != typeof
          e.communicationRating || e.communicationRating > 5 ||
          e.communicationRating < 1) &&
        r.push("Communication Rating cannot be found/format is wrong")
  } else {
    o != t && r.push("User not authorized"), e.userId ||
      r.push("Cannot identify guest [guestId is missing]");
    var u = Orders.findOne({ status: 1, mealId: i, userId: e.userId });
    u ||
      r.push("This user didn't attend your event");
    var d = Reviews.findOne({ mealId: i, userId: t, userToHost: false });
    d && r.push("You can only review once"), (!e.overallRating ||
        "number" != typeof e.overallRating || e.overallRating > 5 || e.overallRating < 1)
      && r.push("Overall Rating cannot be found/format is wrong")
  }
  return r
};


s = function (e) {
  return e.replace(/\w\S*/g, function (e) {
    return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
  })
};


a = function (e, r, n, o, i, s) {
  var a = t(e, r, n, o, i);
  return a.length > 0 ? (Logger.log(a),
    s(new Meteor.Error("invalid-params", a.toString()))) :
  (o = o.substr(0, 1).toUpperCase() + o.substr(1),
    i = i.substr(0, 1).toUpperCase() + i.substr(1),
    Accounts.createUser({ email: e, password: r, profile: { firstName: o, lastName: i } },
      s), void 0)
};


u = function (e, t, r) {
  Meteor.loginWithPassword(e, t, function (e) {
    return e ? (Logger.log(JSON.stringify(e)), r(e)) : void r()
  })
};


d = function (e, t) {
  if (e.userId = t, e.createdAt = new Date, e.replyToId) {
    var r = Comments.findOne({ _id: e.replyToId });
    CreateNotification(3, 1, e.mealId, t, r.userId),
      Comments.update({ _id: e.replyToId }, { $set: { replied: true } }),
      Notifications.update({
        type: 3,
        subType: 0,
        mealId: e.mealId,
        toUserId: t,
        fromUserId: r.userId
      }, { $set: { hidden: true } })
  } else {
    var n = Meals.findOne({ _id: e.mealId });
    CreateNotification(3, 0, e.mealId, t, n.hostId)
  }
  return Comments.insert(e)
};


l = function (e, t) {
  e.hostId = t, e.status = 1, e.numberOfAcceptedGuests = 0,
    e.createdAt = new Date, e.numberOfGuests = 0,
    e.spotsLeft = parseInt(e.maxParty), e.time.zone = -7,
    e.address.full = s(e.address.full);
  var r = Meteor.wrapAsync(Cloudinary.uploader.upload);
  try {
    r(e.cover.org)
  } catch (n) {
    e.cover.cloudinaryPublicId = n.public_id
  }
  var o = Meals.insert(e), i = new Date(e.time.startAt), a = new Date(e.time.startAt), u = new Date;
  return i.setDate(i.getDate() - 1), a.setDate(a.getDate() - 3), Queue.add({ command: "create24HoursNotificationForHost('" + o + "');", execute_after: i }), a >= u && Queue.add({ command: "create3DaysNotificationForHost('" + o + "');", execute_after: a }), Queue.add({ command: "createMealEndNotificationForHost('" + o + "');", execute_after: new Date(e.time.endAt || e.time.startAt) }), o
};


c = function (e, t, r) {
  var n = r / 111300,
    o = Math.random(),
    i = Math.random(),
    s = n * Math.sqrt(o),
    a = 2 * Math.PI * i,
    u = s * Math.cos(a),
    d = s * Math.sin(a),
    l = u / Math.cos(e);
  return { lat: e + d, lng: t + l }
};


f = function (e) {
  return Meals.find({ _id: e, status: { $ne: 0 } })
};


m = function (e) {
  for (var t = 0; t < e.emails.length; t++)
    if (e.emails[t].verified)
      return true;
  return false
};


p = function (e) {
  return e.phoneVerification && 1 == e.phoneVerification.status
};


h = function () {
  return Meteor.user().idVerification &&
    1 == Meteor.user().idVerification.status
};


g = function () {
  for (var e = 0; e < Meteor.user().emails.length; e++)
    if (Meteor.user().emails[e].verified &&
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.
      test(Meteor.user().emails[e].address))
      return true;
  return false
};


v = function (e) {
  for (var t = {}, r = [], n = e.length, o = 0, i = 0; n > i; i++) {
    var s = e[i];
    1 !== t[s] && (t[s] = 1, r[o++] = s)
  }
  return r
};

Array.prototype.remove = function() {
  for (var e, t = arguments, r = t.length, n; r && this.length;)
    for (e = t[--r]; -1 !== (n = this.indexOf(e));)
      this.splice(n, 1);
  return this;
};

// Meteor 方法定义

Meteor.methods({
  addPayoutAddress: function(e) {
    return W(this.userId, e)
  },
  getEmailList: function(e) { return j(e) },
  getCommonEvents: function(e) {
    return J(this.userId, e)
  },
  messageRead: function(e) {
    return Y(this.userId, e)
  },
  sendIndividualMessage: function(e, t) {
    return z(this.userId, e, t)
  },
  updateMeal: function(e, t) {
    Logger.log("Updating temp meal: " + e),
      Logger.log("Fields: " + JSON.stringify(t)),
      Meals.update({ _id: e }, { $set: t })
  },
  updateThumnail: function() {
    for
    (
      var e = Meteor.users.find({
            "profile.thumbnail.org":
            { $exists: true },
            "profile.thumbnail.cloudinaryPublicId": null
          }).toArray(),
      t = Meteor.wrapAsync(Cloudinary.uploader.upload),
      r = 0; r < e.length; r++)
      try {
        t(e[r].profile.thumbnail.org)
      } catch (n) {
        Meteor.users.update({ _id: e[r]._id },
        { $set: { "profile.thumbnail.cloudinaryPublicId": n.public_id } })
      }
  },
  becomeAHost: function() {
    b(this.userId)
  },
  newContactUsMessage: function(e, t, r) {
    ContactUsMessage.insert({ name: e, email: t, message: r, createdAt: new Date }),
      Email.send({
        to: "service@plenry.com",
        from: "Plenry <automated@plenry.com>",
        subject: "New Contact Us Message",
        text: "Name: " + e + "\nEmail: " +
          t + "\nMessage: " + r
      })
  },
  newMeal: function(e) {
    if (Logger.log("Creating new meal..."), !this.userId)
      throw new Meteor.Error("not-authenticated", "User must log in to create an event");
    var t = r(e);
    if (0 == t.length) {
      if (this.isSimulation)
        return;
      var n = new GeoCoder, o;
      try {
        o = n.geocode(e.address.full)
      } catch (i) {
        throw Logger.log("Geocoder error:" + JSON.stringify(i)),
          new Meteor.Error("location-error", "We cannot locate your address; please provide an accurate address")
      }
      if (Logger.log("Geocoder result:" + JSON.stringify(o)), 1 != o.length)
        throw new Meteor.Error("location-error", "We cannot locate your address; please provide an accurate address");
      if (e.location = {}, e.location.lat = o[0].latitude, e.location.lng = o[0].longitude,
        e.address.city = o[0].city, e.address.state = o[0].stateCode, "CA" != e.address.state)
        throw new Meteor.Error("location-error", "Sorry we do not support city outside San Francisco Bay Area now");
      var s = c(e.location.lat, e.location.lng, 500);
      return e.location.latApprox = s.lat, e.location.lngApprox = s.lng,
        Logger.log("Geocode result: " +
          JSON.stringify(o)), l(e, this.userId)
    }
    throw new Meteor.Error("invalid-params", t.toString())
  },
  editMeal: function(e, t) {
    if (!this.userId)
      throw new Meteor.Error("not-authenticated", "User must log in to create an event");
    var n = Meals.findOne({ _id: e, "time.startAt": { $gt: new Date } });
    if (!n)
      throw new Meteor.Error("not-permitted", "Cannot edit a past event");
    var o = this.userId == n.hostId;
    if (!o)
      throw new Meteor.Error("not-authenticated",
        "User must be the host of the event to edit the event");
    t.pricePerGuest = n.pricePerGuest;
    var i = r(t);
    if (0 == i.length) {
      if (this.isSimulation)
        return;
      var s = new GeoCoder, a;
      try {
        a = s.geocode(t.address.full)
      } catch (u) {
        throw Logger.log("Geocoder error:" + JSON.stringify(u)),
          new Meteor.Error("location-error",
            "We cannot locate your address; please provide an accurate address")
      }
      if (Logger.log("Geocoder result:" + JSON.stringify(a)), 1 != a.length)
        throw new Meteor.Error("location-error",
          "We cannot locate your address; please provide an accurate address");
      if (t.location = {}, t.location.lat = a[0].latitude, t.location.lng = a[0].longitude,
        t.address.city = a[0].city, t.address.state = a[0].stateCode,
        t.time.zone = -7, "CA" != t.address.state)
        throw new Meteor.Error("location-error",
          "Sorry we do not support city outside San Francisco Bay Area now");
      var d = c(t.location.lat, t.location.lng, 500);
      return t.location.latApprox = d.lat, t.location.lngApprox = d.lng, K(t, e)
    }
    throw new Meteor.Error("invalid-params", i.toString())
  },
  newComment: function(e) {
    if (Logger.log("Creating new comment..."), !this.userId)
      throw new Meteor.Error("not-authenticated",
        "User must log in to write a comment");
    var t = o(e, this.userId);
    if (0 == t.length) return d(e, this.userId);
    throw new Meteor.Error("invalid-params", t.toString())
  },
  newReview: function(e) {
    if (Logger.log("Creating new review..."),
      !this.userId)
      throw new Meteor.Error("not-authenticated",
        "User must log in to write a review");
    var t = i(e, this.userId);
    if (0 == t.length)
      return w(e, this.userId);
    throw new Meteor.Error("invalid-params", t.toString())
  },
  editProfile: function(e) {
    if (Logger.log("Editing user's profile..."),
      !this.userId)
      throw new Meteor.Error("not-authenticated", "User must log in to write a review");
    var t = n(e);
    if (0 == t.length) {
      if (this.isSimulation) return;
      return L(e, this.userId), true
    }
    throw new Meteor.Error("invalid-params", t.toString())
  },
  updateProfilePicture: function(e) {
    D(e, this.userId)
  },
  acceptGuest: function(e) {
    var t = Orders.findOne({ _id: e }), r = Meals.findOne({ _id: t.mealId });
    if (!t)
      throw new Meteor.Error("internal-error", "Cannot find order");
    if (0 != t.status)
      throw new Meteor.Error("invalid-params", "User isn't in pending");
    if (!(r.autoAccept || this.userId && t.hostId == this.userId))
      throw new Meteor.Error("not-permitted", "User must be the host to accept guest");
    if (moment(t.createdAt).add(1, "day") < new Date)
      throw new Meteor.Error("not-permitted", "Cannot accept guests after the order expired");
    this.isSimulation || I(t)
  },
  declineGuest: function(e) {
    var t = Orders.findOne({ _id: e });
    if (!t)
      throw new Meteor.Error("internal-error", "Cannot find order");
    if (0 != t.status) throw new Meteor.Error("invalid-params", "User isn't in pending");
    if (!this.userId || t.hostId != this.userId) throw new Meteor.Error("not-permitted", "User must be the host to decline guest");
    if (moment(t.createdAt).add(1, "day") < new Date) throw new Meteor.Error("not-permitted", "Cannot accept guests after the order expired");
    this.isSimulation || S(t)
  },
  notifyGuestEventUpdated: function(e) {
    var t = Meals.findOne({ _id: e }), r = Orders.find({ mealId: e, status: { $gte: 0 } });
    r.forEach(function(e) {
      var r = Meteor.users.findOne({ _id: e.userId });
      nexmoSender.hostUpdatedEvent(r, t)
    })
  },
  cancelMeal: function(e, t) {
    var r = Meals.findOne({ _id: e });
    if (!r)
      throw new Meteor.Error("internal-error", "Cannot find meal");
    if (1 != r.status) throw new Meteor.Error("invalid-params", "Meal has alredy been cancelled");
    if (r.hostId != this.userId) throw new Meteor.Error("not-permitted", "User is not the host of event");
    if (t && t.length <= 0) throw new Meteor.Error("invalid-params", "You must provide a reason");
    Meals.update({ _id: e }, { $set: { status: -1 } }), k(e, t)
  },
  cancelReservation: function(e) {
    var t = Orders.findOne({ _id: e });
    if (!t) throw new Meteor.Error("internal-error", "Cannot find order");
    if (t.userId != this.userId) throw new Meteor.Error("not-permitted", "User must cancel reservation by himself");
    if (0 > t) throw new Meteor.Error("internal-error", "User's requests is not pending or confirmed/user doesn't join this event");
    this.isSimulation || O(t)
  },
  verifyPhone: function(e) {
    if (Logger.log("Verifying number..."), !this.userId)
      throw new Meteor.Error("not-authenticated", "User must log in to create an event");
    if (!/^[0-9]{10}$/.test(e)) throw new Meteor.Error("invalid-params", "Your number is invalid");
    this.isSimulation || R(this.userId, e)
  },
  verifyCode: function(e) {
    if (Logger.log("Verifying code"), Meteor.users.findOne({
      _id: this.userId
    }).phoneVerification && e == Meteor.users.findOne({ _id: this.userId }).phoneVerification.code)
      return Meteor.users.update({ _id: this.userId },
      { $set: { "phoneVerification.status": 1 } }), true;
    throw new Meteor.Error("invalid-code", "We cannot match the code")
  },
  getJumioUrl: function() {
    if (!this.isSimulation) {
      var e = N(this.userId);
      return e
    }
  },
  updateJumioScan: function(e, t) {
    Meteor.users.update({ _id: e },
    { $set: { "idVerification.scanRef": t, "idVerification.status": 1 } })
  },
  hideNotification: function(e) { return this.isSimulation ? void 0 : x(e, this.userId) },
  base64tos3: function(e) {
    AWS.config.update({
        accessKeyId:
          Meteor.settings.aws.accessKeyId,
        secretAccessKey: Meteor.settings.aws.secretAccessKey,
        region: Meteor.settings.aws.region
      }), buf = new Buffer(e.replace(/^data:image\/\w+;base64,/, ""), "base64"),
      str = +new Date + Math.floor(100 * Math.random() + 1) + ".jpg";
    var t = {
          Bucket: "plenry-meteor-development",
          Key: str,
          Body: buf,
          ACL: "public-read",
          ContentEncoding: "base64",
          ContentType: "image/jpeg"
        },
      r = new AWS.S3;
    r.putObject(t, function(e, t) {
      if (e) console.log(e);
      else {
        Logger.log(t),
          Logger.log("Successfully uploaded data to s3");
        var n = {
          Bucket: "plenry-meteor-development",
          Key: "/users/" + this.userId + "/" + Meteor.uuid() + ".jpg"
        };
        r.getSignedUrl("getObject", n, function(e, t) {
          console.log("the url of the image is " + t)
        })
      }
    })
  },
  getClientToken: function(e) {
    if (!this.isSimulation) {
      var t = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken),
        r = {};
      e && (r.clientId = e);
      var n = t(r);
      return n.clientToken
    }
  },
  createTransaction: function(e) {
    var t = Orders.findOne({
          userId: this.userId,
          mealId: e.mealId,
          status: { $gt: -2 }
        }),
      r = Meals.findOne({ _id: e.mealId });
    if (t && -4 != t.status)
      throw new Meteor.Error("invalid-params", "You have joined this meal already");
    if (r.hostId == this.userId)
      throw new Meteor.Error("invalid-params",
        "You cannot reserve your own meal");
    if (r.time.deadline < new Date)
      throw new Meteor.Error("invalid-params", "The deadline was passed");
    if (e.numberOfGuest > r.spotsLeft)
      throw new Meteor.Error("invalid-params", "This event cannot accommodate " +
        e.numberOfGuest + " guests");
    if (!this.isSimulation) {
      var n = (e.donationPerGuest + .15 * r.pricePerGuest) * e.numberOfGuest;
      if (0 == n) var o = true;
      if (o) {
        var t = {};
        t.userId = this.userId,
          t.mealId = e.mealId, t.mealEndAt = r.time.endAt || r.time.startAt,
          t.hostId = r.hostId, t.numberOfGuests = parseInt(e.numberOfGuest),
          t.donationPerGuest = e.donationPerGuest, t.total = n, t.status = 0,
          t.messageToHost = e.messageToHost, t.createdAt = new Date;
        var i = Orders.insert(t);
        Meals.update({ _id: e.mealId }, {
          $inc: {
            spotsLeft: -parseInt(e.numberOfGuest),
            numberOfGuests: parseInt(e.numberOfGuest)
          }
        }), r.autoAccept || Meteor.setTimeout(function() {
          CreateNotification(1, 0,
            t.mealId, t.hostId, t.userId), CreateNotification(1, 3, t.mealId, t.userId, t.hostId);
          var e = new Date;
          e.setDate(e.getDate() + 1),
            Queue.add({ command: "expireAnOrder('" + i + "');", execute_after: e });
          var n = Meteor.users.findOne({ _id: t.hostId }), o = Meteor.users.findOne({ _id: t.userId });
          nexmoSender.requestInForGuest(o, r), nexmoSender.requestInForHost(o, n, r, t.messageToHost),
            EmailSender.bookingRequestForGuest(o, r, n, t.numberOfGuests, t.total.toFixed(2)),
            EmailSender.bookingRequestForHost(o, r, n, t.numberOfGuests, t.total.toFixed(2),
              t.messageToHost)
        }, 3e3)
      } else {
        var s = Meteor.wrapAsync(gateway.transaction.sale, gateway.transaction);
        try {
          var a = s({ amount: n.toFixed(2).toString(), paymentMethodNonce: e.nonce });
          if (!a.success)
            throw new Error("Transaction Declined");
          var t =
          { payment: {}, braintree: {} };
          t.userId = this.userId, t.mealId = e.mealId, t.mealEndAt =
              r.time.endAt || r.time.startAt, t.hostId = r.hostId, t.numberOfGuests =
              parseInt(e.numberOfGuest), t.donationPerGuest = e.donationPerGuest, t.total = n,
            t.status = 0, t.messageToHost = e.messageToHost, t.payment.card =
              a.transaction.creditCard.last4, t.payment.cardType = a.transaction.creditCard.cardType,
            t.createdAt = new Date,
            t.braintree.transactionId = a.transaction.id, t.braintree.status = 0;
          var i = Orders.insert(t);
          return Meals.update({ _id: e.mealId },
          {
            $inc: {
              spotsLeft: -parseInt(e.numberOfGuest),
              numberOfGuests:
                parseInt(e.numberOfGuest)
            }
          }), r.autoAccept || Meteor.setTimeout(function() {
            CreateNotification(1, 0, t.mealId, t.hostId, t.userId),
              CreateNotification(1, 3, t.mealId, t.userId, t.hostId);
            var e = new Date;
            e.setDate(e.getDate() + 1), Queue.add(
            { command: "expireAnOrder('" + i + "');", execute_after: e });
            var n = Meteor.users.findOne({ _id: t.hostId }), o = Meteor.users.findOne({ _id: t.userId });
            nexmoSender.requestInForGuest(o, r), nexmoSender.requestInForHost(o, n, r, t.messageToHost),
              EmailSender.bookingRequestForGuest(o, r, n, t.numberOfGuests, t.total.toFixed(2)),
              EmailSender.bookingRequestForHost(o, r, n, t.numberOfGuests, t.total.toFixed(2),
                t.messageToHost)
          }, 3e3), a
        } catch (u) {
          throw Logger.log(JSON.stringify(u)),
            new Meteor.Error("transaction-error",
              "Sorry we cannot process the transaction; please check your card info")
        }
      }
    }
  },
  setPassword: function(e) {
    return U(e, this.userId)
  },
  addBank: function(e) {
    return F(e, this.userId)
  },
  verifyEduEmail: function(e) { return V(this.userId, e) },
  facebookQualifying: function() { return H(this.userId) },
  resendVerificationEmail: function() {
    return Accounts.sendVerificationEmail(this.userId)
  },
  changeEmail: function(e) {
    var t = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!t.test(e))
      throw new Meteor.Error("invalid-params", "The new email address is invalid");
    for (var r = Meteor.users.findOne(this.userId), n = r.emails, o = 0; o < n.length; o++) {
      var i = n[o].address;
      if (i == e) {
        var s = n.splice(o, 1)[0];
        return n.unshift(s), Meteor.users.update({ _id: this.userId }, { $set: { emails: n } }),
          void (s.verified || this.isSimulation || Accounts.sendVerificationEmail(this.userId,
            s.address))
      }
    }
    n.unshift({ address: e, verified: false });
    try {
      Meteor.users.update({ _id: this.userId },
      { $set: { emails: n } })
    } catch (a) {
      throw new Meteor.Error("internal-errors", "The email address is taken")
    }
    this.isSimulation || Accounts.sendVerificationEmail(this.userId, e)
  },

  updateFromFacebookProfile: function() {
    var e = Meteor.users.findOne({
      _id: this.userId
    });
    if (e.lastUpdate = new Date, delete e._id, e.services.facebook) {
      e.emails || (e.emails = []);
      for (var t = true, r = 0; r < e.emails.length; r++)
        e.emails[r].address == e.services.facebook.email && (t = false);
      t &&
          e.emails.push({ address: e.services.facebook.email, verified: true }),
        e.profile.thumbnail = {
          org: "http://graph.facebook.com/" +
            e.services.facebook.id + "/picture/?type=large"
        };
      var n = Meteor.wrapAsync(Cloudinary.uploader.upload);
      try {
        n(e.profile.thumbnail.org)
      } catch (o) {
        e.profile.thumbnail.cloudinaryPublicId = o.public_id
      }
      e.services.facebook.thumbnail = "http://graph.facebook.com/" +
          e.services.facebook.id + "/picture/?type=large",
        e.services.facebook.gender && (e.profile.gender = "male" == e.services.facebook.gender ?
          0 : "female" == e.services.facebook.gender ? 1 : 2);
      var i = HTTP.get("https://graph.facebook.com/me/friends?access_token=" +
        e.services.facebook.accessToken);
      e.services.facebook.numberOfFriends =
          i.data.summary.total_count, e.facebookQualification = {},
        e.facebookQualification.status = i.data.summary.total_count > 100 ? 1 : 0
    }
    Meteor.users.update({ _id: this.userId }, { $set: e })
  }
}); 

if (Meteor.isClient) {
  Meteor.startup(function() {
    SEO.config({
      title: "Plenry",
      meta: { description: "Socialize with Neighbors" },
      og: {
        description: "Socialize with Neighbors",
        image: "https://res.cloudinary.com/plenry/image/upload/c_scale,w_1920/v1432001726/iStock_000038412272_XXXLarge_gmgkyz.jpg",
        title: "Plenry",
        url: "https://plenry.com/"
      },
      ignore: {
        meta: ["fragment", "viewport"],
        link: ["stylesheet", "icon", "apple-touch-icon"]
      }
    });
    GoogleMaps.load({ libraries: "geometry,places,drawing" });
    $.cloudinary.config({ cloud_name: "plenry" });
  });
  Session.setDefault("counter", 0);
  Session.set("Sign up error", false);
  Session.set("Login error", false);
  Tracker.autorun(function() {
    if (Meteor.userId())
      try {
        UserStatus.startMonitor({
          threshold: 30000,
          interval: 1000,
          idleOnBlur: true
        });
      } catch (e) {
        console.log(e);
      }
  });
  ApplicationController = RouteController.extend({
    layoutTemplate: "AppLayout",
    onBeforeAction: function() {
      this.next();
    },
    fastRender: true
  });
  HomeController = ApplicationController.extend({
    show: function() {
      this.render(Meteor.user() ? "home" : "landing");
    }
  });
  UserController = ApplicationController.extend({
    show: function() {
      return this.redirect("me" == this.params.userId ||
        Meteor.userId() == this.params.userId ?
        "/users/me/dashboard" : "me" != this.params.userId ? "/users/" +
        this.params.userId + "/reviews/guest" : "/");
    }
  });
  MealController = ApplicationController.extend({
    "new": function() {
      Meteor.user() ? this.render("mealNew") : this.redirect("/");
    },
    edit: function() {
      var e = Meals.findOne({
            _id: this.params.mealId,
            "time.startAt":
            { $gt: new Date }
          }),
        t = e.hostId == Meteor.userId();
      e &&
        t ? (Session.set("editMealId", this.params.mealId),
          this.render("mealEdit", { data: e })) :
        this.redirect("/events/" + e._id);
    },
    show: function() {
      var e = Meals.findOne({ _id: this.params.mealId });
      return e ? (Meteor.subscribe("selfOrders"),
          this.render("mealShow", { data: e })) :
        this.redirect("/")
    },
    reserve: function() {
      var e = Meals.findOne({ _id: this.params.mealId });
      return e ? (Session.set("Donation", e.pricePerGuest),
        this.render("mealReserve", { data: e })) : this.redirect("/")
    },
    guests: function() {
      var e = Meals.findOne({ _id: this.params.mealId });
      return this.render("guestList", { data: e })
    }
  });
  DashboardController = ApplicationController.extend({
    layoutTemplate: "dashboardLayout",
    main: function() {
      this.render("dashboardDashboard")
    },
    inbox: function() {
      this.render("inboxPage")
    },
    listing: function() {
      this.render("dashboardListings")
    },
    reservations: function() {
      this.render("dashboardReservations")
    },
    profile: function() {
      this.render("dashboardProfile")
    },
    settings: function() { this.render("dashboardSettings") },
    search: function() { this.render("Search") }
  });
  DashboardProfileController = ApplicationController.extend({
    layoutTemplate: "DashboardProfileLayout",
    trustAndVerification: function() {
      this.render("TrustAndVerification")
    },
    editProfile: function() { this.render("EditProfile") }
  });
  SearchController = ApplicationController.extend({
    search: function() {
      return this.render("Search")
    }
  });
  StaticPageController = ApplicationController.extend({
    privacy: function() {
      return this.render("termsAndPrivacy")
    },
    aboutUs: function() {
      return this.render("aboutUs")
    },
    contactUs: function() {
      return this.render("contactUs")
    },
    help: function() { return this.render("help") }
  });
  OrderController = ApplicationController.extend({
    show: function() {
      var e = Orders.findOne({ _id: this.params.orderId });
      return this.render("bookingDetails", { data: e })
    },
    showByMealId: function() {
      var e = Orders.findOne({ mealId: this.params.mealId });
      return this.render("bookingDetails", { data: e })
    }
  });
  GuestController = ApplicationController.extend({
    show: function() {
      return this.render("guestList")
    }
  });

  ReviewsController = ApplicationController.extend({
    postReviewForHost: function() {
      var e = Meals.findOne({ _id: this.params.mealId });
      return this.render("reviewForHost", { data: e })
    },
    postReviewForGuest: function() {
      var e = Meals.findOne({ _id: this.params.mealId });
      return this.render("reviewForGuest", { data: e })
    }
  });

  Template.dishPhotoUpload.events({
    "click #ss": function() {
      var e = { mealId: "y4bDwSsNos88vpLHb" },
        t = new Slingshot.Upload("dishPhotoUpload", e);
      t.send(document.getElementById("dish-photo").files[0],
        function(e, t) {})
    }
  });

  Template.domainValidationCode.rendered = function() {
    $('link[rel="stylesheet"]').remove(), $("head").remove()
  };

  Template.help.rendered = function() {
    this.$("#help-menu").sticky({ context: ".help-content", offset: 20 }),
      $(document).scroll(function(e) {})
  };

  Template.help.events({
    "click #help-menu .item": function(e) {
      var t = $(e.target).index() + 1,
        r = "help-content-" + t;
      $("html, body").animate({ scrollTop: $("#" + r).offset().top }, 500)
    }
  });

  Template.TrustAndVerification.events({
    "click #edu-verify": function() {
      $("#edu-verify-modal").modal("show"),
        $("#submit-edu-email").click(function() {
          var e = $("input[name='edu-email']").val();
          Meteor.call("verifyEduEmail", e)
        })
    },
    "click #facebook-qualify": function() {
      var e = Meteor.user();
      e.services.facebook ||
        Meteor.linkWithFacebook({
          requestPermissions: [
            "email", "user_friends", "user_birthday",
            "user_education_history",
            "user_work_history", "user_interests"
          ]
        }, function(e) {
          if (e) throw new Meteor.Error("Facebook connect failed");
          Meteor.call("updateFromFacebookProfile")
        }), Meteor.call("facebookQualifying", function(e, t) {
        t ||
          $("#facebookQualificationSegment").append("<p class='ui red text'>Sorry, you are not qualified.</p>")
      })
    },
    "click #facebook-connect-button": function() {
      Meteor.linkWithFacebook({
        requestPermissions: [
          "email", "user_friends",
          "user_birthday", "user_education_history", "user_work_history",
          "user_interests"
        ]
      }, function(e) {
        if (e) throw new Meteor.Error("Facebook connect failed");
        Meteor.call("updateFromFacebookProfile")
      })
    },
    "click #google-connect-button": function() {
      Meteor.linkWithGoogle({}, function(e) {
        if (e) throw new Meteor.Error("Facebook connect failed")
      })
    },
    "click #resend-email-button": function() {
      Meteor.call("resendVerificationEmail"),
        $("#resend-email-button").addClass("green"),
        $("#resend-email-button").html("<i class='ui checkmark icon'></i> Email Sent")
    },
    "click #change-email-button": function() {
      $("#change-email-modal").modal("show")
    }
  });

  Template.TrustAndVerification.helpers({
    currentEmailAddress: function() {
      return Meteor.user().emails[0].address
    }
  });

  Template.input.events = {
    "click #send-message-button": function() {
      if (Meteor.user()) {
        var e = $("#message").val();
        "" !== e.value && 0 != e.length &&
        (Meteor.call("sendIndividualMessage", Session.get("toUserId"), e),
          $("#message").val(""))
      } else alert("login to chat")
    }
  };

  Template.inboxLeftColumn.rendered = function() {
    $(".ui.dropdown").dropdown()
  };

  Template.inboxLeftColumn.helpers({
    selected: function() {
      return Session.get("toUserId") == this._id
    },
    myContactsForSearch: function() {
      var e = Meteor.user().contacts;
      return Meteor.users.find({ _id: { $in: e } }, {
        field: { "profile.firstName": 1 },
        sort: { "profile.firstName": 1 }
      })
    },
    myContacts: function() {
      var e = Meteor.user().contacts;
      return e.forEach(function(e) {
          var t = Inbox.find({
            $or: [
              { fromUserId: e },
              { toUserId: { $in: [e] } }
            ]
          }, { limit: 1, sort: { createdAt: -1 } });
          t && t.forEach(function(t) {
            Meteor.users._collection.update({ _id: e },
            { $set: { msgDate: t.createdAt } })
          })
        }),
        Meteor.users.find({ _id: { $in: e } },
        {
          field: { "profile.firstName": 1 },
          sort: { "status.online": -1, msgDate: -1 }
        })
    }
  });

  Template.inboxLeftColumn.events({
    "click .user": function() {
      Session.set("toUserId", this._id)
    },
    "click #user-db-update-button": function() {
      Meteor.call("updateUserDbForInbox")
    }
  });

  Template.inboxPage.helpers({
    hasSelectedThread: function() {
      return Session.get("toUserId")
    },
    fromUserName: function() {
      return Meteor.users.findOne({ _id: Session.get("toUserId") }).profile.firstName
    },
    userStatus: function() {
      var e = Meteor.users.findOne({ _id: Session.get("toUserId") });
      if (e.status.online) return e.status.idle ? "(idle)" : "(online)";
      var t = Meteor.users.findOne({ _id: Session.get("toUserId") }).status.lastLogin.date;
      return t ? "(last logged in on " + moment(t).format("M/D, h:mma") + ")" : ""
    }
  });

  Template.inboxRightColumn.helpers({
    userName: function() {
      return Meteor.users.findOne({ _id: Session.get("toUserId") }).profile.firstName
    },
    cloudinaryPublicId: function() {
      return Meteor.users.findOne(
      { _id: Session.get("toUserId") }).profile.thumbnail.cloudinaryPublicId
    },
    eventsMet: function() {
      return Meteor.call("getCommonEvents", Session.get("toUserId"),
        function(e, t) {
          if (e) throw new Error("Cannot get common events");
          Session.set("commonEvents", t)
        }), Meals.find({ _id: { $in: Session.get("commonEvents") } },
      { sort: { "time.startAt": -1 }, limit: 3 })
    }
  });

  Template.inboxEventsMet.helpers({
    timeAgo: function() {
      return moment(this.time.startAt).fromNow()
    }
  });

  Template.loggedOutMenu.OnRendered(function() {
    this.$(".login.modal").modal(),
      this.$(".signUp.modal").modal(), $(".sign-up-btn").click(function() {
        Logger.log("Signing in user...");
        var e = $("#sign-up-email").val();
        Logger.log("Signing up with email: " + e);
        var t = $("#sign-up-first-name").val();
        Logger.log("Signing up with first name: " + t);
        var r = $("#sign-up-last-name").val();
        Logger.log("Signing up with last name: " + r);
        var n = $("#sign-up-password").val();
        Logger.log("Signing up with password: " + n);
        var o = $("#sign-up-confirm-password").val();
        Logger.log("Signing up with confirm password: " + o),
          a(e, n, o, t, r, function(e) {
            if (e) {
              Logger.log(e);
              for (var t = e.reason.split(","), r = [], n = 0; n < t.length; n++) r.push({ reason: t[n] });
              Session.set("Sign up errors", r), Session.set("Sign up error", true)
            } else Logger.log("Sign up succeeds"), Session.set("Sign up error", false), $("#sign-up-email").val(""), $("#sign-up-password").val(""), $("#sign-up-first-name").val(""), $("#sign-up-last-name").val(""), $("#sign-up-confirm-password").val(""), $(".signUp.modal").modal("hide")
          })
      }), $(".login-btn").click(function() {
        Logger.log("Logging in user...");
        var e = $("#login-email").val(), t = $("#login-password").val();
        u(e, t, function(e) {
          e ? (Logger.log(e), Session.set("Login errors",
            [{ reason: "Incorrect email/password" }]),
            Session.set("Login error", true)) :
          (Logger.log("Log in succeeds"),
            Session.set("Login error", false), $("#login-email").val(""),
            $("#login-password").val(""), $(".login.modal").modal("hide"))
        })
      }), $(".ui.facebook.login.button").click(function() {
        Logger.log("Logging in using Facebook..."),
          Meteor.loginWithFacebook({
            requestPermissions:
            [
              "email", "user_friends", "user_birthday", "user_education_history",
              "user_work_history", "user_interests"
            ]
          }, function(e) {
            if ($(".login.modal").modal("hide"),
              $(".signUp.modal").modal("hide"), e) throw e
          })
      }), $(".ui.google.login.button").click(function() {
        Logger.log("Loggin in using Google..."),
          Meteor.loginWithGoogle({}, function(e) {
            if ($(".login.modal").modal("hide"),
              $(".signUp.modal").modal("hide"), e) throw e
          })
      }), $(".forgot-password-button").click(function() {
        Logger.log("Forgot password"),
          $(".forgot-password").modal("show"),
          $("#forgot-password-send").click(function() {
            var e = $("#forgot-password-email").val();
            e.length > 0 &&
            (Accounts.forgotPassword({ email: e }), $(".forgot-password").modal("hide"))
          })
      })
  });

  Template.signUp.helpers({
    hasError: function() { return Session.get("Sign up error") },
    errors: function() { return Session.get("Sign up errors") }
  });

  Template.login.helpers({
    hasError: function() {
      return Session.get("Login error")
    },
    errors: function() { return Session.get("Login errors") }
  });

  Template.listingsList.OnRendered(function() {
    $(".dashboard-listings-content .ui.dropdown").dropdown()
  });

  Template.mealReserve.OnRendered(function() {
    this.$(".has-popup").popup(), Session.set("Reserve error", false),
      Session.set("numberOfGuest", 1),
      this.$(".ui.dropdown").dropdown(), Meteor.call("getClientToken",
        function(e, t) {
          return e ? void console.log("There was an error", e) :
            void braintree.setup(t, "dropin", {
              container: "dropin",
              paymentMethodNonceReceived: function(e, t) {
                var r = {};
                r.mealId = Router.current().params.mealId,
                  r.numberOfGuest = $("#request-number").val(),
                  r.donationPerGuest = Session.get("Donation"),
                  r.messageToHost = $("#hello-to-host").val(),
                  r.nonce = t, $(".pusher").dimmer("show"),
                  Meteor.call("createTransaction", r, function(e, t) {
                    if (e) {
                      Logger.log(JSON.stringify(e));
                      for (var n = e.reason.split(","),
                        o = [],
                        i = 0; i < n.length; i++) {
                        Logger.log(JSON.stringify(e));
                        for (var n = e.reason.split(","),
                          o = [],
                          i = 0; i < n.length; i++)
                          o.push({ reason: n[i] });
                        Session.set("Reserve errors", o),
                          Session.set("Reserve error", true),
                          $(".pusher").dimmer("hide")
                      }
                    } else
                      $(".pusher").dimmer("hide"),
                        Meals.findOne({ _id: r.mealId }).autoAccept ?
                          (Meteor.call("acceptGuest",
                            Orders.findOne({
                              userId: Meteor.userId(),
                              mealId: r.mealId,
                              status: 0
                            })._id), Router.go("/events/" + r.mealId)) :
                          Router.go("/users/me/reservations")
                  })
              }
            })
        })
  });

  Template.mealReserve.events({
    "click #join-event": function() {
      $(".pusher").dimmer("show");
      var e = {};
      e.messageToHost = $("#hello-to-host").val(),
        e.mealId = Router.current().params.mealId,
        e.numberOfGuest = $("#request-number").val(),
        e.donationPerGuest = 0, Meteor.call("createTransaction", e,
          function(t, r) {
            if (t) {
              Logger.log(JSON.stringify(t));
              for (var n = t.reason.split(","),
                o = [],
                i = 0; i < n.length; i++) o.push({ reason: n[i] });
              Session.set("Reserve errors", o),
                Session.set("Reserve error", true),
                $(".pusher").dimmer("hide")
            } else
              $(".pusher").dimmer("hide"),
                Meals.findOne({ _id: e.mealId }).autoAccept ?
                  (Meteor.call("acceptGuest", Orders.findOne({
                    userId: Meteor.userId(),
                    mealId: e.mealId,
                    status: 0
                  })._id), Router.go("/events/" + e.mealId)) :
                  Router.go("/users/me/reservations")
          })
    }
  });

  Template.mealReserve.helpers({
    mealDate: function() {
      return moment(this.time.startAt).utcOffset(this.time.zone).
        format("MMM DD, YYYY ddd")
    },
    mealStartTime: function() {
      return moment(this.time.startAt).
        utcOffset(this.time.zone).format("hh:mmA")
    },
    mealEndTime: function() {
      return moment(this.time.endAt).
        utcOffset(this.time.zone).format("hh:mmA")
    },
    donationWithService: function() {
      return (Session.get("Donation") + .15 * this.pricePerGuest).toFixed(2)
    },
    totalService: function() {
      return (.15 * this.pricePerGuest * Session.get("numberOfGuest")).toFixed(2)
    },
    donation: function() {
      return Session.get("Donation").toFixed(2)
    },
    numberOfGuest: function() {
      return Session.get("numberOfGuest")
    },
    requestNumber: function() {
      return parseInt(Session.get("numberOfGuest"))
    },
    totalDonation: function() {
      return (Session.get("numberOfGuest") * (Session.get("Donation") +
        .15 * this.pricePerGuest)).toFixed(2)
    },
    service: function() {
      return (.15 * this.pricePerGuest).toFixed(2)
    },
    hasError: function() { return Session.get("Reserve error") },
    errors: function() { return Session.get("Reserve errors") },
    noCharge: function() {
      return Session.get("numberOfGuest") * (Session.get("Donation") +
        .15 * this.pricePerGuest) == 0
    },
    hasEndTime: function() {
      return this.time.endAt
    },
    hostCloudinaryPublicId: function() {
      var e = Meteor.users.findOne({ _id: this.hostId });
      return e.profile.thumbnail.cloudinaryPublicId
    },
    reserveOptions: function() {
      for (var e = [], t = 1; t <= this.spotsLeft; t++)
        e.push(1 == t ? { value: 1, text: "Only You" } :
        { value: t, text: "You + " + (t - 1) + " Guest(s)" });
      return e
    },
    hostName: function() {
      var e = Meteor.users.findOne({ _id: this.hostId });
      return e.profile.firstName
    },
    questionForGuest: function() {
      return this.questionForGuest
    }
  });

  Template.mealReserve.events({
    "click #add-donation": function() {
      Session.set("Donation",
        Session.get("Donation") + 1)
    },
    "click #minus-donation": function() {
      Session.get("Donation") > 0 &&
        !this.autoAccept && Session.set("Donation", Session.get("Donation") - 1)
    },
    "change #request-number": function(e) {
      Session.set("numberOfGuest", $("#request-number").val())
    }
  });

  Template.dashboardListings.OnRendered(function() {
    Session.setDefault("Listings section", 1),
      Router.current().params.query.section &&
        Session.set("Listings section", parseInt(Router.current().params.query.section))
  });

  Template.dashboardListings.helpers({
    isSection: function(e) {
      return e == Session.get("Listings section")
    }
  });

  Template.dashboardListings.events({
    "click .dashboard-listings-link": function(e) {
      var t = 0;
      t = 0 == $(e.target).index() ? 1 : 4,
        Session.set("Listings section", t)
    },
    "click .host-event-btn": function(e) {
      Logger.log("Host an event"),
        p(Meteor.user()) && m(Meteor.user()) ? (Router.go("mealNew"),
          Session.set("New meal section one valid", false),
          Session.set("New meal section two valid", false),
          Session.set("New meal section three valid", false)) :
        (Session.set("Verification warning", true),
          Session.set("Verification warning header",
            "Your must verify your email and phone before hosting an Event"),
          Router.go("trustAndVerification"))
    }
  });

  Template.upcomingListing.events({
    "click .past-listing-link": function() {
      Session.set("Listings section", 2)
    },
    "click .cancelled-listing-link": function() {
      Session.set("Listings section", 3)
    }
  });

  Template.cancelledListing.helpers({
    listings: function() {
      return Meals.find({ hostId: Meteor.userId(), status: -1 })
    }
  });

  Template.cancelledListingsRow.helpers({
    mealDate: function() {
      return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D YYYY")
    },
    mealTime: function() {
      return moment(this.time.startAt).utcOffset(this.time.zone).format("ddd @ hh:mma")
    }
  });

  Template.cancelledListing.events({
    "click .upcoming-listing-link": function() {
      Session.set("Listings section", 1)
    },
    "click .past-listing-link": function() {
      Session.set("Listings section", 2)
    }
  });

  Template.contactUs.rendered = function() {
    Session.set("Contact us success", false),
      Session.set("Contact us fail", false)
  };

  Template.contactUs.events({
    "click #contact-us-submit": function() {
      var e = $("#contact-us-name").val(),
        t = $("#contact-us-email").val(),
        r = $("#contact-us-message").val();
      e.length > 0 && t.length > 0 && r.length > 0 ?
      (Meteor.call("newContactUsMessage", e, t, r),
        Session.set("Contact us success", true),
        Session.set("Contact us fail", false),
        $("#contact-us-name").val(""), $("#contact-us-email").val(""),
        $("#contact-us-message").val("")) :
      (Session.set("Contact us success", false),
        Session.set("Contact us fail", true))
    }
  });

  Template.contactUs.helpers({
    success: function() {
      return Session.get("Contact us success")
    },
    error: function() {
      return Session.get("Contact us fail")
    }
  });

  Template.phoneVerification.created = function() {
    var e = this;
    e.newVerify = new ReactiveVar(true),
      e.hasError = new ReactiveVar(false), e.errors = new ReactiveVar
  };

  Template.phoneVerification.helpers({
    hasError: function() {
      return Template.instance().hasError.get()
    },
    newVerify: function() {
      return Template.instance().newVerify.get()
    },
    errors: function() {
      return Template.instance().errors.get()
    }
  });

  Template.phoneVerification.events({
    "click .send-verify-code": function() {
      var e = Template.instance(),
        t = $("#phone-verify-number").val().replace(/-/g, "").replace(/\//g, "");
      Meteor.call("verifyPhone", t, function(t, r) {
        if (t) {
          e.hasError.set(true);
          for (var n = t.reason.split(","), o = [], i = 0; i < n.length; i++)
            o.push({ reason: n[i] });
          e.errors.set(o)
        } else e.hasError.set(false), e.newVerify.set(false)
      })
    },
    "click .close.icon": function() {
      var e = Template.instance();
      e.hasError.set(false), e.newVerify.set(true)
    },
    "click .verify-code-btn": function() {
      var e = Template.instance(), t = $("#verify-code").val();
      Meteor.call("verifyCode", t, function(t, r) {
        if (t) {
          e.hasError.set(true);
          for (var n = t.reason.split(","), o = [], i = 0; i < n.length; i++)
            o.push({ reason: n[i] });
          e.errors.set(o)
        } else
          e.hasError.set(false),
            e.newVerify.set(true),
            Session.get("Verification redirect") &&
            (Router.go("reserve", { mealId: Session.get("Verification redirect")[0] },
              { query: "number=" + Session.get("Verification redirect")[1] }),
              Session.set("Verification redirect", null)),
            $("#phone-verification-modal").modal("hide")
      })
    }
  });

  Template.dashboardReservations.rendered = function() {
    Session.set("Reservation section", 1),
      Router.current().params.query.section && Session.set("Reservation section",
        parseInt(Router.current().params.query.section))
  };

  Template.dashboardReservations.helpers({
    isSection: function(e) {
      return e == Session.get("Reservation section")
    }
  });

  Template.dashboardReservations.events({
    "click .dashboard-reservation-link": function(e) {
      Session.set("Reservation section", $(e.target).index() + 1)
    }
  });

  Template.dashboardProfile.rendered = function() {
    Router.current().params.query.section ?
        Session.set("Profile section",
          parseInt(Router.current().params.query.section)) :
        (Session.set("Verification warning", false),
          Session.set("Profile section", 1)),
      window.scrollTo(0, 0)
  };

  Template.dashboardProfile.helpers({
    isSection: function(e) {
      return e == Session.get("Profile section")
    }
  });

  Template.dashboardProfile.events({
    "click .dashboard-profile-link": function(e) {
      Session.set("Profile section", $(e.target).index() + 1)
    }
  });

  Template.EditProfile.rendered = function() {
    Session.set("Edit profile success", false);
    var e = Template.instance();
    Template.instance().autorun(function() {
      Meteor.user() && e.$(".ui.dropdown").dropdown()
    }), $("#profile-photo-file-btn").click(function() {
      $("#profile-photo-file").click()
    }), this.$(".has-popup").popup()
  };

  Template.EditProfile.events({
    "click #update-profile-button": function() {
      var e = { profile: {}, emergency: {} };
      return Logger.log("First Name: " + $("input[name='first-name']").val()),
        e.profile.firstName = $("input[name='first-name']").val(),
        Logger.log("Last Name: " + $("input[name='last-name']").val()),
        e.profile.lastName = $("input[name='last-name']").val(),
        Logger.log("Profile Picture: " + $("#profile-photo-url").val()),
        $("#profile-photo-url").val().length > 0 &&
        (e.profile.thumbnail = { org: $("#profile-photo-url").val() }),
        Logger.log("Gender: " + $("input[name='gender']").val()),
        $("input[name='gender']").val().length > 0 &&
        (e.profile.gender = parseInt($("input[name='gender']").val())),
        $("input[name='year']").val().length > 0 &&
          $("input[name='month']").val().length > 0 &&
          $("input[name='day']").val().length > 0 ?
          (Logger.log("Birthday: " +
              new Date(moment(new Date($("input[name='year']").val() + "-" +
                $("input[name='month']").val() + "-" +
                $("input[name='day']").val())).zone(0).format("l"))),
            e.profile.birthday = new Date(moment(new Date($("input[name='year']").val() +
              "-" + $("input[name='month']").val() + "-" +
              $("input[name='day']").val())).zone(0).format("l"))) :
          Logger.log("Birthday: "), Logger.log("City: " +
          $("input[name='profile-city']").val()),
        e.profile.city = $("input[name='profile-city']").val(),
        Logger.log("Description: " + $("#user-description").val()),
        e.profile.description = $("#user-description").val(),
        Logger.log("School: " + $("input[name='school']").val()),
        e.profile.school = $("input[name='school']").val(),
        Logger.log("Work: " + $("input[name='work']").val()),
        e.profile.work = $("input[name='work']").val(),
        Logger.log("Language: " + $("input[name='language']").val()),
        e.profile.language = $("input[name='language']").val(),
        Logger.log("Emergency Contact's Name: " +
          $("input[name='emergency-contact-name']").val()),
        e.emergency.name = $("input[name='emergency-contact-name']").val(),
        Logger.log("Emergency Contact's Phone: " +
          $("input[name='emergency-contact-phone']").val()),
        e.emergency.phone = $("input[name='emergency-contact-phone']").val(),
        Logger.log("Emergency Contact's Email: " +
          $("input[name='emergency-contact-email']").val()),
        e.emergency.email = $("input[name='emergency-contact-email']").val(),
        Logger.log("Emergency Contact's Relationship: " +
          $("input[name='emergency-contact-relationship']").val()),
        e.emergency.relationship = $("input[name='emergency-contact-relationship']").val(),
        Meteor.call("editProfile", e, function(e) {
          e && Logger.log(JSON.stringify(e)),
            Session.set("Edit profile success", true),
            $("html, body").animate({ scrollTop: 0 }, 500)
        })
    },
    "keyup input": function() {
      Session.set("Edit profile success", false)
    },
    "change input[type='file']": function(e) {
      Logger.log("Filetype: " + e.target.files);
      var t = new Slingshot.Upload("profilePhotoUpload");
      t.send(e.target.files[0], function(e, t) {
        Meteor.call("updateProfilePicture", t)
      })
    }
  });

  Template.EditProfile.helpers({
    currentUserEmail: function() {
      return Meteor.user().emails[0].address
    },
    currentUserBirthdayMonth: function() {
      return Meteor.user().profile.birthday ?
        moment(Meteor.user().profile.birthday).format("MM") : void 0
    },
    currentUserBirthdayDay: function() {
      return Meteor.user().profile.birthday ?
        moment(Meteor.user().profile.birthday).format("DD") : void 0
    },
    currentUserBirthdayYear: function() {
      return Meteor.user().profile.birthday ?
        moment(Meteor.user().profile.birthday).format("YYYY") : void 0
    },
    saved: function() {
      return Session.get("Edit profile success")
    }
  });

  Template.ReviewsAboutYou.events({
    "click .reviews-by-you-link": function() {
      Session.set("Profile section", 4)
    }
  });

  Template.ReviewsByYou.events({
    "click .reviews-about-you-link": function() {
      Session.set("Profile section", 3)
    }
  });

  Template.dashboardSettings.rendered = function() {
    Router.current().params.query.section ? Session.set("Dashboard section",
        parseInt(Router.current().params.query.section)) :
      Session.set("Dashboard section", 1)
  };

  Template.dashboardSettings.helpers({
    isSection: function(e) {
      return e == Session.get("Dashboard section")
    }
  });

  Template.dashboardSettings.events({
    "click .dashboard-settings-link": function(e) {
      Session.set("Dashboard section", $(e.target).index() + 1)
    }
  });

  Template.stars.helpers({
    getStar: function(e) {
      return this.rating < e - 1 + .25 ? "yellow empty star icon" : this.rating < e - 1 + .75 ? "yellow half empty star icon" : "yellow star icon"
    }
  });

  Template.showUserIcons.helpers({
    spots: function() {
      var e = [];
      this.maxParty > 30 && (this.maxParty = 30, this.spotsLeft = parseInt(this.spotsLeft / this.maxParty * 30));
      for (var t = 0; t < this.maxParty - this.spotsLeft; t++) e.push({ taken: true });
      for (var t = 0; t < this.spotsLeft; t++) e.push({ taken: false });
      return e
    }
  });

  Template.birthdayYearOptions.helpers({
    years: function() {
      for (var e = (new Date).getFullYear(), t = [], r = e; r > e - 90; r--) t.push({ year: r });
      return t
    }
  });

  Template.cardYearOptions.helpers({
    years: function() {
      for (var e = (new Date).getFullYear(), t = [], r = e; e + 21 > r; r++) t.push({ year: r });
      return t
    }
  });

  Template.TrustAndVerification.rendered = function() {
    $("#phone-verification-modal").modal({
      closable: false,
      onShow: function() {
        $("#why-verify").accordion(), $("#why-verify").accordion("open", 0), $("#why-verify").accordion("close", 0)
      }
    }), $("#phone-verification").click(function() {
      $("#phone-verification-modal").modal("show")
    })
  };

  Template.TrustAndVerification.helpers({
    fbFriendsVerified: function() {
      return Template.instance().FBCollection.find().fetch();
      return console.log("Helpers" + MeteorFBCollection.user().services.facebook.id),
        fbFriendsVerified(Meteor.user().services.facebook.id,
          Meteor.user().services.facebook.name)
    },
    emailVerified:
      function() {
        for (var e = 0; e < Meteor.user().emails.length; e++)
          if (Meteor.user().emails[e].verified) return true
      },
    phoneVerified: function() {
      return 1 == Meteor.user().phoneVerification.status
    },
    idVerified: function() {
      return Meteor.user().idVerification && 1 == Meteor.user().idVerification.status
    },
    eduVerified: function() {
      for (var e = 0; e < Meteor.user().emails.length; e++)
        if (Meteor.user().emails[e].verified &&
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.
          test(Meteor.user().emails[e].address)) return true;
      return false
    },
    facebookQualified: function() {
      var e = Meteor.user();
      return e.facebookQualification && 1 == e.facebookQualification.status ? true : false
    },
    hasWarning: function() {
      return Session.get("Verification warning")
    },
    warningHeader: function() {
      return Session.get("Verification warning header")
    },
    warningMessage: function() {
      Session.get("Verification warning message")
    }
  });

  Template.idVerification.created = function() {
    var e = this;
    e.token = new ReactiveVar,
      e.hasError = new ReactiveVar(false), Meteor.call("getJumioUrl",
        function(e, t) {
          window.location.replace(t)
        })
  };

  Template.reviewSection.created = function() {
    Meteor.subscribe("oneUser", Template.instance().data.userId),
      Meteor.subscribe("oneMeal", Template.instance().data.mealId)
  };

  Template.reviewSection.helpers({
    userName: function() {
      var e = Meteor.users.findOne({ _id: this.userId });
      return e.profile.firstName
    },
    timeAgo: function() {
      return moment(this.createdAt).fromNow()
    },
    mealTitle: function() {
      var e = Meals.findOne({ _id: this.mealId });
      return e.title
    },
    mealDate: function() {
      var e = Meals.findOne({ _id: this.mealId });
      return moment(e.time.startAt).utcOffset(e.time.zone).format("MMM YY")
    },
    userCloudinaryPublicId: function() {
      var e = Meteor.users.findOne({ _id: this.userId });
      return e.profile.thumbnail.cloudinaryPublicId
    }
  });

  Template.pastEventsOption.helpers({
    mealTitle: function() {
      return this.title
    },
    mealId: function() { return this._id }
  });

  Template.dashboardDashboard.helpers({
    notifications: function() {
      var e = Notifications.find({ toUserId: Meteor.userId() }, { sort: { createdAt: -1 } });
      return e
    },
    emailVerified: function() {
      for (var e = 0; e < Meteor.user().emails.length; e++)
        if (Meteor.user().emails[e].verified) return true
    },
    phoneVerified: function() {
      return Meteor.user().phoneVerification && 1 == Meteor.user().phoneVerification.status
    },
    facebookLinked: function() {
      return Meteor.user().services.facebook
    },
    facebookNumberOfFriends: function() {
      return Meteor.user().services.facebook ?
        Meteor.user().services.facebook.numberOfFriends : false
    },
    googleLinked: function() {
      return Meteor.user().services.google
    },
    idVerified: function() {
      return Meteor.user().idVerification && 1 == Meteor.user().idVerification.status
    },
    eduVerified: function() {
      for (var e = 0; e < Meteor.user().emails.length; e++)
        if (Meteor.user().emails[e].verified &&
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/
          .test(Meteor.user().emails[e].address)) return true;
      return false
    },
    reviewed: function() {},
    hasSchool: function() {
      return Meteor.user().profile.school && Meteor.user().profile.school.length > 0
    },
    hasWork: function() {
      return Meteor.user().profile.work && Meteor.user().profile.work.length > 0
    },
    hasLanguage: function() {
      return Meteor.user().profile.language && Meteor.user().profile.language.length > 0
    },
    hasCity: function() {
      return Meteor.user().profile.city && Meteor.user().profile.city.length > 0
    },
    joinDate: function() {
      return moment(Meteor.user().createdAt).format("MMM, YYYY")
    },
    hasDescription: function() {
      return Meteor.user().profile.description &&
        Meteor.user().profile.description.length > 0
    },
    hasNotifications: function() {
      return Notifications.find({ toUserId: Meteor.userId() }).count() > 0
    }
  });

  Template.reviewCard.created = function() {
      var e;
      e = this.data.userToHost ? this.data.userId :
          this.data.hostId, Meteor.subscribe("oneUser", e),
        Meteor.subscribe("oneMeal", this.data.mealId)
    },
    Template.reviewCard.helpers({
      userCloudinaryPublicId: function() {
        var e;
        e = this.userToHost ? this.userId :
          this.hostId;
        var t = Meteor.users.findOne({ _id: e });
        return t.profile.thumbnail.cloudinaryPublicId
      },
      userName: function() {
        var e;
        e = this.userToHost ? this.userId : this.hostId;
        var t = Meteor.users.findOne({ _id: e });
        return t.profile.firstName
      },
      mealTitle: function() {
        var e = Meals.findOne({ _id: this.mealId });
        return e.title
      },
      mealDate: function() {
        var e = Meals.findOne({ _id: this.mealId });
        return moment(e.time.startAt).utcOffset(e.time.zone).format("MMM YY")
      },
      reviewContent: function() {
        return this.content
      }
    });

  Template.upcomingListing.helpers({
    listings: function() {
      return Meals.find({
        hostId: Meteor.userId(),
        "time.startAt": { $gt: new Date },
        status: 1
      }, { sort: { "time.startAt": 1 } })
    }
  });

  var y = {
    date: function () {
      return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D YYYY")
    }, time: function () {
      return moment(this.time.startAt).utcOffset(this.time.zone).format("ddd @ hh:mmA")
    }, active: function () { return 1 == this.status }
  };

  Template.listingsRow.rendered = function() {
    var e = this.data._id;
    $("#cancel-event-" + e).modal(),
      $("#cancel-event-confirm-" + e).click(function() {
        var t = $("#cancel-event-" + e).find(".cancel-reason").val();
        return Logger.log("Cancel reason: " + t), t.length > 0 ?
        (Meteor.call("cancelMeal", e, t), true) :
        ($("#cancel-event-" + e).find(".required.field").addClass("error"), false)
      })
  };

  Template.listingsRow.helpers(y),
    Template.listingsRow.events({
      "click .cancel-event-button": function(e) {
        var t = Template.instance().data._id;
        $("#cancel-event-" + t).modal("show")
      }
    });

  Template.PhotosAndVideo.helpers({
    photo: function() {
      return Session.get("photo")
    }
  });

  Template.PhotosAndVideo.events({
    "click #photo-taking-button": function() {
      var e = { width: 800, height: 600 };
      MeteorCamera.getPicture(e, function(e, t) {
        Session.set("photo", t), t && Meteor.call("base64tos3", t)
      })
    }
  });

  Template.Account.events({
    "click #change-password-button": function() {
      var e = $("input[name=old-password]").val(),
        t = $("input[name=new-password]").val(),
        r = $("input[name=confirm-password]").val();
      if (t != r)
        throw new Meteor.Error("Passwords do not match");
      if (t.length < 8 || !/^(?=.*[a-z])(?=.*[0-9])/.test(t))
        throw new Meteor.Error("Password length must be at least 8 and includes letter and number");
      Meteor.user().services.password || Meteor.call("setPassword", t),
        Accounts.changePassword(e, t, function(e) {
          e && Logger.log("Update Password Error: " + e)
        })
    }
  });

  Template.PayoutPreference.rendered = function() {
    this.$(".ui.dropdown").dropdown(), Session.set("payout section", 1),
      $("#to-payout-section-2").click(function() {
        var t = $(".payout.modal input[name=name]").val(),
          r = $(".payout.modal input[name=recipient]").val(),
          n = $(".payout.modal input[name=line1]").val(),
          o = $(".payout.modal input[name=line2]").val(),
          i = $(".payout.modal input[name=city]").val(),
          s = $(".payout.modal input[name=state]").val(),
          a = $(".payout.modal input[name=zip-code]").val(),
          u = $(".payout.modal input[name=country]").val(),
          d = {
            name: t,
            recipient: r,
            line1: n,
            line2: o,
            city: i,
            state: s,
            zipCode: a,
            country: u
          },
          l = e(d);
        0 != l.length ?
          $("#payout-method-window :input").map(function() {
            $(this).val() || $(this).parent(".required.field").addClass("error")
          }) : ($(".payout.modal input[name=line1]").val(""),
            $(".payout.modal input[name=line2]").val(""),
            $(".payout.modal input[name=city]").val(""),
            $(".payout.modal input[name=zip-code]").val(""),
            $("#payout-method-window").find(".required.field").removeClass("error"),
            Session.set("payoutAddress", d), Session.set("payout section", 2))
      }), $("#add-payout-method-done").click(function() {
        Meteor.call("addPayoutAddress", Session.get("payoutAddress"))
      })
  };

  Template.PayoutPreference.helpers({
    lastFourAccNumber: function() {
      var e = Meteor.user().bank.accountNumber;
      return e.substr(e.length - 4)
    },
    isSection: function(e) {
      return Session.get("payout section") == e
    },
    hasPaymentMethod: function() {
      var e = Meteor.user().payout.method;
      return 0 == e ? true : false
    },
    name: function() {
      return Meteor.user().payout.address.name
    },
    address: function() {
      var e = Meteor.user().payout.address,
        t = e.recipient,
        r = e.line1;
      e.line2 && (r += " " + e.line2);
      var n = e.city, o = e.state, i = e.zipCode;
      return t + ", " + r + ", " + n + ", " + o + " " + i
    }
  });

  Template.PayoutPreference.events({
    "click #add-payout-method-button": function() {
      Session.set("payout section", 1),
        $("#payout-method-window").modal("show").modal({
          onHide: function() {
            Meteor.setTimeout(function() {
              Session.set("payout section", 1)
            }, 500)
          }
        })
    }
  });

  Accounts.onEmailVerificationLink(function(e, t) {
    return Accounts.verifyEmail(e, function(e) {
      if (e) throw new Meteor.Error("Cannot verify EDU email: " + e)
    }), t()
  });
}


if (Meteor.isServer) {
  Accounts.onCreateUser(function (options, user) {
    if (options.profile) {
      user.profile = options.profile;
    }
    user.lastUpdate = new Date;
    user.profile.thumbnail = {
      org: "http://plenry.com/images/defaultAvatar.jpg",
      cloudinaryPublicId: "default_avatar"
    };
    user.isHost = true;
    user.host = {
      reviewsCount: 0,
      overallRating: 0,
      communicationRating: 0,
      totalResponds: 0,
      totalResponseTime: 0,
      nextPay: 0
    };
    if (user.services.facebook) {
      if (!user.emails) {
        user.emails = [];
      }
      user.emails.push({
        address: user.services.facebook.email,
        verified: true
      });
      user.profile = {
        firstName: user.services.facebook.first_name,
        lastName: user.services.facebook.last_name,
        thumbnail: {
          org: "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large"
        }
      };
      var uploadAsync = Meteor.wrapAsync(Cloudinary.uploader.upload);
      try {
        uploadAsync(user.profile.thumbnail.org);
      } catch (n) {
        user.profile.thumbnail.cloudinaryPublicId = n.public_id;
      }
      user.services.facebook.thumbnail = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
      if (user.services.facebook.gender) {
        if ("male" == user.services.facebook.gender) {
          user.profile.gender = 0;
        } else if ("female" == user.services.facebook.gender) {
          user.profile.gender = 1;
        } else {
          user.profile.gender = 2;
        }
      }

      var tocken = user.services.facebook.accessToken;
      var result = HTTP.get("https://graph.facebook.com/me/friends?access_token=" + tocken);
      user.services.facebook.numberOfFriends = result.data.summary.total_count;
      user.facebookQualification = {};
      if (result.data.summary.total_count > 100) {
        user.facebookQualification.status = 1;
      } else {
        user.facebookQualification.status = 0;
      }

      result = HTTP.get("https://graph.facebook.com/me/?access_token=" + tocken);
      user.profile.birthday = new Date(result.data.birthday);
      user.services.facebook.work = result.data.work;
      if (result.data.work) {
        var work = "";
        if (user.profile.work)
          work = user.profile.work;
        result.data.work.forEach(function (e) {
          if (user.profile.work && user.profile.work.indexOf(e.employer.name) < 0 || !user.profile.work) {
            if (work != "")
              work += ", ";
            work += e.employer.name;
          }
        });
        user.profile.work = work;
      }
      user.services.facebook.school = result.data.education;
      if (result.data.education) {
        var school = "";
        if (user.profile.school)
          school = user.profile.school;

        result.data.education.forEach(function (e) {
          if (user.profile.school && user.profile.school.indexOf(e.school.name) < 0 || !user.profile.school) {
            if (school != "")
              school += ", ";
            school += e.school.name;
          }
        });
        user.profile.school = school;
      }
      result = HTTP.get("https://graph.facebook.com/me/interests?access_token=" + tocken);
      user.services.facebook.interests = result.data.data;
      if (result.data.data) {
        var interest = "I love: ";
        result.data.data.forEach(function (e) {
          if (interest.indexOf(e.name) < 0)
            interest += e.name + ", ";
        });
        interest = interest.substring(0, interest.length - 2);
        if (interest != "I love") {
          if (user.profile.description) {
            user.profile.description += interest;
          } else {
            user.profile.description = interest;
          }
        }
      }
      return user;
    }
    if (user.services.google) {
      if (!user.emails)
        user.emails = [];
      user.emails.push({ address: user.services.google.email, verified: true });
      user.profile = {
        firstName: user.services.google.given_name,
        lastName: user.services.google.family_name
      };

      user.guest = {
        reviewsCount: 0,
        totalOverallRating: 0,
        showingOverallRating: 0
      };
      user.profile.thumbnail = { org: user.services.google.picture };
      var uploadAsync = Meteor.wrapAsync(Cloudinary.uploader.upload);
      try {
        uploadAsync(user.profile.thumbnail.org.replace("https", "http"));
      } catch (n) {
        user.profile.thumbnail.cloudinaryPublicId = n.public_id;
      }
      if (user.services.google.gender) {
        if ("male" == user.services.google.gender) {
          user.profile.gender = 0;
        } else if ("female" == user.services.google.gender) {
          user.profile.gender = 1;
        } else {
          user.profile.gender = 2;
        }
      }
      return user;
    }
    Meteor.setTimeout(function () {
      Accounts.sendVerificationEmail(user._id);
      Logger.log("Sending Verification Email...");
    }, 5000);
    return user;
  });

  var b = function (userId) {
    Meteor.users.update({ _id: userId }, {
      $set: {
        isHost: true,
        "host.reviewsCount": 0,
        "host.overallRating": 0,
        "host.communicationRating": 0,
        "host.totalResponds": 0,
        "host.totalResponseTime": 0,
        "host.nextPay": 0
      }
    });
  };

  // 新建review
  w = function (review, userId) {
    review.createdAt = new Date;
    if (review.userToHost) {
      review.userId = userId;
      var meal = Meals.findOne({ _id: review.mealId });
      review.hostId = meal.hostId;
      CreateNotification(0, 0, review.mealId, review.userId, review.hostId);
      Notifications.update({
        type: 0,
        subType: 1,
        mealId: review.mealId,
        toUserId: review.userId
      }, {
        $set:
          { hidden: true }
      });
      var user = Meteor.users.findOne({ _id: meal.hostId });
      var overallRating = (user.host.overallRating * user.host.reviewsCount + user.overallRating)
        / (user.host.reviewsCount + 1);
      var communicationRating = (user.host.communicationRating * user.host.reviewsCount + review.communicationRating)
        / (user.host.reviewsCount + 1);
      Meteor.users.update({ _id: meal.hostId },
      {
        $inc:
        { "host.reviewsCount": 1 }
      });
      Meteor.users.update({ _id: meal.hostId }, {
        $set: {
          "host.overallRating": overallRating,
          "host.communicationRating": communicationRating
        }
      });
      Orders.update({ mealId: review.mealId, userId: review.userId },
      {
        $set:
        { guestReviewed: true }
      });
    } else {
      review.hostId = userId;
      Meteor.users.update({ _id: review.userId }, {
        $inc:
        {
          "guest.reviewsCount": 1,
          "guest.totalOverallRating": review.overallRating
        }
      }),
        CreateNotification(0, 0, review.mealId, review.hostId, review.userId),
        Orders.update({
          mealId: review.mealId,
          userId: review.userId
        },
        {
          $set:
          { hostReviewed: true }
        });
    }
    return Reviews.insert(review);
  };

  // 新建订单
  M = function (meal, userId, pricePerGuest, numOfGuest, pay) {
    var order = {
      mealId: meal._id,
      userId: userId,
      hostId: meal.hostId,
      numberOfGuests: numOfGuest,
      donation: (pricePerGuest / 1.15).toFixed(2),
      pricePerGuest: pricePerGuest,
      total: pricePerGuest * numOfGuest,
      createdAt: new Date,
      status: 0,
      payment: {
        card: payo.card.substring(12),
        cardType: pay.cardType,
        address: pay.address
      }
    };

    createPayment(order);
    Meals.update({ _id: meal._id },
    {
      $inc:
      { numberOfGuests: numOfGuest, spotsLeft: -numOfGuest }
    });
    return Orders.insert(order);
  };

  // 新建订单
  I = function (order) {
    var mealId = order.mealId;
    var hostId = order.hostId;
    var guestId = order.userId;
    Meals.update({ _id: mealId },
    {
      $inc:
      { numberOfAcceptedGuests: ordere.numberOfGuests }
    });
    var hours = moment().diff(order.createdAt) / 1e3 / 60;
    Meteor.users.update({ _id: hostId }, {
      $inc: { "host.totalResponds": 1, "host.totalResponseTime": hours }
    });
    Orders.update({ _id: order._id },
    {
      $set:
      {
        status: 1,
        respondTime: new Date
      }
    });
    Meteor.users.update({ _id: hostId }, {
      $inc:
        { "host.nextPay": order.total / 1.15 }
    });
    Meteor.users.update({ _id: guestId }, {
      $addToSet:
      { contacts: hostId, events: mealId }
    });
    Meteor.users.update({ _id: hostId }, {
      $addToSet:
        { contacts: guestId, events: mealId }
    });
    var guest = Meteor.users.findOne({ _id: guestId });
    var host = Meteor.users.findOne({ _id: hostId });
    var meal = Meals.findOne({ _id: mealId });
    var startTime = new Date(meal.time.startAt);
    var d = new Date(meal.time.startAt);
    var l = new Date;
    startTime.setDate(startTime.getDate() - 1);
    d.setDate(d.getDate() - 3);
    if (startTime > l) {
      Queue.add({
        command: "create24HoursNotificationForGuest('" + order._id + "');",
        execute_after: startTime
      });
    }
    if (d >= l) {
      Queue.add(
      {
        command: "create3DaysNotificationForGuest('" + order._id + "');",
        execute_after: d
      });
    }
    Queue.add({
      command: "createMealEndNotificationForGuest('" + order._id + "');",
      execute_after: new Date(meal.time.endAt || meal.time.startAt)
    });

    nexmoSender.acceptedForGuest(guest, host, meal);
    if (meal.autoAccept) {
      nexmoSender.autoAcceptedForHost(guest, host, meal, order.messageToHost);
      CreateNotification(1, 6, mealId, guestId, hostId);
    } else {
      nexmoSender.acceptedForHost(guest, host);
    }

    CreateNotification(1, 1, mealId, hostId, guestId);
    EmailSender.bookingConfirmationforGuest(guest, meal, host, order.numberOfGuests, order.total);
    if (order.total != 0) {
      C(order);
    }
  };

  // 完成订单
  S = function (order) {
    var mealId = order.mealId;
    var hostId = order.hostId;
    var guestId = order.userId;
    Meals.update({ _id: mealId },
    {
      $inc:
      {
        numberOfGuests: -order.numberOfGuests,
        spotsLeft: order.numberOfGuests
      }
    });
    var hours = moment().diff(order.createdAt) / 1000 / 60;
    Meteor.users.update({ _id: hostId },
    {
      $inc:
      { "host.totalResponds": 1, "host.totalResponseTime": hours }
    });
    Orders.update({ _id: order._id }, {
      $set:
      { status: -1, respondTime: new Date }
    });
    CreateNotification(1, 2, mealId, hostId, guestId), 0 != order.total && E(order);
    var guest = Meteor.users.findOne({ _id: guestId });
    var meal = Meals.findOne({ _id: mealId });
    nexmoSender.declinedForGuest(guest, meal);
    EmailSender.bookingDeclined(guest, meal);
  };

  // 撤销订单
  O = function (order) {
    CreateNotification(2, 3, order.mealId, order.userId, order.hostId);
    var meal = Meals.findOne({ _id: order.mealId });
    var guest = Meteor.users.findOne({ _id: order.userId });
    var host = Meteor.users.findOne({ _id: order.hostId });
    nexmoSender.cancellationByGuest(guest, host, meal);
    nexmoSender.cancellationByGuestForHost(guest, host, meal);
    Meals.update({ _id: order.mealId }, {
      $inc:
      { numberOfGuests: -order.numberOfGuests, spotsLeft: order.numberOfGuests }
    });
    if (order.status == 0 && order.total != 0) {
      E(order);
    }
    if (moment().add(3, "days") > meal.time.startAt) {
      EmailSender.lateCancellationByGuestForHost(guest, meal, host, order.numberOfGuests);
      EmailSender.cancellationByGuestWithNoRefund(guest, meal, host, order.numberOfGuests, order.total);
    } else {
      if (order.status == 1) {
        if (order.total != 0) {
          P(order);
        }
        Meals.update({ _id: order.mealId }, {
          $inc:
          { numberOfAcceptedGuests: -order.numberOfGuests }
        });
      }
      EmailSender.cancellationByGuestForHost(guest, meal, host, order.numberOfGuests);
      EmailSender.cancellationByGuest(guest, meal, host, order.numberOfGuests, order.total);
    }
    Orders.update({ _id: order._id }, { $set: { status: -2 } });
  };

  // 更新订单和提醒
  k = function (mealId, t) {
    Meals.update({ _id: mealId }, { $set: { status: -1 } });
    var meal = Meals.findOne({ _id: mealId });
    CreateNotification(2, 4, mealId, meal.hostId, meal.hostId);
    var host = Meteor.users.findOne({ _id: meal.hostId }),
      orders = Orders.find({ mealId: mealId });
    orders.forEach(function (order) {
      var guest = Meteor.users.findOne({ _id: order.userId });
      CreateNotification(2, 2, mealId, order.hostId, order.userId);
      if (0 == order.status) {
        if (order.total != 0) {
          E(order);
        }
      } else {
        if (1 == order.status) {
          P(order);
        }
        Orders.update({ _id: order._id },
        {
          $set:
          { status: -3 }
        });
        nexmoSender.cancellationByHostForGuest(guest, host, meal);
        EmailSender.cancellationEmailforGuest(guest, meal, host, order.numberOfGuests, order.total, t);
      }
    });
    EmailSender.cancellationByHost(meal, host);
    nexmoSender.cancellationByHost(host, meal);
  };


  T = function (mealId) {
    Orders.update({ mealId: mealId },
    {
      $set:
      { status: 0 }
    });
  };

  A = function (mealId) {
    Orders.update({ mealId: mealId },
    {
      $set:
      { status: 1 }
    });
  };

  // 撤销支付
  E = function (order) {
    Orders.update({ _id: order._id },
    { $set: { "braintree.status": -1 } });
    gateway.transaction.void(order.braintree.transactionId,
      function (t, r) {
        if (r.success) {
          console.log("Payment (OrderId: " + order._id + ") voided successcully");
        } else {
          console.log("Payment (OrderId: " + order._id + ") voided failed");
          console.log(r.message);
        }
      });
  };

  // 提交订单支付反馈
  C = function (order) {
    Orders.update({ _id: order._id },
    { $set: { "braintree.status": 1 } });
    gateway.transaction.submitForSettlement(order.braintree.transactionId,
      function (err, result) {
        if (result.success) {
          console.log("Payment (OrderId: " + order._id + ") settle submitted successcully");
        } else {
          console.log("Payment (OrderId: " + order._id + ") settle failed");
          console.log(result.message);
        }
      });
  };

  // 订单退款反馈
  P = function (order) {
    Orders.update({ _id: order._id },
    {
      $set:
      { "braintree.status": -2 }
    });
    gateway.transaction.refund(order.braintree.transactionId,
      function (err, result) {
        if (result && result.success) {
          console.log("Payment (OrderId: " + order._id + ") refunded successfully");
        } else {
          if (result.message == "Cannot refund a transaction unless it is settled.") {
            gateway.transaction.void(order.braintree.transactionId,
              function (err, result) {
                if (result.success) {
                  console.log("Payment (OrderId: " + order._id + ") voided successcully");
                } else {
                  console.log("Payment (OrderId: " + order._id + ") voided failed");
                  console.log(result.message);
                }
              });
          } else {
            console.log("Payment (OrderId: " + order._id + ") refund failed");
            console.log(result.message);
          }
        }
      });
  };

  Accounts.emailTemplates.from = "Plenry <automated@plenry.com>";
  Accounts.emailTemplates.siteName = "Plenry";
  Accounts.emailTemplates.verifyEmail.subject = function (e) {
    return "Please Confirm Your Email Address";
  };
  Accounts.emailTemplates.verifyEmail.html = function (e, t) {
    var fs = Npm.require("fs");
    var readFileAsync = Meteor.wrapAsync(fs.readFile);
    try {
      var result = readFileAsync(process.env.PWD + "/emailTemplates/email_confirmation.template");
      return result.toString().
        replace(/"/g, "'").
        replace(/&userFirstName&/g, e.profile.firstName).
        replace(/&confirmationUrl&/g, t);
    } catch (a) {
      return void console.log(a);
    }
  };

  // 更新头像
  var L = function (user, userId) {
    user.profile.lastUpdate = new Date();
    if (user.profile.thumbnail && user.profile.thumbnail.org) {
      var uploadAsync = Meteor.wrapAsync(Cloudinary.uploader.upload);
      try {
        uploadAsync(user.profile.thumbnail.org);
      } catch (n) {
        user.profile.thumbnail.cloudinaryPublicId = n.public_id;
      }
    } else {
      user.profile.thumbnail = Meteor.user().profile.thumbnail;
    }
    user.profile.phone = Meteor.users.findOne({ _id: userId }).profile.phone;
    Meteor.users.update({ _id: userId }, { $set: user });
  };

  // 设置头像
  D = function (org, userId) {
    var thumbnail = { org: org },
      uploadAsync = Meteor.wrapAsync(Cloudinary.uploader.upload);
    try {
      uploadAsync(thumbnail.org);
    } catch (o) {
      thumbnail.cloudinaryPublicId = o.public_id;
    }
    Meteor.users.update(
      { _id: userId },
      {
        $set:
        { "profile.thumbnail": thumbnail }
      });
  };

  // 创建提示
  CreateNotification = function (type, subType, mealId, fromUserId, toUserId) {
    if (Notifications.findOne({
      hidden: false,
      type: type,
      subType: subType,
      fromUserId: fromUserId,
      toUserId: toUserId,
      mealId: mealId
    }))
      return void Logger.log("Notification already exist");
    var notification = {
      type: type,
      subType: subType,
      createdAt: new Date,
      hidden: false,
      mealId: mealId,
      fromUserId: fromUserId,
      toUserId: toUserId
    };
    if (type == 0) {
      var meal = Meals.findOne(mealId);
      var endTime = meal.time.endAt || meal.time.startAt;
      var endDate = new Date(endTime);
      endDate.setDate(endDate.getDate() + 14);
      notification.expiredAt = l;
    }
    if (type == 1 && subType == 1 || subType == 2) {
      Notifications.update({
        type: 1,
        subType: 0,
        mealId: mealId,
        toUserId: toUserId
      },
      { $set: { hidden: true } });
      Notifications.update({
        type: 1,
        subType: 3,
        mealId: mealId,
        toUserId: fromUserId,
        fromUserId: toUserId
      },
      { $set: { hidden: true } });
    }
    return Notifications.insert(notification);
  };

  // 更新用户id验证状态
  var G = function (userId, scanRef) {
    Meteor.users.update({ _id: userId },
    { $set: { "idVerification.scanRef": scanRef, "idVerification.status": 1 } });
  };

  // nexmo phone sms verify
  R = function (userId, phone) {
    var pin = Math.floor(10000 * Math.random()).toString();
    for (var i = 0; i < 4 - o.length; i++) {
      pin = "0" + pin;
    }
    var options = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded",
        "Content-Length": 0
      }
    };
    var url = "https://rest.nexmo.com/sc/us/2fa/json?api_key=" + "9db1d946" +
      "&api_secret=" + "ba8229cf" +
      "&to=1" + phone +
      "&pin=" + pin;
    HTTP.call("POST", url, options, function (error, result) {
      if (error)
        throw new Error("internal-error", "Sorry our server cannot send you the message; please try again later");
      Meteor.users.update({ _id: userId },
      {
        $set: {
          "phoneVerification.status": 2,
          "profile.phone": phone,
          "phoneVerification.code": pin
        }
      });
    });
  };

  // jumio id verify
  N = function (merchantId) {
    var url = "https://netverify.com/api/netverify/v2/initiateNetverify";
    var header = {
      Accept: "application/json",
      "Content-type": "application/json",
      "User-Agent": "Plenry Plenry/1.0.0",
      Authorization: "Basic " +
        new Buffer("da8fb0a8-2677-456c-b936-be2ccc66122d" + ":" + "qqC7fN8dDopJVlILS7YA9TEQB6vRx9w0").toString("base64")
    };
    var content = {
      merchantIdScanReference: merchantId,
      successUrl: "http://plenry.com/jumio_call_back",
      errorUrl: "http://plenry.com/jumio_call_back",
      callbackUrl: "http://plenry.com"
    };
    var result = HTTP.call("Post", url, { data: content, headers: header });
    return result.data.clientRedirectUrl;
  };

  // 提示已查看
  x = function (notificationId, toUserId) {
    var notification = Notifications.findOne({ _id: notificationId });
    if (!notification || toUserId != notification.toUserId)
      throw new Meteor.Error("User not authorized");
    Notifications.update({ _id: notificationId }, { $set: { hidden: true } });
  };

  // 设置新密码
  U = function (newPassword, userId) {
    Accounts.setPassword(userId, newPassword);
  };

  // 设置银行账户
  F = function (bank, userId) {
    Meteor.users.update({ _id: userId }, { $set: { bank: bank } });
  };

  // Verifying Edu Email
  V = function (userId, eduEmail) {
    Logger.log("Verifying Edu Email....");
    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[edu]{2,}))$/.test(eduEmail))
      throw new Meteor.Error("invalid-params", "It is not a valid EDU email");
    Meteor.users.update({ _id: userId }, { $addToSet: { emails: { address: eduEmail } } },
      function (e) {
        if (e) throw new Meteor.Error("internal-error", "User not authorized");
      });
    Accounts.sendVerificationEmail(userId, eduEmail);
  };

  // 利用facebook图谱获取朋友数量，并更新数据库
  H = function (userId) {
    var user = Meteor.users.findOne({ _id: userId });
    var friends = HTTP.get("https://graph.facebook.com/me/friends?access_token=" + user.services.facebook.accessToken);
    var count = friends.data.summary.total_count;
    if (count > 100) {
      Meteor.users.update({ _id: userId },
      {
        $set: {
          "facebookQualification.status": 1,
          "services.facebook.numberOfFriends": count
        }
      });
      return true;
    }
    Meteor.users.update({ _id: userId },
    {
      $set: {
        "facebookQualification.status": 0,
        "services.facebook.numberOfFriends": count
      }
    });
    return false;
  };

  // 记录度过inbox记录的用户
  Y = function (user, id) {
    Inbox.update(
    { _id: id },
    { $push: { readBy: user } });
  };

  z = function (e, t, r) {
    messageSender.sendToIndividual(e, t, r);
  };

  q = function (userId) {
    var t = [],
      r = Orders.find({
        $and: [
          { status: 1 },
          { $or: [{ userId: userId }, { hostId: userId }] }
        ]
      }, { fields: { mealId: 1, _id: 0, status: 1 } });
    r.forEach(function (e) { t.push(e.mealId) });
    var n = v(t), o = [];
    n.forEach(function (e) {
      var t = Meals.findOne({ _id: e, status: 1 },
      { fields: { hostId: 1, _id: 0, status: 1 } });
      if (t) {
        var r = t.hostId;
        o.push(r)
      }
      var n = Orders.find({ status: 1, mealId: e },
      { fields: { userId: 1, _id: 0 } });
      n.forEach(function (e) {
        o.push(e.userId)
      })
    }), o = _.without(o, e);
    var i = v(o);
    i = i.filter(function (e) {
      return void 0 != e
    }),
      Meteor.users.update({ _id: e },
      { $set: { contacts: i } });
  };

  B = function (userId) {
    var t = [],
      r = Orders.find({
        $and: [
          { status: 1 },
          { $or: [{ userId: userId }, { hostId: userId }] }
        ]
      }, { fields: { mealId: 1, _id: 0 } });
    r.forEach(function (e) {
      t.push(e.mealId)
    });
    var n = v(t);
    Meteor.users.update({ _id: userId },
    { $set: { events: n } })
  };

  Q = function (e) {
    var users = Meteor.users.find({}, { fields: { _id: 1 } });
    users.forEach(function (user) {
      q(user._id);
      B(user._id);
    });
  };

  // 查找设定日期前创建的用户的e-mail列表
  j = function (date) {
    var emailList = [];
    var userEmails = Meteor.users.find(
      { createdAt: { $gte: new Date(date) } },
      {
        fields: { emails: 1 },
        sort: { createdAt: -1 }
      });
    userEmails.forEach(function (userEmail) {
      emailList.push(userEmail.emails[0].address.toLowerCase());
    });
    console.log(emailList);
  };

  W = function (userId, t) {
    Meteor.users.update({ _id: userId },
    { $set: { payout: { method: 0, address: t } } });
  };

  Z = function (userId, t) {
    return Orders.find({
      $and: [
        { status: 1 },
        { $or: [{ userId: userId }, { hostId: userId }] }
      ]
    });
  };

  // 计算两个用户共同参与的活动列表
  J = function (userId1, userId2) {
    var dateNow = new Date();
    var user1Orders = Orders.find({
      $and: [
        { mealEndAt: { $lt: dateNow } },
        { status: 1 },
        { $or: [{ userId: userId1 }, { hostId: userId1 }] }
      ]
    },
    { field: { mealId: 1 } });
    var user2Orders = Orders.find({
      $and: [
        { mealEndAt: { $lt: dateNow } },
        { status: 1 },
        { $or: [{ userId: userId2 }, { hostId: userId2 }] }
      ]
    },
    { field: { mealId: 1 } });
    var mealIdDic = {};
    user1Orders.forEach(function (order) {
      mealIdDic[order.mealId] = 0;
    });
    user2Orders.forEach(function (order) {
      if (mealIdDic[order.mealId] == 0) {
        mealIdDic[order.mealId] = 1;
      }
    });
    var result = [];
    for (var mealId in mealIdDic) {
      if (mealIdDic[mealId] == 1) {
        result.push(mealId);
      }
    }
    return result;
  };

  K = function (meal, mealId) {
    var uploadAsync = Meteor.wrapAsync(Cloudinary.uploader.upload);
    try {
      uploadAsync(meal.cover.org);
    } catch (n) {
      meal.cover.cloudinaryPublicId = n.public_id
    }
    Meals.update({ _id: mealId }, {
      $set: {
        autoAccept: meal.autoAccept,
        title: meal.title,
        summary: meal.summary,
        pricePerGuest: meal.pricePerGuest,
        maxParty: meal.maxParty,
        time: meal.time,
        placeType: meal.placeType,
        environment: meal.environment,
        interaction: meal.interaction,
        note: meal.note,
        location: meal.location,
        updatedAt: new Date(),
        address: meal.address,
        questionForGuest: meal.questionForGuest,
        cover: meal.cover
      }
    },
    function (error, count) {
      return count;
    });
  };

  Meteor.startup(function () {
    var braintree = Meteor.npmRequire("braintree");
    gateway = braintree.connect({
      environment: braintree.Environment.Production,
      publicKey: Meteor.settings.braintree.publicKey,
      privateKey: Meteor.settings.braintree.privateKey,
      merchantId: Meteor.settings.braintree.merchantId
    });
    Cloudinary.config({
      cloud_name: "plenry",
      api_key: "391732461231266",
      api_secret: "hcMfSQu5FdwZ822O4gdAwRekQOY"
    });
    Meteor.setInterval(function () {
      Queue.run();
    }, 15000);
    Meteor.setInterval(function () {
      Queue.purgeOldLocks();
    }, 60000);
    Meteor.setInterval(function () {
      Queue.purgeCompletedTasks();
    }, 43200000);
    Meteor.setInterval(function () {
      Queue.purgeLogs();
    }, 43200000);
    Houston.add_collection(Meteor.users);
    Houston.add_collection(Houston._admins);
  });
}