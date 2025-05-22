const createNews = async (req, res) => {
  const { title, description, image_url, source } = req.body;
  const db = req.app.locals.db;

  try {
    const [result] = await db.execute(
      "INSERT INTO news ( title, description, image_url, source ) VALUE(?, ?, ?, ?)",
      [title, description, image_url, source]
    );
    res.status(201).json({
      status: "success",
      data: { id: result.insertId, title, description, image_url, source },
      message: "News created successfully",
    });
  } catch (error) {
    console.error("Create contact failed", error);
    res
      .status(500)
      .json({ status: "error", message: "failed to create contact" });
  }
};

const getNews = async (req, res) => {
  const db = req.app.local.db;

  try {
    const [news] = await db.execute("SELECT * FROM news");
  } catch (error) {}
};

module.exports = { createNews };
