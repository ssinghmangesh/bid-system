const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
const bid = require('./controller/bid')
app.use('/bid', bid)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})