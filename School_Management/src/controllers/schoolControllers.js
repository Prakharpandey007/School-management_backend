const { School } = require("../models/index.js");
const distanceCalculator = require("../utils/distancecalculator");

// add school

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

    res
      .status(500)
      .json({
        error: "An error occurred while adding the school",
        details: error.message,
      });
  }
};

// list Schools
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

    const schools = await School.findAll({
      where: {
        latitude,
        longitude,
      },
    });

    // sort the schools
    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: distanceCalculator.calculateDistance(
          userLat,
          userLon,
          parseFloat(school.latitude),
          parseFloat(school.longitude)
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching schools" });
  }
};
