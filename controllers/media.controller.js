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

  if (!id || isNaN(id)) {
    return res.status(400).json({
      status: "error",
      message: "A valid media ID is required",
    });
  }

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
  const { id, name } = req.query;
  const db = req.app.locals.db;

  if (!id && !name) {
    return res.status(400).json({
      status: "error",
      message: "A section ID or name is required",
    });
  }

  try {
    let sectionQuery = "";
    let sectionParams = [];

    if (id) {
      if (isNaN(id)) {
        return res.status(400).json({
          status: "error",
          message: "Section ID must be a number",
        });
      }

      sectionQuery = "SELECT * FROM section WHERE id = ?";
      sectionParams = [id];
    } else {
      sectionQuery = "SELECT * FROM section WHERE name = ?";
      sectionParams = [name];
    }

    const [sectionRows] = await db.execute(sectionQuery, sectionParams);

    if (sectionRows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Section not found",
      });
    }

    const section = sectionRows[0];

    // 2. Fetch media for this section
    const [mediaRows] = await db.execute(
      `SELECT m.id, m.image_url, m.video_url, s.name AS section_name
       FROM media m
       JOIN section s ON m.section_id = s.id
       WHERE s.id = ?`,
      [section.id]
    );

    res.json({
      status: "success",
      data: mediaRows,
      message: mediaRows.length > 0
        ? "Media for section retrieved successfully"
        : "No media found for this section",
    });

  } catch (error) {
    console.error("Get media by section error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve media for section",
    });
  }
};

const createMedia = async (req, res) => {
  let { image_url, video_url, section_id } = req.body;
  const db = req.app.locals.db;

  image_url = image_url || null;
  video_url = video_url || null;

  if (!section_id) {
    return res.status(400).json({
      status: "error",
      message: "section_id is required",
    });
  }
  if (!image_url && !video_url) {
    return res.status(400).json({
      status: "error",
      message: "At least one of image_url or video_url is required",
    });
  }

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
  let { image_url, video_url, section_id } = req.body;
  const db = req.app.locals.db;

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Media ID is required",
    });
  }
  if (!section_id) {
    return res.status(400).json({
      status: "error",
      message: "section_id is required",
    });
  }
  image_url = image_url || null;
  video_url = video_url || null;
  try {
    const [rows] = await db.execute("SELECT id FROM media WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Media not found",
      });
    }

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

  if (!id || isNaN(id)) {
    return res.status(400).json({
      status: "error",
      message: "A valid media ID is required",
    });
  }

  try {
    const [rows] = await db.execute("SELECT id FROM media WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Media not found",
      });
    }

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
