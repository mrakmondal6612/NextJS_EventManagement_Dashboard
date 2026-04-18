import { Schema, model, models } from 'mongoose'

export interface INotification {
  _id: string
  recipientId: string
  type: 'event_created' | 'registration_confirmed' | 'event_reminder' | 'event_cancelled' | 'payment'
  title: string
  message: string
  read: boolean
  actionUrl?: string
  relatedEventId?: string
  relatedRegistrationId?: string
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new Schema<INotification>(
  {
    recipientId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['event_created', 'registration_confirmed', 'event_reminder', 'event_cancelled', 'payment'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    actionUrl: String,
    relatedEventId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Event',
    },
    relatedRegistrationId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Registration',
    },
  },
  {
    timestamps: true,
  }
)

notificationSchema.index({ recipientId: 1, read: 1 })

export default models.Notification || model<INotification>('Notification', notificationSchema)
