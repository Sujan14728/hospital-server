const createTestimonials = async (req, res) => {
  const { full_name, message, image_url, video_url } = req.body;
  const db = req.app.locals.db;

  try {
    const [resutl] = await db.execute(
      "INSERT INTO testimonial (full_name, message, image_url, video_url) VALUE(?, ?, ?, ?) ",
      [full_name, message, image_url, video_url]
    );
    res.status(201).json({
      status: "success",
      data: { id: resutl.insertId, message, image_url, video_url },
      message: "Testimonial created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create testimonial.",
    });
  }
};

const getTestimonials = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [testimonial] = await db.execute("SELECT * FROM testimonial");
    res.json({
      status: "success",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get testimonials",
    });
  }
};

const getTestimonialsById = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const [testimonial] = await db.execute(
      "SELECT * FROM testimonial WHERE id = ?",
      [id]
    );
    if (testimonial === 0) {
      res.status(404).json({
        status: "error",
        message: "Testimonial not found",
      });
    }

    res.json({
      status: "success",
      data: testimonial[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get testimonials",
    });
  }
};
module.exports = { createTestimonials, getTestimonials, getTestimonialsById };
