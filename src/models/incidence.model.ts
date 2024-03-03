import mongoose, { Schema } from 'mongoose'
import { IIncidence } from '../types/incidence'

const IncidenceSchema: Schema = new mongoose.Schema(
  {
    location: { type: Number, required: true },
    basicDescription: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    status: { type: Number, required: true },
    comments: { type: [String], required: false },
    images: { type: [String], required: false },
  },
  {
    timestamps: true,
  },
)

const Incidence = mongoose.model<IIncidence>('Incidence', IncidenceSchema)
export default Incidence
