// install node-hid globally
// npm -g install node-hid

var PushBullet = require('pushbullet');
var Blink1 = require('node-blink1');
var chalk = require('chalk');
var pusher = new PushBullet('v1l0tai5v2UPm0k8RUj8lvkhppJBhBWVbXujxSgudnBWS');
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
console.log(chalk.blue("PushBullet stream connected"));

pushStream.on('push', function(push) {
    console.log(push)
    // if up
    if (push && push.body && push.body.indexOf('jenkinsup') !== -1) {
        console.log('jenkins-is-up');
        blinker('red');
    } else {
        // if down
        console.log('jenkins-is-down');
        blinker('blue');
    }

})

function blinker(color) {
    blink1.fadeToRGB(250,0,0,0)
    blink1.fadeToRGB(500,255,125,255)
    blink1.fadeToRGB(250,0,0,0)
    blink1.fadeToRGB(500,0,125,255)
    blink1.fadeToRGB(250,0,0,0)
    blink1.fadeToRGB(500,50,255,0)
    blink1.fadeToRGB(250,0,0,0)
}

blinker()
