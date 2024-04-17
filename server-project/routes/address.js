const express = require("express") ;
const router = express.Router();
const address = require("../controllers/address.js");

router.post("/new-address", address.createAddress);

module.exports = router;