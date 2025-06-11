const createGalleryImage = async (req, res) => {
  const { media_url, media_type, gallery_id } = req.body;
  const db = req.app.locals.db;

  if (!media_url || !media_type || !gallery_id) {
    return res.status(400).json({
      status: "error",
      message: "media_url, media_type, and gallery_id are required",
    });
  }

  if (!["image", "video"].includes(media_type)) {
    return res.status(400).json({
      status: "error",
      message: "media_type must be either 'image' or 'video'",
    });
  }

  try {
    const [galleryExists] = await db.execute(
      "SELECT id FROM gallery WHERE id = ?",
      [gallery_id]
    );
    if (galleryExists.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery not found" });
    }

    const [result] = await db.execute(
      "INSERT INTO gallery_image (media_url, media_type, gallery_id) VALUES (?, ?, ?)",
      [media_url, media_type, gallery_id]
    );

    res.status(201).json({
      status: "success",
      data: { id: result.insertId, media_url, media_type, gallery_id },
      message: "Gallery media created successfully",
    });
  } catch (error) {
    console.error("Create gallery media error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create gallery media",
    });
  }
};

const getGalleryImageById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ status: "error", message: "Valid image ID is required" });
  }

  try {
    const [rows] = await db.execute(
      "SELECT id, media_url, media_type, gallery_id FROM gallery_image WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery media not found" });
    }

    res.json({
      status: "success",
      data: rows[0],
      message: "Gallery media retrieved successfully",
    });
  } catch (error) {
    console.error("Get gallery media error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to retrieve gallery media" });
  }
};

const updateGalleryImage = async (req, res) => {
  const { id } = req.params;
  const { media_url, media_type, gallery_id } = req.body;
  const db = req.app.locals.db;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      status: "error",
      message: "Valid image ID is required",
    });
  }

  if (media_type && !["image", "video"].includes(media_type)) {
    return res.status(400).json({
      status: "error",
      message: "media_type must be either 'image' or 'video'",
    });
  }

  try {
    const [existing] = await db.execute(
      "SELECT * FROM gallery_image WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Gallery media not found",
      });
    }

    // Optional: check if gallery_id is changing and exists
    if (gallery_id) {
      const [galleryCheck] = await db.execute(
        "SELECT id FROM gallery WHERE id = ?",
        [gallery_id]
      );
      if (galleryCheck.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Gallery not found",
        });
      }
    }

    // Build dynamic SQL and params
    const fields = [];
    const values = [];

    if (media_url) {
      fields.push("media_url = ?");
      values.push(media_url);
    }

    if (media_type) {
      fields.push("media_type = ?");
      values.push(media_type);
    }

    if (gallery_id) {
      fields.push("gallery_id = ?");
      values.push(gallery_id);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "At least one field must be provided for update",
      });
    }

    values.push(id); // for WHERE clause

    await db.execute(
      `UPDATE gallery_image SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    res.json({
      status: "success",
      data: { id: Number(id), media_url, media_type, gallery_id },
      message: "Gallery media updated successfully",
    });
  } catch (error) {
    console.error("Update gallery media error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update gallery media",
    });
  }
};

const deleteGalleryImage = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ status: "error", message: "Valid image ID is required" });
  }

  try {
    const [imageExists] = await db.execute(
      "SELECT id FROM gallery_image WHERE id = ?",
      [id]
    );
    if (imageExists.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery image not found" });
    }

    await db.execute("DELETE FROM gallery_image WHERE id = ?", [id]);
    res.json({
      status: "success",
      data: { id: Number(id) },
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery image error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to delete gallery image" });
  }
};

const getGalleryImagesByGallery = async (req, res) => {
  const { gallery_id, gallery_name } = req.query;
  const db = req.app.locals.db;

  if (!gallery_id && !gallery_name) {
    return res.status(400).json({
      status: "error",
      message: "Query param 'gallery_id' or 'gallery_name' is required",
    });
  }

  try {
    let query, params;

    if (gallery_id) {
      if (isNaN(gallery_id)) {
        return res
          .status(400)
          .json({ status: "error", message: "gallery_id must be a number" });
      }

      const [exists] = await db.execute(
        "SELECT id, name FROM gallery WHERE id = ?",
        [gallery_id]
      );
      if (exists.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Gallery not found" });
      }

      query = `
        SELECT gi.id, gi.media_url, gi.media_type, g.name AS gallery_name
        FROM gallery_image gi
        JOIN gallery g ON gi.gallery_id = g.id
        WHERE gi.gallery_id = ?
      `;
      params = [gallery_id];
    } else {
      const [exists] = await db.execute(
        "SELECT id, name FROM gallery WHERE name = ?",
        [gallery_name]
      );
      if (exists.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Gallery not found" });
      }

      query = `
        SELECT gi.id, gi.media_url, gi.media_type, g.name AS gallery_name
        FROM gallery_image gi
        JOIN gallery g ON gi.gallery_id = g.id
        WHERE g.name = ?
      `;
      params = [gallery_name];
    }

    const [rows] = await db.execute(query, params);

    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No media found for the given gallery",
      });
    }

    res.json({
      status: "success",
      data: rows,
      message: "Gallery media retrieved successfully",
    });
  } catch (error) {
    console.error("Get gallery media error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to retrieve gallery media" });
  }
};

module.exports = {
  createGalleryImage,
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryImagesByGallery,
};
