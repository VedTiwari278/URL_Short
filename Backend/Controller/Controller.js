const URL = require("../model/UserData");
const shortid = require("shortid");
exports.getData = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await URL.findOne({ ShortCode: shortCode });
    if (urlDoc) {
      return res.redirect(urlDoc.originalUrl);
    } else {
      return res.status(404).send("URL not found");
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

exports.PostData = (req, res, next) => {
  const { original_url } = req.body;
  const ShortCode = shortid.generate();
  console.log(ShortCode);
  console.log(req.body);

  const URLData = new URL({
    originalUrl: original_url,
    ShortCode: ShortCode,
  });

  URLData.save();
  res.status(200).json({
    success: true,
    message: "URL saved successfully!",
    shortUrl: ShortCode,
  });
};
