const createGallery = async (req, res) => {
  const { name, thumbnail_url } = req.body;
  const db = req.app.locals.db;

  if (!name) {
    return res.status(400).json({ status: "error", message: "Name is required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO gallery (name, thumbnail_url) VALUES (?, ?)",
      [name, thumbnail_url || null]
    );

    res.status(201).json({
      status: "success",
      data: { id: result.insertId, name, thumbnail_url },
      message: "Gallery created successfully",
    });
  } catch (error) {
    console.error("Create gallery error:", error);
    res.status(500).json({ status: "error", message: "Failed to create gallery" });
  }
};

const getAllGalleries = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute("SELECT id, name, thumbnail_url FROM gallery");

    res.json({
      status: "success",
      data: rows,
      message: rows.length > 0 ? "Galleries retrieved successfully" : "No galleries found",
    });
  } catch (error) {
    console.error("Get all galleries error:", error);
    res.status(500).json({ status: "error", message: "Failed to retrieve galleries" });
  }
};

const getGalleryById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  if (!id || isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Valid gallery ID is required" });
  }

  try {
    const [rows] = await db.execute("SELECT id, name, thumbnail_url FROM gallery WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Gallery not found" });
    }

    res.json({ status: "success", data: rows[0], message: "Gallery retrieved successfully" });
  } catch (error) {
    console.error("Get gallery by ID error:", error);
    res.status(500).json({ status: "error", message: "Failed to retrieve gallery" });
  }
};

const updateGallery = async (req, res) => {
  const { id } = req.params;
  const { name, thumbnail_url } = req.body;
  const db = req.app.locals.db;

  if (!id || isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Valid gallery ID is required" });
  }

  try {
    // Check if gallery exists
    const [existing] = await db.execute("SELECT id FROM gallery WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ status: "error", message: "Gallery not found" });
    }

    await db.execute(
      "UPDATE gallery SET name = ?, thumbnail_url = ? WHERE id = ?",
      [name, thumbnail_url, id]
    );

    res.json({ status: "success", data: { id: Number(id), name, thumbnail_url }, message: "Gallery updated successfully" });
  } catch (error) {
    console.error("Update gallery error:", error);
    res.status(500).json({ status: "error", message: "Failed to update gallery" });
  }
};

const deleteGallery = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  if (!id || isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Valid gallery ID is required" });
  }

  try {
    // Check if gallery exists
    const [existing] = await db.execute("SELECT id FROM gallery WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ status: "error", message: "Gallery not found" });
    }

    await db.execute("DELETE FROM gallery WHERE id = ?", [id]);
    res.json({ status: "success", data: { id: Number(id) }, message: "Gallery deleted successfully" });
  } catch (error) {
    console.error("Delete gallery error:", error);
    res.status(500).json({ status: "error", message: "Failed to delete gallery" });
  }
};

module.exports = {
  createGallery,
  getAllGalleries,
  getGalleryById,
  updateGallery,
  deleteGallery,
};
