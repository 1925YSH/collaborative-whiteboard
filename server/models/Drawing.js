import mongoose from 'mongoose';

const commandSchema = new mongoose.Schema({
  type: String,
  data: {
    x0: Number,
    y0: Number,
    x1: Number,
    y1: Number,
    color: String,
    stroke: Number
  },
  timestamp: Date
});

const drawingSchema = new mongoose.Schema({
  roomId: String,
  commands: [commandSchema]
});

export const Drawing = mongoose.model('Drawing', drawingSchema);
