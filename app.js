const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verfiyToken, (req, res) => {
    jwt.verify(req.token,'secretkey', (err, authData)=> {
        if(!err){
            res.json({
                message: 'Post Created....',
                authData
            });
        } else{
            res.sendStatus(403);
        }
    });
});

app.post('/api/login', (req, res) => {
    const user= {
        id: 1,
        username: 'anas',
        email: 'anas.aljundi@gas.gov.ae'
    };
    jwt.sign({user}, 'secretkey', {expiresIn: '60s'}, (err, token) => {
        res.json({
            token
        });
    });
});

function verfiyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => console.log('Listening on port 3000 started...'));