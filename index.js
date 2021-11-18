require("dotenv").config({ path: __dirname + "/.env" })
const express = require("express")
const mongoose = require("mongoose")
//const routes = require("./routes")
const cors = require("cors")

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.on("connected", () => {
    console.log("Database Connected")
  })

//Middlewares
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Listening on port %d", PORT))

app.get("/health", (req, res) => {
  res.status(200).json({message: "Wow everything is working fine!"})
})

//Routes
//routes(app)