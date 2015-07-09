// JavaScript source code

!function () {
    Template.landing.rendered = function () {
        $(".sign-up-link-btn").click(function (n) {
            $(".signUp.modal").modal("show")
        }),
        $(document).ready(function () {
            $(".masthead .information").transition("scale in", 1e3)
        })
    },
    Template.landing.events({})
}();
