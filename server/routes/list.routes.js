const ListController = require("../controllers/list.controller");

module.exports = (app) => {
  app.get("/api/lists/", ListController.findAllLists);
  app.get("/api/lists/:id", ListController.findOneSingleList);
  app.put("/api/lists/update/:id", ListController.updateList);
  app.post("/api/lists/new", ListController.createNewList);
  app.delete("/api/lists/delete/:id", ListController.deleteList);
};
