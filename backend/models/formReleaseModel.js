import mongoose from "mongoose";

const formReleaseSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique:true, },
    },
    {
      timestamps: true,
    }
  );

  const FormRelease = mongoose.model('FormRelease', formReleaseSchema);

  export default FormRelease;