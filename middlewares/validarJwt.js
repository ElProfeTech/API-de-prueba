const jwt= require("jsonwebtoken")

const validarJWT= (req,res, next)=>{

    const authHeader= req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res.json({
        mensaje: "Denegado, token invalido"
      })
    }
 const token= authHeader.split(" ")[1]
 
 const payload= jwt.verify(
    token,
    process.env.JWT_SECRET
 )

 req.usuario= payload

    next()
}



module.exports=validarJWT