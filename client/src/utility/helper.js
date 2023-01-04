import { isEmail, isMobile } from "./validation";

// hide email or phone
export const hideMailMobile = (data) => {

   if(isEmail(data)){
        let com = data.split("@")[1]
        let mail = data.split("@")[0]
    
        let first = mail.substr(0,1)
        let last = mail.substr(-1,1)
    
        return `${first}**********${last}@${com}`
   }

   if(isMobile(data)){
    let first_num = data.substr(0,3)
    let last_num = data.substr(-2)

    return `${first_num}******${last_num}`
   }

}