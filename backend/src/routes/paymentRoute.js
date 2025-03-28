const express = require("express");
const { initiateJazzCashPayment } = require("../controller/payment/JazzCashController");
const { initiateEasyPaisaPayment } = require("../controller/payment/EasyPaisaController");

const router = express.Router();

// JazzCash Payment Route
router.post("/jazzcash/pay", initiateJazzCashPayment);

// EasyPaisa Payment Route
router.post("/easypaisa/pay", initiateEasyPaisaPayment);

module.exports = router;
