const WordController = require("../controllers/word.controller");

module.exports = (app) => {
  app.get("/api/words/", WordController.findAllWords);
  app.get("/api/words/:id", WordController.findOneSingleWord);
  app.put("/api/words/update/:id", WordController.updateWord);
  app.post(
    "/api/words/new",
    // upload.single("letterImage"),
    WordController.createNewWord
  );
  app.delete("/api/words/delete/:id", WordController.deleteWord);
};
