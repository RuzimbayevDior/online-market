const express = require("express")
const { connectDB } = require("./db/config")
require("dotenv").config()
const cors = require("cors")    
const AuthRouter = require("./router/Auth.routes")
const AnimeRouter = require("./router/admin.routes")
const superAdminRouter = require("./router/superAdmin.routes")
const ShortRouter = require("./router/short.routes")
const cookieParser = require("cookie-parser")
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require("./utils/swagger")
const LCSRouter = require("./router/LCS.routes")


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use('/ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

///////////// router
app.use(AuthRouter)
app.use(AnimeRouter)
app.use(superAdminRouter)
app.use(ShortRouter)



connectDB()




const PORT = process.env.PORT || 5000
app.listen(PORT , () => {
  console.log("http://localhost:" + PORT);
  
})