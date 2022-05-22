import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique:true },
      phoneNumber: { type: String, required: true},
    },
    {
      timestamps: true,
    }
  );

  const Provider = mongoose.model('Provider', providerSchema);
  export default Provider;