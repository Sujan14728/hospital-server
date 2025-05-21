const createGalleryImage = async (req, res) => {
  const { image_url, gallery_id } = req.body;
  const db = req.app.locals.db;

  if (!image_url || !gallery_id) {
    return res.status(400).json({
      status: "error",
      message: "Both image_url and gallery_id are required",
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
      "INSERT INTO gallery_image (image_url, gallery_id) VALUES (?, ?)",
      [image_url, gallery_id]
    );

    res.status(201).json({
      status: "success",
      data: { id: result.insertId, image_url, gallery_id },
      message: "Gallery image created successfully",
    });
  } catch (error) {
    console.error("Create gallery image error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to create gallery image" });
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
      "SELECT id, image_url, gallery_id FROM gallery_image WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery image not found" });
    }

    res.json({
      status: "success",
      data: rows[0],
      message: "Gallery image retrieved successfully",
    });
  } catch (error) {
    console.error("Get gallery image error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to retrieve gallery image" });
  }
};

const updateGalleryImage = async (req, res) => {
  const { id } = req.params;
  const { image_url, gallery_id } = req.body;
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

    if (gallery_id) {
      const [galleryExists] = await db.execute(
        "SELECT id FROM gallery WHERE id = ?",
        [gallery_id]
      );
      if (galleryExists.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Gallery not found" });
      }
    }

    await db.execute(
      "UPDATE gallery_image SET image_url = ?, gallery_id = ? WHERE id = ?",
      [image_url, gallery_id, id]
    );

    res.json({
      status: "success",
      data: { id: Number(id), image_url, gallery_id },
      message: "Gallery image updated successfully",
    });
  } catch (error) {
    console.error("Update gallery image error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to update gallery image" });
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
  console.log(req.query);
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
        SELECT gi.id, gi.image_url, g.name AS gallery_name
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
        SELECT gi.id, gi.image_url, g.name AS gallery_name
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
        message: "No images found for the given gallery",
      });
    }

    res.json({
      status: "success",
      data: rows,
      message: "Gallery images retrieved successfully",
    });
  } catch (error) {
    console.error("Get gallery images error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to retrieve gallery images" });
  }
};

module.exports = {
  createGalleryImage,
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryImagesByGallery,
};
