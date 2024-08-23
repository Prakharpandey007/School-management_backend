const express = require("express");
const router = express.Router();
const schoolController = require("../../controllers/schoolControllers");

//route to get all the schools 
router.post("/addSchool", schoolController.addSchool);

//route to list all the schools and sort on the basis of latitude and longitude 
router.get("/listSchools", schoolController.listSchools);

// Route to delete a school by its ID
router.delete("/deleteSchool/:id", schoolController.deleteSchool);

// Route to update a school's details by its ID
router.put("/updateSchool/:id", schoolController.updateSchool);

module.exports = router;
