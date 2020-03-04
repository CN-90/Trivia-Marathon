const mongoose = require('mongoose');

const scoresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

const Scores = mongoose.model('Scores', scoresSchema);

export default Scores;
