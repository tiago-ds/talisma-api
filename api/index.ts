import express, { Request, Response } from 'express';

interface ServoPositions {
  [key: string]: number;
}

const app = express();
const servoPositions: ServoPositions = {
  servo1: 90,
  servo2: 180,
};

// Get all servo positions
app.get('/getServoPositions', (req: Request, res: Response) => {
  res.json(servoPositions);
});

// Update position of a specific servo
app.put('/setServoPosition/:servoName', (req: Request, res: Response) => {
  const servoName = req.params.servoName;
  const newPosition = req.body.position;

  if (!newPosition) {
    return res.status(400).json({ error: 'Missing position data' });
  }

  try {
    servoPositions[servoName] = parseInt(newPosition);
    // Implement logic to control servo using newPosition value
    res.json({ message: `Servo ${servoName} position updated` });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data or servo name' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`))