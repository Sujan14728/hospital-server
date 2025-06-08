const getAllInquiries = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM inquiries ORDER BY created_at DESC"
    );
    res.json({
      status: "success",
      data: rows,
      message: "Inquiries retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve inquiries",
    });
  }
};

const getInquiryById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute("SELECT * FROM inquiries WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Inquiry not found",
      });
    }
    res.json({
      status: "success",
      data: rows[0],
      message: "Inquiry retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve inquiry",
    });
  }
};

const createInquiry = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const db = req.app.locals.db;
  try {
    const [result] = await db.execute(
      "INSERT INTO inquiries (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())",
      [name, email, subject, message]
    );
    res.status(201).json({
      status: "success",
      data: { id: result.insertId, name, email, subject, message },
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create inquiry",
    });
  }
};
const updateInquiry = async (req, res) => {
  const { id } = req.params;
  const { name, email, subject, message } = req.body;
  const db = req.app.locals.db;

  try {
    const [result] = await db.execute(
      "UPDATE inquiries SET name = ?, email = ?, subject = ?, message = ? WHERE id = ?",
      [name, email, subject, message, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Inquiry not found",
      });
    }

    res.json({
      status: "success",
      data: { id: parseInt(id), name, email, subject, message },
      message: "Inquiry updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update inquiry",
    });
  }
};

const deleteInquiry = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  try {
    const [result] = await db.execute("DELETE FROM inquiries WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Inquiry not found",
      });
    }

    return res.json({
      status: "success",
      data: { id: parseInt(id) },
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to delete inquiry",
    });
  }
};

module.exports = {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
};
