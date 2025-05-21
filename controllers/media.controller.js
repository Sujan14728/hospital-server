const getAllMedia = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute("SELECT * FROM media");

    res.json({
      status: "success",
      data: rows,
      message: "Media retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve media",
    });
  }
};

const getMediaById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute("SELECT * FROM media WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Media not found",
      });
    }

    res.json({
      status: "success",
      data: rows[0],
      message: "Media retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve media",
    });
  }
};

const getMediaBySection = async (req, res) => {
  const { sectionId } = req.params;
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM media WHERE section_id = ?",
      [sectionId]
    );

    res.json({
      status: "success",
      data: rows,
      message: "Media for section retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve media for section",
    });
  }
};

const createMedia = async (req, res) => {
  const { image_url, video_url, section_id } = req.body;
  const db = req.app.locals.db;

  try {
    const [result] = await db.execute(
      "INSERT INTO media (image_url, video_url, section_id) VALUES (?, ?, ?)",
      [image_url, video_url, section_id]
    );

    res.status(201).json({
      status: "success",
      data: { id: result.insertId, image_url, video_url, section_id },
      message: "Media created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create media",
    });
  }
};

const updateMedia = async (req, res) => {
  const { id } = req.params;
  const { image_url, video_url, section_id } = req.body;
  const db = req.app.locals.db;

  try {
    await db.execute(
      "UPDATE media SET image_url = ?, video_url = ?, section_id = ? WHERE id = ?",
      [image_url, video_url, section_id, id]
    );

    res.json({
      status: "success",
      data: { id: parseInt(id), image_url, video_url, section_id },
      message: "Media updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update media",
    });
  }
};

const deleteMedia = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    await db.execute("DELETE FROM media WHERE id = ?", [id]);

    res.json({
      status: "success",
      data: { id: parseInt(id) },
      message: "Media deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete media",
    });
  }
};

module.exports = {
  getAllMedia,
  getMediaById,
  getMediaBySection,
  createMedia,
  updateMedia,
  deleteMedia,
};
