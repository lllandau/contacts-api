const mongoose = require("mongoose");

const { Schema } = mongoose;

const trimmedString = options => ({
  type: String,
  trim: true,
  ...options
});

const NameSchema = new Schema(
  {
    first_name: trimmedString({ required: true }),
    last_name: trimmedString()
  },
  { _id: false }
);

const AdressSchema = new Schema(
  {
    City: String
  },
  { _id: false }
);

const PhoneSchema = new Schema(
  {
    landline: Number
  },
  { _id: false }
);

const ContactSchema = new Schema({
  person: {
    type: NameSchema
  },

  adress: {
    type: AdressSchema
  },

  phone: {
    type: PhoneSchema
  }
  //email: String
});

module.exports = mongoose.model("Contact", ContactSchema);
