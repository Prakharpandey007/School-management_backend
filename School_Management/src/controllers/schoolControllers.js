const { School } = require("../models/index.js");
const computeDistance = require("../utils/distancecalculator");

// Add school
exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validate input
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the school with the same name or address already exists
    const existingSchool = await School.findOne({
      where: {
        name: name,
        address: address,
      },
    });

    if (existingSchool) {
      return res.status(400).json({
        error: "A school with the same name or address already exists",
      });
    }

    // Add school if validation passes
    const result = await School.create({
      name,
      address,
      latitude,
      longitude,
    });

    res
      .status(201)
      .json({ message: "School added successfully", id: result.id });
  } catch (error) {
    console.error("Error while adding school:", error.message);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "School name or address must be unique" });
    }

    res.status(500).json({
      error: "An error occurred while adding the school",
      details: error.message,
    });
  }
};

// List schools
exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    const schools = await School.findAll();

    // Calculate and sort schools by distance
    const schoolsWithDistance = schools.map((school) => {
      const distance = computeDistance(
        userLat,
        userLon,
        parseFloat(school.latitude),
        parseFloat(school.longitude)
      );
      return { ...school.toJSON(), distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching schools" });
  }
};

// delete of the school  from the list

exports.deleteSchool = async (req, res) => {
  try {
    // pass the school id in the params
    const { id } = req.params;

    // Check if the school exists
    const school = await School.findByPk(id);
    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }

    // Delete the school
    await school.destroy();
    res.json({ message: "School deleted successfully" });
  } catch (error) {
    console.error("Error while deleting school:", error.message);
    res.status(500).json({
      error: "An error occurred while deleting the school",
      details: error.message,
    });
  }
};

// update the schools detail (PUT method)

// Update school
exports.updateSchool = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Trim keys in the request body to remove any extra spaces
      const { name, address, latitude, longitude } = Object.fromEntries(
        Object.entries(req.body).map(([key, value]) => [key.trim(), value])
      );
  
      console.log("name:", name);
      console.log("req.body:", req.body);
  
      // Check if the school exists
      const school = await School.findByPk(id);
      if (!school) {
        return res.status(404).json({ error: "School not found" });
      }
  
      // Update the school details
      await school.update({
        name,
        address,
        latitude,
        longitude,
      });
  
      res.json({ message: "School updated successfully" });
    } catch (error) {
      console.error("Error while updating school:", error.message);
      res.status(500).json({
        error: "An error occurred while updating the school",
        details: error.message,
      });
    }
  };
  