import { Redirect, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import {validateEditInformation} from '../util/formValidation';
import {organizeDate, organizeForTranPatchCall, fixDateToSend} from '../util/organizeInfo';
import useForm from '../util/useForm';
import checkFieldCompletion from '../util/formValidation';
import Button from "../components/Button/Button";
import InputField from "../components/InputField/InputField";
import InputDropDown from "../components/InputField/InputDropDown";
import NavBar from "../components/NavBar/NavBar";
import axios from 'axios';
import { API_URL } from "../config";
import propsInfo from '../assets/propsinformation.json';

const axiosURL = API_URL

function TransferEntryform() {
    const editObject = JSON.parse(sessionStorage.getItem('edit-transfer-info'))
    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

    let populateCredit = ""
    let populateDebit = ""
    let populateTranDate = ""
    let populateAmount = ""
    let populateDescription = ""

    //console.log(editObject)
    
    //if it is an edit page, then it takes the object from session storage and populates the initial values using said object
    if (!!editObject) {
        populateCredit = editObject.Credit
        populateDebit = editObject.Debit 
        populateAmount = editObject.amount
        populateDescription = editObject.Description
        
        const workingDate = new Date(editObject.Transaction_timestamp)
        populateTranDate = organizeDate(workingDate)
    }

    const [values, handleOnChange] = useForm({amount:populateAmount,description:populateDescription,trandate:populateTranDate, debit:populateDebit, credit:populateCredit})
    const [buttonStatus, setButtonStatus] = useState(true)
    const [creditOptions, setCreditOptions] = useState([])
    const [debitOptions, setDebitOptions] = useState([])
    const [redirectAdd, setRedirectAdd] = useState("")
    const propInfo = useRouteMatch()

    const [validationStatus, setValidationStatus] = useState(true)
    const [validationMsg, setValidationMsg] = useState(null)
    const [formDisplayStatus, setFormDisplayStatus] = useState(true)

    //props information that is the same accross all transaction types
    const propsArray = [
        { ...propsInfo.amountLabel, changeFunc:handleOnChange, values:values['amount']},
        { ...propsInfo.descriptionLabel, changeFunc:handleOnChange, values:values['description']},
        { ...propsInfo.tranDateLabel, changeFunc:handleOnChange, values:values['trandate']}
    ]

    const optionArray = [
        {labelText: 'Paid into:', name:'debit', values:values['debit'],changeFunc:handleOnChange, options:debitOptions, componentClasses:'input'},
        {labelText: 'Payment from:', name:'credit',values:values['credit'],changeFunc:handleOnChange, options:creditOptions, componentClasses:'input'}
    ]
    const tranCategory = 'Transfer'

    //variables that change based on type of transaction
    let headingTitle = ''
    let areWeEditing = false
    
    //additional input fields that vary depending on type of transaction
    if((propInfo.path === '/add-transfer')) {
        headingTitle = 'Book a transfer'

    } else if ( (propInfo.path === '/edit-transfer')) {
        headingTitle = 'Edit Transfer'
        areWeEditing = true
    }

    //this hook loads when bank category changes which is only on first load. it pulls the list of bank accounts and assigns it to one of the drop down lists.
    //it checks to see if there are more then two accounts set up. if only one is set up, you cannot proceed with the transfer entry.
    useEffect(() =>{
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

        //gets list of bank accounts for the specific user
        axios.get(`${axiosURL}/banks/list`, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            const responseList = response.data
            const prepareArray = []

            if (responseList.length <= 1) {
                setFormDisplayStatus(false)
            } else {
                for (let loopBanks =0; loopBanks < responseList.length; loopBanks++) {
                    prepareArray.push(responseList[loopBanks]['acc_des'])
                }
                setCreditOptions([...prepareArray])
                setDebitOptions([...prepareArray])
            }
        })
        // eslint-disable-next-line   
    },[])

    //this function organizes information from the form and sends it to the server, then redirects to the dashboard
    const clickAdd = (event) => {
        event.preventDefault()
        
        const dateConvert = Date.parse(new Date(fixDateToSend(values['trandate'])))
        const sendTran = {
            'debit':values['debit'],
            'credit':values['credit'],
            'transaction_timestamp': dateConvert,
            'amount':values['amount'],
            'description':values['description']
        }
        axios.post(`${axiosURL}/${tranCategory}/single`, sendTran, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(() => {
            setRedirectAdd('/dashboard')
        })
        .catch(err => {
            setValidationStatus(false)
            setValidationMsg(err.response.data)
        })
    }

    const clickEdit = (event) => {
        event.preventDefault()

        const {status} = validateEditInformation(values, editObject)
        let patchObject ={}

        if (status) {
            patchObject = organizeForTranPatchCall(values, editObject)
        }

        axios.patch(`${axiosURL}/${tranCategory}/single`, patchObject, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(() => {
            setRedirectAdd('/history')
        })
    }

    //this function checks to see that all fields are updated
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])
    
    return (
        <>
            <NavBar />      
            <main>
                <h1 className="main-heading">My Web Accountant</h1>
                <section className="section-container section-container--small">
                    {!formDisplayStatus 
                    ? (
                        <div>
                            <p>You need more then one payment account set up to create a transfer.</p>
                            <div className="button-container">
                                <Button content='+ Add a payment account' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/add-account')}} />
                            </div>  
                        </div>
                    )
                    : (
                        <div>
                        <h2>{headingTitle}</h2>
                        <form>
                            {optionArray.map(oneItem => <InputDropDown key={oneItem.name} fieldData={oneItem} />)}
                            {propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                            <div className="button-container">
                                {areWeEditing && <Button content="Edit" buttonEnabled={buttonStatus} clickFunc={(event) => {clickEdit(event)}} />}
                                {!areWeEditing && <Button content='+ Add' buttonEnabled={buttonStatus} clickFunc={(event)=> {clickAdd(event)}} />}
                                <Button content='Cancel' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/actions')}} />
                            </div>
                        </form>
                        </div>
                    )}
                    
                </section>
            </main>
            {redirectAdd && <Redirect to={redirectAdd} />}
            {/* populates the error message */}
            {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
        </>
    )
}

export default TransferEntryform;