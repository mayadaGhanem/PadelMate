const Match = require("../models/matches");
const logger = require("../middlewares/logger"); // Adjust the path as needed

module.exports = {
  getAllMatches: async (req, res) => {
    try {
      const matches = await Match.find({}).exec();
      res.status(200).send({ data: matches });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getMatchesByCourt: async (req, res) => {
    try {
      const matches = await Match.find({ court: req.params.court }).exec();
      res.status(200).send({ data: matches });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getMatchByCourt: async (req, res) => {
    try {
      const match = await Match.findOne({ court: req.params.court }).exec();
      res.status(200).send({ data: match });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },
  getMatchesByDate: async (req, res) => {
    try {
      const match = await Match.find({
        date: {
          $gte: startOfDay(new Date(req.params.date)),
          $lte: endOfDay(new Date(req.params.date)),
        },
      }).exec();
      res.status(200).send({ data: match });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  },

  createNewMatch: async (req, res) => {
    try {
      let matchData = new Match(req.body);
      await matchData.save();
      res.status(200).send();
    } catch (e) {
      logger.error(`Error saving user: ${e.message}`);
      res.status(500).send({ error: "An unexpected error occurred" });
    }
  },
};
