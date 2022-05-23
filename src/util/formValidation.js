
//this function receives form fields as input and checks to see if they have a value
function checkFieldCompletion(values) {
    const valuesKeys = Object.keys(values)
    let fieldsCompleted = false
    valuesKeys.forEach( (oneKey, keyIndex) => {
        if (values[oneKey].length !== 0) {
            if (keyIndex === 0) {
                fieldsCompleted = true
            }
        } else {
            fieldsCompleted = false
        }
    })

    return !fieldsCompleted
}

function checkEmail (emailInput) {
    if (emailInput.includes('@') && emailInput.includes('.')) {
        return true
    }

    return false
}

function validateRegistrationForm (values) {
    //also recieves username but not using it anywhere at this time
    const { email, password, confirmPassword} = values

    if (confirmPassword !== password) {
        return {
            status: false,
            message: "Passwords do not Match"
        }
    }

    if (!checkEmail(email)) {
        return {
            status:false,
            message: "Please use a valid email address"
        }
    }
    
    return {status: true}
}


export default checkFieldCompletion;
export {
    validateRegistrationForm
}
