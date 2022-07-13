import '../styles/Dashboard.scss';
import { useState, useEffect } from 'react';
import useForm from '../util/useForm';
import checkFieldCompletion, {validateTotalSearch} from '../util/formValidation';
import NavBar from '../components/NavBar/NavBar';
import DisplayFieldTwo from '../components/DisplayFieldTwo/DisplayFieldTwo';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';
import axios from 'axios';
import propsInfo from '../assets/propsinformation.json';

const axiosURL=process.env.REACT_APP_AXIOSURL

function Dashboard () {
    const currentDate = new Date(Date.now())
    let cm = currentDate.getMonth()+1
    if (currentDate.getMonth() < 10) {
        cm = `0${cm}`
    }
    const [values, handleOnChange] = useForm({searchMonth:`${cm}`, searchYear:`${currentDate.getFullYear()}`})
    const [buttonStatus, setButtonStatus] = useState(false)
    const [tableRow, setTableRow] = useState([])
    const [totalActual, setTotalActual] = useState(0)
    const [totalBudget, setTotalBudget] = useState(0)

    const [tableIncRow, setTableIncRow] = useState([])
    const [totalIncActual, setTotalIncActual] = useState(0)
    const [totalIncBudget, setTotalIncBudget] = useState(0)

    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)

    //information realted to the form
    const propsArray = [
        { ...propsInfo.searchMonthLabel, changeFunc:handleOnChange, values:values['searchMonth']},
        { ...propsInfo.searchYearLabel, changeFunc:handleOnChange, values:values['searchYear']}
    ]

    //Axios call for actuals information
    const callAxiosForActuals = () => {
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

        return new Promise((resolve, reject) => {
            axios.get(`${axiosURL}/actual/totals-by-period?month=${values['searchMonth']}&year=${values['searchYear']}`,{
                headers: {
                "Content-type": "application/json",
                'authorization': `Bearer ${token}`
            }})
            .then(response => {
                resolve(response.data)
            })
            .catch(response => {
                reject([])
            })
        })
    }

    //Axios call for budget information
    const callAxiosForBudgets = () => {
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

        return new Promise((resolve, reject) => {
            axios.get(`${axiosURL}/budget/totals-by-period?month=${values['searchMonth']}&year=${values['searchYear']}`,{
                headers: {
                "Content-type": "application/json",
                'authorization': `Bearer ${token}`
            }})
            .then(response => {
                resolve(response.data)
            })
            .catch(response => {
                reject([])
            })
        })
    }

    //makes an axios call for actuals, organizes received data, then makes axios call for budget information and organizes information received.
    const organizeData = () => {
        const prepareExpArray = []
        let calcExpTotalActual = 0
        let calcExpTotalBudget = 0

        const prepareIncArray =[]
        let calcIncTotalActual = 0
        let calcIncTotalBudget = 0

        callAxiosForActuals()
        .then (response => {
            const expResponse = response.expense
            
            expResponse.forEach(oneItem => {
                const getKey = Object.keys(oneItem)
                const obj = {
                    heading:getKey[0],
                    budget:0,
                    actual:oneItem[getKey]
                }
                calcExpTotalActual += oneItem[getKey]
                prepareExpArray.push(obj)
            })

            const incResponse = response.income

            incResponse.forEach(oneItem => {
                const getKey = Object.keys(oneItem)
                const obj = {
                    heading:getKey[0],
                    budget:0,
                    actual:oneItem[getKey]
                }
                calcIncTotalActual += oneItem[getKey]
                prepareIncArray.push(obj)
            })
    
            return callAxiosForBudgets()
        }).then(response => {
            const isExpArrayPopulated = prepareExpArray.length
            const expResponse = response.expense

            expResponse.forEach(oneItem => {
                const getKey = Object.keys(oneItem)
                let keyCounted = ''

                if (isExpArrayPopulated > 0) {
                    for (let oneAcc = 0; oneAcc < isExpArrayPopulated; oneAcc++ ) {
                        if (prepareExpArray[oneAcc]['heading'] === getKey[0]) {
                            prepareExpArray[oneAcc]['budget'] = oneItem[getKey]
                            keyCounted = getKey
                        } 
                    }
                }

                calcExpTotalBudget += oneItem[getKey]

                if (keyCounted !== getKey) {
                    const obj = {
                        heading:getKey[0],
                        budget:oneItem[getKey],
                        actual:0
                    }
                    prepareExpArray.push(obj)
                }
            })

            const isIncArrayPopulated = prepareIncArray.length
            const incResponse = response.income

            incResponse.forEach(oneItem => {
                const getKey = Object.keys(oneItem)
                let keyCounted = ''
                if (isIncArrayPopulated > 0) {
                    for (let oneAcc =0; oneAcc < isIncArrayPopulated; oneAcc++) {
                        if (prepareIncArray[oneAcc]['heading'] === getKey[0]) {
                            prepareIncArray[oneAcc]['budget'] = oneItem[getKey]
                            keyCounted = getKey
                        }
                    }
                }

                calcIncTotalBudget += oneItem[getKey]

                if (keyCounted !== getKey) {
                    const obj = {
                        heading:getKey[0],
                        budget:oneItem[getKey],
                        actual:0
                    }
                    prepareIncArray.push(obj)
                }
            })

            setTableRow(prepareExpArray)
            setTotalActual(calcExpTotalActual)
            setTotalBudget(calcExpTotalBudget)

            setTableIncRow(prepareIncArray)
            setTotalIncActual(calcIncTotalActual)
            setTotalIncBudget(calcIncTotalBudget)

        }).catch( err => {
            if (prepareExpArray.length > 0 || prepareIncArray.length > 0) {
                setTableRow(prepareExpArray)
                setTotalActual(calcExpTotalActual)
                setTotalBudget(0)

                setTableIncRow(prepareIncArray)
                setTotalIncActual(calcIncTotalActual)
                setTotalIncBudget(0)
            } else {
                setTableRow(err)
                setTableIncRow(err)
            }
        })
    }

    //checks the form inputs and if information is correct, then makes an axios call
    const clickGo = (event) => {
        event.preventDefault()
        const {status, message} = validateTotalSearch(values)
        setValidationStatus(status)
        setValidationMsg(message)
        
        if (status) {
            organizeData()
        }
    }

    //changes the status of the button to enabled or disabled depending on if all the form fields have values
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    //calls the function to populate the table on first mounting/loading the component
    useEffect(() => {
        organizeData()
        
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <NavBar />
            <main>
                <h1 className="main-heading">My Web Accountant</h1>
                <section className='section-container'>
                    <form className='dashboard__form'>
                        {propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                        <Button content='Go' clickFunc={(event)=>{clickGo(event)}} buttonEnabled={buttonStatus} newClass={true}/>
                        
                    </form>

                    {/* display income information  */}
                    <DisplayFieldTwo objectClass='display-four' one='Expense' two='Budget' three='Actual' four='Difference'/>
                    {tableIncRow.map((oneRow,rowIndex) => {
                        const {heading, budget, actual} = oneRow
                        let diff = budget - actual
                        return (<DisplayFieldTwo key={rowIndex} objectClass='display-four display-four--regular' one={heading} two={budget} three={actual} four={diff} />)
                    })}
                    {(tableIncRow.length > 0) &&
                    <DisplayFieldTwo objectClass='display-four' one='Income Total' two={totalIncBudget} three={totalIncActual} four={totalIncBudget-totalIncActual}/>}

                    {/* display the expense information */}
                    {tableRow.map((oneRow,rowIndex) => {
                        const {heading, budget, actual} = oneRow
                        let diff = budget - actual
                        return (<DisplayFieldTwo key={rowIndex} objectClass='display-four display-four--regular' one={heading} two={budget} three={actual} four={diff} />)
                    })}
                    {(tableRow.length > 0) &&
                    <DisplayFieldTwo objectClass='display-four' one='Expense Total' two={totalBudget} three={totalActual} four={totalBudget-totalActual}/>}
                </section>
                
            </main>
            
            {/* error message */}
            {!validationStatus && <p className='validation-message' >{validationMsg}</p>}
        </>
    )
}

export default Dashboard;