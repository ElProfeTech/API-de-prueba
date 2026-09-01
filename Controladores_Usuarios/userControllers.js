const express = require("express");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//const multer=require("multer")
//const upload=multer({dest: "upload/"})

const Usuarios = require("../data/dataUsuarios");

const pool = require("../data/bd");

const verUsuarios = async (req, res) => {
  const [resultado] = await pool.query("select * from users");
  res.json(resultado);
};

const verUsuario = async (req, res) => {
  const id = parseInt(req.params.id);
  const [resultado] = await pool.query("select * from users where id= ?", [id]);

  res.json(resultado[0]);
};

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, edad, email, password } = req.body;

    const passwordHash = await bycript.hash(password, 8);
    const [resultado] = await pool.query(
      "insert into users (nombre, edad, email, password) values (?, ?,?,?)",
      [nombre, edad, email, passwordHash],
    );
    res.status(201).json({
      mensaje: "Usuario agregado",
      Usuario: resultado.insertId,
    });
  } catch (error) {
    res.status(404).json({
      mensaje: error.message,
    });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [resultado] = await pool.query(
      "select * from users where email=?", 
      [email]);
    const usuario = resultado[0];
    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      return res.status(500).json({
        mensaje: "Usuario no encontrado"
      });
    }
    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      },
    );

    res.status(200).json({
      mensaje: "Usuario logueado exitosamente",
      usuario: usuario.id,
      token,
    });
  } catch (error) {}
};

const verPerfil = (req, res) => {
  

  res.json({
    usuario: req.usuario,
  });
};


const subirImagen=(req, res)=>{
   console.log(req.files)

  return res.json({
     mensaje: "imagenes subidas"
   })

}

module.exports = {
  verUsuarios,
  verUsuario,
  registrarUsuario,
  loginUsuario,
  verPerfil,
  subirImagen
};
