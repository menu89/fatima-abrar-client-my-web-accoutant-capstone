import { Redirect, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import {v4} from 'uuid';
import useForm from '../util/useForm';
import checkFieldCompletion from '../util/formValidation';
import Button from "../components/Button/Button";
import InputField from "../components/InputField/InputField";
import InputDropDown from "../components/InputField/InputDropDown";
import axios from 'axios';

const axiosURL = process.env.REACT_APP_AXIOSURL

function Entryform() {
    const [redirectAdd, setRedirectAdd] = useState("")
    const [values, handleOnChange] = useForm({amount:"",description:"",trandate:""})
    const [buttonStatus, setButtonStatus] = useState(true)
    const [creditOptions, setCreditOptions] = useState([])
    const [debitOptions, setDebitOptions] = useState([])
    const propInfo = useRouteMatch()

    const propsArray = [
        { name:'amount', labelText: "Amount", changeFunc:handleOnChange, values:values['amount'], type:'text',componentClasses:'input'},
        { name:'description', labelText: "Description", changeFunc:handleOnChange, values:values['description'],type:'text',componentClasses:'input'},
        { name:'trandate', labelText: "Transaction Date", changeFunc:handleOnChange, values:values['trandate'],type:'date',componentClasses:'input'}
    ]
    
    let optionArray = []
    let bankCategory = ''
    if(propInfo.path === '/add-transaction') {
        bankCategory = 'credit'
        optionArray = [
            {name:'debit', labelText: 'Expense',values:values['debit'],changeFunc:handleOnChange, options:debitOptions},
            {name:'credit', labelText: 'Payment from:',values:values['credit'],changeFunc:handleOnChange, options:creditOptions}
        ]
    }
    
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    const getAccountLists = () => {
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

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
            if (bankCategory === 'credit') {
                setCreditOptions([...prepareArray])
            } else (
                setDebitOptions([...prepareArray])
            )
        })
    }

    useEffect(() =>{
        getAccountLists()
    },[])
    
    return (
        <>
            <header>
                <h1 className="main-heading">My Web Accountant</h1>
            </header>
            <main>
                <h2>Bought Something / Paid Expense</h2>
                <form>
                    {optionArray.map(oneItem => <InputDropDown key={v4()} fieldData={oneItem} />)}
                    {propsArray.map(oneItem => <InputField key={v4()} fieldData={oneItem} />)}
                    <div className="button-container">
                        <Button content='+ Add' buttonEnabled={buttonStatus} clickFunc={()=> {console.log('infunction')}} />
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