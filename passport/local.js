const passport = require("passport");
const { Strategy } = require("passport-local");
const { usersContainer } = require("../daos");
const bcrypt = require("bcrypt");
const localStrategy = Strategy;

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userDb = await usersContainer.getByAttribute("email", email);

      if (userDb) {
        return done(null, false);
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await usersContainer.save({
        email,
        password: hashedPassword,
      });

      done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await usersContainer.getById(id);
  done(null, user);
});

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userDB = await usersContainer.getByAttribute("email", email);
      if (!userDB) {
        return done(null, false);
      }

      const authenticatedPassword = bcrypt.compareSync(
        password,
        userDB.password
      );

      if (!authenticatedPassword) {
        return done(null, false);
      }

      done(null, userDB);
    }
  )
);
