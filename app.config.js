require("dotenv").config();

module.exports = {
  extra: {
    apiUrl: process.env.REACT_NATIVE_APP_IP,
    apiKey: process.env.REACT_NATIVE_APP_API_KEY,
  },
};
