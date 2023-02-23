import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: true },
    endereco: { type: String },
  },
  {
    versionKey: false,
  }
);

export const editoras = mongoose.model("editoras", editoraSchema)
