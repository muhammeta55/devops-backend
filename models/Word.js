const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  translationTr: {
    type: String,
    required: true,
  },
  translationEn: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Vocabulary', 'Grammar', 'Expression', 'Mistake'],
    default: 'Vocabulary',
  },
  exampleSentence: {
    type: String,
    default: '',
  },
  masteryLevel: {
    type: String,
    enum: ['New', 'Learning', 'Mastered'],
    default: 'New',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  lastReviewed: {
    type: Date,
    default: null,
  },
  nextReviewDate: {
    type: Date,
    default: Date.now,
  },
  interval: {
    type: Number,
    default: 1,
  },
  correctStreak: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Word', wordSchema);