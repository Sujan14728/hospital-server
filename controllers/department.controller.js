const getAllDepartments = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute("SELECT * FROM department");
    res.json({
      status: "success",
      data: rows,
      message: "Departments retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve departments",
    });
  }
};

const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute("SELECT * FROM department WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }
    res.json({
      status: "success",
      data: rows[0],
      message: "Department retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve department",
    });
  }
};

const createDepartment = async (req, res) => {
  const { name } = req.body;
  const db = req.app.locals.db;
  try {
    const [existing] = await db.execute(
      "SELECT * FROM department WHERE name = ?",
      [name]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Department name already exists",
      });
    }
    const [result] = await db.execute(
      "INSERT INTO department (name) VALUES (?)",
      [name]
    );
    res.status(201).json({
      status: "success",
      data: { id: result.insertId, name },
      message: "Department created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create department",
    });
  }
};

const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const db = req.app.locals.db;
  try {
    const [existing] = await db.execute(
      "SELECT id FROM department WHERE name = ? AND id != ?",
      [name, id]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Department name already exists",
      });
    }

    const [check] = await db.execute("SELECT id FROM department WHERE id = ?", [
      id,
    ]);
    if (check.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }

    await db.execute("UPDATE department SET name = ? WHERE id = ?", [name, id]);
    res.json({
      status: "success",
      data: { id: parseInt(id), name },
      message: "Department updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update department",
    });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [check] = await db.execute("SELECT id FROM department WHERE id = ?", [
      id,
    ]);
    if (check.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Department not found",
      });
    }

    await db.execute("DELETE FROM department WHERE id = ?", [id]);
    res.json({
      status: "success",
      data: { id: parseInt(id) },
      message: "Department deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete department",
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
