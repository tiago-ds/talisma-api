import express, { Request, Response } from 'express';

import { captureImage } from '../webcam/webcam.controller';

const app = express();

// Get webcam image
app.get('/webcam', (req: Request, res: Response) => {
  // Call the captureImage function and send the image as a response
  const image = captureImage('newImage.jpg');
  res.send(image);
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`))