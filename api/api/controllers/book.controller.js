const { Op } = require('sequelize');
const db = require('../../db/models');

const list = async (req, res) => {
  try {
    const books = await db.Book.findAll({
      where: {
        title: { [Op.iLike]: `%${req.query.searchTerm}%` },
      },
      order: [['title', 'ASC']],
    });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const create = async (req, res) => {
  try {
    const book = await db.Book.create(req.body);
    res.status(201).send(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await db.Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.update(req.body);

    res.status(200).send(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await db.Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { list, create, update, remove };
