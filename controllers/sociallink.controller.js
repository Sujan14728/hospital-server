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

const updateSocialLink = async (req, res) => {
  const { id } = req.params;
  const { site, link } = req.body;
  const db = req.app.locals.db;

  try {
    await db.execute(
      "UPDATE social_links SET site = ?, link = ? WHERE id = ?",
      [link, site, id]
    );
    res.json({
      status: "success",
      message: "Social links succussfully updated",
      data: { id: parseInt(id), link, site },
    });
  } catch (error) {
    res.status(500).json({
      status: "success",
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
  updateSocialLink,
  deleteSocialLink,
};
