import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Insert or update course details
router.post("/semester-details", async (req, res) => {
  console.log("Received data:", req.body);
  const { courses } = req.body;

  if (!courses || !Array.isArray(courses)) {
    return res.status(400).send("Invalid request format");
  }

  try {
    const insertOrUpdateQuery = `
      INSERT INTO courses (sno, department, regulation, semester, course_code, course_name, category, tp, gate_common, common_dept, credits, ltp)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (department, regulation, semester, sno)
      DO UPDATE SET
        course_code = EXCLUDED.course_code,
        course_name = EXCLUDED.course_name,
        category = EXCLUDED.category,
        tp = EXCLUDED.tp,
        gate_common = EXCLUDED.gate_common,
        common_dept = EXCLUDED.common_dept::text[],  // Assuming it's an array
        credits = EXCLUDED.credits,
        ltp = EXCLUDED.ltp
    `;

    // Insert or update each course
    for (let course of courses) {
      const { sno, department, regulation, semester, course_code, course_name, category, tp, gate_common, common_dept, credits, ltp } = course;
      await pool.query(insertOrUpdateQuery, [
        sno,
        department,
        regulation,
        semester,
        course_code,
        course_name,
        category,
        tp,
        gate_common,
        common_dept,
        credits,
        ltp,
      ]);
    }

    res.status(200).send({ message: "Courses successfully inserted or updated!" });
  } catch (error) {
    console.error("Error inserting/updating courses:", error.message);
    res.status(500).send({ message: "Error inserting/updating courses." });
  }
});

// Fetch course details
router.get("/semester-details", async (req, res) => {
  const { department, regulation, sno, semester } = req.query;

  if (!department || !regulation) {
    console.log("Missing required query parameters: department or regulation");
    return res.status(400).send("Missing required query parameters");
  }

  try {
    let query = `
      SELECT sno, department, regulation, semester, course_code, course_name, category, tp, gate_common, common_dept, credits, ltp
      FROM courses
      WHERE department = $1 AND regulation = $2
    `;
    const values = [department, regulation];

    if (semester) {
      query += " AND semester = $3";
      values.push(semester);
    } else {
      console.log("No semester specified, fetching all semesters.");
    }

    if (sno) {
      query += " AND sno = $4";
      values.push(sno);
    }

    const { rows } = await pool.query(query, values);

    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json([]);  // Return an empty array instead of 404
    }
  } catch (error) {
    console.error("Error fetching records:", error.message);
    res.status(500).send({ message: "Error fetching records" });
  }
});

export default router;
