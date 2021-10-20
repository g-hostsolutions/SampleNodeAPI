import { Document, Schema, model } from "mongoose";

interface Acronym {
  acronym: string
  value: string
}

export type Acronymum = Acronym & Document;

const AcronymSchema = new Schema({
  acronym: { required: true, type: String },
  value: { required: true, type: String },
});

export default model<Acronymum>("Acronym", AcronymSchema);
