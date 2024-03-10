var NodeWebcam = require( "node-webcam" );

// device 
const device = '/dev/video18'

// generated image width and height
const width = 300;
const height = 300;

// options for the webcam object
const opts = {
    device,
    width,
    height,
}

// prints a list of the video input devices
function listDevices() {
    NodeWebcam.list( function( list ) {
        console.log(list);
    });
}

// captures  image
export function captureImage(imageName) {
    NodeWebcam.capture( `${imageName}`, opts, function( err, data ) {
        if (err) 
            console.log(`Error: ${err}`);
    });    
} 

