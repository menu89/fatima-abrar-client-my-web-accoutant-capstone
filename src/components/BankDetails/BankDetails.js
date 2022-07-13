import { useEffect, useState } from 'react';
import SingleTransaction from '../SingleTransaction/SingleTransaction';
import axios from 'axios';
import './BankDetails.scss';
import Button from '../Button/Button';

const axiosURL = process.env.REACT_APP_AXIOSURL

function BankDetails ({searchData, listFunc}) {
    const {id} = searchData
    const currentDate = new Date(Date.now()).toDateString()
    const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

    const [bankInfo, setBankInfo] = useState(null)

    useEffect(() => {
        axios.get(`${axiosURL}/banks/account-details-by-date?bankid=${id}&balance_timestamp='${currentDate}`, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
            setBankInfo(response.data)
            console.log(bankInfo)
        })
        //eslint-disable-next-line
    },[])
    

    return(<>
        {!!bankInfo && 
        <div className='bank-details'>
            <aside className='bank-details__container'>
                <h2>Account Details</h2>
                <div><p>Bank Info: {bankInfo.acc_des}</p></div>
                <div><p>Account Type: {bankInfo.acc_type}</p></div>
                <details className='bank-details--amount-container'>
                    <summary>Display cash movement in account</summary>
                    <div className='bank-details__content'>
                        <p>Starting Balance: <span>{ Intl.NumberFormat().format(bankInfo.amount)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Expenses Paid: <span>{Intl.NumberFormat().format(bankInfo.money_paid)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Income and Other Cash: <span>{Intl.NumberFormat().format(bankInfo.money_received)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Money transferred into account: <span>{Intl.NumberFormat().format(bankInfo.transfer_in)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Money transferred out of account: <span>{Intl.NumberFormat().format(bankInfo.transfer_out)}</span></p>
                    </div>
                    <div className='bank-details__content'>
                        <p>Balance as at {currentDate}: <span>{Intl.NumberFormat().format(bankInfo.amount + bankInfo.money_paid + bankInfo.money_received + bankInfo.transfer_in + bankInfo.transfer_out)}</span></p>
                    </div>
                </details>
                
                <details>
                    <summary>Show the most recent transactions for actuals made from this account.</summary>
                    <h2>Recent Actuals</h2>
                    {bankInfo.recent_five_actuals.map((oneRow,rowIndex) => {
                        return <SingleTransaction key={rowIndex} tranData={oneRow} tranType='Actual' />
                    })}
                </details>
                <details>
                    <summary>Show the most recent transfers for actuals made from this account.</summary>
                    <h2>Recent Transfers</h2>
                    {bankInfo.recent_five_transfers.map((oneRow,rowIndex) => {
                        return <SingleTransaction key={rowIndex} tranData={oneRow} tranType='Actual' />
                    })}
                </details>
                <div className='button-container'>
                    <Button 
                        content='Back to Account List'
                        clickFunc={()=> {listFunc(false)}}
                        buttonEnabled={false}
                    />
                </div>
            </aside>
        </div>}
    </>)
}

export default BankDetails;