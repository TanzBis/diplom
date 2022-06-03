const jwt = require("jsonwebtoken");
const {secret} = require("../controllers/config");

const {roles: userRoles} = jwt.verify(token, secret)
let hasRole = false
userRoles.forEach(role => {
    if(roles.includes(role)) {
        hasRole = true
    }
})