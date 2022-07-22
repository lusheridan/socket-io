const { Router } = require("express");
const { fork } = require("child_process");
const router = Router();

let forkRandom = fork(`./random.js`);

router.get("/", (req, res) => {
  const { cant = 100_000_000 } = req.query;

  forkRandom.on("message", (resultado) => {
    res.send({ resultado });
    forkRandom.kill();
    forkRandom = fork(`./random.js`);
  });
  forkRandom.send(cant);
});

module.exports = router;
