const express=require("express")

const router=express.Router()



const upload=require("../middlewares/upload")




const {verUsuarios, verUsuario, registrarUsuario, loginUsuario,verPerfil, subirImagen}=require("../Controladores_Usuarios/userControllers")
const validarJWT=require("../middlewares/validarJwt")


router.get("/usuarios", verUsuarios)

router.post("/usuarios/login", loginUsuario)

router.get("/perfil", validarJWT,verPerfil)

router.get("/usuarios/:id", verUsuario)

router.post("/usuarios/registrar", registrarUsuario)

router.post("/imagenes", upload.array("fotos"), subirImagen)







module.exports=router
