import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {v4} from 'uuid';
import DisplayFieldOne from '../components/DisplayFieldOne/DisplayFieldOne';
import NavBar from '../components/NavBar/NavBar';
import Button from '../components/Button/Button';
import axios from 'axios';
import viewSvg from '../assets/icon/list-02.svg';
import BankDetails from '../components/BankDetails/BankDetails';

const axiosURL = process.env.REACT_APP_AXIOSURL

function InitialSetUp () {
    const [redirectToDash, setRedirectToDash] = useState(false)
    const [redirectToForm, setRedirectToForm] = useState(false)
    const [bankList, setBankList] = useState([])
    const [gotList, setGotList] = useState(false)
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)
    const [displayDetails, setDisplayDetails] = useState(null)
    const [bankSearchData, setBankSearchData] = useState(null)

    //axios call on first load to pull the list of bank accounts for the user
    const callAxiosForBankList = () => {
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

        axios.get(`${axiosURL}/banks/list`, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            const list = response.data
            setBankList(list)
            setGotList(true)
        })
        .catch((err) => {
            let message = ""
            if (err.response.status === 404) {
                message = err.message
            } else {
                message = err.response.data
            }
            setValidationMsg(message)
            setValidationStatus(false)
        })
    }

    //makes axios call o first load
    useEffect(()=>{
        callAxiosForBankList()
    }, [])

    //makes axios call whenever we close the details of a single account
    useEffect(() => {
        if (!displayDetails) {
            callAxiosForBankList()
        }
    },[displayDetails])

    //this function takes the bank info for one bank and feeds it as a parameter to BankDetails component.
    const clickView = (event, oneBank) => {
        event.preventDefault()
        setBankSearchData(oneBank)
        setDisplayDetails(true)
    }

    return (
        <>
        {(bankList.length !== 0) && <NavBar />}
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className='section-container'>
                <h2>Account List</h2>
                <section>
                    <DisplayFieldOne 
                        objectClass="display-three" 
                        one='Account Type'
                        two='Account Info'
                        three='Initial Account Balance'
                    />
                    {gotList && bankList.map(oneBank => {
                        const {acc_type, acc_des, amount} = oneBank
                        const id = v4()
                        return (
                        <article key={id} className='bank-container'>
                            <DisplayFieldOne 
                                objectClass="display-three display-three--regular" 
                                one={acc_type} 
                                two={acc_des} 
                                three={amount}
                            />
                            <img src={viewSvg} alt='view icon' className='bank-actions-icons' onClick={(event)=>{clickView(event, oneBank)}} />
                        </article>
                        )
                    })}
                </section>
                
                <div className='button-container'>
                    <Button 
                        content='+ Add another account' 
                        clickFunc={()=>(setRedirectToForm(true))}
                        buttonEnabled={false}
                    />
                    {/* button is only enabled if there is at least one entry showing */}
                    <Button 
                        content='Dashboard' 
                        clickFunc={()=>(setRedirectToDash(true))}
                        buttonEnabled={!(bankList.length !== 0)}
                    />
                </div>
            </section>
            
            {displayDetails && <BankDetails searchData={bankSearchData} listFunc={setDisplayDetails} />}
            {/* error message */}
            {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
            {redirectToForm && <Redirect to='/add-account' />}
            {redirectToDash && <Redirect to='/dashboard' />}
        </main>
        </>
    )
}

export default InitialSetUp;