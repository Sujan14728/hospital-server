const createContact = async (req, res) => {
  const { phone_number, work_hour, location, email } = req.body;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.execute("SELECT id FROM contact LIMIT 1");
    if (existing.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "A contact already exists.",
      });
    }
    const [result] = await db.execute(
      "INSERT INTO contact (phone_number, work_hour, location, email) VALUES (?, ?, ?, ?)",
      [phone_number, work_hour, location, email]
    );

    res.status(201).json({
      status: "success",
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

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { phone_number, work_hour, location, email } = req.body;
  const db = req.app.locals.db;

  try {
    await db.execute(
      " UPDATE contact SET phone_number = ?, work_hour = ?, location = ?, email = ? WHERE id = ?",
      [phone_number, work_hour, location, email, id]
    );
    res.json({
      status: "success",
      message: "Contact updated successfully",
      data: { id: parseInt(id), phone_number, work_hour, location, email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to update contact" });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    await db.execute("DELETE FROM contact WHERE id = ?", [id]);
    res.json({
      status: "success",
      message: "contact deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete contact",
    });
  }
};

module.exports = {
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
