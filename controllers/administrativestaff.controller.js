const createAdministrativeStaff = async (req, res) => {
  const { title, fullname } = req.body;
  const db = req.app.locals.db;
  try {
    const [result] = await db.execute(
      "INSERT INTO administrativestaff ( title, fullname) VALUE (?, ?)",
      [title, fullname]
    );

    res.status(200).json({
      status: "success",
      data: {
        id: result.insertId,
        title,
        fullname,
      },
      message: "Administrative staff added successfully",
    });
  } catch (error) {
    console.error("Error adding administrative staff", error);
    res.status(500).json({
      status: "error",
      message: "error adding administrative staff",
    });
  }
};

const getAdministrative = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const [administratives] = await db.execute(
      "SELECT * FROM administrativestaff"
    );
    res.json({
      status: "success",
      data: administratives,
    });
  } catch (error) {
    console.error("Failed to get administrativestaff", error);
    res.status(500).json({
      status: "error",
      message: "failed to get administrative details",
    });
  }
};

const getAdministrativeById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [administrative] = await db.execute(
      "SELECT * FROM administrativestaff WHERE id = ?",
      [id]
    );

    if (administrative.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }
    await res.json({
      status: "success",
      data: administrative[0],
    });
  } catch (error) {
    console.error("Error getting data", error);
    res.json({
      status: "error",
      message: "failed to get administrative staff data",
    });
  }
};

const updateAdministrative = async (req, res) => {
  const { title, fullname } = req.body;
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [existing] = await db.execute(
      "SELECT id FROM administrativestaff WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }

    await db.execute(
      "UPDATE administrativestaff SET title = ?, fullname = ? WHERE id = ?",
      [title, fullname, id]
    );
    res.json({
      status: "success",
      data: { id: parseInt(id), title, fullname },
      message: "Administrative detail updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update administrative details.",
    });
  }
};

const deleteAdministrative = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute(
      "SELECT id FROM administrativestaff WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }

    await db.execute("DELETE FROM administrativestaff WHERE id = ?", [id]);
    res.json({
      status: "message",
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Deleted successfully",
    });
  }
};

module.exports = {
  createAdministrativeStaff,
  getAdministrative,
  getAdministrativeById,
  updateAdministrative,
  deleteAdministrative,
};
