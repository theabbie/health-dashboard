import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  age: number;
  medicalHistory: string[];
  treatmentPlan: string;
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  medicalHistory: { type: [String], required: true },
  treatmentPlan: { type: String, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Patient = mongoose.model<IPatient>('Patient', PatientSchema);

export default Patient;

