import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {v4} from 'uuid';
import DisplayFieldOne from '../components/DisplayFieldOne/DisplayFieldOne';
import NavBar from '../components/NavBar/NavBar';
import Button from '../components/Button/Button';
import axios from 'axios';

const axiosURL = process.env.REACT_APP_AXIOSURL

function InitialSetUp () {
    const [redirectToDash, setRedirectToDash] = useState(false)
    const [redirectToForm, setRedirectToForm] = useState(false)
    const [bankList, setBankList] = useState([])
    const [gotList, setGotList] = useState(false)
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)

    //axios call on first load to pull the list of bank accounts for the user
    useEffect(()=>{
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

        axios.get(`${axiosURL}/user/bank-list`, {headers: {
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
    }, [])

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
                        return <DisplayFieldOne 
                            key={id}
                            objectClass="display-three display-three--regular" 
                            one={acc_type} 
                            two={acc_des} 
                            three={amount}
                        />
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
            
            {/* error message */}
            {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
            {redirectToForm && <Redirect to='/add-account' />}
            {redirectToDash && <Redirect to='/dashboard' />}
        </main>
        </>
    )
}

export default InitialSetUp;