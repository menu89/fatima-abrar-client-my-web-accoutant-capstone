import {organizeDate} from './organizeInfo';

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

function validateTotalSearch (values) {
    const { searchMonth, searchYear} = values

    if (!checkNumber(searchMonth) || !checkNumber(searchYear)) {
        return {
            status:false,
            message: "You must only use numbers for the amount"
        }
    }

    if ((parseInt(searchMonth) > 12) || (parseInt(searchMonth) < 1)) {
        return {
            status:false,
            message: "Please enter a valid number for month"
        }
    }

    if ((parseInt(searchYear) < 2022)) {
        return {
            status:false,
            message: "Cannot search for items prior to 2021"
        }
    }
    
    const currentDate = new Date(Date.now())
    const currentYear = currentDate.getFullYear()
    
    if (parseInt(searchYear) > currentYear) {
        return {
            status:false,
            message: "You are searching in a year that hasn't started yet."
        }
    }

    return {status: true}
}

function validateEditInformation (values, editObject) {
    const {amount, description, trandate, debit, credit} = values
    console.log(editObject)
    let countCategoriesChanged = 0

    const workingDate = new Date(editObject.Transaction_timestamp)
    const modifiedTranDate = organizeDate(workingDate)

    if (amount !== editObject.amount) { countCategoriesChanged += 1}
    if (description !== editObject.Description) { countCategoriesChanged += 1}
    if (credit !== editObject.Credit) { countCategoriesChanged += 1}
    if (debit !== editObject.Debit) { countCategoriesChanged += 1}
    if (trandate !== modifiedTranDate) { countCategoriesChanged += 1}
    
    if (countCategoriesChanged === 0) {
        return ({
            status:false,
            message: "No Fields have been updated. Please change at least one field."
        })
    } else {
        return ({
            status:true,
            message:`${countCategoriesChanged} fields changed.`
        })
    }
}

export default checkFieldCompletion;
export {
    validateRegistrationForm,
    validateLoginForm,
    validateBankInfo,
    validateTotalSearch,
    validateEditInformation
}
