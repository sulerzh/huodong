function OutputLogger(debugLog) {
  this.debug = debugLog;
  this.log = function (info) {
    if (this.debug) {
      console.log(info);
    }
  }
};

Logger = new OutputLogger(Meteor.settings.deubgLog);