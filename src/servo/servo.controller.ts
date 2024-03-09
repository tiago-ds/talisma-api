// Servo pin (replace with your actual GPIO pin)
const servoPin = 14;

const Gpio = require('pigpio').Gpio;

const motor = new Gpio(servoPin, {mode: Gpio.OUTPUT});

const maxPulse = 2400;
const minPulse = 500;

let pulseWidth = minPulse;
let increment = 500;

setInterval(() => {
  motor.servoWrite(pulseWidth);

  pulseWidth += increment;
  if(pulseWidth > maxPulse) {
    pulseWidth = maxPulse;
  }
  if (pulseWidth >= maxPulse) {
    increment = -500;
  } else if (pulseWidth <= minPulse) {
    increment = 500;
  }
}, 1000);