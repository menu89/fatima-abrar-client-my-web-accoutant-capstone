import NavBar from "../components/NavBar/NavBar";
import CurrentPeriodInfo from "../components/CurrentPeriodInfo/CurrentPeriodInfo";
import InputDropDown from "../components/InputField/InputDropDown";
import Button from "../components/Button/Button";
import DisplayFieldTwo from "../components/DisplayFieldTwo/DisplayFieldTwo";
import { useState, useEffect } from 'react';
import propsInfo from '../assets/propsinformation.json';
import axios from "axios";
import { API_URL } from "../config";

const axiosURL= API_URL

function Cashflow () {
    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))
    
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(true)
    const [buttonStatus, setButtonStatus] = useState(true)
    const [currentPeriodInfo, setCurrentPeriodInfo] = useState(null)
    const [futurePeriodBudgets, setFuturePeriodBudgets] = useState(null)
    const [value, setValue] = useState('three-month')

    const valueEvent = (event) => {setValue(event.target.value)}

    const optionsObj = {values:value, changeFunc:valueEvent, ...propsInfo.cashFlowOptions}

    //makes an axios call to server for 3,6,or 12-month information, organizes it and then populates the tables.
    const callAxiosForCashflow = () => {
        axios.get(`${axiosURL}/cashflow/${value}`,{
            headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            const dataReceipt = response.data

            const {opening_account_balances, currentPeriod} = dataReceipt
            let calculateTotal = opening_account_balances.cash + opening_account_balances.chequeing + opening_account_balances.savings + opening_account_balances['credit-card'] + opening_account_balances['line-of-credit']

            const {actual_expense, budget_expense, actual_income, budget_income} = currentPeriod
            let incomeDiff = budget_income - actual_income
            let expenseDiff = budget_expense - actual_expense
            if (expenseDiff < 0) { expenseDiff = actual_expense }
            else { expenseDiff = budget_expense}
            if (incomeDiff > 0) { incomeDiff = actual_income }
            else { incomeDiff = budget_income}

            const stateObj = {
                openingBalances: opening_account_balances,
                currentPeriod: currentPeriod,
                openingTotal: calculateTotal,
                incomeDiff:incomeDiff,
                expenseDiff:expenseDiff
            }

            calculateTotal += (- expenseDiff - incomeDiff)

            const prepFuturePeriods = []

            if (!!dataReceipt.firstMonth) {
                calculateTotal += (-dataReceipt.firstMonth['budget_expense']-dataReceipt.firstMonth['budget_income'])
                dataReceipt.firstMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.firstMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.firstMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.firstMonth)
            }
            if (!!dataReceipt.secondMonth) {
                calculateTotal += (-dataReceipt.secondMonth['budget_expense']-dataReceipt.secondMonth['budget_income'])
                dataReceipt.secondMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.secondMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.secondMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.secondMonth)
            }
            if (!!dataReceipt.thirdMonth) {
                calculateTotal += (-dataReceipt.thirdMonth['budget_expense']-dataReceipt.thirdMonth['budget_income'])
                dataReceipt.thirdMonth.runningTotal = calculateTotal
                dataReceipt.thirdMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.thirdMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.thirdMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.thirdMonth)
            }
            if (!!dataReceipt.fourthMonth) {
                calculateTotal += (-dataReceipt.fourthMonth['budget_expense']-dataReceipt.fourthMonth['budget_income'])
                dataReceipt.fourthMonth.runningTotal = calculateTotal
                
                const periodDate = new Date(dataReceipt.fourthMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.fourthMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.fourthMonth)
            }
            if (!!dataReceipt.fifthMonth) {
                calculateTotal += (-dataReceipt.fifthMonth['budget_expense']-dataReceipt.fifthMonth['budget_income'])
                dataReceipt.fifthMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.fifthMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.fifthMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.fifthMonth)
            }
            if (!!dataReceipt.sixthMonth) {
                calculateTotal += (-dataReceipt.sixthMonth['budget_expense']-dataReceipt.sixthMonth['budget_income'])
                dataReceipt.sixthMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.sixthMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.sixthMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.sixthMonth)
            }
            if (!!dataReceipt.seventhMonth) {
                calculateTotal += (-dataReceipt.seventhMonth['budget_expense']-dataReceipt.seventhMonth['budget_income'])
                dataReceipt.seventhMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.seventhMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.seventhMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.seventhMonth)
            }
            if (!!dataReceipt.eighthMonth) {
                calculateTotal += (-dataReceipt.eighthMonth['budget_expense']-dataReceipt.eighthMonth['budget_income'])
                dataReceipt.eighthMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.eighthMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.eighthMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.eighthMonth)
            }
            if (!!dataReceipt.ninethMonth) {
                calculateTotal += (-dataReceipt.ninethMonth['budget_expense']-dataReceipt.ninethMonth['budget_income'])
                dataReceipt.ninethMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.ninethMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.ninethMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.ninethMonth)
            }
            if (!!dataReceipt.tenthMonth) {
                calculateTotal += (-dataReceipt.tenthMonth['budget_expense']-dataReceipt.tenthMonth['budget_income'])
                dataReceipt.tenthMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.tenthMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.tenthMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.tenthMonth)
            }
            if (!!dataReceipt.eleventhMonth) {
                calculateTotal += (-dataReceipt.eleventhMonth['budget_expense']-dataReceipt.eleventhMonth['budget_income'])
                dataReceipt.eleventhMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.eleventhMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.eleventhMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.eleventhMonth)
            }
            if (!!dataReceipt.twelvethMonth) {
                calculateTotal += (-dataReceipt.twelvethMonth['budget_expense']-dataReceipt.twelvethMonth['budget_income'])
                dataReceipt.twelvethMonth.runningTotal = calculateTotal

                const periodDate = new Date(dataReceipt.twelvethMonth.startDate)
                const periodArray = periodDate.toDateString().split(' ')
                dataReceipt.twelvethMonth.periodString = `${periodArray[1]} ${periodArray[3]}`

                prepFuturePeriods.push(dataReceipt.twelvethMonth)
            }
            
            setCurrentPeriodInfo(stateObj)
            setFuturePeriodBudgets(prepFuturePeriods)
        })
        .catch(err => {
            setValidationMsg("Could not complete the request.")
            setValidationStatus(false)
            setCurrentPeriodInfo(null)
            setFuturePeriodBudgets(null)
        })
    }

    //checks to see if all field is completed and sets the button status accordingly.
    useEffect(()=> {
        if (value.length > 0) {
            setButtonStatus(false)
        } else {
            setButtonStatus(true)
        }
    }, [value])

    //makes an axios call when you click submit button
    const clickSubmit = (event) => {
        event.preventDefault()
        callAxiosForCashflow()
    }

    //calls the axios function on first load
    useEffect(() => {
        callAxiosForCashflow()
        //eslint-disable-next-line
    },[])

    return (<>
        <NavBar />
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className='section-container'>
                <h2>Cashflow</h2>
                <form>
                    <InputDropDown fieldData={optionsObj} />
                    <Button content='Search' buttonEnabled={buttonStatus} clickFunc={(event)=> clickSubmit(event)} newClass={true} />
                </form>
            </section>
            {!!currentPeriodInfo && 
                <section className='section-container'>
                    <CurrentPeriodInfo periodProps={currentPeriodInfo} />
                </section>
            }
            {!!futurePeriodBudgets &&
                <section className="section-container">
                    <DisplayFieldTwo objectClass='display-four' one='Period' two='Expected Income' three='Expected Expenses' four='Balance at end of month'/>
                    {futurePeriodBudgets.map((oneRow, rowIndex) => {
                        const {budget_expense, budget_income, runningTotal, periodString} = oneRow

                        return (<DisplayFieldTwo key={rowIndex} objectClass='display-four display-four--regular' one={periodString} two={-budget_income} three={budget_expense} four={runningTotal} />)
                    })}
                </section>
            }
            
            
        </main>

        {!validationStatus && <p>{validationMsg}</p>}
    </>)
}

export default Cashflow;