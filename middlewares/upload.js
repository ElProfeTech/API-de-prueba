const multer=require("multer")

const storage=multer.diskStorage(
    {
        destination: (req, file, cb)=>{
        cb(null, "upload/")
        },
        filename: (req, file, cb)=>{
         cb(null, Date.now()+"-"+ file.originalname)
        }
    }
)



const fileFilter=(req, file, cb)=>{
    if(file.mimetype==="image/png"){
      cb(null, true)
    }else{
        cb(new Error("No puedo poner otro tipo de archivo que no sea png"),false)
    }

}

const upload=multer({storage:storage, fileFilter})

module.exports=upload