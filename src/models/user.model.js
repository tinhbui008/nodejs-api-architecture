const mongoose = require("mongoose"); // Erase if already required\
const DOC_NAME='test'
const COLLECT_NAME='user'

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: Array,
    default: [],
  },
}, {
    timestamps: true,
    collection: COLLECT_NAME
});

//Export the model
module.exports = mongoose.model(DOC_NAME, userSchema);
