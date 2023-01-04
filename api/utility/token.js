
import jwt from 'jsonwebtoken';

/**
 * create jwt
 */
export const createToken = (payload, exp) => {

    // create token
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn : exp
    })

    return token

};


/**
 * verify jwt
 */
export const tokenVerify =  (token) => {

    return jwt.verify(token, process.env.TOKEN_SECRET)

};