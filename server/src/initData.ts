import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Patient from './models/patient';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedPatients = async () => {
  const patients = [
    {
      name: 'John Doe',
      age: 30,
      medicalHistory: 'No known allergies.',
      treatmentPlan: 'Regular check-ups every 6 months.',
    },
    {
      name: 'Jane Smith',
      age: 25,
      medicalHistory: 'Asthma, allergic to penicillin.',
      treatmentPlan: 'Inhaler use as needed.',
    },
    {
      name: 'Alice Johnson',
      age: 40,
      medicalHistory: 'Diabetes type 2.',
      treatmentPlan: 'Insulin therapy and diet management.',
    },
    {
      name: 'Bob Brown',
      age: 55,
      medicalHistory: 'High blood pressure.',
      treatmentPlan: 'Medication and lifestyle changes.',
    },
    {
      name: 'Charlie Davis',
      age: 60,
      medicalHistory: 'Heart disease.',
      treatmentPlan: 'Regular cardiology check-ups.',
    },
  ];

  try {
    await Patient.deleteMany();
    await Patient.insertMany(patients);
    console.log('Dummy patient data added successfully!');
  } catch (error) {
    console.error('Error adding patient data:', error);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  await connectDB();
  await seedPatients();
};

run();
