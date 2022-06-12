import '../styles/Dashboard.scss';
import { useState, useEffect } from "react";
import useForm from "../util/useForm";
import checkFieldCompletion, {validateTotalSearch} from "../util/formValidation";
import NavBar from "../components/NavBar/NavBar";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import axios from "axios";
import propsInfo from '../assets/propsinformation.json';

const axiosURL=process.env.REACT_APP_AXIOSURL

function TranByPeriod () {
    const currentDate = new Date(Date.now())
    let cm = currentDate.getMonth()+1
    if (currentDate.getMonth() < 10) {
        cm = `0${cm}`
    }
    const [values, handleOnChange] = useForm({searchMonth:`${cm}`, searchYear:`${currentDate.getFullYear()}`})
    const [buttonStatus, setButtonStatus] = useState(false)
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)
    const [tableRows, setTableRow] = useState()

    const propsArray = [
        { ...propsInfo.searchMonthLabel, changeFunc:handleOnChange, values:values['searchMonth']},
        { ...propsInfo.searchYearLabel, changeFunc:handleOnChange, values:values['searchYear']}
    ]

    const callAxiosForTranList = () => {
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))
        axios.get(`${axiosURL}/actual/transaction-by-period?month=${values['searchMonth']}&year=${values['searchYear']}`,{
            headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            setTableRow(response.data)
        })
    }

    const clickGo = (event) => {
        event.preventDefault()
        const {status, message} = validateTotalSearch(values)
        setValidationStatus(status)
        setValidationMsg(message)

        if (status) {
            callAxiosForTranList()
        }
    }

    const adjustTimestamp = (timeData) => {
        const convertDate = new Date(timeData).toDateString()
        return convertDate
    }

    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])
    
    return(
        <>
            <header>
                <h1 className="main-heading">My Web Accountant</h1>
                <NavBar />
            </header>
            <main>
                {/* class taken from dashboard */}
                <form  className='dashboard__form'> 
                    {propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                    <Button content='Go' clickFunc={(event)=>{clickGo(event)}} buttonEnabled={buttonStatus} newClass={true}/>
                </form>
                <section>
                    {tableRows && tableRows.map((oneRow, rowIndex) => {
                        const {Credit, Debit, Description,amount,Transaction_timestamp} = oneRow
                        const convertTimestamp = adjustTimestamp(Transaction_timestamp)
                        
                        return (
                            <article className='transaction-list' key={rowIndex}>
                                <p>{convertTimestamp}</p>
                                <p>
                                    <span className='transaction-list--amount'>$ {amount}</span>
                                </p>
                                <p>
                                    <span>{Credit}</span>
                                    <span>{Debit}</span>
                                </p>
                                <p>Description: {Description}</p>
                            </article>
                        )
                    })}
                    
                </section>
                <p>.</p>
            </main>

            {!validationStatus && <p>{validationMsg}</p>}
        </>
    )
}

export default TranByPeriod;