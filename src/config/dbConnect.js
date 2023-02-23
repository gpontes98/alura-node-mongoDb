import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://alura:3WxKPTNWqzxvKix5@cluster0.sshsbjl.mongodb.net/alura-node"
);
export const db = mongoose.connection;
