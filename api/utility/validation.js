
// email validation
export const isEmail = (email) => {
    return /^[^\.-/][a-z0-9-_\.]{1,}@[a-z0-9]{1,}\.[a-z\.]{1,}$/.test(email)
}


// mobile validation
export const isMobile = (mobile) => {
    return /^(01|8801|\+8801)[0-9]{9}$/.test(mobile)
}


// number validation
export const isNumber = (number) => {
    return /^[0-9\+]{1,}$/.test(number)
}


