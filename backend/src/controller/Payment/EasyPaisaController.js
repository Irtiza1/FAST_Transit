const axios = require("axios");
require("dotenv").config(); // Load environment variables

// Initiate EasyPaisa Payment
const initiateEasyPaisaPayment = async (req, res) => {
  try {
    const { amount, orderId, phone } = req.body;

    const payload = {
      transactionAmount: amount,
      transactionId: orderId,
      mobileAccountNo: phone,
      merchantCode: process.env.EASYPAY_MERCHANT_CODE,
    };

    const response = await axios.post(process.env.EASYPAY_API_URL, payload);
    
    return res.status(200).json({ success: true, data: response.data });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Payment failed", error: error.message });
  }
};

module.exports = { initiateEasyPaisaPayment };
