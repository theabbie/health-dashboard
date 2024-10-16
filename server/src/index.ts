import express from 'express';
import connectDB from './config';
import Patient from './models/patient';
import AuthorizationRequest from './models/authorizationRequest';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/patients', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/authorization-requests', async (req, res) => {
  try {
    const { patientId, treatmentDetails } = req.body;
    const newRequest = new AuthorizationRequest({ patientId, treatmentDetails });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

