const User = require("../models/user");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }
  static async loginPost(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    // Check Email
    if (!user) {
      req.flash("message", "Usuário não encontrado");
      res.render("auth/login");

      return;
    }

    // Check Password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash("message", "Senha Inválida");
      res.render("auth/login");

      return;
    }

    // Initialize Session

    req.session.userid = user.id;
    console.log("Você entrou :)");

    req.session.save(() => {
      res.redirect("mission/missions");
    });
  }
  static register(req, res) {
    res.render("auth/register");
  }
  static async registerPost(req, res) {
    const { email, name, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      req.flash("message", "A senhas são diferentes");
      res.render("auth/register");

      return;
    }

    // Check If User Already Exists
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      req.flash("message", "Este usuário já existe");
      res.render("auth/register");

      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = {
      name: name,
      email: email,
      password: hashedPassword,
      level: 1,
      experience: 0,
      categories: { study: { level: 1, experience: 0 } },
    };

    try {
      const createdUser = await User.create(user);

      req.session.userid = createdUser.id;

      console.log(req.session.userid);

      req.session.save(() => {
        res.redirect("/mission/missions");
      });
    } catch (err) {
      console.log(`Deu erro aqui ó: ${err}`);
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
