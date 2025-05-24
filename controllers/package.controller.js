const getAllPackages = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute("SELECT * FROM package");
    res.json({
      status: "success",
      data: rows,
      message: "Packages retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve packages",
    });
  }
};

const getPackageById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute("SELECT * FROM package WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Package not found",
      });
    }
    res.json({
      status: "success",
      data: rows[0],
      message: "Package retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve package",
    });
  }
};

const createPackage = async (req, res) => {
  const { title, price, discounted_price, status, checks, whatsappUrl } =
    req.body;
  const db = req.app.locals.db;
  try {
    const [existing] = await db.execute(
      "SELECT * FROM package WHERE title = ?",
      [title]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Package title already exists",
      });
    }
    const [result] = await db.execute(
      "INSERT INTO package (title, price, discounted_price, status, checks, whatsappUrl) VALUES (?, ?, ?, ?, ?, ?)",
      [title, price, discounted_price, status, checks, whatsappUrl]
    );
    res.status(201).json({
      status: "success",
      data: {
        id: result.insertId,
        title,
        price,
        discounted_price,
        status,
        checks,
        whatsappUrl,
      },
      message: "Package created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create package",
    });
  }
};

const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { title, price, discounted_price, status, checks, whatsappUrl } =
    req.body;
  const db = req.app.locals.db;
  try {
    const [existing] = await db.execute(
      "SELECT id FROM package WHERE title = ? AND id != ?",
      [title, id]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Package title already exists",
      });
    }
    const [result] = await db.execute(
      "UPDATE package SET title = ?, price = ?, discounted_price = ?, status = ?, checks = ?, whatsappUrl = ? WHERE id = ?",
      [title, price, discounted_price, status, checks, whatsappUrl, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Package not found",
      });
    }
    res.json({
      status: "success",
      data: {
        id: parseInt(id),
        title,
        price,
        discounted_price,
        status,
        checks,
        whatsappUrl,
      },
      message: "Package updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update package",
    });
  }
};

const deletePackage = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [result] = await db.execute("DELETE FROM package WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Package not found",
      });
    }
    res.json({
      status: "success",
      data: { id: parseInt(id) },
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete package",
    });
  }
};

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
