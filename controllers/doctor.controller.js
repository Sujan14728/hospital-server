const getAllDoctors = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute(`
      SELECT doctor.*, speciality.name AS specialityName, department.name AS departmentName
      FROM doctor
      JOIN speciality ON doctor.speciality_id = speciality.id
      JOIN department ON doctor.department_id = department.id
      ORDER BY doctor.display_order ASC
    `);

    res.json({
      status: "success",
      data: rows,
      message: "Doctors retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve doctors",
    });
  }
};
const getDoctorById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [rows] = await db.execute(
      `
      SELECT doctor.*, speciality.name AS specialityName, department.name AS departmentName
      FROM doctor
      JOIN speciality ON doctor.speciality_id = speciality.id
      JOIN department ON doctor.department_id = department.id
      WHERE doctor.id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Doctor not found",
      });
    }

    res.json({
      status: "success",
      data: rows[0],
      message: "Doctor retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve doctor",
    });
  }
};

const createDoctor = async (req, res) => {
  const {
    fullName,
    nmcNo,
    qualification,
    description,
    image_url,
    speciality_id,
    department_id,
    display_order,
  } = req.body;

  const db = req.app.locals.db;

  try {
    // Check if speciality_id is valid
    const [specialityCheck] = await db.execute(
      "SELECT id FROM speciality WHERE id = ?",
      [speciality_id]
    );
    if (specialityCheck.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid speciality ID",
      });
    }

    // Check if department_id is valid
    const [departmentCheck] = await db.execute(
      "SELECT id FROM department WHERE id = ?",
      [department_id]
    );
    if (departmentCheck.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid department ID",
      });
    }

    // Insert new doctor
    const [result] = await db.execute(
      `INSERT INTO doctor (
        fullName, 
        nmcNo, 
        qualification, 
        description, 
        image_url, 
        speciality_id, 
        department_id, 
        display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        nmcNo,
        qualification,
        description,
        image_url,
        speciality_id,
        department_id,
        display_order,
      ]
    );

    // Success response
    res.status(201).json({
      status: "success",
      data: {
        id: result.insertId,
        fullName,
        nmcNo,
        qualification,
        description,
        image_url,
        speciality_id,
        department_id,
        display_order,
      },
      message: "Doctor created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Failed to create doctor",
    });
  }
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const {
    fullName,
    nmcNo,
    qualification,
    description,
    image_url,
    speciality_id,
    department_id,
    display_order,
  } = req.body;

  const db = req.app.locals.db;

  try {
    // Check if doctor exists
    const [doctorCheck] = await db.execute(
      "SELECT id FROM doctor WHERE id = ?",
      [id]
    );
    if (doctorCheck.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Doctor not found",
      });
    }

    // Validate speciality ID
    const [specialityCheck] = await db.execute(
      "SELECT id FROM speciality WHERE id = ?",
      [speciality_id]
    );
    if (specialityCheck.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid speciality ID",
      });
    }

    // Validate department ID
    const [departmentCheck] = await db.execute(
      "SELECT id FROM department WHERE id = ?",
      [department_id]
    );
    if (departmentCheck.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid department ID",
      });
    }

    // Update doctor
    await db.execute(
      `UPDATE doctor 
       SET fullName = ?, 
           nmcNo = ?, 
           qualification = ?, 
           description = ?, 
           image_url = ?, 
           speciality_id = ?, 
           department_id = ?, 
           display_order = ? 
       WHERE id = ?`,
      [
        fullName,
        nmcNo,
        qualification,
        description,
        image_url,
        speciality_id,
        department_id,
        display_order,
        id,
      ]
    );

    res.json({
      status: "success",
      data: {
        id: parseInt(id),
        fullName,
        nmcNo,
        qualification,
        description,
        image_url,
        speciality_id,
        department_id,
        display_order,
      },
      message: "Doctor updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update doctor",
    });
  }
};


const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  try {
    const [result] = await db.execute("DELETE FROM doctor WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Doctor not found",
      });
    }

    res.json({
      status: "success",
      data: { id: parseInt(id) },
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete doctor",
    });
  }
};

const getDoctorsBySpeciality = async (req, res) => {
  const { specialityId, specialityName } = req.query;
  const db = req.app.locals.db;

  try {
    let speciality_id;

    if (specialityId) {
      speciality_id = specialityId;
    } else if (specialityName) {
      const [specRows] = await db.execute(
        "SELECT id FROM speciality WHERE name = ?",
        [specialityName]
      );

      if (specRows.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Speciality not found",
        });
      }

      speciality_id = specRows[0].id;
    } else {
      return res.status(400).json({
        status: "error",
        message:
          "Please provide specialityId or specialityName query parameter",
      });
    }

    const [doctors] = await db.execute(
      `SELECT 
        d.*,
        s.name AS specialityName, 
        dept.name AS departmentName 
      FROM doctor d
      JOIN speciality s ON d.speciality_id = s.id
      JOIN department dept ON d.department_id = dept.id
      WHERE d.speciality_id = ?
      ORDER BY d.display_order ASC`,
      [speciality_id]
    );

    res.json({
      status: "success",
      data: doctors,
      message: "Doctors retrieved successfully for speciality",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve doctors for speciality",
    });
  }
};

const getDoctorsByDepartment = async (req, res) => {
  const { departmentId, departmentName } = req.query;
  const db = req.app.locals.db;

  try {
    let department_id;

    if (departmentId) {
      department_id = departmentId;
    } else if (departmentName) {
      const [deptRows] = await db.execute(
        "SELECT id FROM department WHERE name = ?",
        [departmentName]
      );

      if (deptRows.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Department not found",
        });
      }

      department_id = deptRows[0].id;
    } else {
      return res.status(400).json({
        status: "error",
        message:
          "Please provide departmentId or departmentName query parameter",
      });
    }

    const [doctors] = await db.execute(
      `SELECT 
        d.*,
        s.name AS specialityName, 
        dept.name AS departmentName 
      FROM doctor d
      JOIN speciality s ON d.speciality_id = s.id
      JOIN department dept ON d.department_id = dept.id
      WHERE d.department_id = ?
      ORDER BY d.display_order ASC`,
      [department_id]
    );

    res.json({
      status: "success",
      data: doctors,
      message: "Doctors retrieved successfully for department",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve doctors for department",
    });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorsBySpeciality,
  getDoctorsByDepartment,
};
