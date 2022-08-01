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
import propsInfo from '../assets/propsinformation.json';

const axiosURL = process.env.REACT_APP_AXIOSURL

function Entryform() {
    const editObject = JSON.parse(sessionStorage.getItem('edit-transaction-info'))
    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

    let populateCredit = ""
    let populateDebit = ""
    let populateTranDate = ""
    let populateAmount = ""
    let populateDescription = ""
    
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

    //props information that is the same accross all transaction types
    const propsArray = [
        { ...propsInfo.amountLabel, changeFunc:handleOnChange, values:values['amount']},
        { ...propsInfo.descriptionLabel, changeFunc:handleOnChange, values:values['description']},
        { ...propsInfo.tranDateLabel, changeFunc:handleOnChange, values:values['trandate']}
    ]
    
    //variables that change based on type of transaction
    let headingTitle = ''
    let optionArray = []
    let bankCategory = ''
    let trantype = ''
    let tranCategory = ''
    const debitObj = {name:'debit', values:values['debit'],changeFunc:handleOnChange, options:debitOptions, componentClasses:'input'}
    const creditObj = {name:'credit',values:values['credit'],changeFunc:handleOnChange, options:creditOptions, componentClasses:'input'}

    let areWeEditing = false

    //additional input fields that vary depending on type of transaction
    if((propInfo.path === '/add-exp-transaction') || (propInfo.path === '/add-exp-budget')) {
        bankCategory = 'c'
        trantype = 'expense'
        
        optionArray = [
            {labelText: 'Expense', ...debitObj},
            {labelText: 'Payment from:', ...creditObj}
        ]
        if (propInfo.path === '/add-exp-transaction') {
            tranCategory = 'actual'
            headingTitle = 'Bought Something / Paid Expense'
        }
        if (propInfo.path === '/add-exp-budget') {
            tranCategory = 'budget'
            headingTitle = 'Budget Purchase / Budget Expense'
        }

    } else if ((propInfo.path === '/add-inc-transaction') || (propInfo.path === '/add-inc-budget')) {
        bankCategory = 'd'
        trantype = 'income'
        tranCategory = 'actual'
        optionArray = [
            {labelText: 'Pay into', ...debitObj},
            {labelText: 'Income', ...creditObj}
        ]

        if (propInfo.path === '/add-inc-transaction') {
            tranCategory = 'actual'
            headingTitle = 'Money received from income, etc'
        }
        if (propInfo.path === '/add-inc-budget') {
            tranCategory = 'budget'
            headingTitle = 'Budget for expected incoming cash'
        }
    } else if ( (propInfo.path === '/edit-transaction') || (propInfo.path === '/edit-budget')) {
        bankCategory = editObject.Bank_type
        tranCategory = editObject.tranType

        if (bankCategory === 'c' ) {
            trantype = 'expense'
            optionArray = [
                {labelText: 'Expense', ...debitObj},
                {labelText: 'Payment from:', ...creditObj}
            ]
        } else if (bankCategory === 'd') {
            trantype = 'income'
            optionArray = [
                {labelText: 'Pay into', ...debitObj},
                {labelText: 'Income', ...creditObj}
            ]
        }

        if (tranCategory === "Actual") {
            headingTitle = 'Edit Actuals'
        } else if (tranCategory === "Budget") {
            headingTitle = 'Edit Budget Record'
        }

        areWeEditing = true
    }

    //this hook loads when bank category changes which is only on first load. it pulls the list of bank accounts and assigns it to one of the drop down lists.
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
            for (let loopBanks =0; loopBanks < responseList.length; loopBanks++) {
                prepareArray.push(responseList[loopBanks]['acc_des'])
            }
            if (bankCategory === 'c') {
                setCreditOptions([...prepareArray])
            } else (
                setDebitOptions([...prepareArray])
            )
        })   
    },[bankCategory])

    //this hook runs when trantype changes which is only when the components mounts/loads. it searches for list of accounts and adds them to the relevant drop down.
    useEffect(() => {
        //get's list of expense and income accounts
        axios.get(`${axiosURL}/account-list`)
        .then(response => {
            const responseList = response.data
            const prepareExpArray = []
            const prepareIncArray = []
            for (let loopAcc = 0; loopAcc < responseList.length; loopAcc++) {
                if (responseList[loopAcc]['type'] === 'expense') {
                    prepareExpArray.push(responseList[loopAcc]['name'])
                }
                if (responseList[loopAcc]['type'] === 'income') {
                    prepareIncArray.push(responseList[loopAcc]['name'])
                }
            }
            if (trantype === 'expense') {
                setDebitOptions([...prepareExpArray])
            } else if (trantype === 'income') {
                setCreditOptions([...prepareIncArray])
            }
        })
    },[trantype])

    //this function organizes information from the form and sends it to the server, then redirects to the dashboard
    const clickAdd = (event) => {
        event.preventDefault()
        
        const dateConvert = Date.parse(new Date(fixDateToSend( values['trandate'])))
        const sendTran = {
            'debit':values['debit'],
            'credit':values['credit'],
            'bank_type':bankCategory,
            'transaction_timestamp': dateConvert,
            'amount':values['amount'],
            'description':values['description']
        }
        axios.post(`${axiosURL}/${tranCategory}/single`, sendTran, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            setRedirectAdd('/dashboard')
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
        .then(response => {
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
                </section>
            </main>
            {redirectAdd && <Redirect to={redirectAdd} />}
        </>
    )
}

export default Entryform;