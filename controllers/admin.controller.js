const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json({
      status: "success",
      data: admin,
      message: "Admin created successfully!!!",
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Failed to create admin" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log(1);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }
    console.log(2);

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    console.log(3);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    console.log(4);

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
  try {
    const admins = await prisma.admin.findMany();
    res.json({ status: "success", data: admins });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to get admins" });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(id) },
    });
    if (!admin)
      return res
        .status(404)
        .json({ status: "error", message: "Admin not found" });
    res.json({ status: "success", data: admin });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to get admin" });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data: { email, password },
    });
    res.json({
      status: "success",
      data: admin,
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
  try {
    await prisma.admin.delete({
      where: { id: parseInt(id) },
    });
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
