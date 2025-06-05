const createNews = async (req, res) => {
  const { title, description, image_url, source } = req.body;
  const db = req.app.locals.db;

  try {
    const [result] = await db.execute(
      "INSERT INTO news (title, description, image_url, source, `like`, views, createdAt, updatedAt) VALUES (?, ?, ?, ?, 0, 0, NOW(), NOW())",
      [title, description, image_url, source]
    );

    res.status(201).json({
      status: "success",
      data: {
        id: result.insertId,
        title,
        description,
        image_url,
        source,
        like: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: "News created successfully",
    });
  } catch (error) {
    console.error("Create news failed", error);
    res.status(500).json({ status: "error", message: "Failed to create news" });
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
      return res.status(404).json({
        status: "error",
        message: "News not found",
      });
    }

    res.json({
      status: "success",
      data: news[0],
    });
  } catch (error) {
    console.error("Error getting news by id", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get news by id",
    });
  }
};

const updateNews = async (req, res) => {
  let { title, description, image_url, source, like, views } = req.body;
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute("SELECT id FROM news WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "News not found. Failed to update.",
      });
    }

    // Provide default values or keep existing?
    // Here assuming all are required; if optional, you can fetch existing and merge.

    // Convert like and views to numbers or null
    like = like !== undefined ? Number(like) : 0;
    views = views !== undefined ? Number(views) : 0;

    await db.execute(
      `UPDATE news SET title = ?, description = ?, image_url = ?, source = ?, \`like\` = ?, views = ?, updatedAt = NOW()
       WHERE id = ?`,
      [title, description, image_url, source, like, views, id]
    );

    res.json({
      status: "success",
      data: {
        id: parseInt(id),
        title,
        description,
        image_url,
        source,
        like,
        views,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Failed to update news", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update news",
    });
  }
};

const updateNewsLikes = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [updateResult] = await db.execute(
      "UPDATE news SET `like` = `like` + 1, updatedAt = NOW() WHERE id = ?",
      [id]
    );

    if (updateResult.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "News not found" });
    }

    const [updated] = await db.execute("SELECT `like` FROM news WHERE id = ?", [
      id,
    ]);

    res.json({
      status: "success",
      message: "Like count incremented",
      data: { id: parseInt(id), like: updated[0].like },
    });
  } catch (error) {
    console.error("Error updating likes:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to update likes" });
  }
};

const updateNewsViews = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [updateResult] = await db.execute(
      "UPDATE news SET views = views + 1, updatedAt = NOW() WHERE id = ?",
      [id]
    );

    if (updateResult.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "News not found" });
    }

    const [updated] = await db.execute("SELECT views FROM news WHERE id = ?", [
      id,
    ]);

    res.json({
      status: "success",
      message: "View count incremented",
      data: { id: parseInt(id), views: updated[0].views },
    });
  } catch (error) {
    console.error("Error updating views:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to update views" });
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

    await db.execute("DELETE FROM news WHERE id = ?", [id]);
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

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  updateNewsLikes,
  updateNewsViews,
  deleteNews,
};
