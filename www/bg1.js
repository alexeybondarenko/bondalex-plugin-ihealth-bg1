var exec = require('cordova/exec');
cordova = require('cordova');


var iHealth = function () {
  this.channels = {
    ihealthstatus: cordova.addWindowEventHandler("ihealthstatus")
  };
  for (var key in this.channels) {
    this.channels[key].onHasSubscribersChange = onHasSubscribersChange;
  }
};

function handlers() {
  return Object.keys(ihealth.channels).reduce(function (sum, cur) {
    return sum + ihealth.channels[cur].numHandlers
  }, 0);
}

function onHasSubscribersChange () {
  // If we just registered the first handler, make sure native listener is started.
  if (this.numHandlers === 1 && handlers() === 1) {
    exec(ihealth._status, ihealth._error, "iHealthBG1", "subscribe", []);
  } else if (handlers() === 0) {
    exec(null, null, "iHealthBG1", "unsubscribe", []);
  }
}

iHealth.prototype._status = function (info) {
  console.log('status', JSON.stringify(info));
  if (info) {

    switch (info.status) {
      case 'error': {
        if (!info.data) break;
        if (info.data.status == 100) {
          info.name = 'disconnect';
        }

        break;
      }
    }
    cordova.fireWindowEvent("ihealthstatus", info);
  }
};

iHealth.prototype._error = function (e) {
  console.log("Error initializing iHealth: " + e);
};

iHealth.prototype.ERROR_CODES = {
  "0": "Battery is low.",
  "1": "Glucose test result is out of the measurement range.",
  "2": "Unknown interference detected, please repeat the test.",
  "3": "Strip is used or unknown moisture detected, discard the test strip and repeat the test with a new strip.",
  "4": "Reading transmission error. Repeat the test with a new test strip. \n If the problem persists, contact iHealth customer service for assistance.",
  "5": "The environmental temperature is beyond normal range, place the meter at room temperature for at least 30 minutes, then repeat the test.",
  "6": "The environmental temperature is beyond normal range, place the meter at room temperature for at least 30 minutes, then repeat the test.",
  "7": "Test strip coding error.",
  "8": "Communication error, press“START” or rescan the code to repeat the test.",
  "9": "Strip removed in the middle of reading, repeat the test with a new strip.",
  "10": "Insert a new test strip and repeat the test.",
  "11": "Cannot write to SN or KEY.",
  "12": "Please set time.",
  "13": "0 test strips remaining.",
  "14": "Test strip expired.",
  "15": "Unplug the charging cable before testing.",
  "100": "BG meter disconnected.",
  "101": "BG meter is in sleeping mode, needs repair.",
  "111": "user verification failed."
};

var ihealth = new iHealth();

module.exports = ihealth;
