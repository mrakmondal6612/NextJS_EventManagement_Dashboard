import { Schema, model, models } from 'mongoose'

export interface ITicket {
  _id: string
  eventId: string
  name: string
  description?: string
  type: 'free' | 'paid'
  price: number
  quantity: number
  quantitySold: number
  currency: string
  saleStartDate: Date
  saleEndDate: Date
  createdAt: Date
  updatedAt: Date
}

const ticketSchema = new Schema<ITicket>(
  {
    eventId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Event',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide ticket name'],
    },
    description: String,
    type: {
      type: String,
      enum: ['free', 'paid'],
      default: 'paid',
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    quantitySold: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    saleStartDate: {
      type: Date,
      required: true,
    },
    saleEndDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

ticketSchema.index({ eventId: 1 })

export default models.Ticket || model<ITicket>('Ticket', ticketSchema)
