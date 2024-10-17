import express from 'express';
import connectDB from './config';
import Patient from './models/patient';
import AuthorizationRequest from './models/authorizationRequest';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/patients', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const patients = await Patient.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    
    const totalPatients = await Patient.countDocuments();
    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      total: totalPatients,
      patients,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
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

