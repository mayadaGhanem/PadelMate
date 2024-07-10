const Court = require("../models/courts");
const logger = require("../middlewares/logger"); // Adjust the path as needed


module.exports = {
  getAllCourts: async (req, res) => {
    try {
      const courts = await Court.find({}).exec();
      res.status(200).send({data:courts});
    } catch  (e) {
        res.status(500).send({ error: e.message });
      }
  },
  getCourtsByCourtLocation: async (req, res) => {
    try {
      const courts= await Court.find({location:req.params.location}).exec();
      res.status(200).send({data:courts});
    } catch  (e) {
        res.status(500).send({ error: e.message });
      }
  },
  getCourtByCourtNo: async (req, res) => {
    try {
      const court = await Court.findOne({court_no:req.params.court_no}).exec();
      res.status(200).send({data:court});
    } catch  (e) {
        res.status(500).send({ error: e.message });
      }
  },
  getCourtByCourtLocation: async (req, res) => {
    try {
      const court = await Court.findOne({location:req.params.location}).exec();
      res.status(200).send({data:court});
    } catch  (e) {
        res.status(500).send({ error: e.message });
      }
  },
  createNewCourt: async (req, res) => {
		try {
		let courtData = new Court(req.body);
        await courtData.save();
        res.status(200).send();
      } catch (e) {
        logger.error(`Error saving user: ${e.message}`);
        res.status(500).send({ error: "An unexpected error occurred" });
      }
  },
  
};
