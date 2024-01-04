var express = require("express");
var router = express.Router();
const users = require("../db/database").users;
const requireAuth = require("../auth/loginAuthentication");
const passport = require("passport");
const flash = require("connect-flash");
const Server = require('../services/Server')
const sobj = new Server()

router.use(flash());

router.use(requireAuth);

router.get("/", (req, res, next) => {
    if (req.user) {
        res.redirect("/index");
    } else {
        res.redirect("/login");
    }
});

router.get("/login", (req, res, next) => {
    let data = req.flash();
    if (data.error) result = [data.error, true];
    else result = data.messages;

    res.render("login", { messages: result });
});

router.get("/index", async (req, res, next) => {
    const user = req.user;
    const usersData = await sobj.fetchAllUser()
    res.render("index", { user: user, contacts: usersData });
});

router.get("/test", function (req, res, next) {
    res.render("test");
});

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/",
        failureFlash: true,
    }),
    (req, res, next) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/users/login");
    });
});

module.exports = router;
