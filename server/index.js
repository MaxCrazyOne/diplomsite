require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT
const models = require('./models/models')
const app = express()
const fileUpload=require("express-fileupload")
const cors=require('cors')
const router=require('./routes/index')
const path=require('path')
const errorHandler=require('./middleware/ErrorHandlingMiddleware')
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api',router)


app.use(errorHandler)


app.get('/',(req, res)=>{
    res.status(200).json({message:'WORKING'})
})
const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log(`server started on ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()

