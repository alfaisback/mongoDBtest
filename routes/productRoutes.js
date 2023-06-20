const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const { connectToMongo } = require('../utils/mongoUtils.js');

// Route POST: Membuat produk baru
router.post('/', async (req, res) => {
  const produkData = req.body;

  try {
    const collection = await connectToMongo();
    const result = await collection.insertOne(produkData);

    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat produk baru' });
  }
});

// Route GET: Mendapatkan semua produk
router.get('/', async (req, res) => {
  try {
    const collection = await connectToMongo();
    const produk = await collection.find().toArray();

    res.json(produk);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendapatkan produk' });
  }
});

// Route GET: Mendapatkan produk berdasarkan ID
router.get('/:id', async (req, res) => {
  const produkId = req.params.id;

  try {
    const collection = await connectToMongo();
    const produk = await collection.findOne({ _id: ObjectId(produkId) });

    if (!produk) {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    } else {
      res.json(produk);
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendapatkan produk' });
  }
});

// Route DELETE: Menghapus produk berdasarkan ID
router.delete('/:id', async (req, res) => {
  const produkId = req.params.id;

  try {
    const collection = await connectToMongo();
    const result = await collection.deleteOne({ _id: ObjectId(produkId) });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    } else {
      res.json({ message: 'Produk berhasil dihapus' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus produk' });
  }
});

// Route PUT: Mengupdate produk berdasarkan ID
router.put('/:id', async (req, res) => {
  const produkId = req.params.id;
  const updatedData = req.body;

  try {
    const collection = await connectToMongo();
    const result = await collection.updateOne(
      { _id: ObjectId(produkId) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Produk tidak ditemukan' });
    } else {
      res.json({ message: 'Produk berhasil diupdate' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengupdate produk' });
  }
});

module.exports = router;
