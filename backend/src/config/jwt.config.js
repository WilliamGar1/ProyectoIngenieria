const jwt = require('jsonwebtoken');

const getToken = (email,code) =>{
    return jwt.sign(
        {data:email},
        'SECRET',
        {expiresIn:'1h'});
};

const getTokenData = (token) =>{
    let data = null;
    jwt.verify(token,'SECRET',(err,decoded)=>{
        if(err){
            console.log('Error al optener data del token');
        }else{
            data = decoded;
        
        }
    });

    return data;
};

module.exports = {
    getToken,
    getTokenData
};