require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

const authRoute = require("./routes/user");
const workRoute = require("./routes/work");
const paymentRoutes = require("./routes/payments");
const { connect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());

connect();
cloudinaryConnect();
app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/work-space", workRoute);
app.use("/api/v1/payment", paymentRoutes);

// testing
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

app.listen(port, () => {
    console.log(`app is listening to ${port}`);
})