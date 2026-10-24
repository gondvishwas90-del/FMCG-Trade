import mongoose, { Schema, model, models } from 'mongoose';

export interface ILead {
  _id?: string;
  name: string;
  phone?: string;
  email?: string;
  message: string;
  source: 'whatsapp_widget';
  whatsappStatus: 'pending' | 'sent' | 'template_sent' | 'delivered' | 'read' | 'failed';
  whatsappMessageId?: string;
  whatsappError?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name:              { type: String, required: true },
    phone:             { type: String, default: '' },
    email:             { type: String, default: '' },
    message:           { type: String, required: true },
    source:            { type: String, default: 'whatsapp_widget' },
    whatsappStatus:    { type: String, enum: ['pending', 'sent', 'template_sent', 'delivered', 'read', 'failed'], default: 'pending' },
    whatsappMessageId: { type: String, default: '' },
    whatsappError:     { type: String, default: '' },
  },
  { timestamps: true }
);

// Delete cached model to pick up schema changes (phone is now optional)
if (models.Lead) {
  delete models.Lead;
}
const Lead = model<ILead>('Lead', LeadSchema);

export default Lead;
