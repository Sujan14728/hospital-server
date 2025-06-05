const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      "INSERT INTO admin (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.status(201).json({
      status: "success",
      data: { id: result.insertId, email },
      message: "Admin created successfully!!!",
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ status: "error", error: "Failed to create admin" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      status: "success",
      message: "Login successful!",
      token,
      data: { id: admin.id, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Login failed" });
  }
};

const getAdmin = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [admins] = await db.execute("SELECT id, email FROM admin");
    res.json({ status: "success", data: admins });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to get admins" });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute(
      "SELECT id, email FROM admin WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Admin not found" });
    }

    res.json({ status: "success", data: rows[0] });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to get admin" });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const db = req.app.locals.db;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute("UPDATE admin SET email = ?, password = ? WHERE id = ?", [
      email,
      hashedPassword,
      id,
    ]);

    res.json({
      status: "success",
      data: { id: parseInt(id), email },
      message: "Admin updated successfully!!!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to update admin" });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    await db.execute("DELETE FROM admin WHERE id = ?", [id]);
    res.json({ message: "Admin deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Failed to delete admin" });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
