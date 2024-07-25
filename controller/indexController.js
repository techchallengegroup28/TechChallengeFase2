module.exports = class indexController {
  static async main(req, res) {
    res.render("index", { title: "Express" });
  }
};
