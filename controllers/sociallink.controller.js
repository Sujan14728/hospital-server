const createSocialLinks = async (req, res) => {
  const { facebook, instagram, linkedIn } = req.body;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute("SELECT id FROM social_links LIMIT 1");
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Social links already exist.",
      });
    }

    const [result] = await db.execute(
      "INSERT INTO social_links (facebook, instagram, linkedIn) VALUES (?, ?, ?)",
      [facebook, instagram, linkedIn]
    );

    res.status(201).json({
      status: "success",
      data: { id: result.insertId, facebook, instagram, linkedIn },
      message: "Social links created successfully!",
    });
  } catch (error) {
    console.error("Create social links error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to create social links" });
  }
};

const getSocialLinks = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute("SELECT * FROM social_links");
    res.json({ status: "success", data: rows });
  } catch (error) {
    console.error("Get social links error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to get social links" });
  }
};

const getSocialLinksById = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const [rows] = await db.execute("SELECT * FROM social_links WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Social links not found" });
    }

    res.json({
      status: "success",
      data: rows[0],
    });
  } catch (error) {
    console.error("Get social links by id error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to get social links" });
  }
};

const updateSocialLinks = async (req, res) => {
  const { id } = req.params;
  const { facebook, instagram, linkedIn } = req.body;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute(
      "SELECT id FROM social_links WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Social links not found. Failed to update.",
      });
    }

    await db.execute(
      "UPDATE social_links SET facebook = ?, instagram = ?, linkedIn = ? WHERE id = ?",
      [facebook, instagram, linkedIn, id]
    );

    res.json({
      status: "success",
      data: { id: parseInt(id), facebook, instagram, linkedIn },
      message: "Social links updated successfully",
    });
  } catch (error) {
    console.error("Update social links error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to update social links" });
  }
};

const deleteSocialLinks = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute(
      "SELECT id FROM social_links WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Social links not found. Failed to delete.",
      });
    }

    await db.execute("DELETE FROM social_links WHERE id = ?", [id]);

    res.json({
      status: "success",
      message: "Social links deleted successfully",
    });
  } catch (error) {
    console.error("Delete social links error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to delete social links" });
  }
};

module.exports = {
  createSocialLinks,
  getSocialLinks,
  getSocialLinksById,
  updateSocialLinks,
  deleteSocialLinks,
};
