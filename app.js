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
const contactRoutes = require("./routes/contact.route");
const sociallinkRoutes = require("./routes/sociallink.route");

app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/sociallink", sociallinkRoutes);

module.exports = app;
