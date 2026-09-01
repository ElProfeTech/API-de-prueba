const express= require("express")
const cors=require("cors")


const rutaUsers=require("./Rutas_Usuarios/userRoutes")
const app=express()
app.use(cors())





app.use(express.json())

app.use(rutaUsers)




module.exports= app

