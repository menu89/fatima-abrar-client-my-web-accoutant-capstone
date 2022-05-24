
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

function checkNumber (numInput) {
    const numbers = '0123456789.'
    const numArray = (
        numInput.split('')
                .map(oneNum => {
                    return numbers.includes(oneNum)
                })
                .filter(num => !(!num))
                .length
    )
    return (numInput.length === numArray)
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

function validateLoginForm (values) {
    const { email} = values
    if (!checkEmail(email)) {
        return {
            status:false,
            message: "Please use a valid email address"
        }
    }

    return {status: true}
}

function validateBankInfo (values) {
    const { amount,} = values
    if (!checkNumber(amount)) {
        return {
            status:false,
            message: "You must only use numbers for the amount"
        }
    }

    return {status: true}
}

export default checkFieldCompletion;
export {
    validateRegistrationForm,
    validateLoginForm,
    validateBankInfo
}
