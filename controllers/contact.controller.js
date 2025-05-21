const createContact = async (req, res) => {
  const { phone_number, work_hour, location, email } = req.body;
  const db = req.app.locals.db;

  try {
    const [result] = await db.execute(
      "INSERT INTO contact (phone_number, work_hour, location, email) VALUES (?, ?, ?, ?)",
      [phone_number, work_hour, location, email]
    );

    res.status(201).json({
      staus: "success",
      data: { id: result.insertId, phone_number, work_hour, location, email },
      message: "Contact created successfully!",
    });
  } catch (error) {
    console.error("Create contact error:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to create contact" });
  }
};

const getContact = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [contacts] = await db.execute("SELECT * FROM contact");
    res.json({ status: "success", data: contacts });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to get contacts" });
  }
};

module.exports = {
  createContact,
  getContact,
};
