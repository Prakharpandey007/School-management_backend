const express = require("express");
// const cors = require('cors');
// const helmet = require('helmet');

const { sequelize } = require("./models");
const apiroutes = require("./routes/index");
const app = express();
const {PORT}= require("./config/serverconfig")

// app.use(cors());
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", apiroutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
