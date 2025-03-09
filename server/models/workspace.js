const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
    chats: {
        type: String,
        required: true,
        trim: true,
    },
    fileData: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    image: {
        type: String,
        trim: true,
    }
},
    { timestamps: true }
);

const Workspace = mongoose.model("Workspace", workspaceSchema);
module.exports = Workspace;