require("dotenv").config()
const app=require("./app")





const port=process.env.PORT

app.listen(port, ()=> console.log(`El servidor está escuchando en el puerto ${port}`))


