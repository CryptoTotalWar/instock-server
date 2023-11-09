const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/warehouse", require("./routes/warehouse"));
app.use("/inventory", require("./routes/inventory"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// health check to confirm server is working -- delete by end of end of day Wednesday
app.get("/", (req, res) => {
  res.send("Welcome to the InStock server!");
});
//
