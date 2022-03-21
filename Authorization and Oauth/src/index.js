const express = require("express");
const userController = require("./controllers/userController")
const productController = require("./controllers/productController")

const {register,login, generateToken} = require("./controllers/authController")
const app = express();
const passport = require("./configs/google_ouath")


app.use(express.json());


app.use("/users", userController)

app.post("/register", register)

app.post("/login", login)

app.use("/products", productController)

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
 
app.get(
'/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session:false } ),

  function(req, res) {
    const token = generateToken(req.user)
    return res.status(200).send({user:req.user, token})
  }
)

module.exports = app;