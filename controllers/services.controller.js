const slugify = require("slugify");

const getAllServices = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute("SELECT * FROM services");
    res.json({
      status: "success",
      data: rows,
      message: "Services retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve services",
    });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute("SELECT * FROM services WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Service not found",
      });
    }
    res.json({
      status: "success",
      data: rows[0],
      message: "Service retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve service",
    });
  }
};

const getServiceBySlug = async (req, res) => {
  const { slug } = req.params;
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute("SELECT * FROM services WHERE slug = ?", [
      slug,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Service not found",
      });
    }

    res.json({
      status: "success",
      data: rows[0],
      message: "Service retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve service",
    });
  }
};

const createService = async (req, res) => {
  const db = req.app.locals.db;
  let { title, slug, summary, description, image, points, icon } = req.body;

  try {
    if (!slug) {
      slug = slugify(title, { lower: true, strict: true });
    }

    const [existing] = await db.execute(
      "SELECT id FROM services WHERE slug = ?",
      [slug]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Service slug already exists",
      });
    }

    const [result] = await db.execute(
      "INSERT INTO services (title, slug, summary, description, image, points, icon) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, slug, summary, description, image, points, icon]
    );

    res.status(201).json({
      status: "success",
      data: {
        id: result.insertId,
        title,
        slug,
        summary,
        description,
        image,
        points,
        icon,
      },
      message: "Service created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create service",
    });
  }
};

const updateService = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  let { title, slug, summary, description, image, points, icon } = req.body;

  try {
    if (!slug && title) {
      slug = slugify(title, { lower: true, strict: true });
    }

    const [existing] = await db.execute(
      "SELECT id FROM services WHERE slug = ? AND id != ?",
      [slug, id]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Service slug already exists",
      });
    }

    const [result] = await db.execute(
      "UPDATE services SET title = ?, slug = ?, summary = ?, description = ?, image = ?, points = ?, icon = ? WHERE id = ?",
      [title, slug, summary, description, image, points, icon, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Service not found",
      });
    }

    res.json({
      status: "success",
      data: {
        id: parseInt(id),
        title,
        slug,
        summary,
        description,
        image,
        points,
        icon,
      },
      message: "Service updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update service",
    });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [result] = await db.execute("DELETE FROM services WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Service not found",
      });
    }

    res.json({
      status: "success",
      data: { id: parseInt(id) },
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete service",
    });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
