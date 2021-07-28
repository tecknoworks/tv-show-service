const axios = require('axios')
const config = require("../config");

module.exports = async function(req, res, next){
    const authorizationHeaader = req.headers.authorization;
    
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        try {   
            let response = await axios.get(`${config.authServiceUrl}/authorise?token=${token}`)
            req.userId=response.data.userId;
            
        } catch (error) {
            next();
        }
    } 
    next();
}