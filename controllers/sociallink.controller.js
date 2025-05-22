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
module.exports = { createSocialLink, getSocialLink };
