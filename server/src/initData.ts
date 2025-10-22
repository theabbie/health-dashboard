// Import required modules
import mongoose from 'mongoose'; // MongoDB object modeling tool
import dotenv from 'dotenv'; // To load environment variables from .env file
import Patient from './models/patient'; // Import the Patient model

// Load environment variables from .env file
dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect using the URI from the environment variable
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log any connection errors and exit the process
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Function to seed the database with sample patient data
const seedPatients = async () => {
  // Dummy patient records to populate the database
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
    // Remove any existing records to avoid duplicates
    await Patient.deleteMany();
    // Insert the dummy data into the database
    await Patient.insertMany(patients);
    console.log('Dummy patient data added successfully!');
  } catch (error) {
    // Handle any errors during seeding
    console.error('Error adding patient data:', error);
  } finally {
    // Close the database connection after completion
    mongoose.connection.close();
  }
};

// Main function to run database connection and seeding
const run = async () => {
  await connectDB(); // Connect to MongoDB
  await seedPatients(); // Insert sample patient data
};

// Execute the script
run();
