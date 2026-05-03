import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const chatSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'New conversation' },
    messages: [messageSchema],
  },
  { timestamps: true }
);

chatSchema.index({ updatedAt: -1 });

export const Chat = mongoose.model('Chat', chatSchema);
