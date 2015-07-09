// JavaScript source code

!function () {
    Template.ChangeEmail.created = function () {
        var e = this;
        e.newVerify = new ReactiveVar(true),
        e.hasError = new ReactiveVar(false),
        e.errors = new ReactiveVar
    },
    Template.ChangeEmail.helpers({
        hasError: function () {
            return Template.instance().hasError.get()
        }, newVerify: function () {
            return Template.instance().newVerify.get()
        }, errors: function () {
            return Template.instance().errors.get()
        }
    }),
    Template.ChangeEmail.events({
        "click #change-email-confirm-btn": function () {
            var e = Template.instance(), r = $("#new-email").val();
            Meteor.call("changeEmail", r,
                function (r, a) {
                    if (r) {
                        e.hasError.set(true);
                        for (var n = r.reason.split(","), t = [], i = 0; i < n.length; i++)
                            t.push({ reason: n[i] }); e.errors.set(t)
                    }
                    else
                        e.hasError.set(false), e.newVerify.set(false),
                            $("#new-email").val(""),
                            $("#change-email-modal").modal("hide")
                })
        }, "click .close.icon": function () {
            var e = Template.instance();
            $("#new-email").val(""),
            e.hasError.set(false), e.newVerify.set(true)
        }
    })
}();
