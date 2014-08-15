// TODO : notify  android phone that the application has shutdown

// install node-hid globally
// npm -g install node-hid

var instapush = require("instapush");
var Blink1 = require('node-blink1');
var chalk = require('chalk');

var msg;
var devices = Blink1.devices().length
var fadeMillis = 1000
msg = devices > 0 ? "blink usb connected" : "device connected ??"
console.log(chalk.red(msg));
if (devices > 0) {
    try {
        var b1 = new Blink1();
    } catch (e) {
        throw new Error(e);
    }
    // b1.fadeToRGB(fadeMillis, 0,0,255)
    // b1.play(1)
    b1.writePatternLine(200, 255, 65, 0, 0);
    b1.writePatternLine(10, 0, 0, 0, 1);
    b1.play(1)
    // b1.pause();
    b1.close(function(){console.log(chalk.blue('lights off'))})
}

instapush.settings({
    id: '53ed7ed6a4c48a7643e8f7b2',
    secret: 'd34d9e69b230d5a0b8452beb92161eaf',
})

// Report to cell phone that raspberry-pi program has 
// either crashed or  terminated..

//process.stdin.resume();
process.on('uncaughtException', function(err) {
    console.log('Caught exception : ' + err);
    instapush.notify({
        "event": "blink-jenkins",
        "trackers": {
            "status": "down"
        }
    }, function(err, res) {
        if (err) console.log(err)
        if (res.status === 200) {
            console.log(res.msg);
        }
    });
    process.exit(1);
})