const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = async function(url, formField){
    try {
        var formData = new FormData();
        formData.append(formField.key, formField.value);
    
        return await fetch(url,{
            method: 'POST',
            body: formData
        }).then(response => response.json())
    } catch (error) {
        console.log(error);
        return null;
    }
}