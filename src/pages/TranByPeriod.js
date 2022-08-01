import '../styles/Dashboard.scss';
import { useState, useEffect } from "react";
import useForm from "../util/useForm";
import checkFieldCompletion, {validateTotalSearch} from "../util/formValidation";
import NavBar from "../components/NavBar/NavBar";
import InputField from "../components/InputField/InputField";
import InputDropDown from '../components/InputField/InputDropDown';
import Button from "../components/Button/Button";
import SingleTransaction from '../components/SingleTransaction/SingleTransaction';
import SingleTransactionHeading from '../components/SingleTransaction/SingleTransactionHeading';
import axios from "axios";
import { API_URL } from '../config';
import propsInfo from '../assets/propsinformation.json';

const axiosURL= API_URL

function TranByPeriod () {
    const currentDate = new Date(Date.now())
    let cm = currentDate.getMonth()+1
    if (currentDate.getMonth() < 10) {
        cm = `0${cm}`
    }
    const [values, handleOnChange] = useForm({searchMonth:`${cm}`, searchYear:`${currentDate.getFullYear()}`, searchTranType:"", searchPeriod:""})
    const [buttonStatus, setButtonStatus] = useState(false)
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)
    const [tableRows, setTableRow] = useState(null)

    //this list of array populates the labels for transaction history
    const propsArray = [
        { ...propsInfo.searchMonthLabel, changeFunc:handleOnChange, values:values['searchMonth']},
        { ...propsInfo.searchYearLabel, changeFunc:handleOnChange, values:values['searchYear']}
    ]

    //this list populates the labels to determine the type of search
    const optionArray = [
        { ...propsInfo.searchTranType, changeFunc:handleOnChange, values:values['searchTranType']},
        { ...propsInfo.searchPeriod, changeFunc:handleOnChange, values:values['searchPeriod']}
    ]

    //request sent to server to recover wanted data
    const callAxiosForTranList = () => {
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))
        let axiosPeriod = ''

        if (values['searchPeriod'] === 'by-period') {
            axiosPeriod = `by-period?month=${values['searchMonth']}&year=${values['searchYear']}`
        } else if (values['searchPeriod'] === 'All') {
            axiosPeriod = 'all'
        }

        axios.get(`${axiosURL}/${values['searchTranType']}/${axiosPeriod}`,{
            headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            setTableRow(response.data)
        })
        .catch(err => {
            setTableRow([])
        })
    }

    //check whether all fields are populated before sending the request and then calls the axios function if it does
    const clickGo = (event) => {
        event.preventDefault()
        const {status, message} = validateTotalSearch(values)
        setValidationStatus(status)
        setValidationMsg(message)

        if (status) {
            callAxiosForTranList()
        }
    }

    //checks the fields at every change and disables or enables the go button accordingly.
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])
    
    return(
        <>
            <NavBar />
            <main>
                <h1 className="main-heading">My Web Accountant</h1>
                <section className='section-container'>
                    {/* class taken from dashboard */}
                    <form  className='dashboard__form'>
                        {optionArray.map(oneItem => <InputDropDown key={oneItem.name} fieldData={oneItem} />)}
                    </form>
                    <form  className='dashboard__form'> 
                        {(optionArray[1]['values'] === 'by-period') && propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                        <Button content='Go' clickFunc={(event)=>{clickGo(event)}} buttonEnabled={buttonStatus} newClass={true}/>
                    </form>
                </section>
                <section className='section-container'>
                    <section>
                        {tableRows && <SingleTransactionHeading />}
                        {tableRows && tableRows.map((oneRow, rowIndex) => {
                            return <SingleTransaction key={rowIndex} tranData={oneRow} tranType={values['searchTranType']} />
                        })}
                        
                    </section>
                </section>
                
                <p>.</p>
            </main>

            {!validationStatus && <p>{validationMsg}</p>}
        </>
    )
}

export default TranByPeriod;