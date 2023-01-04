
import bcrypt from 'bcryptjs'

/**
 * create hash password
 */

export const hashPassword = (password) => {

    // salt gen
    const salt = bcrypt.genSaltSync(12)

    // hash pass
    const hash_password = bcrypt.hashSync(password, salt)

    return hash_password
};



/**
 * create hash password
 */

 export const passwordVerify = (password, hash) => {

    return bcrypt.compareSync(password, hash)
   
};