import { Redirect, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import useForm from '../util/useForm';
import checkFieldCompletion from '../util/formValidation';
import Button from "../components/Button/Button";
import InputField from "../components/InputField/InputField";
import InputDropDown from "../components/InputField/InputDropDown";
import axios from 'axios';

const axiosURL = process.env.REACT_APP_AXIOSURL

function Entryform() {
    const [values, handleOnChange] = useForm({amount:"",description:"",trandate:"", debit:"", credit:""})
    const [buttonStatus, setButtonStatus] = useState(true)
    const [creditOptions, setCreditOptions] = useState([])
    const [debitOptions, setDebitOptions] = useState([])
    const [redirectAdd, setRedirectAdd] = useState("")
    const propInfo = useRouteMatch()

    const propsArray = [
        { name:'amount', labelText: "Amount", changeFunc:handleOnChange, values:values['amount'], type:'number',componentClasses:'input'},
        { name:'description', labelText: "Description", changeFunc:handleOnChange, values:values['description'],type:'text',componentClasses:'input'},
        { name:'trandate', labelText: "Transaction Date", changeFunc:handleOnChange, values:values['trandate'],type:'date',componentClasses:'input'}
    ]
    
    let optionArray = []
    let bankCategory = ''
    let trantype = ''
    if(propInfo.path === '/add-transaction') {
        bankCategory = 'c'
        trantype = 'expense'
        optionArray = [
            {name:'debit', labelText: 'Expense',values:values['debit'],changeFunc:handleOnChange, options:debitOptions},
            {name:'credit', labelText: 'Payment from:',values:values['credit'],changeFunc:handleOnChange, options:creditOptions}
        ]
    }

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
            }
        })
    },[trantype])

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
        axios.post(`${axiosURL}/user/transaction`, sendTran, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            setRedirectAdd('/dashboard')
        })
    }

    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])
    
    return (
        <>
            <header>
                <h1 className="main-heading">My Web Accountant</h1>
            </header>
            <main>
                <h2>Bought Something / Paid Expense</h2>
                <form>
                    {optionArray.map(oneItem => <InputDropDown key={oneItem.name} fieldData={oneItem} />)}
                    {propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                    <div className="button-container">
                        <Button content='+ Add' buttonEnabled={buttonStatus} clickFunc={(event)=> {clickAdd(event)}} />
                        <Button content='Cancel' buttonEnabled={false} clickFunc={()=> {setRedirectAdd('/actions')}} />
                    </div>
                </form>
                <p>.</p>
            </main>
            {redirectAdd && <Redirect to={redirectAdd} />}
        </>
    )
}

export default Entryform;