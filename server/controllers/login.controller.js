//For Register Page
const registerView = (req, res) => {
    res.send("register")
}
// For View 
const loginView = (req, res) => {

    res.render("login", {
    } );
}
module.exports =  {
    registerView,
    loginView
};