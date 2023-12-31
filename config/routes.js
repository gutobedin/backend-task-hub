module.exports = (app) => {
  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);

  app
    .route("/tasks")
    .all(app.config.passport.authenticate())
    .post(app.api.task.save);

  app
    .route("/tasks/:id")
    .all(app.config.passport.authenticate())
    .delete(app.api.task.remove);

  app
    .route("/tasks/:id/toggle")
    .all(app.config.passport.authenticate())
    .put(app.api.task.toggleTask);

  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .get(app.api.categories.getCategories)
    .post(app.api.categories.save);

  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .delete(app.api.categories.remove);

  app
    .route("/categories/:categoryId/tasks/:estimateAt")
    .all(app.config.passport.authenticate())
    .get(app.api.task.getTasks);
};
