const { default: axios } = require("axios");
const { oAuth2Client } = require("../config/oAuthConfig");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.googleAuth = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Code required",
            });
        }

        const { tokens } = await oAuth2Client.getToken(code);

        const { data } = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                },
            }
        );

        const { given_name, family_name, email, picture } = data;

        let user = await User.findOne({ email: email }).select("-createdAt -updatedAt -__v");

        if (!user) {
            user = await User.create({
                firstName: given_name,
                lastName: family_name,
                email,
                image: picture
            })
        } else if (picture !== user.image) {
            user.image = picture;
            await user.save();
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Logged in successfull.",
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateToken = async (req, res) => {
    try {
        const { AItoken } = req.body;
        if (!AItoken) {
            return res.status(400).json({
                success: false,
                message: "AIToken required",
            });
        }

        const user = await User.findById(req.user.id).select("-createdAt -updatedAt -__v");
        user.token = user.token - AItoken;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Token updated successfully.",
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}