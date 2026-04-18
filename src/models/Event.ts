import { Schema, model, models } from 'mongoose'

export interface IEvent {
  _id: string
  title: string
  description: string
  slug: string
  organizerId: string
  image?: string
  location: {
    venue: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  startDate: Date
  endDate: Date
  timezone: string
  category: string
  visibility: 'public' | 'private'
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  capacity: number
  registeredCount: number
  totalRevenue: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide event description'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    organizerId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: true,
    },
    image: String,
    location: {
      venue: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
    category: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'completed'],
      default: 'draft',
    },
    capacity: Number,
    registeredCount: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
)

// Create index for slug
eventSchema.index({ slug: 1 })
eventSchema.index({ organizerId: 1 })
eventSchema.index({ startDate: 1 })

export default models.Event || model<IEvent>('Event', eventSchema)
