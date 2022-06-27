import { Redirect, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
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
    const [values, handleOnChange] = useForm({amount:"",description:"",trandate:"", debit:"", credit:""})
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
    const debitObj = {name:'debit', values:values['debit'],changeFunc:handleOnChange, options:debitOptions}
    const creditObj = {name:'credit',values:values['credit'],changeFunc:handleOnChange, options:creditOptions}
    
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
    }

    //this hook loads when bank category changes which is only on first load. it pulls the list of bank accounts and assigns it to one of the drop down lists.
    useEffect(() =>{
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

        //gets list of bank accounts for the specific user
        axios.get(`${axiosURL}/user/bank-list`, {headers: {
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
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))
        const dateConvert = Date.parse(new Date(values['trandate']))
        const sendTran = {
            'debit':values['debit'],
            'credit':values['credit'],
            'bank_type':bankCategory,
            'transaction_timestamp': dateConvert,
            'amount':values['amount'],
            'description':values['description']
        }
        axios.post(`${axiosURL}/${tranCategory}/transaction-single`, sendTran, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            setRedirectAdd('/dashboard')
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
                <section className="section-container">
                    <h2>{headingTitle}</h2>
                    <form>
                        {optionArray.map(oneItem => <InputDropDown key={oneItem.name} fieldData={oneItem} />)}
                        {propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                        <div className="button-container">
                            <Button content='+ Add' buttonEnabled={buttonStatus} clickFunc={(event)=> {clickAdd(event)}} />
                            <Button content='Cancel' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/actions')}} />
                        </div>
                    </form>
                </section>
                
                <p>.</p>
            </main>
            {redirectAdd && <Redirect to={redirectAdd} />}
        </>
    )
}

export default Entryform;