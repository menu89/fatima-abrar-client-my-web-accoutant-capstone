//this function changes the date to match a format that can be updated in the input field that supports "date"
function organizeDate(workingDate) {
    let workingMonth = ''
    if (workingDate.getMonth() > 8) {
        workingMonth = `${workingDate.getMonth()+1}`
    } else {
        workingMonth = `0${workingDate.getMonth() + 1}`
    }
    let workingDay = ''
    if (workingDate.getDate() > 9) {
        workingDay = `${workingDate.getDate()}`
    } else {
        workingDay = `0${workingDate.getDate()}`
    }

    return `${workingDate.getFullYear()}-${workingMonth}-${workingDay}`
}

//this function organizes the info for editing an actual or budget transaction
function organizeForTranPatchCall(values, editObject) {
    const {amount, description, trandate, debit, credit} = values

    let returnObject = {}
    returnObject[`tranid`] = editObject.id

    const workingDate = new Date(editObject.Transaction_timestamp)
    const modifiedTranDate = organizeDate(workingDate)

    if (amount !== editObject.amount) { returnObject[`amount`] = amount}
    if (description !== editObject.Description) { returnObject['accDesc'] = description}
    if (credit !== editObject.Credit) { 
        returnObject[`credit`] = credit
        returnObject[`bank_type`] = editObject.Bank_type
    }
    if (debit !== editObject.Debit) { 
        returnObject[`debit`] = debit
        returnObject[`bank_type`] = editObject.Bank_type
    }
    if (trandate !== modifiedTranDate) { 
        const dateConvert = Date.parse(new Date(values[trandate]))
        returnObject[`transaction_timestamp`] = dateConvert 
    }

    return returnObject
}

export {
    organizeDate,
    organizeForTranPatchCall
}