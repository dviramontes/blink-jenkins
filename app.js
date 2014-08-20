#! /home/pi/node-v0.10.2-linux-arm-pi/bin/node

var PushBullet = require('pushbullet');
var Blink1 = require('node-blink1');
var chalk = require('chalk');
var pusher = new PushBullet('v1l0tai5v2UPm0k8RUj8lvkhppJBhBWVbXujxSgudnBWS');
var pushStream = pusher.stream()

var devices = Blink1.devices().length,
    fadeMillis = 1000,
    blink1, blinker;

pushStream.connect();
console.log(chalk.blue("PushBullet stream connected"));

var devicePresent = devices > 0

var msg = !!devicePresent ? "blink(1) usb connected" : "blink(1) device connected ??"

if (devicePresent) {
    blink1 = new Blink1();
    console.log(chalk.red(msg));
} else {
    console.log(chalk.red(msg), "exiting..");
    process.exit(0) // normal exit
}


pushStream.on('push', function(push) {
    console.log(push)
    // if up
    if (push && push.body) {
        if (push.body.indexOf('jenkinsup') !== -1) {
            console.log('jenkins-is-up');
            blinker('red');
        } else if (push.body.indexOf('jenkinsup') !== -1) {
            // if down
            console.log('jenkins-is-down');
            blinker('blue');
        }
    }
})

function blinker(color) {
    blink1.fadeToRGB(250, 0, 0, 0)
    blink1.fadeToRGB(500, 255, 125, 255)
    blink1.fadeToRGB(250, 0, 0, 0)
    blink1.fadeToRGB(500, 0, 125, 255)
    blink1.fadeToRGB(250, 0, 0, 0)
    blink1.fadeToRGB(500, 50, 255, 0)
    blink1.fadeToRGB(250, 0, 0, 0)
}

blinker()
