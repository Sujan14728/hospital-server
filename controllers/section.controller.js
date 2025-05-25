const getAllSections = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute("SELECT * FROM section");

    res.json({
      status: "success",
      data: rows,
      message: "Sections retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve sections",
    });
  }
};

const getSectionById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute("SELECT * FROM section WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Section not found",
      });
    }

    res.json({
      status: "success",
      data: rows[0],
      message: "Section retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve section",
    });
  }
};

const createSection = async (req, res) => {
  const { name, description } = req.body;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute(
      "SELECT * FROM section WHERE name = ?",
      [name]
    );
    if (existing.length > 0) {
      res.json({
        status: "error",
        message: "Section name already exists",
      });
    }

    const [result] = await db.execute(
      "INSERT INTO section (name, description) VALUES (?, ?)",
      [name, description]
    );

    res.status(201).json({
      status: "success",
      data: { id: result.insertId, name, description },
      message: "Section created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to create section",
    });
  }
};

const updateSection = async (req, res) => {
  console.log(req);
  const { id } = req.params;
  const { name, description } = req.body;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute(
      "SELECT id FROM section WHERE name = ? AND id != ?",
      [name, id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Section name already exists",
      });
    }

    await db.execute(
      "UPDATE section SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );

    res.json({
      status: "success",
      data: { id: parseInt(id), name, description },
      message: "Section updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update section",
    });
  }
};

const deleteSection = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    await db.execute("DELETE FROM section WHERE id = ?", [id]);

    res.json({
      status: "success",
      data: { id: parseInt(id) },
      message: "Section deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete section",
    });
  }
};

module.exports = {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
};
