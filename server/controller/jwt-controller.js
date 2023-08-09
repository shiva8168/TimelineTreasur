import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js';

dotenv.config();

export const authenticateToken = (request, response, next) => {
    // console.log(request.headers)
    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        // console.log(token)
        if (token == null) {
            return response.status(401).json({ msg: 'token is missing' });
        }
    
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if (error) {
                return response.status(403).json({ msg: 'invalid token' })
            }
            // console.log(user)
    
            request.user = user;
            next();
        })
    } catch (error) {
        console.log("it is me")
        console.log(error.message)
    }
   
}

export const createNewToken = async (request, response) => {
    try {
        const refreshToken = request.body.token.split(' ')[1];

        if (!refreshToken) {
            return response.status(401).json({ msg: 'Refresh token is missing' })
        }
    
        const token = await Token.findOne({ token: refreshToken });
    
        if (!token) {
            return response.status(404).json({ msg: 'Refresh token is not valid'});
        }
    
        jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
            if (error) {
                response.status(500).json({ msg: 'invalid refresh token'});
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
    
            return response.status(200).json({ accessToken: accessToken })
        }) 
    } catch (error) {
        console.log("it is men")
        console.log(error.message)
    }
    


}