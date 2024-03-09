const pigpio = require('pigpio');

// Set servo pin (replace with your actual GPIO pin)
const servoPin = 14; // Use the BCM pin number for Pigpio

// Function to convert angle to pulse width in microseconds (adjust based on your servo)
function angleToPulseWidth(angle) {
    // Typical pulse width range for servos is 1000us (min) to 2000us (max)
    // Adjust these values based on your servo's specifications
    const minPulseWidth = 1000;
    const maxPulseWidth = 2000;
    const range = maxPulseWidth - minPulseWidth;
    const angleRatio = angle / 180;
    return Math.floor(minPulseWidth + (range * angleRatio));
}

// Set initial angle (replace with desired angle between 0 and 180)
let currentAngle = 0;

// Initialize Pigpio library
pigpio.initialize((err) => {
    if (err) {
        console.error('Error initializing Pigpio:', err);
        return;
    }

    // Set servo pin mode to PWM
    pigpio.hardwarePWM(servoPin, 50, angleToPulseWidth(currentAngle)); // 50Hz is a common frequency

    // Sweep the servo back and forth
    setInterval(() => {
        const pulseWidth = angleToPulseWidth(currentAngle);
        pigpio.hardwarePWM(servoPin, 50, pulseWidth);
        console.log("Setting angle:", currentAngle, "Pulse Width:", pulseWidth);
        currentAngle += 1; // Adjust increment value for desired sweep speed
        if (currentAngle > 180) {
            currentAngle = 0;
        }
    }, 1000); // Change interval (in milliseconds) to adjust sweep speed
});

// Function to stop the servo on exit (optional)
process.on('SIGINT', () => {
    pigpio.hardwarePWM(servoPin, 50, 0); // Set pulse width to 0 to stop the servo
    console.log('Stopping servo...');
    pigpio.terminate();
});

