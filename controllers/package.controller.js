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
module.exports = { createPackage, getPackage };
