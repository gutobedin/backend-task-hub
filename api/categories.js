const moment = require("moment");

module.exports = (app) => {
  const getCategories = (req, res) => {
    app
      .db("categories")
      .where({ userId: req.user.id })
      .then((categories) => res.json(categories))
      .catch((err) => res.status(400).json(err));
  };

  const save = (req, res) => {
    if (!req.body.desc.trim()) {
      return res.status(400).send("Descrição é um campo obrigatório");
    }

    req.body.userId = req.user.id;

    app
      .db("categories")
      .insert(req.body)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(400).json(err));
  };

  const remove = (req, res) => {
    app
      .db("categories")
      .where({ id: req.params.id, userId: req.user.id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(204).send();
        } else {
          const msg = `Não foi encontrada a categoria com o id ${req.params.id}.`;
          res.status(400).send(msg);
        }
      })
      .catch((err) => res.status(400).json(err));
  };

  return { getCategories, save, remove };
};
