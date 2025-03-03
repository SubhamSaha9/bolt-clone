const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

exports.oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage',
);