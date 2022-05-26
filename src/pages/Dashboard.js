import '../styles/Dashboard.scss';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useForm from '../util/useForm';
import checkFieldCompletion, {validateTotalSearch} from '../util/formValidation';
import NavBar from '../components/NavBar/NavBar';
import DisplayFieldTwo from '../components/DisplayFieldTwo/DisplayFieldTwo';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';
import axios from 'axios';

const axiosURL=process.env.REACT_APP_AXIOSURL

function Dashboard () {
    const [values, handleOnChange] = useForm({searchMonth:"05", searchYear:"2022"})
    const [buttonStatus, setButtonStatus] = useState(false)
    const [redirectToMain, setRedirectToMain] =useState(false)
    const [tableRow, setTableRow] = useState([])
    const [totalActual, setTotalActual] = useState(0)
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)

    const propsArray = [
        { name:'searchMonth', labelText: "Month", changeFunc:handleOnChange, values:values['searchMonth'], type:'text',componentClasses:'mini-input'},
        { name:'searchYear', labelText: "Year", changeFunc:handleOnChange, values:values['searchYear'],type:'text',componentClasses:'mini-input'}
    ]

    const callAxiosForActuals = () => {
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))
        const para = {
            month:values['searchMonth'],
            year:values['searchYear']
        }

        axios.post(`${axiosURL}/user/total-by-period`, para,{
            headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            organizeResponse(response.data)
        })
    }

    const organizeResponse = (response) => {
        const prepareArray = []
        const expResponse = response.expense
        let calcTotalActual = 0
        
        expResponse.forEach(oneItem => {
            const getKey = Object.keys(oneItem)
            const obj = {
                heading:getKey[0],
                budget:0,
                actual:oneItem[getKey]
            }
            calcTotalActual += oneItem[getKey]
            prepareArray.push(obj)
        })

        setTableRow(prepareArray)
        setTotalActual(calcTotalActual)
    }

    const clickGo = (event) => {
        event.preventDefault()
        const {status, message} = validateTotalSearch(values)
        setValidationStatus(status)
        setValidationMsg(message)
        
        if (status) {
            callAxiosForActuals()
        }
    }

    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    useEffect(() => {
        const doWeRedirect = !sessionStorage.getItem('JWT-Token') 
        setRedirectToMain(doWeRedirect)

        if (!doWeRedirect) {
            callAxiosForActuals()
        }
        
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <header>
                <h1 className="main-heading">My Web Accountant</h1>
                <NavBar />
            </header>
            <main>
                <form className='dashboard__form'>
                    {propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                    <Button content='Go' clickFunc={(event)=>{clickGo(event)}} buttonEnabled={buttonStatus} newClass={true}/>
                    
                </form>
                <DisplayFieldTwo objectClass='display-four' one='Expense' two='Budget' three='Actual' four='Difference'/>
                {tableRow.map((oneRow,rowIndex) => {
                    const {heading, budget, actual} = oneRow
                    let diff = budget - actual
                    return (<DisplayFieldTwo key={rowIndex} objectClass='display-four display-four--regular' one={heading} two={budget} three={actual} four={diff} />)
                })}
                <DisplayFieldTwo objectClass='display-four' one='Total' two={0} three={totalActual} four={0-totalActual}/>
                
            </main>
            
            {!validationStatus && <p>{validationMsg}</p>}
            {redirectToMain && <Redirect to='/' />}
            <p>.</p>
        </>
    )
}

export default Dashboard;