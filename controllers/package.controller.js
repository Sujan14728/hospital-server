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
module.exports = { createPackage, getPackage, getPackageById };
