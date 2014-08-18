// install node-hid globally
// npm -g install node-hid

var pushbullet = require('pushbullet');
var Blink1 = require('node-blink1');
var chalk = require('chalk');
var pusher = new pushbullet('v1l0tai5v2UPm0k8RUj8lvkhppJBhBWVbXujxSgudnBWS');
var pushStream = pusher.stream()

pushStream.connect();

var msg,
    devices = Blink1.devices().length,
    fadeMillis = 1000,
    blink1, blinker;

msg = devices > 0 ? "blink usb connected" : "device connected ??"

if (devices > 0) {
    blink1 = new Blink1();
}

console.log(chalk.red(msg));
console.log(chalk.blue("pushbullet stream connected"));

pushStream.on('push', function(push) {

    // if up
    if (push.body.indexOf('jenkinsup') !== -1) {
        console.log('jenkins-is-up');
        blinker('red');
    } else {
        // if down
        console.log('jenkins-is-down');
        blinker('blue');
    }

})

function blinker(color) {
    blink1.writePatternLine(200, 255, 0, 0, 0);
    blink1.writePatternLine(200, 0, 0, 0, 1);
    blink1.play(0);
}
