import express, { Request, Response } from 'express';

import { captureImage } from '../webcam/webcam.control';
import { moveServo } from '../servo/servo.control';

const app = express();

// Get wecam image
app.get('/webcam', (req: Request, res: Response) => {
  // Call the captureImage function and send the image as a response
  // Dont work yet
  const image = captureImage('newImage.jpg');
  res.send(image);
});

// request to move servo
app.get('/move', (req: Request, res: Response) => {
  moveServo();
  res.send('Servo moved');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`))