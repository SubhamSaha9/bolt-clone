const axios = require("axios");
const { instance } = require("../config/rajorpay");
const User = require("../models/user");
const crypto = require("crypto");

exports.capturePayment = async (req, res) => {
    const { creditType } = req.body;
    const userId = req.user.id;

    if (!creditType || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please Provide valid credentails",
        });
    }

    let amount;
    switch (creditType) {
        case 'Basic':
            amount = 4.99;
            break;
        case 'Starter':
            amount = 9.99;
            break;
        case 'Pro':
            amount = 19.99;
            break;
        case 'Unlimted (License)':
            amount = 19.99;
            break;
        default:
            break;
    }

    try {

        const { data } = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');

        if (!data) {
            return res.status(201).json({
                success: false,
                message: "Failed to load exchange rates",
            })
        }
        const exchangeRate = data.rates.INR;
        const options = {
            amount: Math.round(amount * exchangeRate * 100),
            currency: "INR",
            receipt: Math.floor(Math.random(Date.now()) * 10000).toString(),
        }

        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: "order Initiated",
            data: paymentResponse,
        });
    } catch (error) {
        console.log("error in payment init......................", error)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const tokens = req.body?.tokens;

    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !tokens || !userId) {
        return res.status(200).json({
            success: false,
            message: "payment failed",
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if (expectedSignature === razorpay_signature) {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        user.token += tokens;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Payment Verified",
            data: user.token
        });
    }

    return res.status(200).json({
        success: false,
        message: "payment failed",
    });
}

