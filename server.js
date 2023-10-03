const { configDotenv } = require("dotenv");
configDotenv({
  path: "./config.env",
});
const app = require("./app");
const port = 3002;
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
