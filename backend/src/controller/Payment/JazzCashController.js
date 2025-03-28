const axios = require("axios");
require("dotenv").config(); // Load environment variables

// Initiate JazzCash Payment
const initiateJazzCashPayment = async (req, res) => {
  try {
    const { amount, orderId, phone } = req.body;

    const payload = {
      pp_Amount: amount * 100, // Convert to paisa
      pp_BillReference: orderId,
      pp_CustomerMobile: phone,
      pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID,
      pp_Language: "EN",
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime: new Date().toISOString(),
    };

    const response = await axios.post(process.env.JAZZCASH_API_URL, payload);
    
    return res.status(200).json({ success: true, data: response.data });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Payment failed", error: error.message });
  }
};

module.exports = { initiateJazzCashPayment };
