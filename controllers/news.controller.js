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
  const db = req.app.locals.db;

  try {
    const [news] = await db.execute("SELECT * FROM news");
    res.json({
      status: "success",
      data: news,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get news",
    });
  }
};

const getNewsById = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  try {
    const [news] = await db.execute("SELECT * FROM news WHERE id = ?", [id]);
    if (news.length === 0) {
      res.status(404).json({
        status: "error",
        message: "News not found",
      });
    }

    res.json({
      status: "success",
      data: news[0],
    });
  } catch (error) {
    console.error("error getting news", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get new by id",
    });
  }
};

const updateNews = async (req, res) => {
  const { title, description, image_url, source } = req.body;
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute("SELECT id FROM news WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "News not found. Failed to find the news.",
      });
    }
    await db.execute(
      "UPDATE news SET title = ?, description= ?, image_url = ?, source = ? WHERE id = ?",
      [title, description, image_url, source, id]
    );
    res.json({
      status: "success",
      data: { id: parseInt(id), title, description, image_url, source },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update news",
    });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute("SELECT id FROM news WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "News not found. Failed to delete.",
      });
    }
    await db.execute("DELETE FROM news WHERE id =?", [id]);
    res.json({
      status: "success",
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete news.",
    });
  }
};
module.exports = { createNews, getNews, getNewsById, updateNews, deleteNews };
