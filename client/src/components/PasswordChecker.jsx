import React from 'react'
import zxcvbn from 'zxcvbn'
const PasswordChecker = ({ password }) => {
    
    const testResult = zxcvbn(password)

    const createPasswordLabel = () => {
        switch(testResult.score) {
            case 1:
                return "Too short";
            
            case 2:
                return "Weak"
                
            case 3:
               return "Medium"

            case 4: 
                return "Strong"
            
            default :
                return ""
        }
    }

    const passwordTestColor = () => {
        switch(testResult.score) {
            case 1:
                return "#E89304";
            
            case 2:
                return "#808080"
                
            case 3:
               return "#0000FF"

            case 4: 
                return "#008000"
           
            default :
              return ""
        }
    }
 
    return (
    <>
      <p style={{ color : passwordTestColor(), padding : "10px 20px", fontWeight: "800"}}> {createPasswordLabel()} </p>
    </>
  )
}

export default PasswordChecker
