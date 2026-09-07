const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// GET /api/words - tüm kelimeleri listele
router.get('/', async (req, res) => {
  try {
    const words = await Word.find().sort({ dateAdded: -1 });
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/words/:id - tek kelime getir
router.get('/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) {
      return res.status(404).json({ error: 'Word not found' });
    }
    res.json(word);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/words - yeni kelime oluştur
router.post('/', async (req, res) => {
  try {
    const newWord = new Word(req.body);
    const savedWord = await newWord.save();
    res.status(201).json(savedWord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/words/:id - kelime güncelle
router.put('/:id', async (req, res) => {
  try {
    const updatedWord = await Word.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedWord) {
      return res.status(404).json({ error: 'Word not found' });
    }
    res.json(updatedWord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/words/:id - kelime sil
router.delete('/:id', async (req, res) => {
  try {
    const deletedWord = await Word.findByIdAndDelete(req.params.id);
    if (!deletedWord) {
      return res.status(404).json({ error: 'Word not found' });
    }
    res.json({ message: 'Word deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/words/import - toplu kelime ekleme
router.post('/import', async (req, res) => {
  try {
    const { words } = req.body;

    if (!Array.isArray(words) || words.length === 0) {
      return res.status(400).json({ error: 'No words provided for import' });
    }

    const insertedWords = await Word.insertMany(words, { ordered: false });
    res.status(201).json({
      message: `${insertedWords.length} words imported successfully`,
      count: insertedWords.length,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;