const jwt = require('jsonwebtoken');

const SECRECT_TOKEN = 'otoke';




const signToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(payload, SECRECT_TOKEN, {expiresIn: "30 minutes", algorithm: 'HS256'}, (error, token) => {
    if (error) reject(error);
    else resolve(token);
  });
}); 

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, SECRECT_TOKEN, {algorithm: 'HS256'}, function(err, verified){
    if (err){
      reject(err);
    } else {
      resolve(verified);
    }
  });
});


module.exports = {
  signToken,
  verifyToken,
}