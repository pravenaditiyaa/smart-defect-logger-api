const express = require('express')
const app = express()
const router = require("./router");
const port = 8989

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})