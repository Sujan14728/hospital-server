const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const adminRoutes = require("./routes/admin.route");
const sectionRoutes = require("./routes/section.route");
const mediaRoutes = require("./routes/media.route");
const galleryRoutes = require("./routes/gallery.route");
const specialityRoutes = require("./routes/speciality.route");
const departmentRoutes = require("./routes/department.route");
const doctorRoutes = require("./routes/doctor.route");
const packageRoutes = require("./routes/package.route");
const contactRoutes = require("./routes/contact.route");
const sociallinkRoutes = require("./routes/sociallink.route");

app.use("/api/admin", adminRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/speciality", specialityRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/package", packageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/sociallink", sociallinkRoutes);

module.exports = app;
