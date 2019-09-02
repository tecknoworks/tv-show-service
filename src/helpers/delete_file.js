const fetch = require('node-fetch');

module.exports = async function(path, queryPair){
    try {
        var response =await  fetch(`${path}?${queryPair.key}=${queryPair.value}`,{
            method: 'DELETE'
        })
        return response.ok;
    } catch (error) {
        
    }
}