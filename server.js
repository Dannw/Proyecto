// server.js
const express = require('express');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://danielvarelaxwx:contraseña@cluster0.5ckpxbt.mongodb.net/?retryWrites=true&w=majority'
const bodyParser = require("body-parser");
const port = 8080
const ejs = require('ejs');
const assert = require("assert")
const engine = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
//init
const app = express();
require('./passport/local-auth');
app.use(bodyParser.urlencoded({extended: true}));
app.use('/css', express.static('css'))
app.use('/img', express.static('img'))
app.use('/js', express.static('js'))
app.use('/bootstrap', express.static('bootstrap'))
app.use(express.static('uploads'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://danielvarelaxwx:contraseña@cluster0.5ckpxbt.mongodb.net/?retryWrites=true&w=majority');  

//crear esquemas
 const AlumnoSchema = {
 	primerapellido: String,  
 	segundoapellido: String,  
 	nombre: String,  
 	fechanac: String,
   estado: String,  
 	genero: String,  
 	curp: String,  
 	paymentstat: false,
   image: String
 }

const Alumno = mongoose.model("Alumno", AlumnoSchema);

var upload = multer ({
   storage: multer.diskStorage({
      destination: (req, file, cb) =>{
         cb (null, "./uploads");
      },
      filename: function(req, file, callback) {
         callback(null, file.fileName + '-' + Date.now() + path.extname(file.originalname))
      }
   })
})

 //crear esquema para cuenta
const userSchema = {
  nombre: String,
    password: String
}

const User = mongoose.model("User", userSchema);
///AREA DE LOS METODOS

//metodo de creación que esté en el login
app.get("/", function(req, res){
    res.render("loginalumnos.ejs");
 })

//metodo de redireccionamiento a form
 app.post("/login", function(req, res){
 	res.render("form.ejs");
 })

 //metodo de redireccionar a login operador
 app.post("/log-op", function(req, res){
    res.render("loginoperador.ejs");
 })

 //metodo de redireccionar la busqueda
 app.post("/login-op", function(req, res){
    res.render("search.ejs");
 }) 

 //metodo de registrar al alumno
 app.post("/send", upload.single('file-1'), function(req, res){
 	let newAlumno = new Alumno({
 		primerapellido: req.body.namePat,
 		segundoapellido: req.body.nameMat,
 		nombre: req.body.nombre,
 		fechanac: req.body.fechanacim,
      estado: req.body.estado,
 		genero: req.body.genero,
 		curp: req.body.whCurp,
 		paymentstat: false,
      image: req.file.filename
 	})
    newAlumno.save();
    res.render("success.ejs");
 })
//que 
const buscarCurp = () =>{
   Alumno.findOne({
      curp: req.params.whCurp
   })

}
//Esta no funcionó pero, no le quiero mover para que no truene el codigo
app.get("/search", function(req, res){
   console.log("search")
   const alumno_result = Alumno.findOne({curp: req.body.whCurp})
   .then(result => {
      console.log(alumno_result);
      res.render("profile.ejs", {
      nombre: result.nombre + result.primerapellido + result.segundoapellido,
      fecha: result.fechanac,
      estado: result.estado,
      genero: result.genero
   })
   })
   .catch(error => {
      res.send("<h3> Han habido errores: <br>  "+error+"</h3>")
   })
   
})

app.post("/find", async (req, res) =>{
   const curp = req.body.whCurp;
   const result = await Alumno.findOne({
      curp: curp
   })
   .then(result =>{
      console.log(result);
      res.render("profile.ejs", {
      result: result
   })
   })
   .catch(error =>{
      res.send("<h3> Han habido errores: <br>  "+error+"</h3>")
   })
})

//Buscar y guardar en el perfil
app.post("/save", function(req, res) {
   const pago_hecho = req.body.validaPagoTrue;
   console.log(pago_hecho + "siuu");
})

//Registrarse
app.post('/register', function(req, res){
   let newUser = new User({
      nombre: req.body.newuser,
      password: req.body.newpass
   })
})


 //listener
 app.listen(port, function(){
 	console.log("Servidor en localhost:8080");
 })
