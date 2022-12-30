const router = require("express").Router();
const auth = require('../middlewares/auth')

router.use("/todo", auth, require("./todo"));
router.use("/user", require("./user"));

router.use("*", (req, res) => {
    res.status(404).json({ message: "No such api endpoint defined" });
});

module.exports = router;
