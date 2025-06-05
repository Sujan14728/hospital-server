const getAllSpecialities = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute("SELECT * FROM speciality");
    res.json({
      status: "success",
      data: rows,
      message: "Specialities retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve specialities",
    });
  }
};

const getSpecialityById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute("SELECT * FROM speciality WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Speciality not found",
      });
    }
    res.json({
      status: "success",
      data: rows[0],
      message: "Speciality retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve speciality",
    });
  }
};

const createSpeciality = async (req, res) => {
  const { name } = req.body;
  const db = req.app.locals.db;
  try {
    const [existing] = await db.execute(
      "SELECT * FROM speciality WHERE name = ?",
      [name]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Speciality name already exists",
      });
    }
    const [result] = await db.execute(
      "INSERT INTO speciality (name) VALUES (?)",
      [name]
    );
    res.status(201).json({
      status: "success",
      data: { id: result.insertId, name },
      message: "Speciality created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create speciality",
    });
  }
};
const updateSpeciality = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const db = req.app.locals.db;
  try {
    const [existing] = await db.execute(
      "SELECT id FROM speciality WHERE name = ? AND id != ?",
      [name, id]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Speciality name already exists",
      });
    }
    const [result] = await db.execute(
      "UPDATE speciality SET name = ? WHERE id = ?",
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Speciality not found",
      });
    }
    res.json({
      status: "success",
      data: { id: parseInt(id), name },
      message: "Speciality updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update speciality",
    });
  }
};

const deleteSpeciality = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [result] = await db.execute("DELETE FROM speciality WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Speciality not found",
      });
    }

    return res.json({
      status: "success",
      data: { id: parseInt(id) },
      message: "Speciality deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to delete speciality",
    });
  }
};

module.exports = {
  getAllSpecialities,
  getSpecialityById,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
};
