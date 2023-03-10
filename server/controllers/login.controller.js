//For Register Page
const registerView = (req, res) => {
    return res.send("register")
}
// For View 
const loginView = (req, res) => {
    return res.send("login");
}
module.exports =  {
    registerView,
    loginView
};