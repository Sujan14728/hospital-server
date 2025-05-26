const createPackage = async (req, res) => {
  const { title, price, discounted_price, status, checks, whatsappUrl } =
    req.body;
  const db = req.app.locals.db;

  try {
    const [result] = await db.execute(
      "INSERT INTO package (title, price, discounted_price, status, checks, whatsappUrl) VALUE(?, ?, ?, ?, ?, ?)",
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
      messgae: "Package created successfully",
    });
  } catch (error) {
    console.error("Error createing package", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create package",
    });
  }
};

const getPackage = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const [package] = await db.execute("SELECT * FROM package");
    res.json({
      status: "sucess",
      data: package,
    });
  } catch (error) {
    res.status(500).json({
      status: "success",
      message: "Failed to get the packages",
    });
  }
};

const getPackageById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [package] = await db.execute("SELECT * FROM package WHERE id = ?", [
      id,
    ]);
    if (package.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Package not found",
      });
    }
    res.json({
      status: "success",
      data: package[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get the package",
    });
  }
};

const updatePackage = async (req, res) => {
  const { title, price, discounted_price, status, checks, whatsappUrl } =
    req.body;
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute(
      " SELECT id FROM package WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      res.status(404).json({
        status: "error",
        message: "package not found",
      });
    }
    await db.execute(
      "UPDATE package SET title = ?, price =?, discounted_price = ?, status = ?, checks = ?, whatsappUrl = ?",
      [title, price, discounted_price, status, checks, whatsappUrl]
    );
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
      messgae: "Package successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update",
    });
  }
};

const deletePackage = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [existing] = await db.execute("SELECT id FROM package WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      req.status(404).json({
        status: "error",
        message: "Package not found.",
      });
    }
    await db.execute("DELETE FROM package WHERE id = ?", [id]);
    res.json({
      status: "success",
      message: "Package deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete package.",
    });
  }
};
module.exports = {
  createPackage,
  getPackage,
  getPackageById,
  updatePackage,
  deletePackage,
};
