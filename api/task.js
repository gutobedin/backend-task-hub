const moment = require("moment");

module.exports = (app) => {
  const getTasks = (req, res) => {
    const date = req.params.estimateAt
      ? req.params.estimateAt
      : moment().endOf("day").toDate();

    app
      .db("tasks")
      .where({ categoryId: req.params.categoryId })
      .where("estimateAt", "<=", date)
      .orderBy("estimateAt")
      .then((tasks) => res.json(tasks))
      .catch((err) => res.status(400).json(err));
  };

  const save = (req, res) => {
    console.log("req.body teasrewfdf", req.body);
    if (!req.body.desc.trim()) {
      return res.status(400).send("Descrição é um campo obrigatório");
    }
    app
      .db("tasks")
      .insert(req.body)
      .then((_) => res.status(204).send())
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  };

  const remove = (req, res) => {
    app
      .db("tasks")
      .where({ id: req.params.id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(204).send();
        } else {
          const msg = `Não foi encontrada a tarefa com o id ${req.params.id}.`;
          res.status(400).send(msg);
        }
      })
      .catch((err) => res.status(400).json(err));
  };

  const updateTaskDoneAt = (req, res, doneAt) => {
    app
      .db("tasks")
      .where({ id: req.params.id })
      .update({ doneAt })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(400).json(err));
  };

  const toggleTask = (req, res) => {
    console.log(req.params.id);
    app
      .db("tasks")
      .where({ id: req.params.id })
      .first()
      .then((task) => {
        console.log("taskssss", task);
        if (!task) {
          const msg = `Task com id ${req.params.id} não encontrada.`;
          return res.status(400).send(msg);
        }

        const doneAt = task.doneAt ? null : new Date();
        updateTaskDoneAt(req, res, doneAt);
      })
      .catch((err) => res.status(400).json(err));
  };

  return { getTasks, save, remove, toggleTask };
};
