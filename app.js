const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN,
      "https://nisargahospitalnepal.com",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/uploads")));
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
const newsRoutes = require("./routes/news.route");
const testimonialRoutes = require("./routes/testimonial.route");
const administrativestaffRoutes = require("./routes/administrativestaff.route");
const inquiriesRoutes = require("./routes/inquiries.route");
const servicesRouter = require("./routes/services.route");

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
app.use("/api/news", newsRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/administrativestaff", administrativestaffRoutes);
app.use("/api/services", servicesRouter);

module.exports = app;
