import mongoose, { Schema } from 'mongoose'
import { IIncidence } from '../types/incidence'

export interface IIncidenceSchema extends IIncidence, Document {}

const IncidenceSchema: Schema = new mongoose.Schema(
  {
    incidenceLocation: { type: Number, required: true },
    basicDescription: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    status: { type: Number, required: true },
    comments: { type: [String], required: false },
    incidenceImages: {
      type: [{ uri: { type: String, required: true }, format: { type: String, required: true } }],
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v
      },
    },
  },
)

const Incidence = mongoose.model<IIncidenceSchema>('Incidence', IncidenceSchema)
export default Incidence
