const mongoose = require("mongoose");
const UrlSchema = mongoose.Schema({
  originalUrl: String,
  ShortCode: String,
});
module.exports = mongoose.model("SHORT_URL", UrlSchema);
