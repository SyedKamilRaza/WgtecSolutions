const AutoReply = require("../model/autoReplyModel");

// Create auto-reply
exports.createAutoReply = async (req, res) => {
  try {
    const {
      adminId,
      title,
      message,
      category,
      triggerKeywords,
      responseDelay,
      maxUsesPerDay,
      attachments,
    } = req.body;

    const autoReply = new AutoReply({
      adminId,
      title,
      message,
      category: category || "custom",
      triggerKeywords: triggerKeywords || [],
      responseDelay: responseDelay || 0,
      maxUsesPerDay: maxUsesPerDay || null,
      attachments: attachments || [],
    });

    await autoReply.save();

    res.status(201).json({
      success: true,
      data: autoReply,
      message: "Auto-reply created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all auto-replies for admin
exports.getAutoReplies = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { isActive } = req.query;

    let query = { adminId };

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const autoReplies = await AutoReply.find(query).sort({ createdAt: -1 }).exec();

    res.status(200).json({
      success: true,
      data: autoReplies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single auto-reply
exports.getAutoReply = async (req, res) => {
  try {
    const { autoReplyId } = req.params;

    const autoReply = await AutoReply.findById(autoReplyId);

    if (!autoReply) {
      return res.status(404).json({
        success: false,
        message: "Auto-reply not found",
      });
    }

    res.status(200).json({
      success: true,
      data: autoReply,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update auto-reply
exports.updateAutoReply = async (req, res) => {
  try {
    const { autoReplyId } = req.params;
    const { title, message, category, triggerKeywords, responseDelay, maxUsesPerDay, isActive, attachments } = req.body;

    const autoReply = await AutoReply.findByIdAndUpdate(
      autoReplyId,
      {
        title,
        message,
        category,
        triggerKeywords,
        responseDelay,
        maxUsesPerDay,
        isActive,
        attachments,
      },
      { new: true }
    );

    if (!autoReply) {
      return res.status(404).json({
        success: false,
        message: "Auto-reply not found",
      });
    }

    res.status(200).json({
      success: true,
      data: autoReply,
      message: "Auto-reply updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete auto-reply
exports.deleteAutoReply = async (req, res) => {
  try {
    const { autoReplyId } = req.params;

    const autoReply = await AutoReply.findByIdAndDelete(autoReplyId);

    if (!autoReply) {
      return res.status(404).json({
        success: false,
        message: "Auto-reply not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Auto-reply deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Toggle auto-reply active status
exports.toggleAutoReply = async (req, res) => {
  try {
    const { autoReplyId } = req.params;

    const autoReply = await AutoReply.findById(autoReplyId);

    if (!autoReply) {
      return res.status(404).json({
        success: false,
        message: "Auto-reply not found",
      });
    }

    autoReply.isActive = !autoReply.isActive;
    await autoReply.save();

    res.status(200).json({
      success: true,
      data: autoReply,
      message: "Auto-reply status toggled",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get auto-reply by keyword
exports.getAutoReplyByKeyword = async (req, res) => {
  try {
    const { keyword, adminId } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const autoReply = await AutoReply.findOne({
      adminId,
      isActive: true,
      triggerKeywords: keyword,
    });

    if (!autoReply) {
      return res.status(404).json({
        success: false,
        message: "No auto-reply found for this keyword",
      });
    }

    // Update usage count
    autoReply.usageCount += 1;
    autoReply.lastUsedAt = new Date();
    await autoReply.save();

    res.status(200).json({
      success: true,
      data: autoReply,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
