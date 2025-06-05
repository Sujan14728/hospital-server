const createSocialLink = async (req, res) => {
  const { site, link } = req.body;
  const db = req.app.locals.db;

  try {
    const [result] = await db.execute(
      "INSERT INTO social_links (site, link) VALUES (?, ?)",
      [site, link]
    );

    res.status(201).json({
      status: "success",
      data: { id: result.insertId, site, link },
      message: "Social link created successfully",
    });
  } catch (error) {
    console.error("Create social link error", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to create social links" });
  }
};

const getSocialLink = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [sociallink] = await db.execute("SELECT * FROM social_links");
    res.json({ status: "success", data: sociallink });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to get social links" });
  }
};
const getSocialLinkById = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  try {
    const [sociallink] = await db.execute(
      "SELECT * FROM social_links WHERE id = ?",
      [id]
    );
    if (sociallink.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Social link not found",
      });
    }
    res.json({
      status: "success",
      data: sociallink[0],
    });
  } catch (error) {
    console.error("Error on getting social link by id", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get social link",
    });
  }
};

const updateSocialLink = async (req, res) => {
  const { id } = req.params;
  const { site, link } = req.body;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute(
      "SELECT id FROM social_links WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Social link not found. Failed to update",
      });
    }
    await db.execute(
      "UPDATE social_links SET site = ?, link = ? WHERE id = ?",
      [site, link, id]
    );
    res.json({
      status: "success",
      message: "Social links successfully updated",
      data: { id: parseInt(id), link, site },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to Update the social links",
    });
  }
};

const deleteSocialLink = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [result] = await db.execute("DELETE FROM social_links WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Social link not found",
      });
    }

    res.json({
      status: "success",
      message: "Social link deleted successfully",
      data: { id: parseInt(id) },
    });
  } catch (error) {
    console.error("Delete social link error", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete social link",
    });
  }
};

module.exports = {
  createSocialLink,
  getSocialLink,
  getSocialLinkById,
  updateSocialLink,
  deleteSocialLink,
};
