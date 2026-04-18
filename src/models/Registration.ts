import { Schema, model, models } from 'mongoose'

export interface IRegistration {
  _id: string
  eventId: string
  userId: string
  ticketId: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  customFields?: Record<string, any>
  status: 'pending' | 'confirmed' | 'cancelled' | 'checked-in'
  paidAmount: number
  paymentId?: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  createdAt: Date
  updatedAt: Date
}

const registrationSchema = new Schema<IRegistration>(
  {
    eventId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Event',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: true,
    },
    ticketId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Ticket',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: String,
    customFields: Schema.Types.Mixed,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'checked-in'],
      default: 'pending',
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    paymentId: String,
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

registrationSchema.index({ eventId: 1 })
registrationSchema.index({ userId: 1 })
registrationSchema.index({ email: 1 })

export default models.Registration || model<IRegistration>('Registration', registrationSchema)
