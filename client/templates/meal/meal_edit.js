isTitleEmpty = function (title) {
  return title.length > 0;
};
isSummaryEmpty = function (summary) {
  return summary.length > 0;
};
isMaxPartyValid = function (maxParty) {
  return parseInt(maxParty) >= 1;
};
isDateValid = function (date) {
  return !isNaN(new Date(date));
};
isDeadlineValid = function (deadline) {
  return parseInt(deadline) > 0 && parseInt(deadline) < 74;
};
o = function (e) {
  return parseInt(e) >= 0 && parseInt(e) < 9;
};
isImgSrcValid = function (src) {
  return src && src.length > 0;
};
isAddressEmpty = function (address) {
  return address.length > 0;
};

Template.mealEdit.onRendered(function () {
  Date.parseDate = function (e, t) {
    return moment(e, t).toDate();
  };
  Date.prototype.dateFormat = function (e) {
    return moment(this).format(e);
  };
  $(".has-popup").popup();
  $("#meal-edit-start-time").datetimepicker({
    format: "MM/DD/YYYY h:mm a",
    formatTime: "h:mm a",
    formatDate: "MM/DD/YYYY",
    step: 15,
    defaultTime: "12:00"
  });
  $("#meal-edit-end-time").datetimepicker({
    format: "MM/DD/YYYY h:mm a",
    formatTime: "h:mm a",
    formatDate: "MM/DD/YYYY",
    step: 15,
    defaultTime: "12:00"
  });
  $(".ui.accordion").accordion();
  $("#update-cover-btn").click(function () {
    $("#current-cover-file").click();
  });
  $(".meal-edit-form .ui.checkbox").checkbox();
  $(".meal-edit-form .ui.dropdown").dropdown();

  if (GoogleMaps.loaded()) {
    var t = new google.maps.places.Autocomplete(document.getElementById("address-update"), { types: ["geocode"] });
    google.maps.event.addListener(t, "place_changed", function () {
    });
  }
  Session.set("Edit meal error", false);
});

Template.mealEdit.events({
  "change input[type='file']": function (e) {
    var uploader = new Slingshot.Upload("mealPhotoUpload");
    uploader.send(e.target.files[0], function (e, t) {
      $("#current-cover-url").val(t);
      $("#preview-current-cover-picture").attr("src", t);
    });
  },
  "click #meal-edit-button": function () {
    $(".pusher").dimmer("show");
    $(".ui.loader").css("position", "fixed").css("top", "70%");
    var meal = {};
    var errors = [];

    meal.autoAccept = $("#event-edit-auto-accept-toggle").is(":checked");
    // 输入标题
    var title = $(".meal-edit-form input[name='title']").val();
    if (isTitleEmpty(title)) {
      meal.title = title;
    } else {
      errors.push("Title cannot be empty");
    }

    // 简介
    var summary = $(".meal-edit-form #meal-edit-summary").val();
    if (isSummaryEmpty(summary)) {
      meal.summary = summary;
    } else {
      errors.push("Summary cannot be empty");
    }

    // 参加人数
    var maxParty = $(".meal-edit-form input[name='maxParty']").val();
    if (isMaxPartyValid(maxParty)) {
      meal.maxParty = parseInt(maxParty);
    } else {
      errors.push("Max party is invalid/empty");
    }

    // 起始时间
    var startTime = $(".meal-edit-form #meal-edit-start-time").val();
    if (!isDateValid(startTime)) {
      errors.push("Event start time is invalid/empty");
    }
    startTime = new Date(startTime);

    // 结束时间
    var endTime = $(".meal-edit-form #meal-edit-end-time").val();
    if (endTime)
      endTime = new Date(endTime);

    // 时间检查
    if (endTime && startTime && startTime >= endTime) {
      errors.push("End time of the event cannot be earlier than the start time - 2");
    }

    // 最后期限
    var deadline = $(".meal-edit-form input[name='deadline']").val();
    if (isDeadlineValid(deadline)) {
      meal.time = {
        startAt: startTime,
        endAt: endTime,
        deadline: new Date(moment(new Date(startTime)).subtract(parseInt(deadline), "h"))
      };
    } else {
      errors.push("Deadline is invalid");
    }

    // 位置类型
    meal.placeType = parseInt($(".meal-edit-form input[name='placeType']").val());

    // 封面
    var url = $(".meal-edit-form #current-cover-url").val() ||
      $("#preview-current-cover-picture").attr("src");
    if (isImgSrcValid(url)) {
      meal.cover = { org: url };
    } else {
      errors.push("You must upload a photo as your cover photo");
    }

    // 交互
    var interaction = $(".meal-edit-form #meal-edit-interaction").val();
    if (interaction.length > 0) {
      meal.interaction = interaction;
    }

    // 备注
    var note = $(".meal-edit-form #meal-edit-note").val();
    if (note.length > 0) {
      meal.note = note;
    }

    // 向顾客提问的问题
    var questionForGuest = $("#meal-edit-question-for-guest").val();
    if (questionForGuest.length > 0) {
      meal.questionForGuest = questionForGuest;
    }

    // 地址
    var address = $(".meal-edit-form input[name='address']").val();

    // 提示顾客
    var notifyGuest = $("[name='notify-guest-checkbox']").is(":checked");
    if (isAddressEmpty(address)) {
      meal.address = {};
      meal.address.full = address;
    } else {
      errors.push("Your address is not compete");
    }

    if (errors.length > 0) {
      $(".pusher").dimmer("hide");
      $("html, body").animate({ scrollTop: 0 }, "fast");
      var mealErrors = [];
      for (var i = 0; i < errors.length; i++)
        mealErrors.push({ reason: errors[i] });
      Session.set("Edit meal errors", mealErrors);
      Session.set("Edit meal error", true);
    } else
      Meteor.call("editMeal", Session.get("editMealId"), meal, function (error, result) {
        if (error) {
          $(".pusher").dimmer("hide");
          $("html, body").animate({ scrollTop: 0 }, "fast");
          errors = error.reason.split(",");
          var errs = [];
          for (var r = 0; r < errors.length; r++)
            errs.push({ reason: errors[r] });
          Session.set("Edit meal errors", errs);
          Session.set("Edit meal error", true);
        } else
          $(".pusher").dimmer("hide");
        if (notifyGuest) {
          Meteor.call("notifyGuestEventUpdated", Session.get("editMealId"));
        }
        Session.set("Edit meal error", false);
        Router.go("/events/" + Session.get("editMealId"));
      });
  },
  "click .cancel.button": function () {
    parent.history.back();
  }
});

Template.mealEdit.helpers({
  placeTypeName: function () {
    return GType.placeType[Number(this.placeType)];
  },
  address: function () {
    return this.address.full;
  },
  coverPhoto: function () {
    return this.cover.org;
  },
  mealStartAt: function () {
    return moment(this.time.startAt).format("MM/DD/YYYY h:mm a");
  },
  mealEndAt: function () {
    return moment(this.time.endAt).format("MM/DD/YYYY h:mm a");
  },
  deadlineDiff: function () {
    return moment(this.time.startAt).diff(moment(this.time.deadline), "hours");
  },
  hasError: function () {
    return Session.get("Edit meal error");
  },
  errors: function () {
    return Session.get("Edit meal errors");
  },
  mapOptions: function () {
    if (GoogleMaps.loaded()) {
      var t = new google.maps.places.Autocomplete(document.getElementById("address-update"),
      {
        types: ["geocode"],
        open: function (e, t) {
          var autoComplateTopPos =
            $(e.target).autocomplete("widget").position().top -
            $(e.target).autocomplete("widget").height() -
            $(e.target).height();
          $(e.target).autocomplete("widget").css("top", autoComplateTopPos + "px");
        }
      });
      google.maps.event.addListener(t, "place_changed", function () { });
    }
  }
});

