// JavaScript source code

// pastListingsRow helpers

!function () {
    Template.pastListingsRow.helpers({
        date: function () {
            return moment(this.time.startAt).utcOffset(this.time.zone).format("MMM D YYYY")
        }, time: function () {
            return moment(this.time.startAt).utcOffset(this.time.zone).format("ddd @ hh:mmA")
        }, active: function () { return 1 == this.status }
    })
}();
