
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

function validateRegistrationForm (values) {
    console.log('hello')
}


export default checkFieldCompletion;
export {
    validateRegistrationForm
}
