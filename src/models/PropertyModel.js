// FIXME add your Mongoose schema and model here

const mongoose = require("mongoose");
const { Schema } = mongoose;

const propertySchema = new Schema(
  {
    askingPrice: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
