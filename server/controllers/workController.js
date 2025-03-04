const mongoose = require("mongoose");
const Workspace = require("../models/workspace");

exports.createWorkSpace = async (req, res) => {
    try {
        const { chats } = req.body;
        if (chats.length === 0) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            })
        }

        const workSpace = await Workspace.create({
            chats: chats,
            user: req.user.id
        })

        return res.status(200).json({
            success: true,
            message: "Created.",
            data: workSpace
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getWorkSpace = async (req, res) => {
    try {
        const { workId } = req.body;
        if (!workId) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            })
        }

        const workspace = await Workspace.findById(workId);

        return res.status(200).json({
            success: true,
            message: "Data Fetched successfully.",
            data: workspace
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateWorkSpace = async (req, res) => {
    try {
        const { workId, chats, files, type } = req.body;
        if (!workId || !type) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            })
        }

        let workspace = await Workspace.findById(workId);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Data not found."
            })
        }

        if (type === "chat") {
            workspace.chats = chats;
            await workspace.save();
        } else if (type === "file") {
            workspace.fileData = files;
            await workspace.save();
        }

        return res.status(200).json({
            success: true,
            message: "Data updated successfully.",
            data: workspace
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteWorkSpace = async (req, res) => {
    try {
        const { workId } = req.body;
        if (!workId) {
            return res.status(401).json({
                success: false,
                message: "All fields are required."
            })
        }
        const uid = new mongoose.Types.ObjectId(req.user.id);
        let workspace = await Workspace.findOne({ _id: workId, user: uid });
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "You are not the owner of these files."
            })
        }

        await Workspace.findByIdAndDelete(workId);

        return res.status(200).json({
            success: true,
            message: "Data deleted successfully.",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllWorkSpaces = async (req, res) => {
    try {

        const mongoUserId = new mongoose.Types.ObjectId(req.user.id);
        const workspace = await Workspace.find({ user: mongoUserId }).sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Data Fetched successfully.",
            data: workspace
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}