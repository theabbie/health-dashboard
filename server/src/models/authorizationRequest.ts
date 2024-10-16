import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthorizationRequest extends Document {
  patientId: mongoose.Types.ObjectId;
  treatmentDetails: string;
  requestStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorizationRequestSchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  treatmentDetails: { type: String, required: true },
  requestStatus: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
}, { timestamps: true });

const AuthorizationRequest = mongoose.model<IAuthorizationRequest>('AuthorizationRequest', AuthorizationRequestSchema);

export default AuthorizationRequest;

