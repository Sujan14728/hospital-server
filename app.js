const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const adminRoutes = require("./routes/admin.route");
const sectionRoutes = require("./routes/section.route");
const mediaRoutes = require('./routes/media.route')

app.use("/api/admin", adminRoutes);
app.use("/api/section", sectionRoutes);
app.use('/api/media',mediaRoutes)

module.exports = app;
