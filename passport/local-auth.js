const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  
  passReqToCallback: true
  }, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  const { nombre } = req.body
  console.log(user)
  if(user) {
    return done(null, false, req.flash('signupMessage', 'El correo ya fue usado.'));
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.nombre = nombre;
    console.log(newUser)
    await newUser.save();
    done(null, newUser, req.flash('signupMessage', 'Usuario creado correctamente'));
  }
}));


passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ email: email });
  console.log('Validacion user'+user);
  if (!user) {
    return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
  }
  if (!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Password Incorrecto'));
  }
  
  return done(null, user);
}, ));